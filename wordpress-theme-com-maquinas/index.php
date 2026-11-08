<?php
/**
 * Main Template File (Home / Front-page) for Com Máquinas WordPress Theme
 *
 * @package Com_Maquinas
 */

get_header();

$whatsapp = get_theme_mod('com_maquinas_whatsapp', '5565999884000');
?>

<!-- Hero Section with Machine Finder -->
<section class="relative bg-slate-950 text-white overflow-hidden py-16 sm:py-24 border-b border-slate-800">
    <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-7 space-y-6">
                <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <i data-lucide="shield-check" class="w-4 h-4"></i>
                    <span>Distribuidora Autorizada & Pronta Entrega</span>
                </div>

                <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                    Peças Pesadas para <br />
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300">
                        Não Deixar Sua Obra Parar
                    </span>
                </h1>

                <p class="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                    Mais de 35.000 itens a pronta entrega para escavadeiras, carregadeiras, retroescavadeiras e tratores. Consultoria técnica especializada por código original e número de chassi.
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-wrap items-center gap-4 pt-2">
                    <a href="#catalogo" class="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2">
                        <i data-lucide="package" class="w-4 h-4"></i>
                        <span>Ver Catálogo de Peças</span>
                    </a>

                    <button onclick="openChassisModal()" class="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all flex items-center gap-2">
                        <i data-lucide="scan" class="w-4 h-4 text-amber-400"></i>
                        <span>Cotação por Chassi / Plaqueta</span>
                    </button>
                </div>

                <!-- Live Proof Badges -->
                <div class="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-400">
                    <div>
                        <span class="block text-xl font-black text-white">+35.000</span>
                        <span>Peças em Estoque</span>
                    </div>
                    <div>
                        <span class="block text-xl font-black text-white">15 Min</span>
                        <span>Tempo Médio Cotação</span>
                    </div>
                    <div>
                        <span class="block text-xl font-black text-white">100% Brasil</span>
                        <span>Envio Aéreo & Rodoviário</span>
                    </div>
                </div>
            </div>

            <!-- Quick Filter Machine Box -->
            <div class="lg:col-span-5">
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>

                    <div class="flex items-center gap-2.5 mb-5">
                        <div class="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <i data-lucide="search" class="w-5 h-5"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-white text-base">Localizador Rápido de Peças</h3>
                            <p class="text-[11px] text-slate-400">Busque componentes compatíveis com seu maquinário</p>
                        </div>
                    </div>

                    <form action="<?php echo esc_url(home_url('/')); ?>" method="get" class="space-y-4 text-xs">
                        <div>
                            <label class="block text-slate-300 font-semibold mb-1">Tipo de Máquina:</label>
                            <select name="tipo_equipamento" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white">
                                <option value="">Todos os Equipamentos</option>
                                <option value="escavadeira">Escavadeira Hidráulica</option>
                                <option value="carregadeira">Pá Carregadeira</option>
                                <option value="retroescavadeira">Retroescavadeira</option>
                                <option value="motoniveladora">Motoniveladora</option>
                                <option value="trator-esteira">Trator de Esteira</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-slate-300 font-semibold mb-1">Marca / Montadora:</label>
                            <select name="marca" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white">
                                <option value="">Todas as Marcas</option>
                                <option value="caterpillar">Caterpillar (CAT)</option>
                                <option value="komatsu">Komatsu</option>
                                <option value="case">Case Construction</option>
                                <option value="jcb">JCB</option>
                                <option value="volvo">Volvo CE</option>
                                <option value="new-holland">New Holland</option>
                                <option value="hyundai">Hyundai</option>
                                <option value="john-deere">John Deere</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-slate-300 font-semibold mb-1">Código da Peça ou Palavra-chave:</label>
                            <input type="text" name="s" placeholder="Ex: 1U3352, Corrente, Bomba, Filtro..." class="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white" />
                        </div>

                        <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-lg uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                            <i data-lucide="filter" class="w-4 h-4"></i>
                            <span>Filtrar no Catálogo</span>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- Categorias em Destaque -->
