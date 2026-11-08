<?php
/**
 * Footer Template for COMMAQ WordPress Theme
 *
 * @package Com_Maquinas
 */

$whatsapp        = function_exists('cm_get_config') ? cm_get_config('whatsapp', '556536261010') : get_theme_mod('com_maquinas_whatsapp', '556536261010');
$phone           = function_exists('cm_get_config') ? cm_get_config('phone', '(65) 3626-1010') : get_theme_mod('com_maquinas_phone', '(65) 3626-1010');
$email           = function_exists('cm_get_config') ? cm_get_config('email', 'vendas@commaquinas.com.br') : get_theme_mod('com_maquinas_email', 'vendas@commaquinas.com.br');
$whatsapp_msg    = function_exists('cm_get_config') ? cm_get_config('whatsapp_mensagem', 'Olá! Estou no site da COMMAQ e gostaria de um orçamento de peças.') : 'Olá! Estou no site da COMMAQ e gostaria de um orçamento de peças.';
$floating_active = function_exists('cm_get_config') ? cm_get_config('whatsapp_flutuante_ativo', '1') : '1';
$horario         = function_exists('cm_get_config') ? cm_get_config('horario', 'Seg-Sex 7:30 às 18:00h') : 'Seg-Sex 7:30 às 18:00h';
$endereco        = function_exists('cm_get_config') ? cm_get_config('endereco', 'Rua S, N° 269 ,Complemento Quadra 14, lotes 50 <br>Cuiabá - Mato Grosso') : 'Rua S, N° 269 ,Complemento Quadra 14, lotes 50 <br>Cuiabá - Mato Grosso';
$cnpj            = function_exists('cm_get_config') ? cm_get_config('cnpj', '12.345.678/0001-90') : '12.345.678/0001-90';
$razao_social    = function_exists('cm_get_config') ? cm_get_config('razao_social', 'COM CENTRO OESTE MÁQUINAS E MANUTENÇÕES LTDA') : 'COM CENTRO OESTE MÁQUINAS E MANUTENÇÕES LTDA';
$link_catalogo   = function_exists('cm_get_config') ? cm_get_config('link_catalogo', get_template_directory_uri() . '/assets/catalogo-commaquinas-2026.pdf') : get_template_directory_uri() . '/assets/catalogo-commaquinas-2026.pdf';
?>

