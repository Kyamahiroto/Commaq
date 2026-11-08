<?php
/**
 * Header Template for Com Máquinas WordPress Theme
 *
 * @package Com_Maquinas
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-950'); ?>>
<?php wp_body_open(); ?>

<?php
$whatsapp          = function_exists('cm_get_config') ? cm_get_config('whatsapp', '556536261010') : get_theme_mod('com_maquinas_whatsapp', '556536261010');
$phone             = function_exists('cm_get_config') ? cm_get_config('phone', '(65) 3626-1010') : get_theme_mod('com_maquinas_phone', '(65) 3626-1010');
$header_horario    = function_exists('cm_get_config') ? cm_get_config('header_horario', 'Seg-Sex 7:30 às 18:00h') : 'Seg-Sex 7:30 às 18:00h';
$header_telefone   = function_exists('cm_get_config') ? cm_get_config('header_telefone', '(65) 3626-1010') : '(65) 3626-1010';
$header_local      = function_exists('cm_get_config') ? cm_get_config('header_localizacao', 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT') : 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT';
$email             = function_exists('cm_get_config') ? cm_get_config('email', 'vendas@commaquinas.com.br') : get_theme_mod('com_maquinas_email', 'vendas@commaquinas.com.br');
$alerta_topo       = function_exists('cm_get_config') ? cm_get_config('alerta_topo', 'MÁQUINA PARADA? DESPACHAMOS PEÇAS HOJE MESMO PARA TODO O BRASIL VIA AÉREO E RODOVIÁRIO') : 'MÁQUINA PARADA? DESPACHAMOS PEÇAS HOJE MESMO PARA TODO O BRASIL VIA AÉREO E RODOVIÁRIO';
$link_catalogo     = function_exists('cm_get_config') ? cm_get_config('link_catalogo', get_template_directory_uri() . '/assets/catalogo-commaquinas-2026.pdf') : get_template_directory_uri() . '/assets/catalogo-commaquinas-2026.pdf';
?>

<!-- Top Urgent Dispatch Announcement Bar -->
<div class="bg-amber-500 text-slate-950 font-bold text-xs py-2 px-4 shadow-sm border-b border-amber-600/30">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-slate-950 animate-pulse"></span>
            <span><?php echo esc_html($alerta_topo); ?></span>
        </div>
        <div class="hidden md:flex items-center gap-4 text-[11px]">
            <span>Televendas: <strong><?php echo esc_html($header_telefone); ?></strong></span>
            <span>•</span>
            <a href="https://wa.me/<?php echo esc_attr($whatsapp); ?>" target="_blank" class="hover:underline flex items-center gap-1 font-extrabold">
                Plantão WhatsApp
            </a>
        </div>
    </div>
</div>

<!-- Header Top Utility Bar: Horário & Localização Configuráveis -->
<div class="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
    <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-4 flex-wrap">
            <div class="flex items-center gap-1.5 text-amber-400 font-semibold">
                <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                <span>Despacho Aéreo & Rodoviário Expresso</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-300">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i>
                <span><?php echo esc_html($header_horario); ?></span>
            </div>
            <div class="hidden lg:flex items-center gap-1.5 text-slate-400">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-500"></i>
                <span><?php echo esc_html($header_local); ?></span>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 text-slate-400">
                <a href="https://instagram.com/commaqmt/" target="_blank" rel="noopener noreferrer" class="hover:text-pink-400 transition-colors" title="Instagram">
                    <i data-lucide="instagram" class="w-3.5 h-3.5"></i>
                </a>
                <a href="https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors" title="Facebook">
                    <i data-lucide="facebook" class="w-3.5 h-3.5"></i>
                </a>
            </div>
            <span class="text-slate-700">|</span>
            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', $header_telefone)); ?>" class="flex items-center gap-1 text-slate-200 hover:text-amber-400 font-bold transition-colors">
                <i data-lucide="phone" class="w-3.5 h-3.5 text-amber-400"></i>
                <span><?php echo esc_html($header_telefone); ?></span>
            </a>
            <span class="text-slate-700">|</span>
            <a href="mailto:<?php echo esc_attr($email); ?>" class="text-slate-400 hover:text-slate-200 transition-colors hidden sm:inline">
                <?php echo esc_html($email); ?>
            </a>
        </div>
    </div>
</div>

<!-- Main Navigation Header -->
<header class="bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-800 shadow-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="flex items-center justify-between h-20 gap-4">
            
            <!-- Logo Oficial COM Centro Oeste -->
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center shrink-0 group" title="COM Centro Oeste - Máquinas e Manutenções">
                <?php if (file_exists(get_template_directory() . '/assets/logo.svg')) : ?>
                    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/logo.svg'); ?>" 
                         alt="COM Centro Oeste - Máquinas e Manutenções" 
                         class="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200" />
                <?php else : ?>
                    <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xl shadow-md border-2 border-amber-300">
                        CM
                    </div>
                    <div class="flex flex-col ml-3">
                        <span class="font-extrabold text-xl tracking-tight text-white leading-none">
                            COM <span class="text-amber-400">CENTRO OESTE</span>
                        </span>
                        <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1">
                            Máquinas e Manutenções
                        </span>
                    </div>
                <?php endif; ?>
            </a>

            <!-- Search Bar in Header -->
            <div class="hidden lg:flex flex-1 max-w-xl mx-6">
                <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="w-full relative">
                    <input 
                        type="search" 
                        name="s" 
                        value="<?php echo get_search_query(); ?>"
                        placeholder="O que você está procurando?" 
                        class="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-2.5 pl-4 pr-10 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-500"
                    />
                    <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-400">
                        <i data-lucide="search" class="w-4 h-4"></i>
                    </button>
                </form>
            </div>

            <!-- Header Quick Actions -->
            <div class="flex items-center gap-2.5">
                
                <!-- Área do Cliente / Minha Conta -->
                <a 
                    href="<?php echo esc_url(home_url('/minha-conta/')); ?>" 
                    class="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-amber-400 border border-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                    title="Acesse sua área de cliente e consulte seus pedidos"
                >
                    <i data-lucide="user" class="w-4 h-4 text-amber-400"></i>
                    <span class="hidden sm:inline">Minha Conta</span>
                </a>

                <!-- Plaqueta / Chassi Button -->
                <button 
                    onclick="openChassisModal()" 
                    class="hidden sm:inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                    <i data-lucide="scan" class="w-4 h-4 text-amber-400"></i>
                    <span>Cotação por Plaqueta</span>
                </button>

                <!-- WhatsApp Direct -->
                <a 
                    href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=Ol%C3%A1!%20Preciso%20de%20cota%C3%A7%C3%A3o%20de%20pe%C3%A7as%20urgente." 
                    target="_blank" 
                    class="hidden md:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
                >
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                    <span>Vendedor Online</span>
                </a>

                <!-- Quotation Drawer Trigger -->
                <button 
                    onclick="toggleQuoteDrawer()" 
                    class="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-3.5 sm:px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                    id="quote-cart-btn"
                >
                    <i data-lucide="shopping-cart" class="w-4 h-4"></i>
                    <span class="hidden sm:inline">Cotação</span>
                    <span id="quote-counter" class="bg-slate-950 text-amber-400 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold ml-0.5">
                        0
                    </span>
                </button>

                <!-- Mobile Menu Hamburger Button -->
                <button 
                    type="button"
                    onclick="toggleMobileMenu()" 
                    class="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors focus:outline-none"
                    aria-label="Abrir Menu de Navegação"
                >
                    <i data-lucide="menu" class="w-5 h-5"></i>
                </button>

            </div>

        </div>

        <!-- Mobile Search Bar (Only visible on small screens) -->
        <div class="md:hidden pb-3 pt-1 border-t border-slate-900">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="relative w-full">
                <input 
                    type="search" 
                    name="s" 
                    value="<?php echo get_search_query(); ?>"
                    placeholder="O que você está procurando? (Nome, Part Number...)" 
                    class="w-full bg-slate-900 border border-slate-800 text-white rounded-lg py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder:text-slate-500"
                />
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5"></i>
            </form>
        </div>
    </div>

    <!-- Submenu Clean e Profissional (Igual ao Frontend React, sem barra de rolagem cinza) -->
    <nav class="hidden md:block bg-slate-900 border-t border-slate-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-semibold">
            
            <div class="flex items-center gap-1">
                <!-- Início -->
                <a 
                    href="<?php echo esc_url(home_url('/')); ?>" 
                    class="px-3.5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors uppercase tracking-wider font-bold"
                >
                    Início
                </a>

                <!-- Catálogo com Badge -->
                <a 
                    href="<?php echo esc_url(home_url('/#catalogo')); ?>" 
                    class="flex items-center gap-1.5 px-3.5 py-2.5 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors uppercase tracking-wider font-bold"
                >
                    <span>Catálogo</span>
                    <span class="text-[10px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full">
                        560+
                    </span>
                </a>

                <!-- Dropdown Todas as Categorias com Campo de Busca Instantânea -->
                <div class="relative ml-1" id="wp-categories-dropdown-wrapper">
                    <button 
                        type="button"
                        onclick="toggleWpCategoriesDropdown(event)" 
                        class="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 px-4 font-bold transition-colors uppercase tracking-wider cursor-pointer"
                        id="wp-categories-trigger-btn"
                    >
                        <span>Todas as Categorias</span>
                        <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </button>

                    <!-- Dropdown Panel -->
                    <div 
                        id="wp-categories-dropdown-menu" 
                        class="hidden absolute left-0 top-full w-80 bg-white text-slate-800 shadow-2xl border border-slate-200 rounded-b-xl py-2 z-50 overflow-hidden"
                    >
                        <!-- Search inside dropdown -->
                        <div class="px-3 pt-1 pb-2 border-b border-slate-100">
                            <div class="relative">
                                <input 
                                    type="text" 
                                    id="wp-cat-filter-input" 
                                    onkeyup="filterWpCategories()" 
                                    placeholder="Filtrar departamentos..." 
                                    class="w-full bg-slate-100 text-slate-800 text-[11px] rounded-lg pl-7 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 border border-slate-200"
                                />
                                <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2"></i>
                            </div>
                        </div>

                        <!-- Category List -->
                        <div class="max-h-80 overflow-y-auto" id="wp-categories-list">
                            <a 
                                href="<?php echo esc_url(home_url('/#catalogo')); ?>" 
                                class="w-full text-left px-4 py-2 hover:bg-amber-50 text-xs font-bold border-b border-slate-100 flex items-center justify-between text-slate-900"
                            >
                                <span>Ver Todas as Peças</span>
                                <span class="text-[10px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                                    +560
                                </span>
                            </a>

                            <?php
                            $all_categories = get_terms(array(
                                'taxonomy'   => 'categoria_peca',
                                'hide_empty' => false,
                                'number'     => 50,
                            ));

                            if (!empty($all_categories) && !is_wp_error($all_categories)) :
                                foreach ($all_categories as $c_term) : ?>
                                    <a 
                                        href="<?php echo esc_url(get_term_link($c_term)); ?>" 
                                        class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700 hover:text-amber-600 transition-colors flex items-center justify-between"
                                        data-name="<?php echo esc_attr(strtolower($c_term->name)); ?>"
                                    >
                                        <span class="truncate"><?php echo esc_html($c_term->name); ?></span>
                                        <?php if ($c_term->count > 0) : ?>
                                            <span class="text-[10px] text-slate-400 font-mono">(<?php echo esc_html($c_term->count); ?>)</span>
                                        <?php endif; ?>
                                    </a>
                                <?php endforeach;
                            else : ?>
                                <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700">VENDA DE MÁQUINAS</a>
                                <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700">PEÇAS PESADAS</a>
                                <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700">LOCAÇÃO</a>
                                <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700">CHANGLIN</a>
                                <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700">EMPILHADEIRAS CLARCK</a>
                                <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700">EMPILHADEIRAS HANGCHA</a>
                                <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="wp-cat-link-item w-full text-left px-4 py-2 hover:bg-amber-50 text-xs text-slate-700">PÁ CARREGADEIRA SDLG</a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <!-- Links Rápidos de Principais Categorias (Sem rolagem horizontal) -->
                <div class="hidden lg:flex items-center divide-x divide-slate-800">
                    <?php
                    $top_categories = !empty($all_categories) && !is_wp_error($all_categories) 
                        ? array_slice($all_categories, 0, 5) 
                        : array();

                    if (!empty($top_categories)) :
                        foreach ($top_categories as $top_cat) : ?>
                            <a 
                                href="<?php echo esc_url(get_term_link($top_cat)); ?>" 
                                class="px-3 py-2.5 text-slate-300 hover:text-amber-400 transition-colors whitespace-nowrap"
                            >
                                <?php echo esc_html($top_cat->name); ?>
                            </a>
                        <?php endforeach;
                    else : ?>
                        <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="px-3 py-2.5 text-slate-300 hover:text-amber-400 transition-colors">Changlin</a>
                        <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="px-3 py-2.5 text-slate-300 hover:text-amber-400 transition-colors">Empilhadeiras</a>
                        <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="px-3 py-2.5 text-slate-300 hover:text-amber-400 transition-colors">Filtros</a>
                        <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="px-3 py-2.5 text-slate-300 hover:text-amber-400 transition-colors">Freios</a>
                        <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" class="px-3 py-2.5 text-slate-300 hover:text-amber-400 transition-colors">Transmissão</a>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Botão Baixar Catálogo PDF & Links Institucionais -->
            <div class="flex items-center gap-3 text-slate-300">
                <a 
                    href="<?php echo esc_url($link_catalogo); ?>" 
                    download
                    class="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow hover:shadow-amber-500/20"
                    title="Baixar Catálogo Geral de Peças e Máquinas em PDF"
                >
                    <i data-lucide="file-text" class="w-3.5 h-3.5 text-slate-950"></i>
                    <span>Baixar Catálogo PDF</span>
                </a>

                <a href="<?php echo esc_url(home_url('/#diferenciais')); ?>" class="hover:text-amber-400 transition-colors hidden xl:inline">
                    Diferenciais
                </a>
                <a href="<?php echo esc_url(home_url('/#sobre')); ?>" class="hover:text-amber-400 transition-colors">
                    Quem Somos
                </a>
                <a href="<?php echo esc_url(home_url('/#contato')); ?>" class="hover:text-amber-400 transition-colors">
                    Contato
                </a>
            </div>

        </div>
    </nav>
</header>

<!-- Mobile Navigation Drawer -->
<div id="mobile-nav-drawer" class="fixed inset-0 z-50 hidden transition-opacity duration-300">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onclick="toggleMobileMenu()"></div>
    
    <!-- Drawer Content -->
    <div class="relative ml-auto w-full max-w-xs bg-slate-950 text-white h-full shadow-2xl flex flex-col p-5 overflow-y-auto border-l border-slate-800">
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
                    CM
                </div>
                <span class="font-bold text-sm tracking-wide">Menu COMMAQ</span>
            </div>
            <button onclick="toggleMobileMenu()" class="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>

        <div class="py-4 space-y-2 border-b border-slate-800">
            <a href="<?php echo esc_url(home_url('/')); ?>" onclick="toggleMobileMenu()" class="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-900 text-slate-200 font-semibold text-sm">
                <span>Início</span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500"></i>
            </a>
            <a href="<?php echo esc_url(home_url('/#catalogo')); ?>" onclick="toggleMobileMenu()" class="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-900 text-amber-400 font-bold text-sm">
                <span>Catálogo Completo (+560)</span>
                <span class="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">560+</span>
            </a>
            <a href="<?php echo esc_url(home_url('/minha-conta/')); ?>" class="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-900 text-slate-200 font-semibold text-sm">
                <span class="flex items-center gap-2">
                    <i data-lucide="user" class="w-4 h-4 text-amber-400"></i>
                    Minha Conta & Pedidos
                </span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500"></i>
            </a>
            <button onclick="openChassisModal(); toggleMobileMenu();" class="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-900 text-amber-400 font-semibold text-sm text-left">
                <span class="flex items-center gap-2">
                    <i data-lucide="scan" class="w-4 h-4 text-amber-400"></i>
                    Cotação por Plaqueta
                </span>
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-500"></i>
            </button>
            <a href="<?php echo esc_url($link_catalogo); ?>" download class="flex items-center justify-between p-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider">
                <span class="flex items-center gap-2">
                    <i data-lucide="file-text" class="w-4 h-4"></i>
                    Baixar Catálogo em PDF
                </span>
                <i data-lucide="download" class="w-4 h-4"></i>
            </a>
        </div>

        <div class="py-4 border-b border-slate-800">
            <span class="text-[11px] uppercase tracking-wider text-slate-500 font-bold block mb-2 px-2">Departamentos</span>
            <div class="space-y-1 max-h-48 overflow-y-auto">
                <?php if (!empty($all_categories) && !is_wp_error($all_categories)) :
                    foreach (array_slice($all_categories, 0, 8) as $m_cat) : ?>
                        <a href="<?php echo esc_url(get_term_link($m_cat)); ?>" class="block px-2.5 py-1.5 rounded text-xs text-slate-300 hover:text-amber-400 hover:bg-slate-900">
                            <?php echo esc_html($m_cat->name); ?>
                        </a>
                    <?php endforeach;
                endif; ?>
            </div>
        </div>

        <div class="mt-auto pt-4 space-y-3">
            <a 
                href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=Ol%C3%A1!%20Gostaria%20de%20atendimento%20da%20COMMAQ." 
                target="_blank" 
                class="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow"
            >
                <i data-lucide="message-circle" class="w-4 h-4"></i>
                <span>Chamar Vendedor Online</span>
            </a>
            <div class="text-[11px] text-slate-400 space-y-1">
                <p class="flex items-center gap-1.5"><i data-lucide="phone" class="w-3.5 h-3.5 text-amber-400"></i> <?php echo esc_html($header_telefone); ?></p>
                <p class="flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5 text-slate-500"></i> <?php echo esc_html($header_horario); ?></p>
            </div>
        </div>
    </div>
</div>

<script>
function toggleWpCategoriesDropdown(e) {
    if (e) e.stopPropagation();
    var menu = document.getElementById('wp-categories-dropdown-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

function filterWpCategories() {
    var input = document.getElementById('wp-cat-filter-input');
    var filter = input.value.toLowerCase();
    var items = document.querySelectorAll('.wp-cat-link-item');
    items.forEach(function(item) {
        var text = item.getAttribute('data-name') || item.innerText.toLowerCase();
        if (text.indexOf(filter) > -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function toggleMobileMenu() {
    var drawer = document.getElementById('mobile-nav-drawer');
    if (drawer) {
        drawer.classList.toggle('hidden');
    }
}

document.addEventListener('click', function(e) {
    var wrapper = document.getElementById('wp-categories-dropdown-wrapper');
    var menu = document.getElementById('wp-categories-dropdown-menu');
    if (wrapper && menu && !wrapper.contains(e.target)) {
        menu.classList.add('hidden');
    }
});
</script>
