import React from 'react';
import { 
  Building2, 
  Award, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Truck, 
  CheckCircle 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Imagery and stats badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="Galpão de Peças COMMAQ"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Infraestrutura e Pronta Entrega
                </span>
                <p className="text-sm font-semibold">
                  Armazém estruturado com milhares de itens para reposição imediata.
                </p>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-amber-500 text-slate-950 p-4 sm:p-5 rounded-xl shadow-xl border-2 border-white">
              <span className="block text-2xl sm:text-3xl font-black">
                +20 Anos
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">
                No Mercado de Peças Pesadas
              </span>
            </div>
          </div>

          {/* Right: Text Story */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-amber-600 font-extrabold text-xs tracking-wider uppercase">
                Quem Somos
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                COMMAQ: Soluções Confiáveis para o Mercado de Linha Amarela
              </h2>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              A <strong>COMMAQ</strong> nasceu com o propósito de atender a demanda crítica de peças de reposição para máquinas pesadas, tratores e equipamentos de grande porte. Sabemos que na construção civil, mineração e agronegócio, cada dia de máquina inoperante representa custos severos.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Por isso, mantemos um dos maiores e mais completos estoques do Centro-Oeste brasileiro, com canais de distribuição aérea e terrestre capacitados a atender obras, fazendas e frotistas em qualquer região do Brasil com prazos recordes e suporte técnico humanizado.
            </p>

            {/* Credibility Checklist */}
            <div className="pt-2 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Especialistas certificados:</strong> Equipe treinada nos catálogos de peças das principais marcas.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Estoque real com Nota Fiscal:</strong> 100% de produtos novos com garantia formal e rastreabilidade.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>Atendimento corporativo B2B:</strong> Cadastro facilitado para compras faturadas de frotas e empresas.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contato"
                className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Conhecer Nossos Canais de Contato
              </a>

              <a
                href="https://wa.me/556536261010?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20COMMAQ."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Falar com a Diretoria Comercial
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
