<?php
/**
 * Importador Automático de Produtos e Vinculador de Imagens para CPT 'peca'
 * Com Máquinas - Cuiabá/MT
 *
 * Funcionalidades:
 * 1. Processamento Ajax em lotes (sem risco de timeout ou tela branca)
 * 2. Ferramenta dedicada "Vincular Fotos Automaticamente" (Auto-Linker)
 *    - Varre todos os produtos já cadastrados no CPT
 *    - Lê o nome do arquivo da foto em `_cm_image_url` ou `_cm_image_local_path` (ex: img_30211.jpg)
 *    - Busca na Biblioteca de Mídia do WordPress (`_wp_attached_file`)
 *    - Busca recursivamente na pasta física `wp-content/uploads/` (incluindo subpastas 2020/11, etc.)
 *    - Cria o anexo na Biblioteca de Mídia e define `set_post_thumbnail()` automaticamente!
 * 3. Upload direto de imagens via ZIP ou seleção múltipla no painel (Auto-Sync)
 * 4. Fallback visual inteligente no tema quando a imagem física ainda não estiver no servidor
 * 5. Barra de progresso visual com contadores e console de log em tempo real
 *
 * @package Com_Maquinas
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Adiciona o submenu no painel do WordPress em "Catálogo de Peças"
 */
function com_maquinas_register_importer_menu() {
    add_submenu_page(
        'edit.php?post_type=peca',
        __('Importar Produtos & Imagens (CSV)', 'com-maquinas'),
        __('Importar CSV & Imagens', 'com-maquinas'),
        'manage_options',
        'com-maquinas-csv-importer',
        'com_maquinas_render_importer_page'
    );
}
add_action('admin_menu', 'com_maquinas_register_importer_menu');

/**
 * Retorna o caminho do arquivo CSV padrão embutido no tema ou upload
 */
function com_maquinas_get_default_csv_path() {
    $theme_data_csv = get_template_directory() . '/data/produtos_commaq.csv';
    if (file_exists($theme_data_csv)) {
        return $theme_data_csv;
    }

    $workspace_csv = ABSPATH . 'public/assets/aistudio/produtos_commaq_com_imagens_215999ac.csv';
    if (file_exists($workspace_csv)) {
        return $workspace_csv;
    }

    $alt_csv = get_theme_file_path('../public/assets/aistudio/produtos_commaq_com_imagens_215999ac.csv');
    if (file_exists($alt_csv)) {
        return $alt_csv;
    }

    return '';
}

/**
 * Mapeamento de imagens de alta resolução por categoria (Fallback Inteligente)
 */
function com_maquinas_get_category_fallback_image($category_slug) {
    $slug = sanitize_title($category_slug);
    $map = array(
        'rolamentos'          => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        'sistema-eletrico'    => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
        'transmissao'         => 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        'sistema-de-freio'    => 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
        'retentores'          => 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
        'sistema-hidraulico'  => 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
        'motor'               => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        'filtros'             => 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
        'juntas-e-calcos'     => 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
        'porcas-e-parafusos'  => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        'diferencial'         => 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
        'empilhadeiras'       => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        'pas-carregadeiras'   => 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
        'uso-geral'           => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    );

    foreach ($map as $key => $url) {
        if (strpos($slug, $key) !== false || $slug === $key) {
            return $url;
        }
    }

    return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
}

/**
 * Busca profunda por arquivo de imagem dentro de wp-content/uploads/
 */
function com_maquinas_scan_file_in_uploads($target_filename) {
    if (empty($target_filename)) {
        return false;
    }

    $upload_dir = wp_upload_dir();
    $basedir = trailingslashit($upload_dir['basedir']);

    // 1. Checagem direta na raiz de uploads/
    if (file_exists($basedir . $target_filename)) {
        return $basedir . $target_filename;
    }

    // 2. Checagem na subpasta padrão do WordPress (ex: 2020/11/)
    if (file_exists($basedir . '2020/11/' . $target_filename)) {
        return $basedir . '2020/11/' . $target_filename;
    }

    // 3. Checagem na pasta atual do ano/mês
    if (file_exists(trailingslashit($upload_dir['path']) . $target_filename)) {
        return trailingslashit($upload_dir['path']) . $target_filename;
    }

    // 4. Checagem em subpastas comuns (ano/mês)
    $years = array('2020', '2021', '2022', '2023', '2024', '2025', '2026');
    $months = array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
    foreach ($years as $y) {
        if (!is_dir($basedir . $y)) continue;
        foreach ($months as $m) {
            $candidate = $basedir . $y . '/' . $m . '/' . $target_filename;
            if (file_exists($candidate)) {
                return $candidate;
            }
        }
    }

    return false;
}

/**
 * Conecta arquivo físico ao post como anexo e define miniatura (Featured Image)
 */
function com_maquinas_create_attachment_from_file($filepath, $post_id) {
    if (!file_exists($filepath) || !is_readable($filepath)) {
        return false;
    }

    $filename = basename($filepath);
    $filetype = wp_check_filetype($filename, null);

    $attachment = array(
        'post_mime_type' => $filetype['type'] ? $filetype['type'] : 'image/jpeg',
        'post_title'     => preg_replace('/\.[^.]+$/', '', sanitize_file_name($filename)),
        'post_content'   => '',
        'post_status'    => 'inherit'
    );

    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    $attach_id = wp_insert_attachment($attachment, $filepath, $post_id);
    if (!is_wp_error($attach_id) && $attach_id) {
        $attach_data = wp_generate_attachment_metadata($attach_id, $filepath);
        wp_update_attachment_metadata($attach_id, $attach_data);
        set_post_thumbnail($post_id, $attach_id);
        return $attach_id;
    }

    return false;
}

/**
 * Localiza imagem física no servidor ou cria anexo
 */
function com_maquinas_attach_or_find_image($post_id, $image_url, $local_path = '', $try_remote_download = false) {
    if (empty($image_url) && empty($local_path)) {
        return false;
    }

    // Extrair nome limpo do arquivo (ex: img_30211.jpg)
    $filename = '';
    if (!empty($image_url)) {
        $filename = basename(parse_url($image_url, PHP_URL_PATH));
    }
    if (empty($filename) && !empty($local_path)) {
        $filename = basename(str_replace('\\', '/', $local_path));
    }
    $filename = trim(sanitize_file_name($filename));

    if (empty($filename)) {
        return false;
    }

    // 1. Verificar se a imagem já existe na biblioteca de mídia pelo nome do arquivo
    global $wpdb;
    $attachment_id = $wpdb->get_var($wpdb->prepare(
        "SELECT post_id FROM $wpdb->postmeta WHERE meta_key = '_wp_attached_file' AND meta_value LIKE %s LIMIT 1",
        '%' . $wpdb->esc_like($filename)
    ));

    if ($attachment_id) {
        set_post_thumbnail($post_id, $attachment_id);
        return array('success' => true, 'id' => $attachment_id, 'source' => 'biblioteca_media');
    }

    // 2. Busca física inteligente em uploads/
    $physical_file = com_maquinas_scan_file_in_uploads($filename);
    if ($physical_file) {
        $attach_id = com_maquinas_create_attachment_from_file($physical_file, $post_id);
        if ($attach_id) {
            return array('success' => true, 'id' => $attach_id, 'source' => 'arquivo_local_uploads');
        }
    }

    // 3. Tentar download remoto APENAS se explicitamente solicitado
    if ($try_remote_download && !empty($image_url) && filter_var($image_url, FILTER_VALIDATE_URL)) {
        require_once(ABSPATH . 'wp-admin/includes/media.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/image.php');

        add_filter('http_request_timeout', function() { return 5; });
        $sideload_id = media_sideload_image($image_url, $post_id, null, 'id');
        if (!is_wp_error($sideload_id) && $sideload_id) {
            set_post_thumbnail($post_id, $sideload_id);
            return array('success' => true, 'id' => $sideload_id, 'source' => 'download_remoto');
        }
    }

    return false;
}

