import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  ArrowRight, 
  Check, 
  ShoppingCart, 
  MessageSquare, 
  Eye, 
  Layers, 
  Tag, 
  ShieldCheck, 
  Truck, 
  Search,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';

interface HomeFeaturedProductsProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  quoteItemIds: string[];
  onOpenFullCatalog: (category?: string) => void;
}

type TabType = 'maquinas' | 'destaques' | 'recentes';

export const HomeFeaturedProducts: React.FC<HomeFeaturedProductsProps> = ({
  products,
  onSelectProduct,
  onAddToQuote,
  quoteItemIds,
  onOpenFullCatalog
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('maquinas');

  // Filter machines (Pás Carregadeiras, Empilhadeiras COMMAQ)
  const machines = useMemo(() => {
    return products.filter((p) => 
      p.brand === 'COMMAQ' || 
      p.category === 'pas-carregadeiras' || 
      p.category === 'empilhadeiras' ||
      p.category === 'venda-de-maquinas' ||
      p.id.startsWith('commaq-')
    ).slice(0, 8);
  }, [products]);

  // Filter high-demand parts and featured items
  const featuredParts = useMemo(() => {
    const explicitlyFeatured = products.filter((p) => p.featured && p.brand !== 'COMMAQ');
    if (explicitlyFeatured.length >= 8) {
      return explicitlyFeatured.slice(0, 8);
    }
    // Supplement with key technical categories
    const technicalHighlightCategories = ['rolamentos', 'transmissao', 'sistema-de-freio', 'motor', 'sistema-hidraulico', 'filtros'];
    const supplements = products.filter((p) => 
      !explicitlyFeatured.some(ef => ef.id === p.id) &&
      technicalHighlightCategories.includes(p.category) &&
      p.brand !== 'COMMAQ'
    );
    return [...explicitlyFeatured, ...supplements].slice(0, 8);
  }, [products]);

  // Filter recent additions (imported technical items from catalog)
  const recentProducts = useMemo(() => {
    const nonMachines = products.filter(p => p.brand !== 'COMMAQ');
    // Return items from middle/recent batch to showcase variety
    return nonMachines.slice(12, 20);
  }, [products]);

  const currentList = useMemo(() => {
    switch (activeTab) {
      case 'maquinas':
        return machines;
      case 'destaques':
        return featuredParts;
      case 'recentes':
        return recentProducts;
      default:
        return machines;
    }
  }, [activeTab, machines, featuredParts, recentProducts]);

  return (
    <section id="destaques-home" className="py-14 sm:py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Seleção Principal & Destaques</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Máquinas e Peças em Evidência
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Confira os principais equipamentos COMMAQ, peças com pronta-entrega imediata e os últimos itens cadastrados no nosso estoque.
            </p>
          </div>

          {/* Quick CTA to Full Catalog */}
          <button
            onClick={() => onOpenFullCatalog()}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md group shrink-0 cursor-pointer"
          >
            <span>Ver Catálogo Completo (+560 itens)</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Tab Switcher: Máquinas, Destaques, Recentes */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('maquinas')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'maquinas'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <span className="text-base">🚜</span>
            <span>Máquinas COMMAQ</span>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === 'maquinas' ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 text-slate-700'}`}>
              {machines.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('destaques')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'destaques'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Peças em Destaque & Mais Buscadas</span>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === 'destaques' ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 text-slate-700'}`}>
              Destaques
            </span>
          </button>

          <button
            onClick={() => setActiveTab('recentes')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'recentes'
                ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/40'
                : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
            }`}
          >
            <Clock className="w-4 h-4 text-sky-600" />
            <span>Mais Recentes / Lançamentos</span>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === 'recentes' ? 'bg-slate-950 text-amber-400' : 'bg-slate-200 text-slate-700'}`}>
              Novos
            </span>
          </button>
        </div>

        {/* Featured Products Grid (Curated 8 items) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentList.map((product) => {
            const isAdded = quoteItemIds.includes(product.id);
            const isMachine = product.brand === 'COMMAQ' || product.category === 'pas-carregadeiras';

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative h-52 bg-slate-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                          e.currentTarget.src = product.fallbackImage;
                        }
                      }}
                    />

                    {/* Badge COMMAQ / Original */}
                    {product.brand === 'COMMAQ' ? (
                      <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-slate-950" />
                        <span>COMMAQ Original</span>
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow uppercase tracking-wider">
                        {product.brand}
                      </div>
                    )}

                    {/* Stock status badge */}
                    {product.inStock && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3" />
                        <span>Pronta Entrega</span>
                      </div>
                    )}

                    {/* Quick View Hover Button */}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white font-bold text-xs cursor-pointer backdrop-blur-xs"
                      title="Ver ficha técnica completa"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Ver Ficha Técnica</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    {/* Category & Part Number */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5 font-medium">
                      <span className="uppercase text-amber-700 font-bold truncate max-w-[150px]">
                        {product.categoryName || product.category}
                      </span>
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-semibold truncate max-w-[130px]">
                        PN: {product.partNumber}
                      </span>
                    </div>

                    {/* Product Title */}
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 hover:text-amber-600 cursor-pointer transition-colors"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* Highlights or Specs tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {product.compatibleModels.slice(0, 2).map((mod, i) => (
                        <span 
                          key={i} 
                          className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-200/60 truncate max-w-[180px]"
                        >
                          {mod}
                        </span>
                      ))}
                      {product.compatibleModels.length > 2 && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold">
                          +{product.compatibleModels.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price/Quote & Actions */}
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline justify-between mb-3 pt-3">
                    <span className="text-[11px] text-slate-500 font-medium">Condição:</span>
                    <span className="text-xs font-bold text-slate-900">
                      {product.price || (isMachine ? 'Consulte Financiamento' : 'Sob Cotação Imediata')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-2 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-600" />
                      <span>Detalhes</span>
                    </button>

                    <button
                      onClick={() => onAddToQuote(product)}
                      className={`w-full text-xs font-bold py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Na Lista</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Cotar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Banner CTA: Explore Full Catalog (+560 items) */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
                <Layers className="w-4 h-4" />
                <span>Catálogo Técnico Completo COMMAQ</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                Mais de 560 Peças, Rolamentos e Componentes em Estoque
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Navegue pela página de catálogo com busca rápida por <strong>Part Number</strong>, código <strong>OEM</strong>, marcas compatíveis (XGMA, SDLG, LiuGong, Hyundai, Case, Cummins) e filtros por sistemas completos de motor, freio, transmissão e hidráulica.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  +560 Peças Cadastradas
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <Truck className="w-3.5 h-3.5 text-amber-400" />
                  Despacho Imediato p/ MT e Brasil
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Garantia e Nota Fiscal
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenFullCatalog()}
                className="inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/25 cursor-pointer group"
              >
                <span>Acessar Catálogo Completo (560+)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/556536261010?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20uma%20pe%C3%A7a%20espec%C3%ADfica%20no%20estoque%20da%20COMMAQ."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