<footer class="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
    
    <!-- Top Highlights Strip -->
    <div class="border-b border-slate-800/80 py-8 bg-slate-900/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <i data-lucide="truck" class="w-5 h-5"></i>
                </div>
                <div>
                    <h5 class="text-white font-bold text-sm">Despacho para Todo o Brasil</h5>
                    <p class="text-slate-400 text-xs mt-0.5">Parcerias com as melhores transportadoras e frete aéreo</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <i data-lucide="shield-check" class="w-5 h-5"></i>
                </div>
                <div>
                    <h5 class="text-white font-bold text-sm">Garantia e Procedência</h5>
                    <p class="text-slate-400 text-xs mt-0.5">Peças inspecionadas e 100% com Nota Fiscal Eletrônica</p>
                </div>
            </div>

            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <i data-lucide="credit-card" class="w-5 h-5"></i>
                </div>
                <div>
                    <h5 class="text-white font-bold text-sm">Faturamento Facilitado</h5>
                    <p class="text-slate-400 text-xs mt-0.5">Boleto bancário a prazo para empresas e produtores rurais</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Footer Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            
            <div class="lg:col-span-4 space-y-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-lg border-2 border-amber-400">
                        CQ
                    </div>
                    <div>
                        <span class="font-extrabold text-xl text-white tracking-tight block">
                            COMMAQ
                        </span>
                        <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Peças para Máquinas Pesadas & Tratores
                        </span>
                    </div>
                </div>

                <p class="text-slate-400 leading-relaxed text-xs pr-4">
                    Distribuidora e comércio de peças de reposição para escavadeiras, pás carregadeiras, retroescavadeiras, motoniveladoras e tratores de esteira. Agilidade de despacho para não deixar sua máquina parar.
                </p>

                <!-- Endereço Atualizado (Sem CNPJ) -->
                <div class="pt-2 text-slate-300 space-y-1.5 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <p class="flex items-start gap-2">
                        <i data-lucide="map-pin" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"></i>
                        <span><strong>Endereço:</strong> Rua S, N° 269 ,Complemento Quadra 14, lotes 50 <br>Cuiabá - Mato Grosso</span>
                    </p>
                    <p class="flex items-center gap-2 pt-1 border-t border-slate-800 text-slate-300">
                        <i data-lucide="clock" class="w-4 h-4 text-amber-400 shrink-0"></i>
                        <span><strong>Horário:</strong> Seg-Sex 7:30 às 18:00h</span>
                    </p>
                </div>

                <!-- Redes Sociais -->
                <div class="pt-2">
                    <span class="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">Redes Sociais:</span>
                    <div class="flex items-center gap-2.5">
                        <a href="https://instagram.com/commaqmt/" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:opacity-95 shadow">
                            <i data-lucide="instagram" class="w-3.5 h-3.5"></i>
                            <span>Instagram</span>
                        </a>
                        <a href="https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-[#1877F2] text-white font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-[#166fe5] shadow">
                            <i data-lucide="facebook" class="w-3.5 h-3.5"></i>
                            <span>Facebook</span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- Categories -->
            <div class="lg:col-span-3 space-y-3">
                <h4 class="text-white font-bold text-sm uppercase tracking-wider">
                    Categorias de Peças
                </h4>
                <ul class="space-y-2 text-xs">
                    <li><a href="#catalogo" class="hover:text-amber-400 transition-colors">Material Rodante (Correntes, Roletes)</a></li>
                    <li><a href="#catalogo" class="hover:text-amber-400 transition-colors">Dentes, Cantos e Lâminas (FPS)</a></li>
                    <li><a href="#catalogo" class="hover:text-amber-400 transition-colors">Bombas e Reparos Hidráulicos</a></li>
                    <li><a href="#catalogo" class="hover:text-amber-400 transition-colors">Kits de Motor e Turbinas</a></li>
                    <li><a href="#catalogo" class="hover:text-amber-400 transition-colors">Discos de Transmissão e Freios</a></li>
                    <li><a href="#catalogo" class="hover:text-amber-400 transition-colors">Filtros de Ar, Combustível e Óleo</a></li>
                    <li><a href="#catalogo" class="hover:text-amber-400 transition-colors">Pinos Temperados e Buchas de Aço</a></li>
                </ul>
            </div>

            <!-- Institutional -->
            <div class="lg:col-span-2 space-y-3">
                <h4 class="text-white font-bold text-sm uppercase tracking-wider">
                    Institucional
                </h4>
                <ul class="space-y-2 text-xs">
                    <li><a href="#sobre" class="hover:text-amber-400 transition-colors">Sobre a Empresa</a></li>
                    <li><a href="#diferenciais" class="hover:text-amber-400 transition-colors">Diferenciais & Logística</a></li>
                    <li><button onclick="openChassisModal()" class="text-amber-400 hover:text-amber-300 font-bold">Cotação por Plaqueta</button></li>
                    <li><a href="#contato" class="hover:text-amber-400 transition-colors">Fale Conosco</a></li>
                    <li class="pt-2 border-t border-slate-800">
                        <a href="<?php echo esc_url(home_url('/politica-de-trocas')); ?>" class="text-slate-300 hover:text-amber-400 flex items-center gap-1">
                            <i data-lucide="refresh-cw" class="w-3 h-3 text-amber-400"></i>
                            <span>Política de Troca</span>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo esc_url(home_url('/termos-de-uso')); ?>" class="text-slate-300 hover:text-amber-400 flex items-center gap-1">
                            <i data-lucide="lock" class="w-3 h-3 text-amber-400"></i>
                            <span>Termos de Uso e Segurança</span>
                        </a>
                    </li>
                    <li class="pt-2 border-t border-slate-800">
                        <a href="<?php echo esc_url($link_catalogo); ?>" download class="text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-bold">
                            <i data-lucide="file-text" class="w-3.5 h-3.5 text-amber-400"></i>
                            <span>Baixar Catálogo em PDF</span>
                        </a>
                    </li>
                </ul>
            </div>

            <!-- Contact & Schedule -->
            <div class="lg:col-span-3 space-y-3">
                <h4 class="text-white font-bold text-sm uppercase tracking-wider">
                    Atendimento Comercial
                </h4>
                <div class="space-y-2 text-xs">
                    <p class="flex items-center gap-2">
                        <i data-lucide="phone" class="w-4 h-4 text-amber-400 shrink-0"></i>
                        <a href="tel:6536261010" class="hover:text-amber-400 font-bold text-white"><?php echo esc_html($phone); ?></a>
                    </p>
                    <p class="flex items-center gap-2">
                        <i data-lucide="message-square" class="w-4 h-4 text-emerald-400 shrink-0"></i>
                        <a href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=<?php echo urlencode($whatsapp_msg); ?>" target="_blank" rel="noopener noreferrer" class="hover:text-emerald-300 font-bold text-emerald-400">(65) 3626-1010 (WhatsApp)</a>
                    </p>
                    <p class="flex items-center gap-2">
                        <i data-lucide="mail" class="w-4 h-4 text-amber-400 shrink-0"></i>
                        <span><?php echo esc_html($email); ?></span>
                    </p>
                    <p class="text-slate-400 pt-1">
                        <?php echo wp_kses_post($horario); ?>
                    </p>
                </div>

                <div class="pt-2">
                    <a href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=<?php echo urlencode($whatsapp_msg); ?>" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2.5 rounded-lg text-xs transition-colors shadow-lg">
                        <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                        <span>Chamar Vendedor no WhatsApp</span>
                    </a>
                </div>
            </div>

        </div>
    </div>

    <!-- Formas de Pagamento no Rodapé (Somente Texto Conforme Solicitado) -->
    <div class="border-t border-slate-800 bg-slate-900/70 py-6 px-4 sm:px-6">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="text-center md:text-left">
                <span class="text-amber-400 font-extrabold text-xs uppercase tracking-wider block">
                    Formas de Pagamento Aceitas
                </span>
                <p class="text-slate-400 text-xs mt-0.5">
                    Transações diretas com chave Pix oficial e contas bancárias:
                </p>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2.5">
                <div class="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Pix (Transferência Instantânea)</span>
                </div>
                <div class="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Banco do Brasil</span>
                </div>
                <div class="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-red-400"></span>
                    <span>Bradesco</span>
                </div>
                <div class="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
                    <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>Boleto Bancário PJ</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-slate-800/80 py-4 bg-slate-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-slate-500 text-[11px] text-center md:text-left">
            <div>
                <p class="text-slate-300 font-medium"><?php echo esc_html($razao_social); ?> · CNPJ: <?php echo esc_html($cnpj); ?></p>
                <p class="text-slate-500 mt-0.5">© <?php echo date('Y'); ?> COMMAQ - Todos os direitos reservados. Fotos meramente ilustrativas.</p>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-3">
                <a href="<?php echo esc_url(home_url('/politica-de-trocas')); ?>" class="hover:text-amber-400 transition-colors">Política de Troca</a>
                <span>•</span>
                <a href="<?php echo esc_url(home_url('/termos-de-uso')); ?>" class="hover:text-amber-400 transition-colors">Termos de Uso e Segurança</a>
                <span>•</span>
                <span>Cuiabá - Mato Grosso</span>
            </div>
        </div>
    </div>