<section class="py-14 bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center max-w-2xl mx-auto mb-10">
            <span class="text-amber-600 font-extrabold text-xs uppercase tracking-wider">Linhas de Reposição</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Peças para Toda a Sua Frota Pesada</h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <?php
            $cats = array(
                array('title' => 'Material Rodante', 'desc' => 'Correntes, roletes, sapatas e rodas guia.', 'icon' => 'truck'),
                array('title' => 'Dentes & Lâminas FPS', 'desc' => 'Pontas, cantos forjados e adaptadores.', 'icon' => 'anchor'),
                array('title' => 'Sistema Hidráulico', 'desc' => 'Bombas principais, comandos e vedações.', 'icon' => 'cpu'),
                array('title' => 'Kits de Motor', 'desc' => 'Pistões, camisas, turbinas e juntas.', 'icon' => 'gauge'),
                array('title' => 'Transmissão & Freios', 'desc' => 'Discos sinterizados e engrenagens.', 'icon' => 'cog'),
                array('title' => 'Filtros & Lubrificação', 'desc' => 'Combustível, ar, hidráulico e óleos.', 'icon' => 'droplet'),
                array('title' => 'Pinos & Buchas', 'desc' => 'Aço temperado para articulações.', 'icon' => 'wrench'),
                array('title' => 'Elétrica & Sensores', 'desc' => 'Motores de partida, alternadores 24V.', 'icon' => 'zap'),
            );

            foreach ($cats as $c):
            ?>
            <a href="#catalogo" class="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group">
                <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-amber-500 mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <i data-lucide="<?php echo esc_attr($c['icon']); ?>" class="w-5 h-5"></i>
                </div>
                <h4 class="font-extrabold text-sm text-slate-900 group-hover:text-amber-600 transition-colors"><?php echo esc_html($c['title']); ?></h4>
                <p class="text-xs text-slate-500 mt-1"><?php echo esc_html($c['desc']); ?></p>
            </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Catálogo Dinâmico de Peças (Loop WordPress CPT 'peca' ou Fallback) -->
