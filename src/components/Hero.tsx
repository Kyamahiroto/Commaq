import React, { useState } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  MessageSquare, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Layers,
  FileSpreadsheet,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  FileText
} from 'lucide-react';
import { MACHINE_MODELS_BY_BRAND, MACHINE_TYPES, PRODUCTS } from '../data/products';
import { Brand, Product } from '../types';

interface HeroProps {
  onSearchByMachine: (machineType: string, brand: string, model: string) => void;
  onOpenChassisModal: () => void;
  onScrollToCatalog: () => void;
  onSelectProduct?: (product: Product) => void;
}

const COMMAQ_FEATURED_MACHINES = [
  {
    id: 'commaq-938-loader',
    tag: 'LINHA PESADA',
    name: 'Pá Carregadeira COMMAQ 938',
    capacity: '3.000 kg / 1,8 m³',
    engine: 'Motor Deutz 6 Cilindros (125 cv) Turbo',
    highlight: 'Engate rápido hidráulico de fábrica e ar-condicionado',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1000&q=80',
    details: '11.000 kg peso operacional · Altura pino 4.050 mm'
  },
  {
    id: 'commaq-930t-telescopic',
    tag: 'ALTO ALCANCE',
    name: 'Pá Carregadeira Telescópica 930t',
    capacity: 'Braço Telescópico (5,6m)',
    engine: 'Weichai Deutz WP6G (125 cv)',
    highlight: 'Câmera de ré, rádio e despejo vertical em carretas altas',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80',
    details: 'Altura de descarga 4.710 mm · Concha 1,6 m³'
  },
  {
    id: 'commaq-937h-loader',
    tag: 'MOTOR CUMMINS',
    name: 'Pá Carregadeira COMMAQ 937H',
    capacity: '3.000 kg / 1,83 m³',
    engine: 'Cummins 6BT (130 cv) Turbo Mecânico',
    highlight: 'Joystick servo-assistido e bomba injetora mecânica',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    details: '10.200 kg peso operacional · Confiabilidade extrema'
  },
  {
    id: 'commaq-fd30-diesel-47m',
    tag: 'MOVIMENTAÇÃO DIESEL',
    name: 'Empilhadeira FD30 Diesel',
    capacity: '3.000 kg · Torre Triplex',
    engine: 'Motor Industrial Xinchai Diesel',
    highlight: 'Transmissão TCM, deslocador lateral e 4ª via hidráulica',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    details: 'Torre 4,7m e 6,0m com elevação livre total'
  },
  {
    id: 'commaq-fd30-glp-47m',
    tag: 'MOVIMENTAÇÃO GLP',
    name: 'Empilhadeira FD30 GLP',
    capacity: '3.000 kg · Torre Triplex',
    engine: 'Motor Nissan K25 Industrial',
    highlight: 'Baixa emissão, transmissão TCM e cabine com coxins',
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=1000&q=80',
    details: 'Torres 4,7m e 6,0m ideais para armazenagem interna'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onSearchByMachine,
  onOpenChassisModal,
  onScrollToCatalog,
  onSelectProduct
}) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const brandsList: Brand[] = [
    'COMMAQ',
    'Caterpillar',
    'Komatsu',
    'Case Construction',
    'JCB',
    'Volvo CE',
    'New Holland',
    'Hyundai',
    'John Deere',
    'Changlin',
    'Clark',
    'Hangcha',
    'Heli'
  ];

  const availableModels = selectedBrand && MACHINE_MODELS_BY_BRAND[selectedBrand] 
    ? MACHINE_MODELS_BY_BRAND[selectedBrand] 
    : [];

  const handleFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchByMachine(selectedType, selectedBrand, selectedModel);
  };

  return (
    <section id="inicio" className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Graphic & Texture */}
      <div 
        className="absolute inset-0 z-0 opacity-15 bg-cover bg-center mix-blend-luminosity"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1200&q=80')" 
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/90" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            COMMAQ · Máquinas Pesadas & Peças Industriais em Cuiabá/MT
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-amber-400 text-xs font-bold shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Localizador de Peças Multimarcas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Máquinas Pesadas & <br />
              <span className="text-amber-500 drop-shadow-sm">Peças de Reposição Genuínas</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Distribuição oficial de <strong>pás carregadeiras e empilhadeiras COMMAQ</strong> a pronta-entrega em Mato Grosso, além de catálogo com <strong>mais de 500 peças e componentes industriais</strong> para motores, transmissões, freios, filtros e rodantes multimarcas.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onScrollToCatalog}
                id="btn-hero-catalog"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
              >
                <span>Navegar no Catálogo</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/556536261010?text=Ol%C3%A1%20COMMAQ!%20Gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20urgente%20de%20m%C3%A1quinas%20ou%20pe%C3%A7as."
                target="_blank"
                rel="noopener noreferrer"
                id="btn-hero-whatsapp"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3.5 rounded-lg shadow transition-all flex items-center gap-2 text-sm tracking-wide"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>Cotar no WhatsApp (65) 3626-1010</span>
              </a>

              <a
                href="/downloads/catalogo-commaquinas-2026.pdf"
                download="catalogo-commaquinas-2026.pdf"
                id="btn-hero-download-pdf"
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 hover:border-amber-400 font-bold px-4 py-3.5 rounded-lg shadow transition-all flex items-center gap-2 text-sm tracking-wide"
                title="Baixar Catálogo Geral de Peças e Máquinas em PDF"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Baixar Catálogo PDF</span>
              </a>

            </div>

            {/* Micro proof tags */}
            <div className="pt-3 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Pronta Entrega em Cuiabá & Despacho Brasil
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Garantia de Procedência e Nota Fiscal Eletrônica
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Faturamento Direto PJ & Financiamentos
              </span>
            </div>
          </div>

          {/* Right Column: Localizador Rápido de Peças (Exclusivo, sem vitrine conforme solicitado) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-sm relative">
              <div className="absolute -top-3 left-6 bg-amber-500 text-slate-950 text-[11px] font-black uppercase px-3 py-1 rounded shadow tracking-wider">
                Localizador Rápido
              </div>

              <div className="mb-5 pt-1">
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-400" />
                  <span>Encontre Peças da Sua Máquina</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Selecione o equipamento e veja instantaneamente peças compatíveis com pronta entrega:
                </p>
              </div>

              <form onSubmit={handleFinderSubmit} className="space-y-4">
                {/* 1. Tipo de Máquina */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    1. Tipo de Equipamento
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="">Todos os tipos (ou selecione)</option>
                    {MACHINE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Fabricante / Marca */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    2. Fabricante / Marca
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => {
                      setSelectedBrand(e.target.value);
                      setSelectedModel('');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer"
                  >
                    <option value="">Todas as marcas (ou selecione)</option>
                    {brandsList.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Modelo da Máquina */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                    3. Modelo ou Família
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedBrand}
                    className={`w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer ${
                      !selectedBrand ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="">
                      {selectedBrand ? 'Todos os modelos da marca' : 'Selecione a marca primeiro'}
                    </option>
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  id="btn-filter-machine-parts"
                  className="w-full bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer shadow-lg mt-3"
                >
                  <Search className="w-4 h-4" />
                  <span>Filtrar Peças Compatíveis</span>
                </button>

                <div className="text-center pt-1.5">
                  <span className="text-[11px] text-slate-400">
                    Tem apenas a plaqueta ou número de série?{' '}
                    <button
                      type="button"
                      onClick={onOpenChassisModal}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      Cotação por Plaqueta
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* 4 Pillars Trust Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">+500 Peças Catalogadas</h4>
              <p className="text-xs text-slate-400 mt-0.5">Estoque físico a pronta entrega em MT</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Despacho Imediato</h4>
              <p className="text-xs text-slate-400 mt-0.5">Transporte expresso para todo o Brasil</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Garantia COMMAQ</h4>
              <p className="text-xs text-slate-400 mt-0.5">Procedência técnica e nota fiscal</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Suporte Técnico MT</h4>
              <p className="text-xs text-slate-400 mt-0.5">Atendimento ágil em Cuiabá</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