</footer>

<?php if ($floating_active !== '0') : ?>
<!-- Floating WhatsApp Action -->
<div class="fixed bottom-6 right-6 z-40">
    <a
        href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=<?php echo urlencode($whatsapp_msg); ?>"
        target="_blank"
        rel="noopener noreferrer"
        class="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ring-4 ring-emerald-400/25"
        title="Falar no WhatsApp"
        aria-label="Falar no WhatsApp"
    >
        <svg class="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
    </a>
</div>
<?php endif; ?>

<!-- Modal: Cotação por Plaqueta ou Chassi -->
<div id="chassis-modal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs hidden items-center justify-center p-4">
    <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-white">
        <div class="p-6 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <i data-lucide="scan" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-base">Cotação por Plaqueta ou Chassi</h3>
            </div>
            <button onclick="closeChassisModal()" class="text-slate-400 hover:text-white">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        
        <form id="chassis-form" onsubmit="handleChassisSubmit(event)" class="p-6 space-y-4 text-xs">
            <p class="text-slate-300">
                Não sabe o código técnico da peça? Digite os dados da sua máquina ou envie uma foto da plaqueta metálica:
            </p>

            <div>
                <label class="block text-slate-300 font-semibold mb-1">Seu Nome / Empresa *</label>
                <input type="text" id="chassis-name" required placeholder="Ex: Roberto - Fazenda Santa Fé" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
            </div>

            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-slate-300 font-semibold mb-1">Modelo da Máquina *</label>
                    <input type="text" id="chassis-model" required placeholder="Ex: CAT 320D, Case 580N" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
                <div>
                    <label class="block text-slate-300 font-semibold mb-1">Nº de Série / PIN</label>
                    <input type="text" id="chassis-serial" placeholder="Ex: Chassi / Plaqueta" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white" />
                </div>
            </div>

            <div>
                <label class="block text-slate-300 font-semibold mb-1">Quais peças você precisa? *</label>
                <textarea id="chassis-parts" required rows="3" placeholder="Descreva os componentes ou o defeito que a máquina apresentou..." class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white resize-none"></textarea>
            </div>

            <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-lg uppercase tracking-wider text-xs flex items-center justify-center gap-2">
                <i data-lucide="send" class="w-4 h-4"></i>
                <span>Enviar para Mesa Técnica via WhatsApp</span>
            </button>
        </form>
    </div>
