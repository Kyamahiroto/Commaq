import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShoppingCart, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Layers
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product) => void;
  isAddedToQuote: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  isAddedToQuote
}) => {
  if (!product) return null;

  const isMachine = product.category === 'pas-carregadeiras' || product.category === 'empilhadeiras' || product.isUnderQuote;

  const whatsappMessage = encodeURIComponent(
    isMachine
      ? `Olá equipe comercial da COMMAQ!\nTenho interesse no equipamento:\n• *${product.name}*\n• Modelo/Código: *${product.partNumber}*\n• Marca: ${product.brand}\n• Categoria: ${product.categoryName}\n\nPoderiam me enviar a proposta comercial formal com valores, ficha técnica e prazos de entrega/faturamento para Cuiabá e região?`
      : `Olá equipe COMMAQ!\nEstou consultando a peça:\n• *${product.name}*\n• Part Number: *${product.partNumber}*\n• Fabricante: ${product.brand}\n• Código OEM: ${product.oemCode || 'N/A'}\n\nPoderiam me informar o valor, prazo de entrega e disponibilidade de envio?`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="font-mono font-extrabold text-sm bg-amber-500 text-slate-950 px-2.5 py-1 rounded">
              {isMachine ? 'MODELO / CÓDIGO:' : 'PART NUMBER:'} {product.partNumber}
            </span>
            <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded">
              {product.brand}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Image Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 sm:h-64 object-cover"
                  onError={(e) => {
                    if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                      e.currentTarget.src = product.fallbackImage;
                    }
                  }}
                />
                <div className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {product.condition}
                </div>
              </div>

              {/* Badges */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{product.stockQuantityText || 'Disponível a pronta entrega com envio imediato'}</span>
                </div>
                <div className="p-2.5 bg-slate-100 rounded-lg text-slate-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Garantia: {product.warranty}</span>
                </div>
                {product.weightKg && (
                  <div className="p-2.5 bg-slate-100 rounded-lg text-slate-700 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Peso aproximado: {product.weightKg} kg</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  {product.categoryName}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                  {product.name}
                </h2>
                {product.oemCode && (
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    Códigos Equivalentes / OEM: <strong className="text-slate-800">{product.oemCode}</strong>
                  </p>
                )}
              </div>

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                {product.description}
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Especificações Técnicas
                </h4>
                <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                  <div className="divide-y divide-slate-200">
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <div key={idx} className="grid grid-cols-2 p-2.5 bg-white even:bg-slate-50/70">
                        <span className="font-semibold text-slate-600">{key}:</span>
                        <span className="text-slate-900 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ESPECIFICAÇÕES TÉCNICAS COMPLEMENTARES */}
              {product.futureFields && Object.keys(product.futureFields).length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Especificações Técnicas Complementares:
                  </h4>
                  <div className="border border-amber-200 rounded-lg overflow-hidden text-xs bg-amber-50/30">
                    <div className="divide-y divide-amber-200/60">
                      {Object.entries(product.futureFields).map(([key, value], idx) => (
                        <div key={idx} className="grid grid-cols-2 p-2.5">
                          <span className="font-semibold text-slate-700">{key}:</span>
                          <span className="text-slate-900 font-bold">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preço ou Cotação WhatsApp */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Preço Estimado:</span>
                {product.price && !product.isUnderQuote ? (
                  <span className="text-base font-black text-slate-900">R$ {product.price}</span>
                ) : (
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2.5 py-1 rounded border border-amber-300">
                    Sob Consulta / Cotação WhatsApp
                  </span>
                )}
              </div>

              {/* Machine Compatibility */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
                  Máquinas e Modelos Compatíveis:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {product.compatibleModels.map((model, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 rounded"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span>Dúvidas na aplicação? Fale com nossa engenharia de peças.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onAddToQuote(product)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAddedToQuote
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isAddedToQuote ? 'Item na Cotação ✓' : 'Adicionar à Lista de Cotação'}</span>
            </button>

            <a
              href={`https://wa.me/556536261010?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Cotar no WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
