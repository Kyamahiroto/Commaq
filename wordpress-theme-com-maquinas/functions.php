<?php
/**
 * Com Máquinas Theme Functions and Definitions
 *
 * @package Com_Maquinas
 */

if (!defined('ABSPATH')) {
    exit;
}

define('COM_MAQUINAS_VERSION', '1.0.0');

/**
 * Setup theme defaults and register support for various WordPress features.
 */
function com_maquinas_setup() {
    load_theme_textdomain('com-maquinas', get_template_directory() . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // WooCommerce support (se ativo)
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');

    // Menus
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'com-maquinas'),
        'categories' => __('Menu de Categorias de Peças', 'com-maquinas'),
        'footer' => __('Menu Rodapé', 'com-maquinas'),
    ));
}
add_action('after_setup_theme', 'com_maquinas_setup');

/**
 * Enqueue scripts and styles.
 */
function com_maquinas_scripts() {
    // Tailwind CSS Play CDN & Google Fonts
    wp_enqueue_style('com-maquinas-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap', array(), null);
    wp_enqueue_script('tailwindcss', 'https://cdn.tailwindcss.com', array(), null, false);
    
    // Lucide Icons
    wp_enqueue_script('lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, true);

    // Theme Main Stylesheet
    wp_enqueue_style('com-maquinas-style', get_stylesheet_uri(), array(), COM_MAQUINAS_VERSION);

    // Theme Custom JS (carrinho de cotação WhatsApp e filtros)
    wp_enqueue_script('com-maquinas-scripts', get_template_directory_uri() . '/assets/js/theme.js', array(), COM_MAQUINAS_VERSION, true);

    // Pass configuration to JS
    wp_localize_script('com-maquinas-scripts', 'comMaquinasConfig', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'whatsapp_number' => cm_get_config('whatsapp', '556536261010'),
        'phone_display' => cm_get_config('phone', '(65) 3626-1010'),
        'whatsapp_message' => cm_get_config('whatsapp_mensagem', 'Olá! Gostaria de um orçamento de peças na COMMAQ.'),
        'floating_active' => cm_get_config('whatsapp_flutuante_ativo', '1'),
    ));
}
add_action('wp_enqueue_scripts', 'com_maquinas_scripts');

/**
 * Helper function to retrieve configuration from CPT 'configuracao'
 * Falls back to Customizer or default value.
 */
function cm_get_config($key, $default = '') {
    static $cached_config = null;
    
    if ($cached_config === null) {
        $cached_config = array();
        $query = new WP_Query(array(
            'post_type'      => 'configuracao',
            'post_status'    => 'publish',
            'posts_per_page' => 1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ));

        if ($query->have_posts()) {
            $post_id = $query->posts[0]->ID;
            $meta = get_post_meta($post_id);
            foreach ($meta as $m_key => $m_val) {
                if (strpos($m_key, '_cm_') === 0) {
                    $clean_key = substr($m_key, 4);
                    $cached_config[$clean_key] = maybe_unserialize($m_val[0]);
                }
            }
        }
        wp_reset_postdata();
    }

    if (isset($cached_config[$key]) && $cached_config[$key] !== '') {
        return $cached_config[$key];
    }

    // Fallback to customizer or default
    return get_theme_mod('com_maquinas_' . $key, $default);
}

/**
 * Register Custom Post Types:
 * 1. Peças Pesadas (Catálogo)
 * 2. Configurações do Site (CPT para alterar telefones, WhatsApp e futuras opções)
 */
function com_maquinas_register_post_types() {
    // 1. CPT: Configurações do Site (Painel central de opções)
    $labels_config = array(
        'name'               => __('Configurações do Site', 'com-maquinas'),
        'singular_name'      => __('Configuração', 'com-maquinas'),
        'menu_name'          => __('Configurações CM', 'com-maquinas'),
        'name_admin_bar'     => __('Configurações CM', 'com-maquinas'),
        'add_new'            => __('Nova Configuração', 'com-maquinas'),
        'add_new_item'       => __('Adicionar Nova Opção de Configuração', 'com-maquinas'),
        'new_item'           => __('Nova Configuração', 'com-maquinas'),
        'edit_item'          => __('Editar Telefones e Opções do Site', 'com-maquinas'),
        'view_item'          => __('Ver Configuração', 'com-maquinas'),
        'all_items'          => __('Telefones & Configurações', 'com-maquinas'),
        'search_items'       => __('Buscar Configurações', 'com-maquinas'),
        'not_found'          => __('Nenhuma configuração encontrada.', 'com-maquinas'),
    );

    $args_config = array(
        'labels'             => $labels_config,
        'public'             => false,
        'publicly_queryable' => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => false,
        'rewrite'            => false,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 3,
        'menu_icon'          => 'dashicons-phone',
        'supports'           => array('title'),
        'show_in_rest'       => false,
    );
    register_post_type('configuracao', $args_config);

    // 2. CPT: Peças Pesadas (Produtos do Catálogo de Peças)
    $labels = array(
        'name'                  => __('Peças Pesadas', 'com-maquinas'),
        'singular_name'         => __('Peça', 'com-maquinas'),
        'menu_name'             => __('Catálogo de Peças', 'com-maquinas'),
        'name_admin_bar'        => __('Peça', 'com-maquinas'),
        'add_new'               => __('Adicionar Nova Peça', 'com-maquinas'),
        'add_new_item'          => __('Adicionar Nova Peça ao Estoque', 'com-maquinas'),
        'new_item'              => __('Nova Peça', 'com-maquinas'),
        'edit_item'             => __('Editar Informações da Peça', 'com-maquinas'),
        'view_item'             => __('Ver Peça no Site', 'com-maquinas'),
        'all_items'             => __('Todas as Peças', 'com-maquinas'),
        'search_items'          => __('Buscar Peça por Nome ou Código', 'com-maquinas'),
        'not_found'             => __('Nenhuma peça cadastrada no momento.', 'com-maquinas'),
        'not_found_in_trash'    => __('Nenhuma peça na lixeira.', 'com-maquinas'),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'pecas'),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-hammer',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'revisions'),
        'show_in_rest'       => true,
    );

    register_post_type('peca', $args);

    // Taxonomia: Categoria da Máquina / Peça (Inserir, Alterar e Excluir pelo Painel)
    $labels_cat = array(
        'name'              => __('Categorias de Peça', 'com-maquinas'),
        'singular_name'     => __('Categoria de Peça', 'com-maquinas'),
        'search_items'      => __('Buscar Categorias', 'com-maquinas'),
        'all_items'         => __('Todas as Categorias', 'com-maquinas'),
        'parent_item'       => __('Categoria Mãe', 'com-maquinas'),
        'parent_item_colon' => __('Categoria Mãe:', 'com-maquinas'),
        'edit_item'         => __('Editar Categoria de Peça', 'com-maquinas'),
        'update_item'       => __('Atualizar Categoria', 'com-maquinas'),
        'add_new_item'      => __('Adicionar Nova Categoria de Peça', 'com-maquinas'),
        'new_item_name'     => __('Novo Nome da Categoria', 'com-maquinas'),
        'menu_name'         => __('Categorias de Peça', 'com-maquinas'),
    );

    register_taxonomy('categoria_peca', 'peca', array(
        'labels'             => $labels_cat,
        'public'             => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_admin_column'  => true,
        'query_var'          => true,
        'rewrite'            => array('slug' => 'categoria-peca', 'hierarchical' => true),
        'hierarchical'       => true,
        'show_in_rest'       => true,
    ));

    // Taxonomia: Fabricante / Montadora (CAT, Komatsu, Volvo, Case...)
    $labels_montadora = array(
        'name'          => __('Montadoras & Marcas', 'com-maquinas'),
        'singular_name' => __('Montadora / Marca', 'com-maquinas'),
        'search_items'  => __('Buscar Marcas', 'com-maquinas'),
        'all_items'     => __('Todas as Marcas', 'com-maquinas'),
        'edit_item'     => __('Editar Marca', 'com-maquinas'),
        'update_item'   => __('Atualizar Marca', 'com-maquinas'),
        'add_new_item'  => __('Adicionar Nova Marca', 'com-maquinas'),
        'menu_name'     => __('Montadoras / Marcas', 'com-maquinas'),
    );

    register_taxonomy('montadora', 'peca', array(
        'labels'            => $labels_montadora,
        'public'            => true,
        'show_ui'           => true,
        'show_in_menu'      => true,
        'show_admin_column' => true,
        'rewrite'           => array('slug' => 'marca'),
        'hierarchical'      => true,
        'show_in_rest'      => true,
    ));

    // Taxonomia: Tipo de Equipamento (Escavadeira, Pá Carregadeira...)
    register_taxonomy('tipo_equipamento', 'peca', array(
        'label'             => __('Tipo de Equipamento', 'com-maquinas'),
        'rewrite'           => array('slug' => 'tipo-equipamento'),
        'hierarchical'      => true,
        'show_admin_column' => true,
        'show_in_rest'      => true,
    ));
}
add_action('init', 'com_maquinas_register_post_types');