</div>

<!-- Drawer: Cesto de Cotações WhatsApp -->
<div id="quote-drawer-backdrop" onclick="toggleQuoteDrawer()" class="fixed inset-0 bg-slate-950/70 z-50 hidden backdrop-blur-xs"></div>
<div id="quote-drawer" class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-950 border-l border-slate-800 z-50 transform translate-x-full transition-transform duration-300 flex flex-col text-white">
    <div class="p-5 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <i data-lucide="shopping-cart" class="w-5 h-5 text-amber-400"></i>
            <h3 class="font-extrabold text-base">Lista de Cotação de Peças</h3>
        </div>
        <button onclick="toggleQuoteDrawer()" class="text-slate-400 hover:text-white">
            <i data-lucide="x" class="w-5 h-5"></i>
        </button>
    </div>

    <!-- Items Container -->
    <div id="quote-items-container" class="flex-1 overflow-y-auto p-5 space-y-3">
        <!-- Rendered by JS -->
    </div>

    <!-- Actions & Send via WhatsApp -->
    <div class="p-5 border-t border-slate-800 bg-slate-900 space-y-3">
        <div>
            <label class="block text-[11px] text-slate-300 font-semibold mb-1">Nome ou Razão Social:</label>
            <input type="text" id="quote-client-name" placeholder="Ex: Construtora MT / Carlos" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white" />
        </div>
        <div>
            <label class="block text-[11px] text-slate-300 font-semibold mb-1">Cidade / Estado de Entrega:</label>
            <input type="text" id="quote-client-city" placeholder="Ex: Cuiabá - MT" class="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white" />
        </div>

        <button onclick="sendQuoteViaWhatsApp()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-lg uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>Solicitar Cotação no WhatsApp</span>
        </button>
    </div>
</div>

<?php wp_footer(); ?>
<script>
    // Inicia ícones Lucide automaticamente
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
</script>
</body>
</html>
