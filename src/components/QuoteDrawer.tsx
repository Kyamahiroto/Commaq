import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShoppingBag, 
  Building2, 
  MapPin, 
  User, 
  FileText,
  ShieldCheck
} from 'lucide-react';
import { QuoteItem, UserProfile, Order } from '../types';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearQuote: () => void;
  currentUser?: UserProfile | null;
  onSaveOrder?: (order: Order) => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearQuote,
  currentUser,
  onSaveOrder
}) => {
  const [clientName, setClientName] = useState(currentUser?.contactPerson || currentUser?.name || '');
  const [clientCompany, setClientCompany] = useState(currentUser ? `${currentUser.name} (${currentUser.document})` : '');
  const [clientPhone, setClientPhone] = useState(currentUser?.phone || '');
  const [clientCity, setClientCity] = useState(currentUser ? `${currentUser.address.city} - ${currentUser.address.state}` : '');
  const [machineChassis, setMachineChassis] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setClientName(currentUser.contactPerson || currentUser.name);
      setClientCompany(`${currentUser.name} (${currentUser.document})`);
      setClientPhone(currentUser.phone);
      setClientCity(`${currentUser.address.city} - ${currentUser.address.state}`);
      if (currentUser.fleet && currentUser.fleet.length > 0) {
        setMachineChassis(`${currentUser.fleet[0].name} (Série: ${currentUser.fleet[0].serialNumber})`);
      }
    }
  }, [currentUser]);

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const createOrderRecord = () => {
    const newOrder: Order = {
      id: `CM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'em_analise',
      statusLabel: 'Cotação em Análise',
      shippingMethod: 'Aéreo Expresso / Rodoviário a definir',
      machineModel: machineChassis || 'Linha Pesada',
      totalValue: 'Sob Análise Técnica',
      notes: notes || 'Solicitação enviada pelo portal COMMAQ.',
      items: items.map(it => ({
        productId: it.product.id,
        name: it.product.name,
        partNumber: it.product.partNumber,
        brand: it.product.brand,
        quantity: it.quantity,
        unitPrice: it.product.price || 'Sob Consulta',
        image: it.product.image
      }))
    };
    onSaveOrder?.(newOrder);
  };

  const generateWhatsAppMessage = () => {
    let message = `*SOLICITAÇÃO DE COTAÇÃO - COMMAQ*\n\n`;
    message += `👤 *Cliente:* ${clientName || 'Não informado'}\n`;
    if (clientCompany) message += `🏢 *Empresa:* ${clientCompany}\n`;
    if (clientPhone) message += `📞 *WhatsApp:* ${clientPhone}\n`;
    if (clientCity) message += `📍 *Cidade/UF:* ${clientCity}\n`;
    if (machineChassis) message += `🚜 *Equipamento/Chassi:* ${machineChassis}\n`;
    if (notes) message += `📝 *Observações:* ${notes}\n`;

    message += `\n*ITENS SOLICITADOS (${totalItemsCount} un no total):*\n`;
    items.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}*\n   • P/N: ${item.product.partNumber}\n   • Marca: ${item.product.brand}\n   • Qtd: *${item.quantity} unidade(s)*\n`;
    });

    message += `\nFavor retornar com preços, condições de pagamento e prazos de envio. Obrigado!`;
    return encodeURIComponent(message);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    createOrderRecord();
    const url = `https://wa.me/556536261010?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  const handleEmailQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    createOrderRecord();
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClearQuote();
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-extrabold text-base">
                Lista de Cotação de Peças
              </h3>
              <p className="text-xs text-slate-400">
                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Fechar gaveta"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {submittedSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-extrabold text-slate-900">
                Cotação Enviada com Sucesso!
              </h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                Nossa equipe comercial da COMMAQ recebeu sua solicitação. Entraremos em contato via WhatsApp ou e-mail com a proposta formal detalhada.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-800">
                Sua lista de cotação está vazia
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Navegue pelo catálogo e clique em <strong>"+ Adicionar à Cotação"</strong> nas peças que precisa para sua máquina.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg"
              >
                Explorar Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Peças para Orçamento
                  </span>
                  <button
                    onClick={onClearQuote}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Esvaziar lista
                  </button>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  {items.map((item) => (
                    <div key={item.product.id} className="p-3 sm:p-3.5 flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-mono text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                            {item.product.partNumber}
                          </span>
                          <span className="text-[10px] font-bold text-slate-600">
                            {item.product.brand}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 truncate" title={item.product.name}>
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          Pronta Entrega
                        </span>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded text-slate-700 hover:bg-slate-200 text-xs font-bold"
                          title="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-white rounded text-slate-700 hover:bg-slate-200 text-xs font-bold"
                          title="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Info Form */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
                <span className="font-bold text-slate-900 uppercase tracking-wider block">
                  Seus Dados para Cotação Rápida
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-slate-600 font-medium mb-1 block">Nome do Responsável *</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium mb-1 block">WhatsApp / Telefone *</label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="(DDD) 99999-0000"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-slate-600 font-medium mb-1 block">Nome da Empresa / Fazenda</label>
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="Nome da empresa ou propriedade"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium mb-1 block">Cidade e Estado (UF)</label>
                    <input
                      type="text"
                      value={clientCity}
                      onChange={(e) => setClientCity(e.target.value)}
                      placeholder="Ex: Cuiabá - MT"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-600 font-medium mb-1 block">Modelo da Máquina / Chassi (opcional)</label>
                  <input
                    type="text"
                    value={machineChassis}
                    onChange={(e) => setMachineChassis(e.target.value)}
                    placeholder="Ex: Escavadeira CAT 320D ano 2014"
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-medium mb-1 block">Observações adicionais</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Preciso também dos parafusos de fixação..."
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-amber-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && !submittedSuccess && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2">
            <button
              onClick={handleSendWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Enviar Cotação por WhatsApp (Imediato)</span>
            </button>

            <button
              onClick={handleEmailQuote}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Solicitar Proposta Formal por E-mail</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center mt-1">
              Atendimento ágil com consultores de vendas especializados em pesados.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