/**
 * Customizer Options for Phone, WhatsApp & Address
 */
function com_maquinas_customize_register($wp_customize) {
    $wp_customize->add_section('com_maquinas_contact', array(
        'title'    => __('Com Máquinas: Contatos & WhatsApp', 'com-maquinas'),
        'priority' => 30,
    ));

    // WhatsApp
    $wp_customize->add_setting('com_maquinas_whatsapp', array(
        'default'           => '5565999884000',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('com_maquinas_whatsapp', array(
        'label'    => __('WhatsApp (com DDI e DDD, apenas números)', 'com-maquinas'),
        'section'  => 'com_maquinas_contact',
        'type'     => 'text',
    ));

    // Telefone Fixo
    $wp_customize->add_setting('com_maquinas_phone', array(
        'default'           => '(65) 3688-4000',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('com_maquinas_phone', array(
        'label'    => __('Telefone Fixo / PABX', 'com-maquinas'),
        'section'  => 'com_maquinas_contact',
        'type'     => 'text',
    ));

    // E-mail
    $wp_customize->add_setting('com_maquinas_email', array(
        'default'           => 'vendas@commaquinas.com.br',
        'sanitize_callback' => 'sanitize_email',
    ));
    $wp_customize->add_control('com_maquinas_email', array(
        'label'    => __('E-mail de Cotações', 'com-maquinas'),
        'section'  => 'com_maquinas_contact',
        'type'     => 'email',
    ));
}
add_action('customize_register', 'com_maquinas_customize_register');

/**
 * Meta Boxes para o CPT 'configuracao'
 * Permite alterar telefones, WhatsApp, horários e opções preparadas para expansão futura.
 */
function com_maquinas_add_config_metaboxes() {
    add_meta_box(
        'com_maquinas_config_box',
        __('Painel de Canais de Atendimento & Configurações da Empresa', 'com-maquinas'),
        'com_maquinas_render_config_metabox',
        'configuracao',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'com_maquinas_add_config_metaboxes');

function com_maquinas_render_config_metabox($post) {
    wp_nonce_field('com_maquinas_config_save', 'com_maquinas_config_nonce');

    // Recupera os valores salvos ou defaults
    $whatsapp         = get_post_meta($post->ID, '_cm_whatsapp', true) ?: '5565999884000';
    $phone            = get_post_meta($post->ID, '_cm_phone', true) ?: '(65) 3688-4000';
    $phone_secondary  = get_post_meta($post->ID, '_cm_phone_secondary', true) ?: '';
    $email            = get_post_meta($post->ID, '_cm_email', true) ?: 'vendas@commaquinas.com.br';
    $whatsapp_msg     = get_post_meta($post->ID, '_cm_whatsapp_mensagem', true) ?: 'Olá! Estou no site da Com Máquinas e gostaria de um orçamento de peças.';
    $floating_active  = get_post_meta($post->ID, '_cm_whatsapp_flutuante_ativo', true);
    if ($floating_active === '') $floating_active = '1';

    // Textos específicos do Header
    $header_horario   = get_post_meta($post->ID, '_cm_header_horario', true) ?: 'Seg a Sex: 07:30 às 18:00 | Sáb: 08:00 às 12:00';
    $header_telefone  = get_post_meta($post->ID, '_cm_header_telefone', true) ?: '(65) 3688-4000';
    $header_local     = get_post_meta($post->ID, '_cm_header_localizacao', true) ?: 'Cuiabá - MT & Distribuição Nacional';

    // Opções da Empresa & Expansões Futuras
    $horario          = get_post_meta($post->ID, '_cm_horario', true) ?: 'Seg a Sex: 07h30 às 18h00 | Sábados: 08h00 às 12h00';
    $endereco         = get_post_meta($post->ID, '_cm_endereco', true) ?: 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT';
    $alerta_topo      = get_post_meta($post->ID, '_cm_alerta_topo', true) ?: 'MÁQUINA PARADA? DESPACHAMOS PEÇAS HOJE MESMO PARA TODO O BRASIL VIA AÉREO E RODOVIÁRIO';
    $razao_social     = get_post_meta($post->ID, '_cm_razao_social', true) ?: 'COM CENTRO OESTE MÁQUINAS E MANUTENÇÕES LTDA';
    $cnpj             = get_post_meta($post->ID, '_cm_cnpj', true) ?: '12.345.678/0001-90';
    $inscricao_est    = get_post_meta($post->ID, '_cm_inscricao_estadual', true) ?: '';
    $link_catalogo    = get_post_meta($post->ID, '_cm_link_catalogo', true) ?: get_template_directory_uri() . '/assets/catalogo-commaquinas-2026.pdf';
    $catalogo_titulo  = get_post_meta($post->ID, '_cm_catalogo_titulo', true) ?: 'Catálogo Oficial de Peças & Máquinas COMMAQ 2026';
    $chave_pix        = get_post_meta($post->ID, '_cm_chave_pix', true) ?: '12.345.678/0001-90 (CNPJ)';
    $bancos_dados     = get_post_meta($post->ID, '_cm_bancos_dados', true) ?: 'Banco do Brasil e Bradesco (Conta Jurídica COMMAQ)';
    $link_instagram   = get_post_meta($post->ID, '_cm_link_instagram', true) ?: 'https://instagram.com/commaqmt/';
    $link_facebook    = get_post_meta($post->ID, '_cm_link_facebook', true) ?: 'https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr';
    $opcoes_extras    = get_post_meta($post->ID, '_cm_opcoes_extras', true) ?: '';
    ?>
    <style>
        .cm-config-section { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
        .cm-config-section:last-child { border-bottom: none; }
        .cm-config-title { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .cm-config-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .cm-config-field { margin-bottom: 12px; }
        .cm-config-field label { display: block; font-weight: 600; font-size: 12px; margin-bottom: 4px; color: #334155; }
        .cm-config-field input[type="text"],
        .cm-config-field input[type="email"],
        .cm-config-field select,
        .cm-config-field textarea { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 13px; box-sizing: border-box; }
        .cm-config-field input[type="text"]:focus,
        .cm-config-field textarea:focus { border-color: #f59e0b; outline: none; box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2); }
        .cm-config-desc { font-size: 11px; color: #64748b; margin-top: 4px; }
        .cm-badge-future { background: #fef3c7; color: #92400e; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
        .cm-badge-header { background: #e0f2fe; color: #0369a1; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
    </style>

    <div class="cm-config-container">

        <!-- SEÇÃO: TEXTOS DO HEADER -->
        <div class="cm-config-section" style="background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div class="cm-config-title">
                <span>🎯 Textos do Topo &amp; Cabeçalho (Header)</span>
                <span class="cm-badge-header">Personalização do Header</span>
            </div>

            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_header_horario">Texto de Horário no Header:</label>
                    <input type="text" id="cm_header_horario" name="cm_header_horario" value="<?php echo esc_attr($header_horario); ?>" placeholder="Seg a Sex: 07:30 às 18:00 | Sáb: 08:00 às 12:00" />
                    <p class="cm-config-desc">Exibido na barra superior do topo ao lado do ícone de relógio.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_header_telefone">Telefone Principal Exibido no Header:</label>
                    <input type="text" id="cm_header_telefone" name="cm_header_telefone" value="<?php echo esc_attr($header_telefone); ?>" placeholder="(65) 3688-4000" />
                    <p class="cm-config-desc">Telefone fixo/PABX clicável que aparece no canto direito do header.</p>
                </div>
            </div>

            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_header_localizacao">Texto de Localização / Base de Despacho:</label>
                    <input type="text" id="cm_header_localizacao" name="cm_header_localizacao" value="<?php echo esc_attr($header_local); ?>" placeholder="Cuiabá - MT &amp; Distribuição Nacional" />
                    <p class="cm-config-desc">Exibido na faixa superior com o ícone de localização.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_alerta_topo">Texto da Barra Superior de Urgência (Topo do Site):</label>
                    <input type="text" id="cm_alerta_topo" name="cm_alerta_topo" value="<?php echo esc_attr($alerta_topo); ?>" />
                    <p class="cm-config-desc">Faixa âmbar de despacho rápido exibida no topo de todas as páginas.</p>
                </div>
            </div>
        </div>
        
        <!-- SEÇÃO 1: TELEFONIA & WHATSAPP -->
        <div class="cm-config-section">
            <div class="cm-config-title">
                <span>📱 Telefonia Geral, WhatsApp e Canais Comerciais</span>
            </div>
            
            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_whatsapp">Número de WhatsApp Comercial (com DDD, somente números):</label>
                    <input type="text" id="cm_whatsapp" name="cm_whatsapp" value="<?php echo esc_attr($whatsapp); ?>" placeholder="Ex: 5565999884000" />
                    <p class="cm-config-desc">Este número recebe os carrinhos de cotação e o clique do botão flutuante. Use formato internacional: 55 + DDD + Número.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_phone">Telefone PABX Geral / Rodapé:</label>
                    <input type="text" id="cm_phone" name="cm_phone" value="<?php echo esc_attr($phone); ?>" placeholder="Ex: (65) 3688-4000" />
                    <p class="cm-config-desc">Exibido no rodapé e canais de televendas.</p>
                </div>
            </div>

            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_phone_secondary">Telefone Secundário / Plantão / 0800 (Opcional):</label>
                    <input type="text" id="cm_phone_secondary" name="cm_phone_secondary" value="<?php echo esc_attr($phone_secondary); ?>" placeholder="Ex: 0800 700 4000" />
                    <p class="cm-config-desc">Linha direta alternativa para clientes frotistas.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_email">E-mail Comercial / Cotações:</label>
                    <input type="email" id="cm_email" name="cm_email" value="<?php echo esc_attr($email); ?>" placeholder="vendas@commaquinas.com.br" />
                    <p class="cm-config-desc">E-mail para solicitações formais de cotação e faturamento.</p>
                </div>
            </div>

            <div class="cm-config-field">
                <label for="cm_whatsapp_mensagem">Mensagem Padrão de Abertura no WhatsApp:</label>
                <input type="text" id="cm_whatsapp_mensagem" name="cm_whatsapp_mensagem" value="<?php echo esc_attr($whatsapp_msg); ?>" />
                <p class="cm-config-desc">Texto pré-preenchido quando o visitante clica no botão flutuante de WhatsApp.</p>
            </div>

            <div class="cm-config-field" style="margin-top: 10px;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" name="cm_whatsapp_flutuante_ativo" value="1" <?php checked($floating_active, '1'); ?> />
                    <strong style="color: #0f172a;">Exibir Botão Flutuante de WhatsApp no Site</strong>
                </label>
                <p class="cm-config-desc">Quando marcado, o ícone lateral flutuante de WhatsApp permanece visível no canto inferior da tela.</p>
            </div>
        </div>

        <!-- SEÇÃO 2: EXPANSÃO FUTURA (PREPARADO PARA NOVAS OPÇÕES) -->
        <!-- SEÇÃO 2: INFORMAÇÕES DA EMPRESA & OPÇÕES PREPARADAS PARA O FUTURO -->
        <div class="cm-config-section">
            <div class="cm-config-title">
                <span>⚙️ Informações da Empresa &amp; Opções Preparadas para o Futuro</span>
                <span class="cm-badge-future">Pronto para Expansão</span>
            </div>

            <!-- Dados Cadastrais e Fiscais da Empresa -->
            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_razao_social">Razão Social / Nome Empresarial Oficial:</label>
                    <input type="text" id="cm_razao_social" name="cm_razao_social" value="<?php echo esc_attr($razao_social); ?>" placeholder="COM CENTRO OESTE MÁQUINAS E MANUTENÇÕES LTDA" />
                    <p class="cm-config-desc">Utilizado em rodapés, propostas e termos legais.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_cnpj">CNPJ da Empresa:</label>
                    <input type="text" id="cm_cnpj" name="cm_cnpj" value="<?php echo esc_attr($cnpj); ?>" placeholder="12.345.678/0001-90" />
                    <p class="cm-config-desc">Exibido no rodapé para transparência e faturamento direto com clientes PJ.</p>
                </div>
            </div>

            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_horario">Horário de Atendimento Completo (Rodapé):</label>
                    <input type="text" id="cm_horario" name="cm_horario" value="<?php echo esc_attr($horario); ?>" placeholder="Seg a Sex: 07h30 às 18h00 | Sábados: 08h00 às 12h00" />
                    <p class="cm-config-desc">Aparece no rodapé e nas seções institucionais.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_endereco">Endereço / Centro de Distribuição:</label>
                    <input type="text" id="cm_endereco" name="cm_endereco" value="<?php echo esc_attr($endereco); ?>" placeholder="Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT" />
                    <p class="cm-config-desc">Localização das bases de expedição e retirada de peças.</p>
                </div>
            </div>

            <!-- Catálogo em PDF e Download -->
            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_link_catalogo">Link / URL para Download do Catálogo PDF:</label>
                    <input type="text" id="cm_link_catalogo" name="cm_link_catalogo" value="<?php echo esc_attr($link_catalogo); ?>" placeholder="https://seusite.com/downloads/catalogo-2026.pdf" />
                    <p class="cm-config-desc">URL que será aberta quando o usuário clicar no botão "Baixar Catálogo PDF" do site.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_catalogo_titulo">Título de Exibição do Catálogo PDF:</label>
                    <input type="text" id="cm_catalogo_titulo" name="cm_catalogo_titulo" value="<?php echo esc_attr($catalogo_titulo); ?>" placeholder="Catálogo Oficial de Peças &amp; Máquinas COMMAQ 2026" />
                    <p class="cm-config-desc">Título exibido em botões e tooltips.</p>
                </div>
            </div>

            <!-- Dados Financeiros & Contas Bancárias (Sem imagens no rodapé) -->
            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_chave_pix">Chave PIX Oficial da Empresa:</label>
                    <input type="text" id="cm_chave_pix" name="cm_chave_pix" value="<?php echo esc_attr($chave_pix); ?>" placeholder="12.345.678/0001-90 (CNPJ) ou pix@commaquinas.com.br" />
                    <p class="cm-config-desc">Facilita transferências instantâneas para despacho no mesmo dia.</p>
                </div>

                <div class="cm-config-field">
                    <label for="cm_bancos_dados">Contas Bancárias Autorizadas (BB / Bradesco):</label>
                    <input type="text" id="cm_bancos_dados" name="cm_bancos_dados" value="<?php echo esc_attr($bancos_dados); ?>" placeholder="Banco do Brasil e Bradesco (Conta Jurídica COMMAQ)" />
                    <p class="cm-config-desc">Bancos aceitos para transferência e TED.</p>
                </div>
            </div>

            <!-- Redes Sociais -->
            <div class="cm-config-grid">
                <div class="cm-config-field">
                    <label for="cm_link_instagram">Link Instagram Oficial:</label>
                    <input type="text" id="cm_link_instagram" name="cm_link_instagram" value="<?php echo esc_attr($link_instagram); ?>" placeholder="https://instagram.com/commaqmt/" />
                </div>

                <div class="cm-config-field">
                    <label for="cm_link_facebook">Link Página Facebook:</label>
                    <input type="text" id="cm_link_facebook" name="cm_link_facebook" value="<?php echo esc_attr($link_facebook); ?>" placeholder="https://facebook.com/..." />
                </div>
            </div>

            <div class="cm-config-field">
                <label for="cm_opcoes_extras">Configurações &amp; Parâmetros Extras (Extensível para Opções Futuras):</label>
                <textarea id="cm_opcoes_extras" name="cm_opcoes_extras" rows="3" placeholder="Insira parâmetros extras no formato chave=valor ou anotações técnicas para futuras integrações"><?php echo esc_textarea($opcoes_extras); ?></textarea>
                <p class="cm-config-desc">Este campo aberto permite que desenvolvedores ou a equipe adicionem parâmetros customizados sem alterar o código do tema.</p>
            </div>

        </div>

    </div>
    <?php
}

/**
 * Salvar Meta Dados do CPT 'configuracao'
 */
function com_maquinas_save_config_meta($post_id) {
    if (!isset($_POST['com_maquinas_config_nonce']) || !wp_verify_nonce($_POST['com_maquinas_config_nonce'], 'com_maquinas_config_save')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    // Sanitizar e salvar campos
    $fields = array(
        'cm_header_horario'    => 'sanitize_text_field',
        'cm_header_telefone'   => 'sanitize_text_field',
        'cm_header_localizacao'=> 'sanitize_text_field',
        'cm_whatsapp'          => 'sanitize_text_field',
        'cm_phone'             => 'sanitize_text_field',
        'cm_phone_secondary'   => 'sanitize_text_field',
        'cm_email'             => 'sanitize_email',
        'cm_whatsapp_mensagem' => 'sanitize_text_field',
        'cm_horario'           => 'sanitize_text_field',
        'cm_endereco'          => 'sanitize_text_field',
        'cm_alerta_topo'       => 'sanitize_text_field',
        'cm_razao_social'      => 'sanitize_text_field',
        'cm_cnpj'              => 'sanitize_text_field',
        'cm_inscricao_estadual'=> 'sanitize_text_field',
        'cm_link_catalogo'     => 'esc_url_raw',
        'cm_catalogo_titulo'   => 'sanitize_text_field',
        'cm_chave_pix'         => 'sanitize_text_field',
        'cm_bancos_dados'      => 'sanitize_text_field',
        'cm_link_instagram'    => 'esc_url_raw',
        'cm_link_facebook'     => 'esc_url_raw',
        'cm_opcoes_extras'     => 'sanitize_textarea_field',
    );

    foreach ($fields as $field_key => $sanitize_fn) {
        if (isset($_POST[$field_key])) {
            $val = call_user_func($sanitize_fn, $_POST[$field_key]);
            update_post_meta($post_id, '_' . $field_key, $val);
        }
    }

    // Checkbox do botão flutuante
    $floating_val = isset($_POST['cm_whatsapp_flutuante_ativo']) ? '1' : '0';
    update_post_meta($post_id, '_cm_whatsapp_flutuante_ativo', $floating_val);
}
add_action('save_post_configuracao', 'com_maquinas_save_config_meta');

/**
 * Meta Boxes para o CPT 'peca' (Produtos do Catálogo de Peças)
 * Contém campos padrões de peças pesadas e área preparada para campos futuros.
 */
function com_maquinas_add_peca_metaboxes() {
    add_meta_box(
        'com_maquinas_peca_details',
        __('Especificações da Peça / Produto (Dados do Catálogo)', 'com-maquinas'),
        'com_maquinas_render_peca_metabox',
        'peca',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'com_maquinas_add_peca_metaboxes');

function com_maquinas_render_peca_metabox($post) {
    wp_nonce_field('com_maquinas_peca_save', 'com_maquinas_peca_nonce');

    $part_number        = get_post_meta($post->ID, '_cm_part_number', true);
    $fabricante         = get_post_meta($post->ID, '_cm_fabricante', true);
    $modelos_aplicacao  = get_post_meta($post->ID, '_cm_modelos_aplicacao', true);
    $status_estoque     = get_post_meta($post->ID, '_cm_status_estoque', true) ?: 'pronta_entrega';
    $preco              = get_post_meta($post->ID, '_cm_preco', true);
    $sob_consulta       = get_post_meta($post->ID, '_cm_sob_consulta', true);
    if ($sob_consulta === '') $sob_consulta = '1'; // Default: sob consulta
    $condicao           = get_post_meta($post->ID, '_cm_condicao', true) ?: 'nova_genuina';
    $garantia           = get_post_meta($post->ID, '_cm_garantia', true) ?: '12 meses contra defeito de fabricação';
    $dimensoes_peso     = get_post_meta($post->ID, '_cm_dimensoes_peso', true);
    $campos_futuros     = get_post_meta($post->ID, '_cm_campos_personalizados_futuros', true);
    $image_url          = get_post_meta($post->ID, '_cm_image_url', true);
    $destaque           = get_post_meta($post->ID, '_cm_destaque', true);
    ?>
    <style>
        .cm-prod-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .cm-prod-field label { display: block; font-weight: 600; font-size: 12px; margin-bottom: 4px; color: #1e293b; }
        .cm-prod-field input[type="text"],
        .cm-prod-field select,
        .cm-prod-field textarea { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 13px; box-sizing: border-box; }
        .cm-prod-field input:focus, .cm-prod-field select:focus, .cm-prod-field textarea:focus { border-color: #f59e0b; outline: none; box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2); }
        .cm-prod-desc { font-size: 11px; color: #64748b; margin-top: 3px; }
        .cm-future-box { background: #fffbeb; border: 1px dashed #f59e0b; border-radius: 8px; padding: 14px; margin-top: 18px; }
        .cm-photo-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 16px; }
    </style>

    <div class="cm-prod-container">

        <!-- GESTÃO DE FOTOS EXCLUSIVA PELO ADMINISTRADOR DO WORDPRESS -->
        <div class="cm-photo-box">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <strong style="color: #0f172a; font-size: 13px; display: flex; align-items: center; gap: 6px;">
                    <span class="dashicons dashicons-camera" style="color: #d97706;"></span>
                    Fotos do Produto (Gerenciamento Exclusivo pelo Administrador)
                </strong>
                <span style="background: #e2e8f0; color: #334155; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">Acesso Administrativo</span>
            </div>
            <p style="font-size: 12px; color: #475569; margin: 0 0 10px; line-height: 1.5;">
                O cadastro e alteração de fotos é restrito a administradores. Você pode definir a foto deste produto de duas formas:<br>
                1. <strong>Upload nativo:</strong> Utilize o quadro <em>"Imagem destacada"</em> na barra lateral direita do WordPress para subir fotos do seu computador.<br>
                2. <strong>Link direto de imagem:</strong> Ou insira a URL direta da foto no campo abaixo (caso use links de CDN ou fotos externas):
            </p>
            <div class="cm-prod-field" style="margin-bottom: 10px;">
                <label for="cm_image_url"><strong>URL Direta da Foto do Produto:</strong></label>
                <input type="text" id="cm_image_url" name="cm_image_url" value="<?php echo esc_attr($image_url); ?>" placeholder="https://exemplo.com/fotos/peca-123.jpg" />
                <p class="cm-prod-desc">Caso preenchido, o site usará esta imagem para exibição nos cards e catálogo.</p>
            </div>
            <div style="padding-top: 6px; border-top: 1px dashed #cbd5e1;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 600; color: #0f172a;">
                    <input type="checkbox" name="cm_destaque" value="1" <?php checked($destaque, '1'); ?> />
                    <span>⭐ Exibir este produto na seção de <strong>Produtos Principais / Destaques da Home</strong></span>
                </label>
            </div>
        </div>

        <div class="cm-prod-grid">
            <div class="cm-prod-field">
                <label for="cm_part_number"><strong>Código Part Number (PN) Original:</strong></label>
                <input type="text" id="cm_part_number" name="cm_part_number" value="<?php echo esc_attr($part_number); ?>" placeholder="Ex: 1R-0716, 9W8452, 20Y-30-00011" />
                <p class="cm-prod-desc">Código técnico crucial para busca rápida e cotação direta.</p>
            </div>

            <div class="cm-prod-field">
                <label for="cm_fabricante"><strong>Montadora / Marca da Peça:</strong></label>
                <input type="text" id="cm_fabricante" name="cm_fabricante" value="<?php echo esc_attr($fabricante); ?>" placeholder="Ex: Caterpillar, Komatsu, Volvo, Case, Cummins, Berco" />
                <p class="cm-prod-desc">Fabricante ou montadora original compatível.</p>
            </div>
        </div>

        <div class="cm-prod-field" style="margin-bottom: 14px;">
            <label for="cm_modelos_aplicacao"><strong>Modelos Compatíveis / Aplicação Técnica:</strong></label>
            <input type="text" id="cm_modelos_aplicacao" name="cm_modelos_aplicacao" value="<?php echo esc_attr($modelos_aplicacao); ?>" placeholder="Ex: Escavadeiras CAT 320D, 320DL, 320E | Trator D6N | Carregadeira 924K" />
            <p class="cm-prod-desc">Liste as máquinas e frotas onde esta peça se aplica.</p>
        </div>

        <div class="cm-prod-grid">
            <div class="cm-prod-field">
                <label for="cm_status_estoque"><strong>Disponibilidade em Estoque:</strong></label>
                <select id="cm_status_estoque" name="cm_status_estoque">
                    <option value="pronta_entrega" <?php selected($status_estoque, 'pronta_entrega'); ?>>⚡ Pronta Entrega (Despacho Imediato)</option>
                    <option value="estoque" <?php selected($status_estoque, 'estoque'); ?>>✅ Em Estoque</option>
                    <option value="encomenda" <?php selected($status_estoque, 'encomenda'); ?>>⏳ Sob Encomenda (24h a 48h)</option>
                </select>
                <p class="cm-prod-desc">Exibe selos de urgência no catálogo.</p>
            </div>

            <div class="cm-prod-field">
                <label for="cm_condicao"><strong>Condição da Peça:</strong></label>
                <select id="cm_condicao" name="cm_condicao">
                    <option value="nova_genuina" <?php selected($condicao, 'nova_genuina'); ?>>Nova Genuína de Fábrica</option>
                    <option value="oem" <?php selected($condicao, 'oem'); ?>>Linha OEM Certificada</option>
                    <option value="importada" <?php selected($condicao, 'importada'); ?>>Importada Heavy Duty</option>
                    <option value="recondicionada" <?php selected($condicao, 'recondicionada'); ?>>Recondicionada / Reman com Garantia</option>
                </select>
            </div>
        </div>

        <div class="cm-prod-grid">
            <div class="cm-prod-field">
                <label for="cm_preco"><strong>Preço Indicativo (R$) (Opcional):</strong></label>
                <input type="text" id="cm_preco" name="cm_preco" value="<?php echo esc_attr($preco); ?>" placeholder="Ex: 850,00 (deixe em branco se for sob consulta)" />
                <p class="cm-prod-desc">Se preenchido, exibe o valor em reais.</p>
            </div>

            <div class="cm-prod-field" style="padding-top: 24px;">
                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <input type="checkbox" name="cm_sob_consulta" value="1" <?php checked($sob_consulta, '1'); ?> />
                    <strong>Exibir como "Sob Consulta / Cotação WhatsApp"</strong>
                </label>
                <p class="cm-prod-desc">Recomendado para peças com variação frequente de lote.</p>
            </div>
        </div>

        <div class="cm-prod-grid">
            <div class="cm-prod-field">
                <label for="cm_garantia"><strong>Garantia do Produto:</strong></label>
                <input type="text" id="cm_garantia" name="cm_garantia" value="<?php echo esc_attr($garantia); ?>" placeholder="Ex: 6 meses, 12 meses contra defeito de fabricação" />
            </div>

            <div class="cm-prod-field">
                <label for="cm_dimensoes_peso"><strong>Peso &amp; Dimensões de Despacho:</strong></label>
                <input type="text" id="cm_dimensoes_peso" name="cm_dimensoes_peso" value="<?php echo esc_attr($dimensoes_peso); ?>" placeholder="Ex: 14.8 kg | 45 x 30 x 20 cm" />
                <p class="cm-prod-desc">Útil para cotar frete aéreo expresso ou rodoviário.</p>
            </div>
        </div>

        <!-- ÁREA PREPARADA PARA CAMPOS FUTUROS SOLICITADOS -->
        <div class="cm-future-box">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <strong style="color: #92400e; font-size: 13px;">🚀 Campos Extras &amp; Estrutura Preparada para Atualização Futura</strong>
                <span class="cm-badge-future">Campos Dinâmicos</span>
            </div>
            <p style="font-size: 11px; color: #78350f; margin-bottom: 10px; line-height: 1.4;">
                Conforme solicitado, esta área está pronta para receber os novos campos que você desejar inserir futuramente (ex: <em>Número de Dentes, Pressão de Trabalho, Vazão em L/min, Diâmetro Interno, Voltagem, Material</em>). Insira no formato <code>Nome do Campo: Valor</code> (um por linha):
            </p>
            <div class="cm-prod-field">
                <textarea id="cm_campos_personalizados_futuros" name="cm_campos_personalizados_futuros" rows="4" placeholder="Exemplo:
Pressão Máxima: 350 Bar
Vazão Nominal: 120 L/min
Diâmetro do Eixo: 45 mm
Material: Aço Cromo-Níquel Forjado"><?php echo esc_textarea($campos_futuros); ?></textarea>
                <p class="cm-prod-desc">Cada linha inserida aqui é convertida em especificação técnica do produto automaticamente.</p>
            </div>
        </div>
    </div>
    <?php
}

/**
 * Salvar Meta Dados do CPT 'peca'
 */
function com_maquinas_save_peca_meta($post_id) {
    if (!isset($_POST['com_maquinas_peca_nonce']) || !wp_verify_nonce($_POST['com_maquinas_peca_nonce'], 'com_maquinas_peca_save')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = array(
        'cm_part_number'                   => 'sanitize_text_field',
        'cm_fabricante'                    => 'sanitize_text_field',
        'cm_modelos_aplicacao'             => 'sanitize_text_field',
        'cm_status_estoque'                => 'sanitize_text_field',
        'cm_preco'                         => 'sanitize_text_field',
        'cm_condicao'                      => 'sanitize_text_field',
        'cm_garantia'                      => 'sanitize_text_field',
        'cm_dimensoes_peso'                => 'sanitize_text_field',
        'cm_campos_personalizados_futuros' => 'sanitize_textarea_field',
        'cm_image_url'                     => 'esc_url_raw',
    );

    foreach ($fields as $field_key => $sanitize_fn) {
        if (isset($_POST[$field_key])) {
            $val = call_user_func($sanitize_fn, $_POST[$field_key]);
            update_post_meta($post_id, '_' . $field_key, $val);
        }
    }

    $sob_consulta_val = isset($_POST['cm_sob_consulta']) ? '1' : '0';
    update_post_meta($post_id, '_cm_sob_consulta', $sob_consulta_val);

    $destaque_val = isset($_POST['cm_destaque']) ? '1' : '0';
    update_post_meta($post_id, '_cm_destaque', $destaque_val);
}
add_action('save_post_peca', 'com_maquinas_save_peca_meta');

/**
 * Colunas Personalizadas na Listagem de Peças (Produtos) no Painel do WordPress
 */
function com_maquinas_peca_columns($columns) {
    $new_cols = array();
    $new_cols['cb'] = $columns['cb'];
    $new_cols['cm_thumb'] = __('Foto', 'com-maquinas');
    $new_cols['title'] = __('Nome da Peça', 'com-maquinas');
    $new_cols['cm_pn'] = __('Part Number', 'com-maquinas');
    $new_cols['cm_cat'] = __('Categoria', 'com-maquinas');
    $new_cols['cm_brand'] = __('Marca / Montadora', 'com-maquinas');
    $new_cols['cm_stock'] = __('Disponibilidade', 'com-maquinas');
    $new_cols['cm_price'] = __('Preço / Cotação', 'com-maquinas');
    $new_cols['date'] = $columns['date'];
    return $new_cols;
}
add_filter('manage_peca_posts_columns', 'com_maquinas_peca_columns');

function com_maquinas_peca_custom_column($column, $post_id) {
    switch ($column) {
        case 'cm_thumb':
            $custom_img = get_post_meta($post_id, '_cm_image_url', true);
            if (has_post_thumbnail($post_id)) {
                echo get_the_post_thumbnail($post_id, array(45, 45), array('style' => 'border-radius:6px; object-fit:cover; border:1px solid #cbd5e1;'));
            } elseif (!empty($custom_img)) {
                echo '<img src="' . esc_url($custom_img) . '" style="width:45px; height:45px; border-radius:6px; object-fit:cover; border:1px solid #cbd5e1;" />';
            } else {
                echo '<span style="display:inline-block; width:45px; height:45px; background:#f1f5f9; border-radius:6px; line-height:45px; text-align:center; font-size:10px; color:#94a3b8; border:1px solid #e2e8f0;">Sem Foto</span>';
            }
            break;
        case 'cm_pn':
            $pn = get_post_meta($post_id, '_cm_part_number', true);
            echo $pn ? '<code><strong>' . esc_html($pn) . '</strong></code>' : '—';
            break;
        case 'cm_cat':
            $terms = get_the_term_list($post_id, 'categoria_peca', '', ', ', '');
            echo $terms ? $terms : '—';
            break;
        case 'cm_brand':
            $brand = get_post_meta($post_id, '_cm_fabricante', true);
            echo $brand ? esc_html($brand) : '—';
            break;
        case 'cm_stock':
            $stock = get_post_meta($post_id, '_cm_status_estoque', true);
            if ($stock === 'pronta_entrega') {
                echo '<span style="color:#15803d; font-weight:700;">⚡ Pronta Entrega</span>';
            } elseif ($stock === 'estoque') {
                echo '<span style="color:#0369a1; font-weight:600;">✅ Em Estoque</span>';
            } else {
                echo '<span style="color:#b45309; font-weight:600;">⏳ Sob Encomenda</span>';
            }
            break;
        case 'cm_price':
            $sob_consulta = get_post_meta($post_id, '_cm_sob_consulta', true);
            $preco = get_post_meta($post_id, '_cm_preco', true);
            if ($preco && $sob_consulta !== '1') {
                echo '<strong>R$ ' . esc_html($preco) . '</strong>';
            } else {
                echo '<span style="color:#b45309; font-weight:600;">Sob Consulta</span>';
            }
            break;
    }
}
add_action('manage_peca_posts_custom_column', 'com_maquinas_peca_custom_column', 10, 2);

/**
 * Criação Automática do Registro Inicial de Configuração no WordPress
 * Garante que o usuário já encontre uma configuração padrão pronta para editar.
 */
function com_maquinas_seed_default_config() {
    $existing = get_posts(array(
        'post_type'   => 'configuracao',
        'post_status' => 'any',
        'numberposts' => 1,
    ));

    if (empty($existing)) {
        $post_id = wp_insert_post(array(
            'post_title'  => 'Configurações Principais - Com Máquinas',
            'post_type'   => 'configuracao',
            'post_status' => 'publish',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            // Textos do Topo & Header
            update_post_meta($post_id, '_cm_header_horario', 'Seg-Sex 7:30 às 18:00h');
            update_post_meta($post_id, '_cm_header_telefone', '(65) 3626-1010');
            update_post_meta($post_id, '_cm_header_localizacao', 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT');

            // Telefonia & WhatsApp
            update_post_meta($post_id, '_cm_whatsapp', '556536261010');
            update_post_meta($post_id, '_cm_phone', '(65) 3626-1010');
            update_post_meta($post_id, '_cm_email', 'vendas@commaquinas.com.br');
            update_post_meta($post_id, '_cm_whatsapp_mensagem', 'Olá! Estou no site da COMMAQ e gostaria de um orçamento de peças.');
            update_post_meta($post_id, '_cm_whatsapp_flutuante_ativo', '1');
            
            // Informações da Empresa & Catálogo PDF
            update_post_meta($post_id, '_cm_horario', 'Seg-Sex 7:30 às 18:00h');
            update_post_meta($post_id, '_cm_endereco', 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT');
            update_post_meta($post_id, '_cm_alerta_topo', 'MÁQUINA PARADA? DESPACHAMOS PEÇAS HOJE MESMO PARA TODO O BRASIL VIA AÉREO E RODOVIÁRIO');
            update_post_meta($post_id, '_cm_razao_social', 'COM CENTRO OESTE MÁQUINAS E MANUTENÇÕES LTDA');
            update_post_meta($post_id, '_cm_cnpj', '12.345.678/0001-90');
            update_post_meta($post_id, '_cm_link_catalogo', get_template_directory_uri() . '/assets/catalogo-commaquinas-2026.pdf');
            update_post_meta($post_id, '_cm_catalogo_titulo', 'Catálogo de Peças & Máquinas COMMAQ 2026');
            update_post_meta($post_id, '_cm_chave_pix', '12.345.678/0001-90 (CNPJ)');
            update_post_meta($post_id, '_cm_bancos_dados', 'Banco do Brasil e Bradesco (Conta Jurídica COMMAQ)');
            update_post_meta($post_id, '_cm_link_instagram', 'https://instagram.com/commaqmt/');
            update_post_meta($post_id, '_cm_link_facebook', 'https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr');
        }
    }
}
add_action('init', 'com_maquinas_seed_default_config');

/**
 * Criação Automática de Categorias Iniciais de Peças
 * Permite que o usuário insira, altere ou exclua livremente pelo painel em 'Catálogo de Peças > Categorias de Peça'.
 */
function com_maquinas_seed_default_categories() {
    if (!taxonomy_exists('categoria_peca')) {
        return;
    }

    $default_categories = array(
        'PÁS CARREGADEIRAS' => 'Pás carregadeiras pesadas articuladas e telescópicas COMMAQ com motorização Deutz e Cummins.',
        'EMPILHADEIRAS' => 'Empilhadeiras industriais a combustão Diesel e GLP COMMAQ com torres de 4,7m e 6,0m e transmissão TCM.',
        'VENDA DE MAQUINAS' => 'Venda de escavadeiras, pás carregadeiras, motoniveladoras e tratores seminovos revisados com garantia.',
        'PEÇAS' => 'Peças de reposição originais e OEM para linha amarela pesada multimarcas.',
        'LOCAÇÃO' => 'Locação mensal e por safra de equipamentos pesados com suporte de manutenção preventiva.',
        'CHANGLIN' => 'Peças para carregadeiras e motoniveladoras Changlin: transmissão, filtros, pinos e buchas.',
        'EMPILHADEIRAS CLARCK' => 'Peças para empilhadeiras Clark: filtros, torres, garfos, bombas hidráulicas e freios.',
        'LOCACAO' => 'Locação de maquinário pesado para terraplenagem, mineração, agronegócio e obras civis.',
        'EMPILHADEIRAS HANGCHA' => 'Linha completa de peças para empilhadeiras Hangcha Série XF e A.',
        'USO E CONSUMO' => 'Graxas EP-2 especiais, aditivos, ferramentas, EPIs e materiais de manutenção contínua.',
        'PEÇAS PA CARREGADEIRA HYUNDAI' => 'Peças para pás carregadeiras Hyundai HL740, HL757, HL760 e HL960.',
        'PEÇAS EMPILHADEIRAS HELI' => 'Componentes originais para empilhadeiras Heli H2000, CPCD25, CPCD30 e Série G.',
        'PEÇA PA CARREGADEIRAS THIAGONG' => 'Peças de reposição para pás carregadeiras Tiangong / Thiagong.',
        'PEÇA PÁ CARREGADEIRAS DEGONG' => 'Linha de reposição para carregadeiras Degong: transmissão, dentes e sistemas hidráulicos.',
        'PEÇA PA CARREGADEIRAS LIU GONG' => 'Peças para pás carregadeiras LiuGong CLG835, CLG856 e escavadeiras.',
        'MOTONIVELADORA XCMG' => 'Peças para motoniveladoras XCMG GR180, GR215: lâminas, círculos de giro e tandem.',
        'PEÇAS PA CARREGADEIRAS SEM' => 'Peças para pás carregadeiras SEM 636, 655, 656D e 660.',
        'PEÇAS PA CARREGADEIRAS XGMA' => 'Peças para pás carregadeiras XGMA XG932, XG951, XG958: eixos, bombas e cilindros.',
        'PEÇA PÁ CARREGADEIRAS YUTONG' => 'Componentes para carregadeiras pesadas Yutong: pinos, buchas e filtros.',
        'PÁ CARREGADEIRAS CASE' => 'Peças genuínas e OEM para carregadeiras Case W20E, 621D, 721E, 821E.',
        'PÁ CARREGADEIRA NEW HOLLAND' => 'Peças para pás carregadeiras New Holland W130, W170, W190: transmissões e freios.',
        'PÁ CARREGADEIRA SDLG' => 'Linha completa para carregadeiras SDLG LG936L, LG938L, LG956L, LG958L e Série F.',
        'PEÇAS PÁ CARREGADEIRA SHANTUI' => 'Peças para pás carregadeiras e tratores Shantui SL30W, SL50W, SD16, SD22.',
        'PÁ CARREGADEIRA JHON DEERE' => 'Peças para pás carregadeiras John Deere 524K, 544K, 624K, 644K e 724K.',
        'PEÇAS PÁ CARREGADEIRA SINOMACH' => 'Peças e componentes para carregadeiras Sinomach 957H e 956.',
        'PÁ CARREGADEIRA TITAN' => 'Peças de reposição para pás carregadeiras Titan LG938 e modelos afins.',
        'EMPILHADEIRAS HYUNDAI' => 'Peças para empilhadeiras Hyundai 25L, 30L, 25D, 30D a diesel e GLP.'
    );

    foreach ($default_categories as $cat_name => $cat_desc) {
        if (!term_exists($cat_name, 'categoria_peca')) {
            wp_insert_term($cat_name, 'categoria_peca', array(
                'description' => $cat_desc,
                'slug'        => sanitize_title($cat_name),
            ));
        }
    }
}
add_action('init', 'com_maquinas_seed_default_categories', 20);

/**
 * Painel Administrativo Central no WordPress Admin
 * Cria um menu dedicado no wp-admin com atalhos diretos para gerenciar
 * as Configurações do Site (CPT) e o Catálogo de Peças (CPT).
 */
function com_maquinas_register_admin_menu() {
    add_menu_page(
        __('Com Máquinas - Tema', 'com-maquinas'),
        __('Com Máquinas', 'com-maquinas'),
        'manage_options',
        'com-maquinas-dashboard',
        'com_maquinas_render_admin_dashboard',
        'dashicons-hammer',
        3
    );

    add_submenu_page(
        'com-maquinas-dashboard',
        __('Painel Geral & Guia', 'com-maquinas'),
        __('Painel Geral', 'com-maquinas'),
        'manage_options',
        'com-maquinas-dashboard',
        'com_maquinas_render_admin_dashboard'
    );

    add_submenu_page(
        'com-maquinas-dashboard',
        __('Configurações do Site (CPT)', 'com-maquinas'),
        __('Configurações (CPT)', 'com-maquinas'),
        'manage_options',
        'edit.php?post_type=configuracao'
    );

    add_submenu_page(
        'com-maquinas-dashboard',
        __('Catálogo de Peças (CPT)', 'com-maquinas'),
        __('Catálogo de Peças (CPT)', 'com-maquinas'),
        'manage_options',
        'edit.php?post_type=peca'
    );

    add_submenu_page(
        'com-maquinas-dashboard',
        __('Categorias de Peças', 'com-maquinas'),
        __('Categorias de Peça', 'com-maquinas'),
        'manage_options',
        'edit-tags.php?taxonomy=categoria_peca&post_type=peca'
    );

    add_submenu_page(
        'com-maquinas-dashboard',
        __('Marcas / Montadoras', 'com-maquinas'),
        __('Marcas / Montadoras', 'com-maquinas'),
        'manage_options',
        'edit-tags.php?taxonomy=montadora&post_type=peca'
    );
}
add_action('admin_menu', 'com_maquinas_register_admin_menu');

/**
 * Renderiza o Painel Geral no WordPress Admin com cartões rápidos
 */
function com_maquinas_render_admin_dashboard() {
    $config_posts = get_posts(array(
        'post_type'      => 'configuracao',
        'posts_per_page' => 1,
        'post_status'    => 'publish',
    ));
    $config_edit_link = !empty($config_posts) 
        ? admin_url('post.php?post=' . $config_posts[0]->ID . '&action=edit')
        : admin_url('edit.php?post_type=configuracao');

    $total_pecas = wp_count_posts('peca')->publish;
    $total_categorias = wp_count_terms(array('taxonomy' => 'categoria_peca', 'hide_empty' => false));
    $total_marcas = wp_count_terms(array('taxonomy' => 'montadora', 'hide_empty' => false));
    ?>
    <div class="wrap" style="max-width: 1100px; margin-top: 20px;">
        <div style="background: #0f172a; color: #fff; padding: 28px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                <div>
                    <span style="background: #f59e0b; color: #000; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Painel Administrativo Nativo</span>
                    <h1 style="color: #fff; margin: 10px 0 6px; font-size: 24px; font-weight: 800;">Tema Com Máquinas - Gestão via WordPress</h1>
                    <p style="color: #94a3b8; margin: 0; font-size: 14px;">Todas as configurações, telefones, WhatsApp, categorias e produtos são gerenciados exclusivamente aqui no wp-admin, sem necessidade de editar código no frontend.</p>
                </div>
                <a href="<?php echo esc_url(home_url('/')); ?>" target="_blank" class="button button-primary" style="background: #f59e0b; border-color: #d97706; color: #000; font-weight: 700; height: 38px; line-height: 36px; padding: 0 16px;">
                    Ver Site Aberto &rarr;
                </a>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 24px;">
            <!-- Cartão 1: Configurações do Site (CPT) -->
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                    <span class="dashicons dashicons-phone" style="font-size: 24px; width: 24px; height: 24px; color: #d97706;"></span>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a;">Configurações do Site (CPT)</h3>
                </div>
                <p style="color: #475569; font-size: 13px; line-height: 1.5; margin-bottom: 16px;">
                    Altere os telefones de contato, WhatsApp de cotações, textos do cabeçalho, botão flutuante, horários de atendimento e centro de distribuição.
                </p>
                <a href="<?php echo esc_url($config_edit_link); ?>" class="button button-primary" style="background: #0f172a; border-color: #0f172a; font-weight: 600;">
                    Editar Configurações & Contatos &rarr;
                </a>
            </div>

            <!-- Cartão 2: Catálogo de Peças (CPT) -->
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                    <span class="dashicons dashicons-products" style="font-size: 24px; width: 24px; height: 24px; color: #2563eb;"></span>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a;">Catálogo de Peças (CPT)</h3>
                </div>
                <p style="color: #475569; font-size: 13px; line-height: 1.5; margin-bottom: 16px;">
                    Total de <strong><?php echo intval($total_pecas); ?> peças</strong> cadastradas. Cadastre Part Number, montadoras compatíveis, modelos de aplicação, preços e fotos técnicas.
                </p>
                <div style="display: flex; gap: 8px;">
                    <a href="<?php echo admin_url('edit.php?post_type=peca'); ?>" class="button button-secondary" style="font-weight: 600;">
                        Todas as Peças
                    </a>
                    <a href="<?php echo admin_url('post-new.php?post_type=peca'); ?>" class="button button-primary" style="background: #2563eb; border-color: #1d4ed8; font-weight: 600;">
                        + Nova Peça
                    </a>
                </div>
            </div>

            <!-- Cartão 3: Categorias e Marcas -->
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                    <span class="dashicons dashicons-category" style="font-size: 24px; width: 24px; height: 24px; color: #059669;"></span>
                    <h3 style="margin: 0; font-size: 16px; font-weight: 700; color: #0f172a;">Categorias & Taxonomias</h3>
                </div>
                <p style="color: #475569; font-size: 13px; line-height: 1.5; margin-bottom: 16px;">
                    <strong><?php echo intval($total_categorias); ?> categorias</strong> e <strong><?php echo intval($total_marcas); ?> marcas/montadoras</strong> prontas. Insira novas ou edite os nomes dos departamentos.
                </p>
                <div style="display: flex; gap: 8px;">
                    <a href="<?php echo admin_url('edit-tags.php?taxonomy=categoria_peca&post_type=peca'); ?>" class="button button-secondary" style="font-weight: 600;">
                        Categorias
                    </a>
                    <a href="<?php echo admin_url('edit-tags.php?taxonomy=montadora&post_type=peca'); ?>" class="button button-secondary" style="font-weight: 600;">
                        Marcas
                    </a>
                </div>
            </div>
        </div>

        <!-- Instruções de Operação -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 22px;">
            <h3 style="margin-top: 0; color: #0f172a; font-size: 15px; font-weight: 700;">Guia Rápido de Gestão do Tema</h3>
            <ol style="margin-bottom: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
                <li><strong>Para alterar o WhatsApp ou Telefone:</strong> No menu lateral, acesse <em>Configurações CM</em> &gt; <em>Telefones & Configurações</em> e edite a publicação principal.</li>
                <li><strong>Para adicionar ou editar uma Peça:</strong> Acesse <em>Catálogo de Peças</em> &gt; <em>Adicionar Nova</em>. Preencha o Part Number, fabricante e modelos compatíveis.</li>
                <li><strong>Para gerenciar Departamentos:</strong> Acesse <em>Catálogo de Peças</em> &gt; <em>Categorias de Peça</em> para adicionar, renomear ou excluir categorias.</li>
                <li><strong>Frontend do Site 100% Limpo:</strong> O site público não exibe botões administrativos. O cliente vê apenas a navegação de peças, busca por Part Number e solicitação de cotação via WhatsApp.</li>
            </ol>
        </div>
    </div>
    <?php
}

/**
 * Inclusão do Importador Automático CSV & Imagens para o CPT 'peca'
 */
if (file_exists(get_template_directory() . '/inc/csv-importer.php')) {
    require_once get_template_directory() . '/inc/csv-importer.php';
}

/**
 * Restrição de Criação de Peças: Exclusivo para Administrador
 * Garante que usuários do painel do cliente/assinantes não consigam criar produtos.
 */
function com_maquinas_enforce_admin_product_creation() {
    global $pagenow, $post_type;
    if (is_admin() && ($pagenow === 'post-new.php' || $pagenow === 'post.php')) {
        $pt = isset($_GET['post_type']) ? sanitize_text_field($_GET['post_type']) : (isset($post_type) ? $post_type : '');
        if ($pt === 'peca' && !current_user_can('manage_options')) {
            wp_die(
                __('Acesso negado. A criação e edição de produtos no Catálogo CPT é restrita exclusivamente a administradores do sistema.', 'com-maquinas'),
                __('Permissão Insuficiente', 'com-maquinas'),
                array('response' => 403, 'back_link' => true)
            );
        }
    }
}
add_action('admin_init', 'com_maquinas_enforce_admin_product_creation');