/**
 * Lê o cabeçalho e calcula o total de linhas do CSV
 */
function com_maquinas_get_csv_meta($csv_filepath) {
    if (!file_exists($csv_filepath) || !is_readable($csv_filepath)) {
        return false;
    }

    $handle = fopen($csv_filepath, 'r');
    if (!$handle) {
        return false;
    }

    $header = fgetcsv($handle, 4096, ',');
    if (!$header) {
        fclose($handle);
        return false;
    }

    $col_map = array(
        'id'        => 0,
        'nome'      => 3,
        'slug'      => 4,
        'cat'       => 6,
        'sku'       => 7,
        'preco'     => 8,
        'desc'      => 23,
        'img_url'   => 25,
        'img_local' => 26,
    );

    foreach ($header as $idx => $col) {
        $clean = trim(str_replace(array("\xEF\xBB\xBF", '"', "'"), '', $col));
        if ($clean === 'ID') $col_map['id'] = $idx;
        elseif ($clean === 'Nome') $col_map['nome'] = $idx;
        elseif ($clean === 'Slug') $col_map['slug'] = $idx;
        elseif ($clean === 'Categoria(s)') $col_map['cat'] = $idx;
        elseif ($clean === 'SKU') $col_map['sku'] = $idx;
        elseif (strpos($clean, 'Preco') !== false) $col_map['preco'] = $idx;
        elseif (strpos($clean, 'Descricao') !== false) $col_map['desc'] = $idx;
        elseif (strpos($clean, 'Imagem URL') !== false) $col_map['img_url'] = $idx;
        elseif (strpos($clean, 'Caminho Local') !== false) $col_map['img_local'] = $idx;
    }

    $total_rows = 0;
    while (($row = fgetcsv($handle, 8192, ',')) !== false) {
        if (!empty($row) && count($row) >= 4) {
            $total_rows++;
        }
    }

    fclose($handle);

    return array(
        'col_map'    => $col_map,
        'total_rows' => $total_rows,
        'path'       => $csv_filepath
    );
}

/**
 * Detecção inteligente de Montadora/Fabricante para Taxonomia
 */
function com_maquinas_detect_brand_name($title) {
    $u = strtoupper($title);
    if (strpos($u, 'XGMA') !== false || strpos($u, 'XG 932') !== false || strpos($u, 'XG932') !== false) return 'XGMA';
    if (strpos($u, 'DEGONG') !== false || strpos($u, 'DG938') !== false) return 'Degong';
    if (strpos($u, 'CHANGLIN') !== false || strpos($u, '937H') !== false) return 'Changlin';
    if (strpos($u, 'HANGCHA') !== false) return 'Hangcha';
    if (strpos($u, 'HELI') !== false) return 'Heli';
    if (strpos($u, 'CLARK') !== false) return 'Clark';
    if (strpos($u, 'XCMG') !== false) return 'XCMG';
    if (strpos($u, 'SHANTUI') !== false) return 'Shantui';
    if (strpos($u, 'SDLG') !== false) return 'SDLG';
    if (strpos($u, 'YUTONG') !== false) return 'Yutong';
    if (strpos($u, 'HYUNDAI') !== false) return 'Hyundai';
    if (strpos($u, 'CATERPILLAR') !== false || strpos($u, 'CAT ') !== false) return 'Caterpillar';
    if (strpos($u, 'KOMATSU') !== false) return 'Komatsu';
    if (strpos($u, 'COMMAQ') !== false) return 'COMMAQ';
    return 'Multimarcas';
}

/**
 * Handler AJAX para processar produtos em lotes
 */
