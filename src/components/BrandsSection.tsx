import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Brand } from '../types';

interface BrandsSectionProps {
  onSelectBrand: (brand: string) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onSelectBrand }) => {
  const brandsList: { name: Brand; logoText: string; highlight: string; models: string }[] = [
    {
      name: 'Caterpillar',
      logoText: 'CAT',
      highlight: 'Escavadeiras 320/330, Carregadeiras 924/938, Tratores D6/D8 e Patrolas 120/140',
      models: 'Linha Amarela Completa'
    },
    {
      name: 'Komatsu',
      logoText: 'KOMATSU',
      highlight: 'Escavadeiras PC200/PC210, Tratores D61/D65 e Pás Carregadeiras WA200/WA320',
      models: 'Material Rodante & Motores'
    },
    {
      name: 'Case Construction',
      logoText: 'CASE',
      highlight: 'Retroescavadeiras 580M/580N, Pás 621/721 e Motoniveladoras 845B/865B',
      models: 'Transmissão & Hidráulica'
    },
    {
      name: 'JCB',
      logoText: 'JCB',
      highlight: 'Retroescavadeiras 3CX/4CX, Manipuladores Telescópicos Loadall e Escavadeiras JS',
      models: 'Pinos, Buchas & Reparos'
    },
    {
      name: 'Volvo CE',
      logoText: 'VOLVO',
      highlight: 'Escavadeiras EC210/EC240, Pás Carregadeiras L60/L90 e Motoniveladoras G930',
      models: 'Bombas & Rodante'
    },
    {
      name: 'New Holland',
      logoText: 'NEW HOLLAND',
      highlight: 'Retroescavadeiras B95/B110, Escavadeiras E215 e Motoniveladoras RG140/RG170',
      models: 'Linha Construção & Campo'
    },
    {
      name: 'Hyundai',
      logoText: 'HYUNDAI',
      highlight: 'Escavadeiras R210/R220/HX220 e Pás Carregadeiras HL740/HL760',
      models: 'Linha Pesada & FPS'
    },
    {
      name: 'John Deere',
      logoText: 'JOHN DEERE',
      highlight: 'Retroescavadeiras 310J/310K/310L, Tratores de Esteira 750J e Pás 624K',
      models: 'Bombas, Filtros & Transmissão'
    }
  ];

  return (
    <section id="marcas" className="py-14 sm:py-18 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-400 font-extrabold text-xs tracking-wider uppercase">
            Cobertura Multimarcas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
            Peças para as Principais Frotas e Fabricantes do Mercado
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Dispomos de amplo estoque para reposição imediata em equipamentos de construção pesada, terraplenagem, mineração e agronegócio.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {brandsList.map((brand) => (
            <div
              key={brand.name}
              onClick={() => onSelectBrand(brand.name)}
              className="group cursor-pointer bg-slate-950 border border-slate-800 hover:border-amber-500 rounded-xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-lg text-amber-400 tracking-tight">
                    {brand.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                    {brand.models}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {brand.highlight}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-500 group-hover:text-amber-400">
                <span>Ver peças desta marca</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 text-center sm:text-left">
            <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 hidden sm:block" />
            <span>
              Também fornecemos componentes para <strong>LiuGong, Doosan, Yanmar, Dynapac, Valtra e Massey Ferguson</strong>.
            </span>
          </div>

          <a
            href="https://wa.me/5565999884000?text=Ol%C3%A1!%20Voc%C3%AAs%20t%C3%AAm%20pe%C3%A7as%20para%20a%20minha%20m%C3%A1quina?"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-4 py-2.5 rounded-lg transition-colors"
          >
            Consultar Outras Marcas
          </a>
        </div>

      </div>
    </section>
  );
};
