import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  ShoppingCart, 
  MessageSquare, 
  Info, 
  SlidersHorizontal, 
  RotateCcw,
  LayoutGrid,
  List,
  Check,
  Tag,
  Shield,
  Sparkles,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText
} from 'lucide-react';
import { Product, MachineCategory, Brand, CategoryItem } from '../types';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  selectedMachineType: string;
  onSelectMachineType: (type: string) => void;
  onOpenProductDetail: (product: Product) => void;
  onAddToQuote: (product: Product) => void;
  quoteItemIds: string[];
  customCategories?: CategoryItem[];
  onBackToHome?: () => void;
  isStandalonePage?: boolean;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  selectedBrand,
  onSelectBrand,
  selectedMachineType,
  onSelectMachineType,
  onOpenProductDetail,
  onAddToQuote,
  quoteItemIds,
  customCategories = [],
  onBackToHome,
  isStandalonePage = false
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(24);

  const brands: Brand[] = [
    'COMMAQ',
    'Hyundai',
    'Case Construction',
    'New Holland',
    'SDLG',
    'John Deere',
    'XCMG',
    'LiuGong',
    'Changlin',
    'Clark',
    'Hangcha',
    'Heli',
    'SEM',
    'Shantui',
    'XGMA',
    'Sinomach',
    'Titan',
    'Caterpillar',
    'Komatsu',
    'Volvo CE',
    'JCB',
    'Multimarcas'
  ];

  const defaultCategories: { id: string; label: string }[] = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'pas-carregadeiras', label: 'Pás Carregadeiras' },
    { id: 'empilhadeiras', label: 'Empilhadeiras' },
    { id: 'motor', label: 'Motor' },
    { id: 'transmissao', label: 'Transmissão' },
    { id: 'rolamentos', label: 'Rolamentos' },
    { id: 'filtros', label: 'Filtros' },
    { id: 'retentores', label: 'Retentores' },
    { id: 'sistema-de-freio', label: 'Sistema de Freio' },
    { id: 'sistema-hidraulico', label: 'Sistema Hidráulico' },
    { id: 'sistema-eletrico', label: 'Sistema Elétrico' },
    { id: 'juntas-e-calcos', label: 'Juntas e Calços' },
    { id: 'porcas-e-parafusos', label: 'Porcas e Parafusos' },
    { id: 'diferencial', label: 'Diferencial' },
    { id: 'uso-geral', label: 'Uso Geral' }
  ];

  const categoryTabs = useMemo(() => {
    if (customCategories && customCategories.length > 0) {
      return [
        { id: 'all', label: 'Todas as Peças' },
        ...customCategories.map((c) => ({ id: c.id, label: c.name }))
      ];
    }
    return defaultCategories;
  }, [customCategories]);

  // Filtering
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand && prod.brand !== selectedBrand) {
        return false;
      }

      // Machine Type filter
      if (selectedMachineType && !prod.machineTypes.includes(selectedMachineType as any)) {
        return false;
      }

      // In-stock filter
      if (onlyInStock && !prod.inStock) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = prod.name.toLowerCase().includes(query);
        const matchPn = prod.partNumber.toLowerCase().includes(query);
        const matchOem = prod.oemCode?.toLowerCase().includes(query) || false;
        const matchBrand = prod.brand.toLowerCase().includes(query);
        const matchModels = prod.compatibleModels.some(m => m.toLowerCase().includes(query));
        const matchDesc = prod.description.toLowerCase().includes(query);

        if (!matchName && !matchPn && !matchOem && !matchBrand && !matchModels && !matchDesc) {
          return false;
        }
      }

      return true;
    });
  }, [products, activeCategory, selectedBrand, selectedMachineType, onlyInStock, searchTerm]);

  const hasFiltersApplied = activeCategory !== 'all' || selectedBrand !== '' || selectedMachineType !== '' || searchTerm.trim() !== '' || onlyInStock;

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, selectedBrand, selectedMachineType, searchTerm, onlyInStock, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    if (itemsPerPage >= 9999) return filteredProducts;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    onSelectCategory('all');
    onSelectBrand('');
    onSelectMachineType('');
    onSearchChange('');
    setOnlyInStock(false);
  };

  return (
    <section id="catalogo" className="py-12 sm:py-16 bg-slate-50 min-h-[700px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb / Back to Home navigation */}
        {onBackToHome && (
          <div className="mb-6 pb-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <button 
                onClick={onBackToHome}
                className="hover:text-amber-600 font-bold transition-colors cursor-pointer"
              >
                Início
              </button>
              <span>/</span>
              <span className="text-slate-900 font-bold">Catálogo Completo</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-300">
                {products.length} itens cadastrados
              </span>
            </div>

            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-300 px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-600" />
              <span>Voltar para a Página Inicial</span>
            </button>
          </div>
        )}

        {/* Header & Title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Catálogo Técnico com Part Number
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Peças de Reposição em Estoque
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Consulte especificações técnicas, compatibilidade por modelo de máquina e solicite cotação instantânea.
            </p>
          </div>

          {/* View Mode & Stock Filter & PDF Download */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <a
              href="/downloads/catalogo-commaquinas-2026.pdf"
              download="catalogo-commaquinas-2026.pdf"
              className="text-xs font-bold px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow transition-colors"
              title="Baixar Catálogo Completo em PDF"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>Baixar Catálogo PDF</span>
            </a>

            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-colors flex items-center gap-1.5 ${
                onlyInStock 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${onlyInStock ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Apenas Pronta Entrega</span>
            </button>

            <div className="flex items-center bg-white border border-slate-300 rounded-lg p-1 text-slate-600">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-slate-900'}`}
                title="Visualização em Grade"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-slate-900'}`}
                title="Visualização em Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Bar */}
        <div className="mt-6 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-amber-400 shadow-sm ring-1 ring-slate-800 font-bold'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Horizontal Pills */}
        <div className="mt-3 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max text-xs">
            <span className="text-slate-500 font-bold uppercase text-[10px] pl-1 pr-2 tracking-wider flex items-center gap-1">
              <Tag className="w-3 h-3" /> Marca:
            </span>
            <button
              onClick={() => onSelectBrand('')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedBrand === ''
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Todas
            </button>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => onSelectBrand(selectedBrand === b ? '' : b)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedBrand === b
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Search status & Reset bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'peça encontrada' : 'peças encontradas'}
            </span>
            {hasFiltersApplied && (
              <span className="text-slate-400 font-normal">
                (filtros ativos)
              </span>
            )}
          </div>

          {hasFiltersApplied && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar todos os filtros</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="mt-12 bg-white rounded-xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Nenhuma peça encontrada com esses critérios
            </h3>
            <p className="text-xs text-slate-600 mt-2 mb-6">
              Nosso estoque conta com mais de 35.000 itens físicos que podem não estar listados no catálogo online. Fale diretamente com nossa mesa de vendas!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs"
              >
                Limpar Filtros
              </button>
              <a
                href={`https://wa.me/5565999884000?text=Ol%C3%A1,%20estou%20procurando%20a%20pe%C3%A7a%20${encodeURIComponent(searchTerm || 'para minha máquina')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Consultar Vendedor no WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Products Grid View */}
        {filteredProducts.length > 0 && viewMode === 'grid' && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedProducts.map((product) => {
              const isAdded = quoteItemIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                            e.currentTarget.src = product.fallbackImage;
                          }
                        }}
                      />
                      
                      {/* Condition Badge */}
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                        {product.condition}
                      </div>

                      {/* In Stock Badge */}
                      {product.inStock && (
                        <div className="absolute top-2.5 right-2.5 bg-emerald-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3" />
                          <span>Pronta Entrega</span>
                        </div>
                      )}

                      {/* Brand Pill */}
                      <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm border border-slate-200">
                        {product.brand}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Part Number Badge & Commercial Status */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                          {product.category === 'pas-carregadeiras' || product.category === 'empilhadeiras' ? 'CÓD' : 'P/N'}: {product.partNumber}
                        </span>
                        {product.isUnderQuote ? (
                          <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded uppercase tracking-wider">
                            Sob Consulta
                          </span>
                        ) : product.oemCode ? (
                          <span className="text-[10px] text-slate-500 font-mono">
                            OEM: {product.oemCode.split('/')[0]}
                          </span>
                        ) : null}
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onOpenProductDetail(product)}
                        className="font-bold text-sm text-slate-900 hover:text-amber-600 transition-colors cursor-pointer line-clamp-2 min-h-[40px]"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Category */}
                      <div className="text-[11px] text-slate-500 mt-1">
                        {product.categoryName}
                      </div>

                      {/* Compatible models sample */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          {product.category === 'pas-carregadeiras' || product.category === 'empilhadeiras' ? 'Destaques do Equipamento:' : 'Aplicações Principais:'}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {product.compatibleModels.slice(0, 2).map((m, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              {m}
                            </span>
                          ))}
                          {product.compatibleModels.length > 2 && (
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded">
                              +{product.compatibleModels.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenProductDetail(product)}
                        className="w-full text-center py-2 px-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        <Info className="w-3.5 h-3.5 text-slate-500" />
                        <span>Ficha Técnica</span>
                      </button>

                      <a
                        href={`https://wa.me/556536261010?text=Ol%C3%A1%20COMMAQ!%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20para%20o%20item:%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.partNumber)}).`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center py-2 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>

                    {/* Add to Quote Button */}
                    <button
                      onClick={() => onAddToQuote(product)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{isAdded ? 'Item na Lista de Cotação ✓' : '+ Adicionar à Cotação'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Products List View */}
        {filteredProducts.length > 0 && viewMode === 'list' && (
          <div className="mt-6 space-y-3">
            {paginatedProducts.map((product) => {
              const isAdded = quoteItemIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-amber-400 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all shadow-xs"
                >
                  {/* Image & Basic info */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-slate-200 shrink-0"
                      loading="lazy"
                      onError={(e) => {
                        if (product.fallbackImage && e.currentTarget.src !== product.fallbackImage) {
                          e.currentTarget.src = product.fallbackImage;
                        }
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                          {product.category === 'pas-carregadeiras' || product.category === 'empilhadeiras' ? 'CÓD' : 'P/N'}: {product.partNumber}
                        </span>
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                        {product.isUnderQuote ? (
                          <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                            Preço Sob Consulta
                          </span>
                        ) : (
                          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                            <Check className="w-3 h-3" /> Em estoque
                          </span>
                        )}
                      </div>
                      <h3
                        onClick={() => onOpenProductDetail(product)}
                        className="font-bold text-base text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.compatibleModels.map((m, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Ficha Técnica
                    </button>

                    <a
                      href={`https://wa.me/556536261010?text=Ol%C3%A1%20COMMAQ!%20Gostaria%20de%20uma%20cota%C3%A7%C3%A3o%20para%20o%20item:%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.partNumber)}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Cotar WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onAddToQuote(product)}
                      className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{isAdded ? 'Adicionado ✓' : 'Adicionar à Cotação'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {filteredProducts.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Range info */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span>
                Mostrando <strong className="text-slate-900">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}</strong> a{' '}
                <strong className="text-slate-900">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> de{' '}
                <strong className="text-slate-900">{filteredProducts.length}</strong> peças
              </span>

              {/* Items per page selector */}
              <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-slate-200">
                <span className="text-slate-500">Por página:</span>
                {[24, 48, 96].map((num) => (
                  <button
                    key={num}
                    onClick={() => setItemsPerPage(num)}
                    className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                      itemsPerPage === num
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Page buttons */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                    currentPage === 1
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 cursor-pointer'
                  }`}
                  title="Página Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                <div className="flex items-center gap-1">
                  {/* Generate visible page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .reduce<(number | string)[]>((acc, page, idx, arr) => {
                      if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                        acc.push('...');
                      }
                      acc.push(page);
                      return acc;
                    }, [])
                    .map((item, idx) => {
                      if (item === '...') {
                        return (
                          <span key={`ellipsis-${idx}`} className="px-2 text-xs text-slate-400">
                            ...
                          </span>
                        );
                      }
                      const pageNum = item as number;
                      const isCurrent = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors flex items-center justify-center cursor-pointer ${
                            isCurrent
                              ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                    currentPage === totalPages
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 cursor-pointer'
                  }`}
                  title="Próxima Página"
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