function com_maquinas_ajax_import_batch() {
    check_ajax_referer('cm_import_nonce', 'nonce');

    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permissão insuficiente. Somente administradores podem importar.'));
    }

    @set_time_limit(60);
    @ini_set('memory_limit', '256M');

    $offset = isset($_POST['offset']) ? intval($_POST['offset']) : 0;
    $batch_size = isset($_POST['batch_size']) ? intval($_POST['batch_size']) : 15;
    $try_remote = isset($_POST['try_remote']) && $_POST['try_remote'] === '1';
    $custom_file = isset($_POST['custom_file']) ? sanitize_text_field($_POST['custom_file']) : '';

    $csv_filepath = '';
    if (!empty($custom_file)) {
        $upload_dir = wp_upload_dir();
        $safe_target = trailingslashit($upload_dir['basedir']) . 'cm-imports/' . basename($custom_file);
        if (file_exists($safe_target)) {
            $csv_filepath = $safe_target;
        }
    }

    if (empty($csv_filepath)) {
        $csv_filepath = com_maquinas_get_default_csv_path();
    }

    if (empty($csv_filepath) || !file_exists($csv_filepath)) {
        wp_send_json_error(array('message' => 'Arquivo CSV não encontrado no servidor.'));
    }

    $handle = fopen($csv_filepath, 'r');
    if (!$handle) {
        wp_send_json_error(array('message' => 'Não foi possível ler o arquivo CSV.'));
    }

    // Ler cabeçalho
    $header = fgetcsv($handle, 4096, ',');
    $col_id        = 0;
    $col_nome      = 3;
    $col_slug      = 4;
    $col_cat       = 6;
    $col_sku       = 7;
    $col_preco     = 8;
    $col_desc      = 23;
    $col_img_url   = 25;
    $col_img_local = 26;

    if ($header) {
        foreach ($header as $idx => $col) {
            $clean = trim(str_replace(array("\xEF\xBB\xBF", '"', "'"), '', $col));
            if ($clean === 'ID') $col_id = $idx;
            elseif ($clean === 'Nome') $col_nome = $idx;
            elseif ($clean === 'Slug') $col_slug = $idx;
            elseif ($clean === 'Categoria(s)') $col_cat = $idx;
            elseif ($clean === 'SKU') $col_sku = $idx;
            elseif (strpos($clean, 'Preco') !== false) $col_preco = $idx;
            elseif (strpos($clean, 'Descricao') !== false) $col_desc = $idx;
            elseif (strpos($clean, 'Imagem URL') !== false) $col_img_url = $idx;
            elseif (strpos($clean, 'Caminho Local') !== false) $col_img_local = $idx;
        }
    }

    $current_line = 0;
    while ($current_line < $offset && !feof($handle)) {
        $dummy = fgetcsv($handle, 8192, ',');
        if (!empty($dummy) && count($dummy) >= 4) {
            $current_line++;
        }
    }

    $processed_in_batch = 0;
    $created_count = 0;
    $updated_count = 0;
    $images_attached = 0;
    $logs = array();

    while ($processed_in_batch < $batch_size && !feof($handle)) {
        $row = fgetcsv($handle, 8192, ',');
        if (empty($row) || count($row) < 4) {
            continue;
        }

        $processed_in_batch++;
        $row_index = $offset + $processed_in_batch;

        $orig_id    = isset($row[$col_id]) ? sanitize_text_field($row[$col_id]) : '';
        $name       = isset($row[$col_nome]) ? sanitize_text_field($row[$col_nome]) : '';
        $slug       = isset($row[$col_slug]) ? sanitize_title($row[$col_slug]) : '';
        $category   = isset($row[$col_cat]) ? sanitize_text_field($row[$col_cat]) : 'USO GERAL';
        $sku        = isset($row[$col_sku]) ? sanitize_text_field($row[$col_sku]) : '';
        $price      = isset($row[$col_preco]) ? sanitize_text_field($row[$col_preco]) : '';
        $desc       = isset($row[$col_desc]) ? sanitize_textarea_field($row[$col_desc]) : '';
        $image_url  = isset($row[$col_img_url]) ? esc_url_raw(trim($row[$col_img_url])) : '';
        $img_local  = isset($row[$col_img_local]) ? sanitize_text_field(trim($row[$col_img_local])) : '';

        if (empty($name)) {
            continue;
        }

        if (empty($sku)) {
            $sku = 'SKU-' . ($orig_id ? $orig_id : $row_index);
        }

        // Buscar se já existe por SKU
        $existing = get_posts(array(
            'post_type'   => 'peca',
            'meta_key'    => '_cm_sku',
            'meta_value'  => $sku,
            'numberposts' => 1,
            'post_status' => 'any'
        ));

        $post_data = array(
            'post_title'   => $name,
            'post_name'    => $slug ? $slug : sanitize_title($name),
            'post_content' => $desc ? $desc : "Componente técnico {$name} para máquinas pesadas e empilhadeiras. Garantia e procedência COMMAQ em Cuiabá/MT.",
            'post_status'  => 'publish',
            'post_type'    => 'peca',
        );

        $action_label = '';
        if (!empty($existing)) {
            $post_id = $existing[0]->ID;
            $post_data['ID'] = $post_id;
            wp_update_post($post_data);
            $updated_count++;
            $action_label = 'atualizado';
        } else {
            $post_id = wp_insert_post($post_data);
            if (is_wp_error($post_id)) {
                $logs[] = array(
                    'type'    => 'error',
                    'message' => "#{$row_index}: Erro ao inserir [{$name}]: " . $post_id->get_error_message()
                );
                continue;
            }
            $created_count++;
            $action_label = 'criado';
        }

        // Salvar Metadados Customizados
        update_post_meta($post_id, '_cm_sku', $sku);
        update_post_meta($post_id, '_cm_part_number', $sku);
        update_post_meta($post_id, '_cm_original_id', $orig_id);
        if (!empty($price)) {
            update_post_meta($post_id, '_cm_preco', $price);
            update_post_meta($post_id, '_cm_sob_consulta', '0');
        } else {
            update_post_meta($post_id, '_cm_sob_consulta', '1');
        }

        // Nome do arquivo de imagem (ex: img_30211.jpg)
        $clean_img_filename = '';
        if (!empty($image_url)) {
            $clean_img_filename = basename(parse_url($image_url, PHP_URL_PATH));
        }
        if (empty($clean_img_filename) && !empty($img_local)) {
            $clean_img_filename = basename(str_replace('\\', '/', $img_local));
        }

        if (!empty($image_url)) {
            update_post_meta($post_id, '_cm_image_url', $image_url);
        }
        if (!empty($clean_img_filename)) {
            update_post_meta($post_id, '_cm_image_filename', $clean_img_filename);
        }
        if (!empty($img_local)) {
            update_post_meta($post_id, '_cm_image_local_path', $img_local);
        }

        // Taxonomia de Categoria (categoria_peca)
        if (!empty($category)) {
            $term = term_exists($category, 'categoria_peca');
            if (!$term) {
                $term = wp_insert_term($category, 'categoria_peca');
            }
            if (!is_wp_error($term) && isset($term['term_id'])) {
                wp_set_object_terms($post_id, (int)$term['term_id'], 'categoria_peca', false);
            }
        }

        // Taxonomia de Montadora/Marca ('montadora')
        $brand_detected = com_maquinas_detect_brand_name($name);
        if ($brand_detected) {
            update_post_meta($post_id, '_cm_fabricante', $brand_detected);
            $b_term = term_exists($brand_detected, 'montadora');
            if (!$b_term) {
                $b_term = wp_insert_term($brand_detected, 'montadora');
            }
            if (!is_wp_error($b_term) && isset($b_term['term_id'])) {
                wp_set_object_terms($post_id, (int)$b_term['term_id'], 'montadora', false);
            }
        }

        // Tentar Vincular Imagem
        $img_status = 'sem_imagem';
        if (!has_post_thumbnail($post_id)) {
            $attach_res = com_maquinas_attach_or_find_image($post_id, $image_url, $img_local, $try_remote);
            if ($attach_res && !empty($attach_res['success'])) {
                $images_attached++;
                $img_status = 'anexada_' . $attach_res['source'];
            } elseif (!empty($image_url)) {
                $img_status = 'url_gravada_aguardando_arquivo';
            }
        } else {
            $img_status = 'ja_possui_destaque';
        }

        $logs[] = array(
            'type'       => 'success',
            'row'        => $row_index,
            'name'       => $name,
            'sku'        => $sku,
            'action'     => $action_label,
            'img_status' => $img_status,
            'img_file'   => $clean_img_filename
        );
    }

    $is_eof = feof($handle);
    fclose($handle);

    wp_send_json_success(array(
        'offset'          => $offset + $processed_in_batch,
        'processed'       => $processed_in_batch,
        'created'         => $created_count,
        'updated'         => $updated_count,
        'images_attached' => $images_attached,
        'is_eof'          => $is_eof || $processed_in_batch === 0,
        'logs'            => $logs
    ));
}
add_action('wp_ajax_cm_import_batch', 'com_maquinas_ajax_import_batch');