<section id="catalogo" class="py-16 bg-slate-50 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
                <span class="text-amber-600 font-extrabold text-xs uppercase tracking-wider">Estoque Pronta Entrega</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Catálogo de Peças Pesadas</h2>
                <p class="text-xs sm:text-sm text-slate-600 mt-1">Consulte números de peças originais e adicione à sua cotação WhatsApp</p>
            </div>
            
            <a href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20uma%20pe%C3%A7a%20espec%C3%ADfica." target="_blank" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all">
                <i data-lucide="message-circle" class="w-4 h-4"></i>
                <span>Consultar Peça Não Listada</span>
            </a>
        </div>

        <!-- Loop de Produtos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <?php
            $args = array(
                'post_type' => array('peca', 'product'),
                'posts_per_page' => 12,
            );
            $query = new WP_Query($args);

            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $part_number = get_post_meta(get_the_ID(), '_cm_part_number', true) ?: (get_post_meta(get_the_ID(), 'part_number', true) ?: 'OEM-REF');
                    $brand = get_post_meta(get_the_ID(), '_cm_brand', true) ?: (get_post_meta(get_the_ID(), 'marca', true) ?: 'COMMAQ / Multimarcas');
                    $cat_terms = get_the_terms(get_the_ID(), 'categoria_peca');
                    $cat_slug = !empty($cat_terms) && !is_wp_error($cat_terms) ? $cat_terms[0]->slug : 'uso-geral';
                    $cat_fallback = function_exists('com_maquinas_get_category_fallback_image') 
                        ? com_maquinas_get_category_fallback_image($cat_slug) 
                        : 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
                    $thumb = has_post_thumbnail() ? get_the_post_thumbnail_url(get_the_ID(), 'medium') : ($custom_img ? $custom_img : $cat_fallback);
            ?>
                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                        <div class="h-44 bg-slate-100 relative overflow-hidden">
                            <img src="<?php echo esc_url($thumb); ?>" alt="<?php the_title(); ?>" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" onerror="if(this.src!=='<?php echo esc_js($cat_fallback); ?>')this.src='<?php echo esc_js($cat_fallback); ?>';" />
                            <span class="absolute top-2 left-2 bg-slate-900/90 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                                PN: <?php echo esc_html($part_number); ?>
                            </span>
                            <span class="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                Pronta Entrega
                            </span>
                        </div>

                        <div class="p-4 space-y-2">
                            <div class="flex items-center justify-between text-xs text-slate-500">
                                <span class="font-semibold text-slate-700"><?php echo esc_html($brand); ?></span>
                                <span>Garantia 6-12m</span>
                            </div>
                            <h3 class="font-extrabold text-sm text-slate-900 leading-snug line-clamp-2">
                                <?php the_title(); ?>
                            </h3>
                            <p class="text-xs text-slate-600 line-clamp-2">
                                <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                            </p>
                        </div>
                    </div>

                    <div class="p-4 pt-0">
                        <button 
                            onclick="addToQuote('<?php echo get_the_ID(); ?>', '<?php echo esc_js(get_the_title()); ?>', '<?php echo esc_js($part_number); ?>', '<?php echo esc_js($brand); ?>', 'Sob Consulta')"
                            class="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <i data-lucide="plus-circle" class="w-4 h-4"></i>
                            <span>Adicionar à Cotação</span>
                        </button>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Mock products se o WP acabou de ser instalado
                $mock_items = array(
                    array('id' => '1', 'name' => 'Dente Ponta Curta CAT J350 Forjado', 'pn' => '1U3352', 'brand' => 'Caterpillar', 'img' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
                    array('id' => '2', 'name' => 'Corrente de Esteira Selada e Lubrificada CAT 320D', 'pn' => '228-2736', 'brand' => 'Caterpillar', 'img' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
                    array('id' => '3', 'name' => 'Bomba Hidráulica Principal Komatsu PC200-8 HPV95', 'pn' => '708-2L-00300', 'brand' => 'Komatsu', 'img' => 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'),
                    array('id' => '4', 'name' => 'Kit Motor Cummins 6BT 5.9L Turbo', 'pn' => '3802360', 'brand' => 'Cummins / Case', 'img' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
                );

                foreach ($mock_items as $item) :
            ?>
                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                        <div class="h-44 bg-slate-100 relative overflow-hidden">
                            <img src="<?php echo esc_url($item['img']); ?>" alt="<?php echo esc_attr($item['name']); ?>" class="w-full h-full object-cover" />
                            <span class="absolute top-2 left-2 bg-slate-900/90 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                                PN: <?php echo esc_html($item['pn']); ?>
                            </span>
                            <span class="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                Pronta Entrega
                            </span>
                        </div>
                        <div class="p-4 space-y-2">
                            <div class="flex items-center justify-between text-xs text-slate-500">
                                <span class="font-semibold text-slate-700"><?php echo esc_html($item['brand']); ?></span>
                                <span>Garantia 6-12m</span>
                            </div>
                            <h3 class="font-extrabold text-sm text-slate-900 leading-snug">
                                <?php echo esc_html($item['name']); ?>
                            </h3>
                            <p class="text-xs text-slate-600">Alta resistência mecânica forjada em liga de aço cromo-molibdênio.</p>
                        </div>
                    </div>
                    <div class="p-4 pt-0">
                        <button 
                            onclick="addToQuote('<?php echo $item['id']; ?>', '<?php echo esc_js($item['name']); ?>', '<?php echo esc_js($item['pn']); ?>', '<?php echo esc_js($item['brand']); ?>', 'Sob Consulta')"
                            class="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <i data-lucide="plus-circle" class="w-4 h-4"></i>
                            <span>Adicionar à Cotação</span>
                        </button>
                    </div>
                </div>
            <?php
                endforeach;
            endif;
            ?>
        </div>

    </div>
</section>

<!-- Diferenciais de Combate a Máquina Parada -->
<section id="diferenciais" class="py-16 bg-slate-950 border-b border-slate-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center max-w-3xl mx-auto mb-12">
            <span class="text-amber-400 font-extrabold text-xs uppercase tracking-wider">Por que Comprar na COMMAQ</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-1">Construímos Relações de Confiança para Não Deixar Sua Obra Parar</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 flex items-center justify-center font-bold">
                    <i data-lucide="zap" class="w-6 h-6"></i>
                </div>
                <h3 class="font-extrabold text-base text-white">Urgência com Máquina Parada</h3>
                <p class="text-slate-300 leading-relaxed">Prioridade zero de atendimento. Cruzamos o código no manual e despachamos via transporte aéreo ou rodoviário expresso no mesmo dia.</p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 flex items-center justify-center font-bold">
                    <i data-lucide="shield-check" class="w-6 h-6"></i>
                </div>
                <h3 class="font-extrabold text-base text-white">100% com Nota Fiscal e Garantia</h3>
                <p class="text-slate-300 leading-relaxed">Peças testadas e homologadas sob padrões internacionais de forjamento e metalurgia. Segurança jurídica e fiscal para sua empresa.</p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div class="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-amber-400 flex items-center justify-center font-bold">
                    <i data-lucide="credit-card" class="w-6 h-6"></i>
                </div>
                <h3 class="font-extrabold text-base text-white">Faturamento para PJ e Produtor</h3>
                <p class="text-slate-300 leading-relaxed">Condições a prazo no boleto bancário para frotistas, empreiteiras e produtores rurais cadastrados, sob rápida aprovação cadastral.</p>
            </div>
        </div>
    </div>
</section>

<?php
get_footer();
