<?php
/**
 * Template Name: Política de Troca
 *
 * @package Com_Maquinas
 */

get_header();
?>

<main class="py-12 bg-slate-50 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-amber-600 transition-colors">Início</a>
            <span>/</span>
            <span class="text-slate-400">Institucional</span>
            <span>/</span>
            <span class="text-slate-800 font-semibold">Política de Troca</span>
        </nav>

        <article class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
                <span class="text-amber-400 font-extrabold text-xs uppercase tracking-wider block">
                    Garantia e Respeito ao Cliente
                </span>
                <h1 class="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
                    Política de Troca
                </h1>
                <p class="text-xs text-slate-400 mt-1">COMMAQ - Centro-Oeste Máquinas</p>
            </div>

            <div class="p-6 sm:p-10 space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
                
                <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 font-medium text-sm">
                    A loja virtual deseja a sua satisfação ao realizar suas compras em nossa loja virtual. Para isso, criamos uma Política de Troca e Devolução com respeito às suas necessidades e baseada no Código de Defesa do Consumidor.
                </div>

                <p>
                    Estas condições compõem as cláusulas de contratação por adesão que você, consumidor, concede ciência e aceitação para a realização das suas compras. A efetivação da compra consiste na plena concordância com as regras presentes.
                </p>

                <div class="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                    <h3 class="text-base font-bold text-slate-900 flex items-center gap-2 text-rose-700">
                        <i data-lucide="alert-triangle" class="w-5 h-5 text-rose-600"></i>
                        <span>É importante ressaltar que você deve recusar imediatamente o recebimento do seu produto caso:</span>
                    </h3>

                    <ul class="space-y-3 text-sm text-slate-800">
                        <li class="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                            <span class="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                            <div>
                                <strong>A embalagem do produto está violada;</strong>
                            </div>
                        </li>
                        <li class="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                            <span class="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                            <div>
                                <strong>O produto apresentar avarias;</strong>
                            </div>
                        </li>
                        <li class="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                            <span class="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                            <div>
                                <strong>Pedido em desacordo com o solicitado no e-commerce.</strong>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="pt-6 border-t border-slate-200 text-xs text-slate-500">
                    <p>Para dúvidas e suporte ao cliente: Telefone <strong>(65) 3626-1010</strong> • E-mail: vendas@commaquinas.com.br</p>
                    <p class="mt-1">Endereço: Rua S, N° 269 ,Complemento Quadra 14, lotes 50 • Cuiabá - Mato Grosso</p>
                </div>
            </div>
        </article>

    </div>
</main>

<?php
get_footer();