/**
 * NOVO: Sincronizador Dedicado de Imagens em Lotes (Auto-Linker)
 * Percorre os produtos 'peca' existentes no banco e vincula qualquer foto
 * encontrada na pasta uploads/ ou na biblioteca de mídia sem precisar reimportar o CSV!
 */
function com_maquinas_ajax_autolink_images() {
    check_ajax_referer('cm_import_nonce', 'nonce');

    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permissão insuficiente.'));
    }

    @set_time_limit(60);
    @ini_set('memory_limit', '256M');

    $page = isset($_POST['page']) ? intval($_POST['page']) : 1;
    $per_page = 25;

    $query = new WP_Query(array(
        'post_type'      => 'peca',
        'post_status'    => 'any',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'fields'         => 'ids',
        'orderby'        => 'ID',
        'order'          => 'ASC'
    ));

    $total_posts = $query->found_posts;
    $post_ids = $query->posts;

    $linked_count = 0;
    $already_had = 0;
    $not_found_count = 0;
    $logs = array();

    foreach ($post_ids as $pid) {
        $p_title = get_the_title($pid);
        $img_url = get_post_meta($pid, '_cm_image_url', true);
        $local_p = get_post_meta($pid, '_cm_image_local_path', true);
        $fname   = get_post_meta($pid, '_cm_image_filename', true);

        if (empty($fname)) {
            if (!empty($img_url)) $fname = basename(parse_url($img_url, PHP_URL_PATH));
            elseif (!empty($local_p)) $fname = basename(str_replace('\\', '/', $local_p));
        }

        if (has_post_thumbnail($pid)) {
            $already_had++;
            continue;
        }

        if (empty($fname)) {
            $not_found_count++;
            continue;
        }

        $res = com_maquinas_attach_or_find_image($pid, $img_url, $local_p, false);
        if ($res && !empty($res['success'])) {
            $linked_count++;
            $logs[] = array(
                'id'       => $pid,
                'title'    => $p_title,
                'filename' => $fname,
                'source'   => $res['source']
            );
        } else {
            $not_found_count++;
        }
    }

    $is_last = ($page * $per_page) >= $total_posts || empty($post_ids);

    wp_send_json_success(array(
        'page'            => $page,
        'total_posts'     => $total_posts,
        'processed'       => count($post_ids),
        'linked_count'    => $linked_count,
        'already_had'     => $already_had,
        'not_found_count' => $not_found_count,
        'is_last'         => $is_last,
        'logs'            => $logs
    ));
}
add_action('wp_ajax_cm_autolink_images', 'com_maquinas_ajax_autolink_images');

/**
 * NOVO: Upload de Pacote ZIP de Imagens ou Fotos Múltiplas
 * Descompacta diretamente em wp-content/uploads/2020/11/ e vincula automaticamente!
 */
function com_maquinas_ajax_upload_images_pack() {
    check_ajax_referer('cm_import_nonce', 'nonce');

    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permissão insuficiente.'));
    }

    if (empty($_FILES['images_zip']['tmp_name'])) {
        wp_send_json_error(array('message' => 'Nenhum arquivo ZIP enviado.'));
    }

    $zip_file = $_FILES['images_zip']['tmp_name'];
    $upload_dir = wp_upload_dir();
    $target_dir = trailingslashit($upload_dir['basedir']) . '2020/11/';
    if (!file_exists($target_dir)) {
        wp_mkdir_p($target_dir);
    }

    if (!class_exists('ZipArchive')) {
        wp_send_json_error(array('message' => 'Extensão ZipArchive do PHP não está disponível neste servidor.'));
    }

    $zip = new ZipArchive();
    if ($zip->open($zip_file) !== TRUE) {
        wp_send_json_error(array('message' => 'Não foi possível abrir o arquivo ZIP.'));
    }

    $extracted_count = 0;
    for ($i = 0; $i < $zip->numFiles; $i++) {
        $entry_name = $zip->getNameIndex($i);
        $ext = strtolower(pathinfo($entry_name, PATHINFO_EXTENSION));
        if (in_array($ext, array('jpg', 'jpeg', 'png', 'webp', 'gif'))) {
            $clean_filename = basename($entry_name);
            $stream = $zip->getStream($entry_name);
            if ($stream) {
                file_put_contents($target_dir . $clean_filename, stream_get_contents($stream));
                fclose($stream);
                $extracted_count++;
            }
        }
    }
    $zip->close();

    wp_send_json_success(array(
        'extracted' => $extracted_count,
        'target'    => 'wp-content/uploads/2020/11/',
        'message'   => "Foram extraídas com sucesso {$extracted_count} imagens diretamente para wp-content/uploads/2020/11/!"
    ));
}
add_action('wp_ajax_cm_upload_images_pack', 'com_maquinas_ajax_upload_images_pack');

/**
 * Upload inicial de arquivo CSV personalizado via AJAX
 */
function com_maquinas_ajax_upload_csv() {
    check_ajax_referer('cm_import_nonce', 'nonce');

    if (!current_user_can('manage_options')) {
        wp_send_json_error(array('message' => 'Permissão insuficiente.'));
    }

    if (empty($_FILES['csv_file']['tmp_name'])) {
        wp_send_json_error(array('message' => 'Nenhum arquivo enviado.'));
    }

    $upload_dir = wp_upload_dir();
    $target_dir = trailingslashit($upload_dir['basedir']) . 'cm-imports/';
    if (!file_exists($target_dir)) {
        wp_mkdir_p($target_dir);
    }

    $filename = 'import_' . time() . '_' . sanitize_file_name($_FILES['csv_file']['name']);
    $destination = $target_dir . $filename;

    if (!move_uploaded_file($_FILES['csv_file']['tmp_name'], $destination)) {
        wp_send_json_error(array('message' => 'Falha ao salvar o arquivo no servidor.'));
    }

    $meta = com_maquinas_get_csv_meta($destination);
    if (!$meta) {
        @unlink($destination);
        wp_send_json_error(array('message' => 'Arquivo CSV inválido ou ilegível.'));
    }

    wp_send_json_success(array(
        'filename'   => $filename,
        'total_rows' => $meta['total_rows'],
        'message'    => "Arquivo carregado com sucesso! Detectados {$meta['total_rows']} produtos prontos para importação."
    ));
}
add_action('wp_ajax_cm_upload_csv', 'com_maquinas_ajax_upload_csv');

/**
 * Renderização da Página do Importador no wp-admin com Barra de Progresso e Logs
 */
