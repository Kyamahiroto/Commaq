/**
 * Com Máquinas - Front-end Interactivity & Quote Cart
 */

let quoteCart = [];

// Load from LocalStorage
try {
    const saved = localStorage.getItem('cm_quote_cart');
    if (saved) {
        quoteCart = JSON.parse(saved);
    }
} catch (e) {
    console.error(e);
}

function updateQuoteBadge() {
    const counterEl = document.getElementById('quote-counter');
    if (counterEl) {
        const total = quoteCart.reduce((sum, item) => sum + (item.qty || 1), 0);
        counterEl.innerText = total;
    }
}

function saveCart() {
    localStorage.setItem('cm_quote_cart', JSON.stringify(quoteCart));
    updateQuoteBadge();
    renderQuoteDrawerItems();
}

function addToQuote(id, name, partNumber, brand, price) {
    const existing = quoteCart.find(item => item.id === id);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        quoteCart.push({
            id: id,
            name: name,
            partNumber: partNumber,
            brand: brand,
            price: price,
            qty: 1
        });
    }
    saveCart();
    toggleQuoteDrawer(true);
}

function removeFromQuote(id) {
    quoteCart = quoteCart.filter(item => item.id !== id);
    saveCart();
}

function changeQty(id, delta) {
    const item = quoteCart.find(i => i.id === id);
    if (!item) return;
    item.qty = (item.qty || 1) + delta;
    if (item.qty <= 0) {
        removeFromQuote(id);
    } else {
        saveCart();
    }
}

function renderQuoteDrawerItems() {
    const container = document.getElementById('quote-items-container');
    if (!container) return;

    if (quoteCart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-slate-500 text-xs">
                <i data-lucide="package" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
                <p>Nenhuma peça adicionada à sua cotação ainda.</p>
                <p class="mt-1 text-[11px] text-slate-600">Navegue no catálogo e clique em "Adicionar à Cotação".</p>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }

    container.innerHTML = quoteCart.map(item => `
        <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5">
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono">${item.partNumber || 'S/N'}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${item.brand || ''}</span>
                </div>
                <h4 class="font-bold text-white text-xs truncate mt-0.5">${item.name}</h4>
            </div>

            <div class="flex items-center gap-2 shrink-0">
                <div class="flex items-center bg-slate-950 border border-slate-700 rounded-lg">
                    <button onclick="changeQty('${item.id}', -1)" class="px-2 py-1 text-slate-400 hover:text-white">-</button>
                    <span class="px-2 text-white font-bold text-xs">${item.qty}</span>
                    <button onclick="changeQty('${item.id}', 1)" class="px-2 py-1 text-slate-400 hover:text-white">+</button>
                </div>
                <button onclick="removeFromQuote('${item.id}')" class="text-slate-500 hover:text-red-400 p-1">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleQuoteDrawer(forceOpen = null) {
    const drawer = document.getElementById('quote-drawer');
    const backdrop = document.getElementById('quote-drawer-backdrop');
    if (!drawer || !backdrop) return;

    const isOpen = !drawer.classList.contains('translate-x-full');
    const shouldOpen = forceOpen !== null ? forceOpen : !isOpen;

    if (shouldOpen) {
        drawer.classList.remove('translate-x-full');
        backdrop.classList.remove('hidden');
        renderQuoteDrawerItems();
    } else {
        drawer.classList.add('translate-x-full');
        backdrop.classList.add('hidden');
    }
}

function sendQuoteViaWhatsApp() {
    if (quoteCart.length === 0) {
        alert('Adicione pelo menos um item para solicitar cotação.');
        return;
    }

    const name = document.getElementById('quote-client-name')?.value || 'Não informado';
    const city = document.getElementById('quote-client-city')?.value || 'Não informado';
    const whatsappNumber = (window.comMaquinasConfig && window.comMaquinasConfig.whatsapp_number) || '556536261010';

    let text = `*SOLICITAÇÃO DE COTAÇÃO - COMMAQ*\n\n`;
    text += `👤 *Cliente/Empresa:* ${name}\n`;
    text += `📍 *Destino/Cidade:* ${city}\n\n`;
    text += `*ITENS SOLICITADOS:*\n`;

    quoteCart.forEach((item, idx) => {
        text += `${idx + 1}. *[${item.qty}x]* ${item.name} (Cód: ${item.partNumber} | ${item.brand})\n`;
    });

    text += `\n_Favor informar disponibilidade em estoque, prazo de entrega e condições de faturamento._`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// Modal Plaqueta
function openChassisModal() {
    const modal = document.getElementById('chassis-modal');
    if (modal) modal.classList.remove('hidden'), modal.classList.add('flex');
}

function closeChassisModal() {
    const modal = document.getElementById('chassis-modal');
    if (modal) modal.classList.add('hidden'), modal.classList.remove('flex');
}

function handleChassisSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('chassis-name')?.value;
    const model = document.getElementById('chassis-model')?.value;
    const serial = document.getElementById('chassis-serial')?.value || 'Não informado';
    const parts = document.getElementById('chassis-parts')?.value;
    const whatsappNumber = (window.comMaquinasConfig && window.comMaquinasConfig.whatsapp_number) || '556536261010';

    const text = `*COTAÇÃO POR PLAQUETA / CHASSI - COMMAQ*\n\n` +
        `👤 *Cliente:* ${name}\n` +
        `🚜 *Máquina/Modelo:* ${model}\n` +
        `🔢 *Chassi / PIN:* ${serial}\n` +
        `🔧 *Peças Solicitadas:* ${parts}\n\n` +
        `_Enviarei fotos da máquina/peça danificada a seguir para conferência no catálogo oficial._`;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    closeChassisModal();
}

document.addEventListener('DOMContentLoaded', () => {
    updateQuoteBadge();
    if (typeof lucide !== 'undefined') lucide.createIcons();
});
