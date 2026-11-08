<?php
/**
 * Template Name: Área do Cliente - Minha Conta & Pedidos
 *
 * @package Com_Maquinas
 */

get_header();
?>

<main class="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- Header Banner -->
        <div class="bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <i data-lucide="shield-check" class="w-7 h-7"></i>
                </div>
                <div>
                    <h1 class="text-xl sm:text-2xl font-black text-white">Área do Cliente COMMAQ</h1>
                    <p class="text-xs text-slate-400 mt-1">Consulte seus pedidos, status de despacho aéreo/rodoviário e frota de máquinas.</p>
                </div>
            </div>
            
            <a href="<?php echo esc_url(home_url('/')); ?>" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md inline-flex items-center gap-2">
                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                <span>Voltar ao Catálogo</span>
            </a>
        </div>

        <?php if (is_user_logged_in()) : 
            $current_user = wp_get_current_user();
        ?>
            <!-- Logged In User Dashboard -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- User Profile Card -->
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div class="flex items-center gap-3 pb-3 border-b border-slate-800">
                        <div class="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-base">
                            <?php echo esc_html(strtoupper(substr($current_user->display_name, 0, 1))); ?>
                        </div>
                        <div>
                            <h2 class="text-sm font-bold text-white"><?php echo esc_html($current_user->display_name); ?></h2>
                            <span class="text-xs text-slate-400"><?php echo esc_html($current_user->user_email); ?></span>
                        </div>
                    </div>

                    <div class="space-y-2 text-xs text-slate-300">
                        <p><strong class="text-slate-400">Função:</strong> <?php echo current_user_can('manage_options') ? '<span class="text-amber-400 font-bold">Administrador Geral</span>' : 'Cliente / Comprador'; ?></p>
                        <p><strong class="text-slate-400">Status:</strong> Verificado</p>
                    </div>

                    <?php if (current_user_can('manage_options')) : ?>
                        <div class="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                            <span class="text-[11px] font-bold text-amber-400 block">Painel Administrativo WordPress</span>
                            <p class="text-[11px] text-slate-300">Como administrador, gerencie as peças exclusivamente pelo CPT:</p>
                            <div class="flex flex-col gap-1.5 pt-1">
                                <a href="<?php echo esc_url(admin_url('edit.php?post_type=peca')); ?>" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] px-3 py-1.5 rounded-lg text-center transition-all">
                                    Gerenciar Catálogo CPT
                                </a>
                                <a href="<?php echo esc_url(admin_url('edit.php?post_type=peca&page=com-maquinas-csv-importer')); ?>" class="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] px-3 py-1.5 rounded-lg text-center transition-all border border-slate-700">
                                    Importador CSV & Imagens
                                </a>
                            </div>
                        </div>
                    <?php else : ?>
                        <div class="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-[11px] text-slate-400">
                            Apenas administradores podem cadastrar ou alterar produtos via painel WordPress CPT.
                        </div>
                    <?php endif; ?>

                    <div class="pt-4 border-t border-slate-800">
                        <a href="<?php echo esc_url(wp_logout_url(home_url())); ?>" class="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5">
                            <i data-lucide="log-out" class="w-4 h-4"></i> Sair da Conta
                        </a>
                    </div>
                </div>

                <!-- Orders / Quotes -->
                <div class="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h2 class="text-base font-black text-white flex items-center gap-2">
                        <i data-lucide="package" class="w-5 h-5 text-amber-400"></i> Meus Pedidos & Cotações Recentes
                    </h2>

                    <!-- Integration with WooCommerce or Custom CPT Orders -->
                    <div class="space-y-3">
                        <div class="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <span class="font-mono text-xs font-bold text-amber-400">#CM-2026-0842</span>
                                <h3 class="text-white font-bold text-sm">Bomba Hidráulica e Filtros - Linha Pesada</h3>
                                <p class="text-xs text-slate-400">Despacho Aéreo Expresso • Rastreio: LA-CGB-7849102</p>
                            </div>
                            <span class="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                Em Transporte
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        <?php else : ?>
            
            <!-- Login & Register Forms when not logged in -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <!-- Login Box -->
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
                    <h2 class="text-lg font-black text-white flex items-center gap-2">
                        <i data-lucide="lock" class="w-5 h-5 text-amber-400"></i> Acessar Minha Conta
                    </h2>
                    <p class="text-xs text-slate-400">Entre com seu e-mail ou nome de usuário para consultar pedidos e cotações.</p>

                    <?php
                    wp_login_form(array(
                        'echo'           => true,
                        'redirect'       => home_url('/minha-conta/'),
                        'form_id'        => 'loginform-custom',
                        'label_username' => 'E-mail ou Usuário',
                        'label_password' => 'Senha',
                        'label_remember' => 'Lembrar-me',
                        'label_log_in'   => 'Entrar na Conta',
                        'value_remember' => true,
                    ));
                    ?>
                </div>

                <!-- Registration Information Box -->
                <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl flex flex-col justify-between">
                    <div class="space-y-3">
                        <h2 class="text-lg font-black text-white flex items-center gap-2">
                            <i data-lucide="building" class="w-5 h-5 text-amber-400"></i> Cadastro Empresarial (PJ / PF)
                        </h2>
                        <p class="text-xs text-slate-400">Cadastre sua construtora, mineradora ou frota rural para agilizar faturamento e envios imediatos.</p>

                        <ul class="space-y-2 text-xs text-slate-300">
                            <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Faturamento direto via Boleto ou Cartão BNDES</li>
                            <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Rastreamento aéreo e rodoviário em tempo real</li>
                            <li class="flex items-center gap-2"><i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Suporte com consultores técnicos de peças pesadas</li>
                        </ul>
                    </div>

                    <a href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=Ol%C3%A1!%20Gostaria%20de%20cadastrar%20minha%20empresa%20para%20comprar%20pe%C3%A7as%20na%20Com%20M%C3%A1quinas." target="_blank" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                        <i data-lucide="message-circle" class="w-4 h-4"></i>
                        <span>Solicitar Cadastro Rápido via WhatsApp</span>
                    </a>
                </div>
            </div>

        <?php endif; ?>

    </div>
</main>

<?php get_footer(); ?>