function com_maquinas_render_importer_page() {
    if (!current_user_can('manage_options')) {
        wp_die(__('Acesso restrito. Somente administradores do sistema podem importar produtos e imagens.', 'com-maquinas'));
    }

    $default_csv = com_maquinas_get_default_csv_path();
    $default_csv_exists = !empty($default_csv) && file_exists($default_csv);
    $default_csv_meta = $default_csv_exists ? com_maquinas_get_csv_meta($default_csv) : null;
    $default_total_rows = $default_csv_meta ? $default_csv_meta['total_rows'] : 542;

    $total_pecas = wp_count_posts('peca');
    $published_count = isset($total_pecas->publish) ? $total_pecas->publish : 0;

    // Verificar quantas peças têm foto vinculada
    global $wpdb;
    $pecas_com_foto = $wpdb->get_var("
        SELECT COUNT(DISTINCT p.ID) 
        FROM {$wpdb->posts} p
        INNER JOIN {$wpdb->postmeta} pm ON p.ID = pm.post_id AND pm.meta_key = '_thumbnail_id'
        WHERE p.post_type = 'peca' AND p.post_status = 'publish' AND pm.meta_value > 0
    ");
    $pecas_sem_foto = max(0, $published_count - intval($pecas_com_foto));

    $upload_dir = wp_upload_dir();
    $server_uploads_path = $upload_dir['basedir'];
    ?>
    <div class="wrap" style="max-width: 1100px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <h1 style="display:flex; align-items:center; gap:12px; margin-bottom: 24px; color:#0f172a;">
            <span class="dashicons dashicons-upload" style="font-size:32px; width:32px; height:32px; color:#f59e0b;"></span>
            Importador Automático de Peças & Vinculador de Imagens
        </h1>

        <!-- Status Card em Destaque -->
        <div style="background:#fff; border-left:4px solid #f59e0b; padding:18px 24px; box-shadow:0 1px 3px rgba(0,0,0,0.08); margin-bottom:24px; border-radius:6px; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:16px;">
            <div>
                <h3 style="margin:0 0 6px 0; color:#1e293b; font-size:16px;">Diagnóstico em Tempo Real do Catálogo CPT</h3>
                <div style="display:flex; gap:16px; flex-wrap:wrap; font-size:13px; color:#475569;">
                    <span>Total de Peças: <strong style="color:#0f172a;"><?php echo esc_html($published_count); ?></strong></span>
                    <span>•</span>
                    <span style="color:#16a34a;">Com Foto Destacada: <strong><?php echo esc_html($pecas_com_foto); ?></strong></span>
                    <span>•</span>
                    <span style="color:#d97706;">Aguardando Foto: <strong><?php echo esc_html($pecas_sem_foto); ?></strong></span>
                </div>
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
                <span style="background:#dcfce7; color:#166534; padding:4px 10px; border-radius:6px; font-weight:700; font-size:12px;">
                    Exclusivo Administrador
                </span>
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=peca')); ?>" class="button button-secondary" style="font-weight:600;">
                    Ver Peças no Painel
                </a>
            </div>
        </div>

        <!-- SOLUÇÃO 1: VINCULADOR AUTOMÁTICO EM 1 CLIQUE (AUTO-LINKER) -->
        <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:8px; padding:22px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,0.04);">
            <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap;">
                <div style="max-width:700px;">
                    <h2 style="margin:0 0 8px 0; color:#14532d; font-size:17px; display:flex; align-items:center; gap:8px;">
                        <span class="dashicons dashicons-images-alt2" style="color:#16a34a; font-size:24px; width:24px; height:24px;"></span>
                        1. Vincular Automaticamente as Fotos aos Produtos Já Criados
                    </h2>
                    <p style="margin:0; font-size:13px; color:#166534; line-height:1.6;">
                        Seus produtos já foram importados com sucesso! Este botão faz a varredura automática em <code>wp-content/uploads/</code>, localiza os arquivos pelo nome exato (ex: <code>img_30211.jpg</code>) e vincula como <strong>Imagem Destacada Oficial</strong> de cada peça em segundos, sem precisar reimportar o CSV.
                    </p>
                </div>
                <div>
                    <button type="button" id="cm-autolink-btn" class="button button-primary button-hero" style="background:#16a34a; border-color:#15803d; color:#fff; font-weight:800; text-shadow:none; padding:10px 24px; display:inline-flex; align-items:center; gap:8px;">
                        <span class="dashicons dashicons-admin-links" style="margin-top:2px;"></span>
                        Vincular Fotos Automaticamente
                    </button>
                </div>
            </div>

            <!-- Progresso do Auto-Linker -->
            <div id="cm-autolink-progress" style="display:none; margin-top:16px; padding:14px; background:#fff; border-radius:6px; border:1px solid #bbf7d0;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:700; color:#14532d; margin-bottom:6px;">
                    <span id="cm-autolink-title">Buscando e conectando fotos aos produtos...</span>
                    <span id="cm-autolink-pct">0%</span>
                </div>
                <div style="background:#dcfce7; border-radius:8px; height:14px; overflow:hidden;">
                    <div id="cm-autolink-bar" style="background:#16a34a; height:100%; width:0%; transition:width 0.2s ease;"></div>
                </div>
                <div id="cm-autolink-stats" style="margin-top:8px; font-size:12px; color:#166534; font-weight:600;"></div>
            </div>
        </div>

        <!-- SOLUÇÃO 2: COMO ENVIAR AS FOTOS AUTOMATICAMENTE PARA O SERVIDOR -->
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:22px; margin-bottom:24px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin-top:0; color:#0f172a; font-size:17px; display:flex; align-items:center; gap:8px;">
                <span class="dashicons dashicons-cloud-upload" style="color:#0284c7;"></span>
                2. Como Enviar as 542 Fotos Automaticamente para o WordPress?
            </h2>
            <div style="font-size:13px; line-height:1.6; color:#475569;">
                <p>Na sua planilha, o caminho original é <code>C:\Users\Usuário\Desktop\commaq\wp-content\uploads\2020\11\</code>. Você pode escolher qualquer uma das duas formas 100% automáticas abaixo:</p>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin:16px 0;">
                    <!-- Método A: Enviar ZIP pelo Painel -->
                    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:18px;">
                        <h4 style="margin:0 0 8px 0; color:#0f172a; font-size:14px; display:flex; align-items:center; gap:6px;">
                            <span class="dashicons dashicons-portfolio" style="color:#f59e0b;"></span>
                            Opção A: Enviar Arquivo .ZIP de Fotos pelo Painel
                        </h4>
                        <p style="margin:0 0 12px 0; font-size:12px; color:#64748b;">
                            Compacte as imagens do seu computador em um arquivo <code>fotos.zip</code> e selecione abaixo. O sistema descompacta direto na pasta correta do servidor!
                        </p>
                        <input type="file" id="cm-images-zip-input" accept=".zip" style="font-size:12px;" />
                        <button type="button" id="cm-upload-zip-btn" class="button button-secondary" style="margin-top:8px; font-weight:600; display:block;">
                            Enviar e Extrair Fotos ZIP
                        </button>
                        <span id="cm-zip-status" style="margin-top:6px; display:block; font-size:12px; font-weight:600;"></span>
                    </div>

                    <!-- Método B: Copiar via FTP ou cPanel -->
                    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:18px;">
                        <h4 style="margin:0 0 8px 0; color:#0f172a; font-size:14px; display:flex; align-items:center; gap:6px;">
                            <span class="dashicons dashicons-networking" style="color:#0284c7;"></span>
                            Opção B: Copiar Diretamente via FTP ou Gerenciador de Arquivos
                        </h4>
                        <p style="margin:0 0 8px 0; font-size:12px; color:#64748b;">
                            Basta arrastar a pasta <code>uploads</code> do seu computador para o diretório no servidor:
                        </p>
                        <code style="display:block; padding:8px 10px; background:#0f172a; color:#38bdf8; border-radius:4px; font-size:11px; word-break:break-all;">
                            <?php echo esc_html($server_uploads_path); ?>/2020/11/
                        </code>
                        <p style="margin:8px 0 0 0; font-size:11px; color:#64748b;">
                            Depois de copiar, clique no botão verde <strong>"Vincular Fotos Automaticamente"</strong> acima.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- SOLUÇÃO 3: IMPORTADOR COMPLETO EM LOTES AJAX (COM PREVENÇÃO DE TIMEOUT) -->
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:24px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <h2 style="margin-top:0; color:#0f172a; font-size:17px; display:flex; align-items:center; gap:8px;">
                <span class="dashicons dashicons-database-import" style="color:#f59e0b;"></span>
                3. Importar ou Atualizar Dados Completos via Planilha CSV
            </h2>

            <form id="cm-importer-form" style="margin-bottom:20px;">
                <table class="form-table" style="margin-top:0;">
                    <tr>
                        <th scope="row"><label>Origem do Arquivo CSV</label></th>
                        <td>
                            <p style="margin-bottom:8px;">
                                <label style="font-weight:600; color:#1e293b; display:flex; align-items:center; gap:8px;">
                                    <input type="radio" name="csv_mode" value="default" <?php checked($default_csv_exists, true); ?> />
                                    Usar planilha padrão do tema: <code>produtos_commaq.csv</code> (<?php echo esc_html($default_total_rows); ?> produtos)
                                </label>
                            </p>
                            <p style="margin-top:6px;">
                                <label style="font-weight:600; color:#1e293b; display:flex; align-items:center; gap:8px;">
                                    <input type="radio" name="csv_mode" value="custom" <?php checked(!$default_csv_exists, true); ?> />
                                    Enviar novo arquivo CSV personalizado do computador
                                </label>
                            </p>
                            <div id="cm-custom-file-wrap" style="margin-top:8px; padding-left:24px; <?php echo $default_csv_exists ? 'display:none;' : ''; ?>">
                                <input type="file" id="cm-csv-file" accept=".csv" />
                                <span id="cm-upload-status" style="margin-left:10px; font-size:12px; font-weight:600;"></span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="cm-batch-size">Velocidade do Lote</label></th>
                        <td>
                            <select id="cm-batch-size" class="regular-text">
                                <option value="15" selected="selected">15 produtos por lote (Recomendado - Sem Timeout)</option>
                                <option value="25">25 produtos por lote (Rápido)</option>
                                <option value="50">50 produtos por lote (Servidores Potentes)</option>
                                <option value="5">5 produtos por lote (Hospedagem Econômica)</option>
                            </select>
                            <p class="description">A importação roda em segundo plano via Ajax com barra de progresso visual.</p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="cm-limit-total">Quantidade a Processar</label></th>
                        <td>
                            <select id="cm-limit-total" class="regular-text">
                                <option value="0" selected="selected">Todos os <?php echo esc_html($default_total_rows); ?> produtos (Importação Completa)</option>
                                <option value="20">Testar com 20 primeiros produtos</option>
                                <option value="50">Importar 50 produtos</option>
                                <option value="100">Importar 100 produtos</option>
                            </select>
                        </td>
                    </tr>
                </table>

                <div style="margin-top:20px; padding-top:16px; border-top:1px solid #e2e8f0; display:flex; align-items:center; gap:12px;">
                    <button type="button" id="cm-start-btn" class="button button-primary button-hero" style="background:#f59e0b; border-color:#d97706; text-shadow:none; font-weight:700; color:#0f172a; padding:10px 28px; display:inline-flex; align-items:center; gap:8px;">
                        <span class="dashicons dashicons-controls-play" style="margin-top:2px;"></span>
                        Iniciar Importação do CSV
                    </button>
                    <button type="button" id="cm-stop-btn" class="button button-secondary button-hero" style="display:none; color:#dc2626; border-color:#fca5a5;">
                        Pausar Importação
                    </button>
                </div>
            </form>

            <!-- Área de Progresso e Logs Visual (AO VIVO) -->
            <div id="cm-progress-box" style="display:none; margin-top:24px; padding:20px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <h3 style="margin:0; font-size:15px; color:#0f172a; display:flex; align-items:center; gap:8px;">
                        <span class="spinner is-active" id="cm-spinner" style="float:none; margin:0;"></span>
                        <span id="cm-status-title">Processando produtos...</span>
                    </h3>
                    <span id="cm-percentage-text" style="font-size:18px; font-weight:800; color:#f59e0b;">0%</span>
                </div>

                <div style="background:#e2e8f0; border-radius:10px; height:18px; width:100%; overflow:hidden; position:relative; box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);">
                    <div id="cm-progress-bar" style="background:linear-gradient(90deg, #f59e0b, #fbbf24); height:100%; width:0%; border-radius:10px; transition:width 0.3s ease;"></div>
                </div>

                <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:12px; margin-top:16px; text-align:center;">
                    <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">
                        <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Processados</span>
                        <div id="cm-stat-processed" style="font-size:20px; font-weight:800; color:#0f172a;">0</div>
                    </div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">
                        <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Novos Criados</span>
                        <div id="cm-stat-created" style="font-size:20px; font-weight:800; color:#16a34a;">0</div>
                    </div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">
                        <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Atualizados</span>
                        <div id="cm-stat-updated" style="font-size:20px; font-weight:800; color:#2563eb;">0</div>
                    </div>
                    <div style="background:#fff; padding:10px; border-radius:6px; border:1px solid #e2e8f0;">
                        <span style="font-size:11px; color:#64748b; font-weight:600; text-transform:uppercase;">Fotos Vinculadas</span>
                        <div id="cm-stat-images" style="font-size:20px; font-weight:800; color:#d97706;">0</div>
                    </div>
                </div>

                <div style="margin-top:16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <label style="font-size:12px; font-weight:700; color:#475569; text-transform:uppercase;">Registro de Atividades:</label>
                        <button type="button" id="cm-clear-log" style="background:none; border:none; color:#64748b; font-size:11px; cursor:pointer; text-decoration:underline;">Limpar Log</button>
                    </div>
                    <div id="cm-log-console" style="background:#0f172a; color:#e2e8f0; font-family:Consolas, Monaco, monospace; font-size:11px; line-height:1.6; padding:14px; border-radius:6px; max-height:220px; overflow-y:auto; border:1px solid #1e293b;">
                        <div style="color:#94a3b8;">&gt; Pronto para iniciar. Clique em "Iniciar Importação do CSV".</div>
                    </div>
                </div>
            </div>

            <!-- Alerta de Sucesso Final -->
            <div id="cm-final-success" style="display:none; margin-top:20px; padding:16px 20px; background:#ecfdf5; border-left:4px solid #10b981; border-radius:6px;">
                <h3 style="margin:0 0 6px 0; color:#065f46; font-size:16px; font-weight:800;">✓ Importação Concluída com Sucesso!</h3>
                <p style="margin:0 0 12px 0; color:#047857; font-size:13px;" id="cm-final-message"></p>
                <a href="<?php echo esc_url(admin_url('edit.php?post_type=peca')); ?>" class="button button-primary" style="background:#10b981; border-color:#059669; font-weight:700;">
                    Visualizar Peças no Catálogo CPT
                </a>
            </div>

            <!-- Alerta de Erro -->
            <div id="cm-final-error" style="display:none; margin-top:20px; padding:16px 20px; background:#fef2f2; border-left:4px solid #ef4444; border-radius:6px;">
                <h3 style="margin:0 0 6px 0; color:#991b1b; font-size:16px; font-weight:800;">✕ Ocorreu um Erro durante a Importação</h3>
                <p style="margin:0; color:#b91c1c; font-size:13px;" id="cm-final-error-message"></p>
            </div>
        </div>
    </div>

    <!-- Scripts de Execução Ajax -->
    <script type="text/javascript">
    jQuery(document).ready(function($) {
        var nonce = '<?php echo wp_create_nonce("cm_import_nonce"); ?>';
        var totalExpected = <?php echo intval($default_total_rows); ?>;
        var customUploadedFile = '';
        var isRunning = false;
        var offset = 0;
        var statCreated = 0;
        var statUpdated = 0;
        var statImages = 0;
        var statProcessed = 0;
        var maxLimit = 0;

        // Alternância do modo do arquivo
        $('input[name="csv_mode"]').on('change', function() {
            if ($(this).val() === 'custom') {
                $('#cm-custom-file-wrap').slideDown(200);
            } else {
                $('#cm-custom-file-wrap').slideUp(200);
                customUploadedFile = '';
                totalExpected = <?php echo intval($default_total_rows); ?>;
                $('#cm-limit-total option:first').text('Todos os ' + totalExpected + ' produtos (Importação Completa)');
            }
        });

        // Upload Ajax de arquivo CSV customizado
        $('#cm-csv-file').on('change', function() {
            var file = this.files[0];
            if (!file) return;

            var formData = new FormData();
            formData.append('action', 'cm_upload_csv');
            formData.append('nonce', nonce);
            formData.append('csv_file', file);

            $('#cm-upload-status').text('Enviando arquivo...').css('color', '#d97706');

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(res) {
                    if (res.success) {
                        customUploadedFile = res.data.filename;
                        totalExpected = parseInt(res.data.total_rows, 10);
                        $('#cm-upload-status').text('✓ ' + res.data.message).css('color', '#16a34a');
                        $('#cm-limit-total option:first').text('Todos os ' + totalExpected + ' produtos (Importação Completa)');
                    } else {
                        $('#cm-upload-status').text('✕ ' + res.data.message).css('color', '#dc2626');
                    }
                },
                error: function() {
                    $('#cm-upload-status').text('✕ Falha ao enviar arquivo para o servidor.').css('color', '#dc2626');
                }
            });
        });

        // Upload de Fotos ZIP direto pelo painel
        $('#cm-upload-zip-btn').on('click', function() {
            var fileInput = document.getElementById('cm-images-zip-input');
            if (!fileInput.files.length) {
                alert('Selecione um arquivo .zip contendo as fotos no seu computador.');
                return;
            }

            var formData = new FormData();
            formData.append('action', 'cm_upload_images_pack');
            formData.append('nonce', nonce);
            formData.append('images_zip', fileInput.files[0]);

            $('#cm-zip-status').text('Enviando e extraindo fotos no servidor...').css('color', '#d97706');
            $(this).prop('disabled', true);

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                timeout: 300000,
                success: function(res) {
                    $('#cm-upload-zip-btn').prop('disabled', false);
                    if (res.success) {
                        $('#cm-zip-status').text('✓ ' + res.data.message).css('color', '#16a34a');
                        alert('Fotos extraídas com sucesso! Agora clique em "Vincular Fotos Automaticamente" no botão verde acima.');
                    } else {
                        $('#cm-zip-status').text('✕ ' + res.data.message).css('color', '#dc2626');
                    }
                },
                error: function() {
                    $('#cm-upload-zip-btn').prop('disabled', false);
                    $('#cm-zip-status').text('✕ Falha no envio do arquivo ZIP. Verifique limites de upload do PHP.').css('color', '#dc2626');
                }
            });
        });

        // AUTO-LINKER: Vinculador de Fotos em 1 Clique
        var autolinkRunning = false;
        var autolinkPage = 1;
        var totalAutolinked = 0;

        $('#cm-autolink-btn').on('click', function() {
            if (autolinkRunning) return;
            autolinkRunning = true;
            autolinkPage = 1;
            totalAutolinked = 0;

            $('#cm-autolink-btn').prop('disabled', true).text('Vinculando fotos...');
            $('#cm-autolink-progress').slideDown(200);
            $('#cm-autolink-pct').text('0%');
            $('#cm-autolink-bar').css('width', '0%');
            $('#cm-autolink-stats').text('Iniciando varredura na pasta uploads e biblioteca...');

            runAutolinkBatch();
        });

        function runAutolinkBatch() {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'cm_autolink_images',
                    nonce: nonce,
                    page: autolinkPage
                },
                timeout: 60000,
                success: function(res) {
                    if (!res.success) {
                        alert('Erro ao vincular fotos: ' + (res.data ? res.data.message : 'Falha na resposta.'));
                        $('#cm-autolink-btn').prop('disabled', false).text('Vincular Fotos Automaticamente');
                        autolinkRunning = false;
                        return;
                    }

                    var d = res.data;
                    totalAutolinked += d.linked_count;

                    var total = d.total_posts || 1;
                    var processedSoFar = Math.min(total, autolinkPage * 25);
                    var pct = Math.min(100, Math.round((processedSoFar / total) * 100));

                    $('#cm-autolink-pct').text(pct + '%');
                    $('#cm-autolink-bar').css('width', pct + '%');
                    $('#cm-autolink-stats').html('Analisados: <strong>' + processedSoFar + '/' + total + '</strong> | Fotos vinculadas agora: <strong style="color:#16a34a;">' + totalAutolinked + '</strong>');

                    if (!d.is_last && autolinkPage * 25 < total) {
                        autolinkPage++;
                        runAutolinkBatch();
                    } else {
                        autolinkRunning = false;
                        $('#cm-autolink-btn').prop('disabled', false).html('<span class="dashicons dashicons-yes" style="margin-top:2px;"></span> Vinculação Concluída!');
                        $('#cm-autolink-title').text('Varredura e vinculação 100% finalizada!');
                        $('#cm-autolink-pct').text('100%');
                        $('#cm-autolink-bar').css('width', '100%');
                        alert('Sucesso! ' + totalAutolinked + ' novas fotos foram vinculadas como Imagem Destacada aos produtos.');
                        window.location.reload();
                    }
                },
                error: function() {
                    alert('Falha na comunicação com o servidor ao vincular fotos.');
                    $('#cm-autolink-btn').prop('disabled', false).text('Vincular Fotos Automaticamente');
                    autolinkRunning = false;
                }
            });
        }

        function appendLog(msg, color) {
            var col = color || '#e2e8f0';
            var time = new Date().toLocaleTimeString();
            var line = '<div style="color:' + col + ';">[' + time + '] ' + msg + '</div>';
            var $c = $('#cm-log-console');
            $c.append(line);
            $c.scrollTop($c[0].scrollHeight);
        }

        $('#cm-clear-log').on('click', function() {
            $('#cm-log-console').empty();
        });

        // Iniciar Importação
        $('#cm-start-btn').on('click', function() {
            if (isRunning) return;

            var csvMode = $('input[name="csv_mode"]:checked').val();
            if (csvMode === 'custom' && !customUploadedFile) {
                alert('Por favor, selecione um arquivo CSV do seu computador antes de iniciar.');
                return;
            }

            maxLimit = parseInt($('#cm-limit-total').val(), 10);
            var targetTotal = maxLimit > 0 ? Math.min(maxLimit, totalExpected) : totalExpected;

            isRunning = true;
            offset = 0;
            statCreated = 0;
            statUpdated = 0;
            statImages = 0;
            statProcessed = 0;

            $('#cm-progress-box').slideDown(250);
            $('#cm-final-success, #cm-final-error').hide();
            $('#cm-start-btn').prop('disabled', true).css('opacity', '0.6');
            $('#cm-stop-btn').show();
            $('#cm-spinner').addClass('is-active');
            $('#cm-status-title').text('Importando produtos em lotes...');

            appendLog('🚀 Iniciando processo de importação para ' + targetTotal + ' produtos...', '#38bdf8');

            runNextBatch(targetTotal);
        });

        // Parar / Pausar
        $('#cm-stop-btn').on('click', function() {
            isRunning = false;
            $('#cm-stop-btn').hide();
            $('#cm-start-btn').prop('disabled', false).css('opacity', '1').html('<span class="dashicons dashicons-controls-play" style="margin-top:2px;"></span> Continuar Importação');
            $('#cm-spinner').removeClass('is-active');
            $('#cm-status-title').text('Importação pausada pelo usuário.');
            appendLog('⏸ Importação pausada. Você pode continuar a qualquer momento.', '#fbbf24');
        });

        function runNextBatch(targetTotal) {
            if (!isRunning) return;

            var batchSize = parseInt($('#cm-batch-size').val(), 10) || 15;

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'cm_import_batch',
                    nonce: nonce,
                    offset: offset,
                    batch_size: batchSize,
                    try_remote: '0',
                    custom_file: customUploadedFile
                },
                timeout: 90000,
                success: function(res) {
                    if (!res.success) {
                        handleError(res.data ? res.data.message : 'Erro desconhecido retornado pelo servidor.');
                        return;
                    }

                    var d = res.data;
                    offset = d.offset;
                    statProcessed += d.processed;
                    statCreated += d.created;
                    statUpdated += d.updated;
                    statImages += d.images_attached;

                    $('#cm-stat-processed').text(statProcessed);
                    $('#cm-stat-created').text(statCreated);
                    $('#cm-stat-updated').text(statUpdated);
                    $('#cm-stat-images').text(statImages);

                    if (d.logs && d.logs.length > 0) {
                        d.logs.forEach(function(l) {
                            if (l.type === 'error') {
                                appendLog(l.message, '#f87171');
                            } else {
                                var imgTxt = (l.img_status.indexOf('anexada') !== -1) ? ' [Foto Anexada: ' + l.img_file + ']' : ' [' + l.img_file + ']';
                                appendLog('✓ #' + l.row + ' ' + l.sku + ' - ' + l.name + ' (' + l.action + ')' + imgTxt, '#4ade80');
                            }
                        });
                    }

                    var effectiveTotal = targetTotal > 0 ? targetTotal : Math.max(offset, 1);
                    var percent = Math.min(100, Math.round((offset / effectiveTotal) * 100));
                    $('#cm-percentage-text').text(percent + '%');
                    $('#cm-progress-bar').css('width', percent + '%');

                    var shouldStop = d.is_eof || (maxLimit > 0 && offset >= maxLimit);

                    if (shouldStop) {
                        finishImport();
                    } else if (isRunning) {
                        runNextBatch(targetTotal);
                    }
                },
                error: function(xhr, status, error) {
                    handleError('Falha na comunicação com o servidor: ' + error + ' (Status: ' + status + '). Verifique a conexão.');
                }
            });
        }

        function finishImport() {
            isRunning = false;
            $('#cm-spinner').removeClass('is-active');
            $('#cm-stop-btn').hide();
            $('#cm-start-btn').prop('disabled', false).css('opacity', '1').html('<span class="dashicons dashicons-yes-alt" style="margin-top:2px;"></span> Importação Concluída');
            $('#cm-status-title').text('Processamento 100% finalizado!');
            $('#cm-percentage-text').text('100%');
            $('#cm-progress-bar').css('width', '100%');

            appendLog('🎉 Concluído com sucesso! Total de itens: ' + statProcessed + ' (Criados: ' + statCreated + ', Atualizados: ' + statUpdated + ', Fotos Vinculadas: ' + statImages + ')', '#38bdf8');

            $('#cm-final-message').html('Foram processados <strong>' + statProcessed + ' produtos</strong> no catálogo CPT: <strong>' + statCreated + ' novos itens criados</strong>, <strong>' + statUpdated + ' atualizados</strong> e <strong>' + statImages + ' imagens vinculadas</strong> na biblioteca.');
            $('#cm-final-success').slideDown(300);
        }

        function handleError(msg) {
            isRunning = false;
            $('#cm-spinner').removeClass('is-active');
            $('#cm-stop-btn').hide();
            $('#cm-start-btn').prop('disabled', false).css('opacity', '1').html('<span class="dashicons dashicons-controls-play" style="margin-top:2px;"></span> Tentar Novamente');
            $('#cm-status-title').text('Processo interrompido.');

            appendLog('❌ ERRO: ' + msg, '#f87171');
            $('#cm-final-error-message').text(msg);
            $('#cm-final-error').slideDown(300);
        }
    });
    </script>
    <?php
}
