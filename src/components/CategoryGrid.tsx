import React, { useState } from 'react';
import { 
  ArrowRight, 
  Cog, 
  ShieldAlert, 
  Activity, 
  Wrench, 
  Layers, 
  Filter, 
  Maximize2, 
  Zap,
  Truck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryItem } from '../types';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
  customCategories?: CategoryItem[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  activeCategory,
  customCategories = []
}) => {
  const [showAll, setShowAll] = useState(false);

  // Merge static metadata with dynamic categories
  const displayCategories = React.useMemo(() => {
    if (customCategories && customCategories.length > 0) {
      return customCategories.map((c) => {
        const foundStatic = CATEGORIES.find((sc) => sc.id === c.id || sc.name.toLowerCase() === c.name.toLowerCase());
        return {
          id: c.id,
          name: c.name,
          shortDesc: c.description || foundStatic?.shortDesc || 'Componentes e peças técnicas de alta performance para maquinário pesado.',
          itemCount: foundStatic?.itemCount || '+1.000 itens',
          image: foundStatic?.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          iconName: foundStatic?.iconName || 'Cog',
          subcategories: foundStatic?.subcategories || ['Peças Originais', 'Pronta Entrega', 'Garantia']
        };
      });
    }
    return CATEGORIES;
  }, [customCategories]);

  const visibleCategories = showAll ? displayCategories : displayCategories.slice(0, 8);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'Filter':
        return <Filter className="w-5 h-5" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Cog':
      default:
        return <Cog className="w-5 h-5" />;
    }
  };

  return (
    <section id="categorias" className="py-14 sm:py-18 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 font-extrabold text-xs tracking-wider uppercase">
                Departamentos &amp; Linhas de Atuação
              </span>
              <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {displayCategories.length} categorias cadastradas
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Catálogo Especializado por Marca e Departamento
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Navegue pelos departamentos oficiais da COMMAQ. Selecione qualquer categoria para filtrar instantaneamente as peças em estoque.
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {visibleCategories.map((category) => {
            const isSelected = activeCategory === category.id;

            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={`group cursor-pointer rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-50/20 shadow-md'
                    : 'border-slate-200 bg-white hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                {/* Image & Overlay */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Category icon badge */}
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                    {renderIcon(category.iconName)}
                  </div>

                  {/* Item count tag */}
                  <div className="absolute bottom-3 right-3 text-[11px] font-bold text-white bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 rounded border border-white/10">
                    {category.itemCount}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-amber-600 transition-colors uppercase tracking-tight">
                      {category.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {category.shortDesc}
                    </p>

                    {/* Subcategories tags */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub, idx) => (
                        <span 
                          key={idx} 
                          className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600 group-hover:text-amber-700">
                    <span>{isSelected ? 'Departamento Filtrado' : 'Ver Peças do Departamento'}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ver Todos os Departamentos Toggle */}
        {displayCategories.length > 8 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              <span>{showAll ? 'Mostrar Menos Departamentos' : `Ver Todos os ${displayCategories.length} Departamentos`}</span>
              {showAll ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
