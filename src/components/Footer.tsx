import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  ChevronRight,
  Clock,
  FileText,
  RefreshCw,
  Lock,
  Download
} from 'lucide-react';
import { MachineCategory, CategoryItem } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenChassisModal: () => void;
  onOpenLegalDoc?: (doc: 'politica-troca' | 'termos-uso') => void;
  categories?: CategoryItem[];
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
  onOpenChassisModal,
  onOpenLegalDoc,
  categories = []
}) => {
  const displayCats = categories.length > 0 ? categories.slice(0, 8) : [
    { id: 'pas-carregadeiras', name: 'PÁS CARREGADEIRAS' },
    { id: 'empilhadeiras', name: 'EMPILHADEIRAS' },
    { id: 'venda-de-maquinas', name: 'VENDA DE MAQUINAS' },
    { id: 'pecas', name: 'PEÇAS' },
    { id: 'locacao', name: 'LOCAÇÃO' },
    { id: 'pecas-pa-carregadeira-hyundai', name: 'PEÇAS PA CARREGADEIRA HYUNDAI' },
    { id: 'pa-carregadeiras-case', name: 'PÁ CARREGADEIRAS CASE' },
    { id: 'pa-carregadeira-sdlg', name: 'PÁ CARREGADEIRA SDLG' }
  ];

  const handleLegalClick = (doc: 'politica-troca' | 'termos-uso') => {
    if (onOpenLegalDoc) {
      onOpenLegalDoc(doc);
    } else {
      window.location.hash = doc;
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">Despacho para Todo o Brasil</h5>
              <p className="text-slate-400 text-xs mt-0.5">Parcerias com as melhores transportadoras e frete aéreo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">Garantia e Procedência</h5>
              <p className="text-slate-400 text-xs mt-0.5">Peças inspecionadas e 100% com Nota Fiscal Eletrônica</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">Faturamento Facilitado</h5>
              <p className="text-slate-400 text-xs mt-0.5">Boleto bancário a prazo para empresas e produtores rurais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand Col & Address */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => onNavigateSection('inicio')}
              className="cursor-pointer inline-flex items-center"
              title="COMMAQ - Centro-Oeste Máquinas"
            >
              <Logo className="h-11 w-auto" />
            </div>

            <p className="text-slate-400 leading-relaxed text-xs pr-4">
              Distribuidora e comércio de peças de reposição para escavadeiras, pás carregadeiras, retroescavadeiras, motoniveladoras e tratores de esteira. Agilidade de despacho para não deixar sua máquina parar.
            </p>

            {/* Endereço Atualizado e Horário */}
            <div className="pt-2 text-slate-300 space-y-2 text-xs bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Endereço:</strong>
                  <span>Rua S, N° 269, Complemento Quadra 14, lotes 50</span>
                  <span className="block text-slate-400">Cuiabá - Mato Grosso</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1 border-t border-slate-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-white font-semibold">Horário: </span>
                  <span className="text-slate-300">Seg-Sex 7:30 às 18:00h</span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Siga Nossas Redes Sociais:
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://instagram.com/commaqmt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold px-3.5 py-2 rounded-lg text-xs transition-all shadow-md group"
                  title="Siga a COMMAQ no Instagram (@commaqmt)"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram @commaqmt</span>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold px-3.5 py-2 rounded-lg text-xs transition-all shadow-md group"
                  title="Visite nossa página oficial no Facebook"
                >
                  <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Categorias Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Categorias de Peças
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Ver Catálogo Completo (+560 itens)</span>
                </button>
              </li>
              {displayCats.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-left truncate max-w-full cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Institucionais & Legais */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('inicio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('catalogo')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Catálogo de Peças (+560)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('sobre')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Sobre a Empresa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('diferenciais')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Diferenciais & Logística
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenChassisModal}
                  className="text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                >
                  Cotação por Plaqueta
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('contato')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Fale Conosco
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => handleLegalClick('politica-troca')}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Política de Troca</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLegalClick('termos-uso')}
                  className="text-slate-300 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer font-medium"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Termos de Uso e Segurança</span>
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <a
                  href="/downloads/catalogo-commaquinas-2026.pdf"
                  download="catalogo-commaquinas-2026.pdf"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all font-semibold text-xs"
                  title="Baixar Catálogo Geral de Peças e Máquinas em PDF"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>Baixar Catálogo em PDF</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contato Rápido */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">
              Atendimento Comercial
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:6536261010" className="hover:text-amber-400 font-bold text-white transition-colors">
                  (65) 3626-1010
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/556536261010?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20pe%C3%A7as%20na%20COMMAQ." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-300 font-bold text-emerald-400 transition-colors"
                >
                  (65) 3626-1010 (WhatsApp)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:vendas@commaquinas.com.br" className="hover:text-amber-400 transition-colors">
                  vendas@commaquinas.com.br
                </a>
              </p>
              <p className="text-slate-400 pt-1">
                Seg-Sex 7:30 às 18:00h
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/556536261010?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20pe%C3%A7as%20na%20COMMAQ."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2.5 rounded-lg text-xs transition-colors shadow-lg"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chamar Vendedor no WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Formas de Pagamento no Rodapé - Somente Texto Conforme Solicitado */}
      <div className="border-t border-slate-800 bg-slate-900/70 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider block">
              Formas de Pagamento Aceitas
            </span>
            <p className="text-slate-400 text-xs mt-0.5">
              Transações diretas com chave Pix oficial e contas bancárias:
            </p>
          </div>

          {/* Payment Text Badges (Somente texto) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Pix (Transferência Instantânea)</span>
            </div>

            <div className="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Banco do Brasil</span>
            </div>

            <div className="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              <span>Bradesco</span>
            </div>

            <div className="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs font-bold tracking-wide flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Boleto Bancário PJ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800/80 py-4 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-400 text-[11px] text-center md:text-left">
          <div>
            <p className="text-slate-300 font-medium">COM CENTRO OESTE MÁQUINAS E MANUTENÇÕES LTDA · CNPJ: 12.345.678/0001-90</p>
            <p className="text-slate-500 mt-0.5">© {new Date().getFullYear()} COMMAQ - Todos os direitos reservados. Fotos meramente ilustrativas.</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-400">
            <button
              onClick={() => handleLegalClick('politica-troca')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Política de Troca
            </button>
            <span>•</span>
            <button
              onClick={() => handleLegalClick('termos-uso')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Termos de Uso e Segurança
            </button>
            <span>•</span>
            <span className="text-slate-400">Cuiabá - Mato Grosso</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
