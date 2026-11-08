import React from 'react';
import { 
  X, 
  Printer, 
  MessageCircle, 
  Truck, 
  Plane, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Package,
  Building,
  MapPin,
  Calendar,
  FileText
} from 'lucide-react';
import { Order, UserProfile } from '../types';
import { Logo } from './Logo';

interface OrderDetailModalProps {
  order: Order | null;
  user: UserProfile | null;
  onClose: () => void;
  whatsappNumber: string;
  onRepeatOrder?: (order: Order) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  user,
  onClose,
  whatsappNumber,
  onRepeatOrder
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Olá COMMAQ! Preciso de suporte referente ao Pedido/Cotação #${order.id} (${order.machineModel || 'Peças Linha Pesada'}). Podem me atualizar?`
  )}`;

  const getStatusBadge = (status: Order['status'], label: string) => {
    switch (status) {
      case 'em_transporte':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <Plane className="w-3.5 h-3.5 animate-pulse" />
            {label}
          </span>
        );
      case 'entregue':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {label}
          </span>
        );
      case 'faturado':
      case 'aprovado':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
            <FileText className="w-3.5 h-3.5" />
            {label}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            <Clock className="w-3.5 h-3.5" />
            {label}
          </span>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-black text-lg">Espelho do Pedido #{order.id}</h3>
                {getStatusBadge(order.status, order.statusLabel)}
              </div>
              <p className="text-slate-400 text-xs">Registrado em {order.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Imprimir Pedido"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {/* Customer Details */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Building className="w-3.5 h-3.5" /> Dados do Solicitante / Empresa
              </span>
              <p className="font-bold text-white text-sm">{user ? user.name : 'Cliente Cadastrado'}</p>
              {user && (
                <>
                  <p className="text-slate-400">Documento: <strong className="text-slate-200">{user.document}</strong></p>
                  <p className="text-slate-400">Contato: {user.contactPerson} ({user.phone})</p>
                  <p className="text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{user.address.street}, {user.address.number} - {user.address.city}/{user.address.state}</span>
                  </p>
                </>
              )}
            </div>

            {/* Logistics & Dispatch Info */}
            <div className="space-y-1.5 text-xs text-slate-300">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Logística & Despacho
              </span>
              <p className="font-semibold text-white">{order.shippingMethod}</p>
              {order.trackingCode && (
                <div className="mt-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                  <span className="text-slate-400 block text-[10px]">CÓDIGO DE RASTREIO:</span>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="font-mono font-bold text-amber-400">{order.trackingCode}</span>
                    {order.trackingUrl && (
                      <a 
                        href={order.trackingUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                      >
                        Acompanhar Carga <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
              {order.invoiceNumber && (
                <p className="text-slate-400">Documento Fiscal: <strong className="text-slate-200">{order.invoiceNumber}</strong></p>
              )}
              {order.estimatedDelivery && (
                <p className="text-slate-400">Previsão: <strong className="text-emerald-400">{order.estimatedDelivery}</strong></p>
              )}
            </div>
          </div>

          {/* Machine Info */}
          {order.machineModel && (
            <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400">Equipamento / Máquina Vinculada:</span>
              <span className="font-bold text-amber-400">{order.machineModel}</span>
            </div>
          )}

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm flex items-center justify-between">
              <span>Itens & Peças Solicitadas ({order.items.length})</span>
              {order.totalValue && (
                <span className="text-amber-400 text-sm font-extrabold">{order.totalValue}</span>
              )}
            </h4>

            <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center gap-3.5 bg-slate-950/40 hover:bg-slate-800/40 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg border border-slate-700 bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                        {item.brand}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        P/N: <strong>{item.partNumber}</strong>
                      </span>
                    </div>
                    <p className="text-white font-semibold text-xs mt-1 truncate">{item.name}</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Quantidade: <strong className="text-white">{item.quantity} un.</strong>
                      {item.unitPrice && (
                        <span className="ml-3">Unitário: <strong className="text-slate-300">{item.unitPrice}</strong></span>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Observation Notes */}
          {order.notes && (
            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400">
              <strong className="text-slate-300 block mb-1">Observações Técnicas / Despacho:</strong>
              {order.notes}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com Vendedor no WhatsApp</span>
          </a>

          <div className="flex items-center gap-2">
            {onRepeatOrder && (
              <button
                onClick={() => {
                  onRepeatOrder(order);
                  onClose();
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Repetir Cotação de Peças
              </button>
            )}
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
