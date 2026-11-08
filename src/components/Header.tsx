import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  MessageSquareText, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  FileText,
  ChevronDown,
  User,
  PackageCheck
} from 'lucide-react';
import { MachineCategory, SiteConfig, CategoryItem, UserProfile } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  quoteCount: number;
  onOpenQuoteDrawer: () => void;
  onOpenChassisModal: () => void;
  siteConfig?: SiteConfig;
  categories?: CategoryItem[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
  onNavigateSection: (sectionId: string) => void;
  currentUser?: UserProfile | null;
  onOpenAuthModal?: () => void;
  onOpenUserAccount?: () => void;
  onOpenLegalDoc?: (doc: 'politica-troca' | 'termos-uso') => void;
  currentView?: 'home' | 'catalog';
  onNavigateView?: (view: 'home' | 'catalog') => void;
}

export const Header: React.FC<HeaderProps> = ({
  quoteCount,
  onOpenQuoteDrawer,
  onOpenChassisModal,
  siteConfig,
  categories = [],
  searchTerm,
  onSearchChange,
  onSelectCategory,
  activeCategory,
  onNavigateSection,
  currentUser,
  onOpenAuthModal,
  onOpenUserAccount,
  onOpenLegalDoc,
  currentView = 'home',
  onNavigateView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');

  // Defaults caso siteConfig não tenha sido inicializado ainda
  const headerHorario = siteConfig?.headerHorario || 'Seg-Sex 7:30 às 18:00h';
  const headerPhone = siteConfig?.headerPhone || '(65) 3626-1010';
  const headerLocal = siteConfig?.headerLocalizacao || 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT';
  const whatsappNumber = siteConfig?.whatsappNumber || '556536261010';
  const topAlert = siteConfig?.topUrgentAlert || 'MÁQUINA PARADA? DESPACHAMOS PEÇAS HOJE MESMO PARA TODO O BRASIL VIA AÉREO E RODOVIÁRIO';

  const currentCategories = categories.length > 0 ? categories : [];

  const filteredDropdownCategories = React.useMemo(() => {
    if (!dropdownSearch.trim()) return currentCategories;
    const q = dropdownSearch.toLowerCase();
    return currentCategories.filter(c => c.name.toLowerCase().includes(q));
  }, [currentCategories, dropdownSearch]);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-200">
      {/* Top Banner (Contact info, National Shipping, Business hours configuráveis via CPT) */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center md:justify-start">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Truck className="w-3.5 h-3.5" />
              <span>Despacho Expresso para Todo o Brasil</span>
            </span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{headerHorario}</span>
            </span>
            <span className="hidden lg:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{headerLocal}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            {/* Redes Sociais */}
            <div className="flex items-center gap-2">
              <a 
                href="https://instagram.com/commaqmt/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-pink-400 transition-colors p-1"
                title="Instagram @commaqmt"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-blue-400 transition-colors p-1"
                title="Facebook COMMAQ"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <a 
              href={`tel:${headerPhone.replace(/[^0-9]/g, '')}`} 
              className="flex items-center gap-1 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{headerPhone}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20pe%C3%A7as%20na%20COMMAQ.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Acesso à Área do Cliente / Meus Pedidos */}
            <button
              onClick={currentUser ? onOpenUserAccount : onOpenAuthModal}
              className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 font-semibold transition-colors cursor-pointer"
              title="Acessar Minha Conta e Meus Pedidos"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentUser ? `Minha Conta (${currentUser.name.split(' ')[0]})` : 'Área do Cliente'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Oficial COM Centro Oeste */}
          <div 
            onClick={() => {
              onNavigateView?.('home');
              onNavigateSection('inicio');
            }}
            className="cursor-pointer flex items-center shrink-0"
            id="brand-logo"
            title="COM Centro Oeste - Máquinas e Manutenções"
          >
            <Logo className="h-10 sm:h-12 w-auto" />
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                id="header-search-input"
                value={searchTerm}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (e.target.value.trim()) {
                    onNavigateView?.('catalog');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigateView?.('catalog');
                    onNavigateSection('catalogo');
                  }
                }}
                placeholder="O que você está procurando? (Nome, Part Number, Modelo...)"
                className="w-full bg-slate-100 border border-slate-300 rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions: Cotação por Plaqueta & Carrinho de Cotação */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Botão Área do Cliente / Minha Conta */}
            {currentUser ? (
              <button
                onClick={onOpenUserAccount}
                id="btn-user-account"
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                title="Acessar Minha Conta e Meus Pedidos"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-[10px] text-amber-400 uppercase font-black tracking-wider">Minha Conta</span>
                  <span className="text-xs truncate max-w-[120px] text-slate-200">{currentUser.name.split(' ')[0]}</span>
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                id="btn-user-login"
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 py-2 px-3 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                title="Entrar ou criar cadastro na COMMAQ"
              >
                <User className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Entrar / Cadastrar</span>
                <span className="sm:hidden">Entrar</span>
              </button>
            )}


            {/* Botão Cotação por Plaqueta / Chassi */}
            <button
              onClick={onOpenChassisModal}
              id="btn-chassis-quote"
              className="hidden lg:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-semibold py-2.5 px-3.5 rounded-lg transition-colors cursor-pointer"
              title="Envie uma foto da plaqueta ou número de série do equipamento"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Cotação por Plaqueta/Chassi</span>
            </button>

            {/* Carrinho de Cotação */}
            <button
              onClick={onOpenQuoteDrawer}
              id="btn-open-quote-drawer"
              className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm py-2.5 px-4 rounded-lg shadow transition-all duration-150"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Lista de Cotação</span>
              {quoteCount > 0 ? (
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-extrabold bg-slate-900 text-white rounded-full">
                  {quoteCount}
                </span>
              ) : (
                <span className="hidden md:inline text-xs font-medium text-slate-900 opacity-80">
                  (0)
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden mt-3 pt-2 border-t border-slate-100">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="O que você está procurando?"
              className="w-full bg-slate-100 border border-slate-300 rounded-lg pl-9 pr-8 py-2 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2 text-xs bg-slate-200 text-slate-600 rounded-full w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Subbar */}
      <nav className="hidden md:block bg-slate-900 border-t border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs font-semibold">
          
          <div className="flex items-center gap-1">
            {/* Início Nav Button */}
            <button
              onClick={() => {
                onNavigateView?.('home');
                onNavigateSection('inicio');
              }}
              className={`px-3.5 py-2.5 transition-colors uppercase tracking-wider font-bold cursor-pointer ${
                currentView === 'home'
                  ? 'text-amber-400 bg-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Início
            </button>

            {/* Catálogo Nav Button */}
            <button
              onClick={() => {
                onNavigateView?.('catalog');
                onNavigateSection('catalogo');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 transition-colors uppercase tracking-wider font-bold cursor-pointer ${
                currentView === 'catalog'
                  ? 'text-amber-400 bg-slate-800'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>Catálogo</span>
              <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full">
                560+
              </span>
            </button>

            {/* Categorias dropdown */}
            <div className="relative ml-1">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 px-4 font-bold transition-colors uppercase tracking-wider cursor-pointer"
              >
                <span>Todas as Categorias</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoriesDropdownOpen && (
                <div 
                  onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  className="absolute left-0 top-full w-80 bg-white text-slate-800 shadow-2xl border border-slate-200 rounded-b-xl py-2 z-50 overflow-hidden"
                >
                  {/* Search inside dropdown */}
                  <div className="px-3 pt-1 pb-2 border-b border-slate-100">
                    <div className="relative">
                      <input
                        type="text"
                        value={dropdownSearch}
                        onChange={(e) => setDropdownSearch(e.target.value)}
                        placeholder="Filtrar departamentos..."
                        className="w-full bg-slate-100 text-slate-800 text-[11px] rounded-lg pl-7 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 border border-slate-200"
                        autoFocus
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    <button
                      onClick={() => {
                        onSelectCategory('all');
                        onNavigateView?.('catalog');
                        setCategoriesDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-amber-50 text-xs font-bold border-b border-slate-100 flex items-center justify-between cursor-pointer ${
                        activeCategory === 'all' ? 'text-amber-600 bg-amber-50' : 'text-slate-800'
                      }`}
                    >
                      <span>Ver Todas as Peças</span>
                      <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded">
                        +560
                      </span>
                    </button>

                    {filteredDropdownCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          onNavigateView?.('catalog');
                          setCategoriesDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-amber-50 text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          activeCategory === cat.id ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-700'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {activeCategory === cat.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 ml-2"></span>
                        )}
                      </button>
                    ))}

                    {filteredDropdownCategories.length === 0 && (
                      <div className="px-4 py-3 text-xs text-slate-400 text-center">
                        Nenhum departamento encontrado.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links to Major Categories (Dinâmico conforme CPT) */}
            <div className="flex items-center divide-x divide-slate-800">
              {currentCategories.slice(0, 5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onNavigateView?.('catalog');
                  }}
                  className={`px-3 py-2.5 hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id && currentView === 'catalog' ? 'text-amber-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Institutional Links & Download PDF Button */}
          <div className="flex items-center gap-3 text-slate-300">
            <a
              href="/downloads/catalogo-commaquinas-2026.pdf"
              download="catalogo-commaquinas-2026.pdf"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow hover:shadow-amber-500/20"
              title="Baixar Catálogo Geral de Peças e Máquinas em PDF"
            >
              <FileText className="w-3.5 h-3.5 text-slate-950" />
              <span>Baixar Catálogo PDF</span>
            </a>

            <button
              onClick={() => onNavigateSection('diferenciais')}
              className="hover:text-amber-400 transition-colors hidden lg:inline"
            >
              Diferenciais
            </button>
            <button
              onClick={() => onNavigateSection('sobre')}
              className="hover:text-amber-400 transition-colors"
            >
              Quem Somos
            </button>
            <button
              onClick={() => onNavigateSection('contato')}
              className="hover:text-amber-400 transition-colors"
            >
              Contato
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 text-white px-4 py-4 border-t border-slate-800 space-y-3">
          {/* User Account Mobile Card */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Conta Verificada</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <User className="w-4 h-4 text-amber-400" />
                <span>Faça login para consultar pedidos</span>
              </div>
            )}

            <button
              onClick={() => {
                if (currentUser) {
                  onOpenUserAccount?.();
                } else {
                  onOpenAuthModal?.();
                }
                setMobileMenuOpen(false);
              }}
              className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg"
            >
              {currentUser ? 'Minha Conta' : 'Entrar / Cadastrar'}
            </button>
          </div>

          {/* Main Mobile Navigation */}
          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1 pb-2">
            <button
              onClick={() => {
                onNavigateView?.('home');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-center cursor-pointer transition-colors ${
                currentView === 'home'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => {
                onNavigateView?.('catalog');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-center flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                currentView === 'catalog'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              <span>Catálogo</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.2 rounded-full">
                560+
              </span>
            </button>
          </div>

          <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
            Departamentos &amp; Categorias ({currentCategories.length})
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs max-h-64 overflow-y-auto pr-1">
            <button
              onClick={() => {
                onSelectCategory('all');
                onNavigateView?.('catalog');
                setMobileMenuOpen(false);
              }}
              className={`text-left p-2 rounded cursor-pointer ${activeCategory === 'all' && currentView === 'catalog' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-200'}`}
            >
              Todas as Peças
            </button>
            {currentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onNavigateView?.('catalog');
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-2 rounded truncate cursor-pointer ${activeCategory === cat.id && currentView === 'catalog' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2 text-xs font-semibold">
            <a
              href="/downloads/catalogo-commaquinas-2026.pdf"
              download="catalogo-commaquinas-2026.pdf"
              className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow"
            >
              <FileText className="w-4 h-4 text-slate-950" />
              <span>Baixar Catálogo em PDF</span>
            </a>

            <button
              onClick={() => {
                onOpenChassisModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold rounded-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Cotação por Plaqueta ou Chassi</span>
            </button>
            <button
              onClick={() => {
                onNavigateSection('diferenciais');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-slate-300 hover:text-amber-400 transition-colors"
            >
              Diferenciais da COMMAQ
            </button>
            <button
              onClick={() => {
                onNavigateSection('sobre');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-slate-300 hover:text-amber-400 transition-colors"
            >
              Sobre a COMMAQ
            </button>
            <button
              onClick={() => {
                onNavigateSection('contato');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-slate-300 hover:text-amber-400 transition-colors"
            >
              Contatos e Endereço
            </button>
            <button
              onClick={() => {
                onOpenLegalDoc?.('politica-troca');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-amber-400 hover:underline"
            >
              Política de Troca
            </button>
            <button
              onClick={() => {
                onOpenLegalDoc?.('termos-uso');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-amber-400 hover:underline"
            >
              Termos de Uso e Segurança
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
