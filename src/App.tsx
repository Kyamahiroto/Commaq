import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCatalog } from './components/ProductCatalog';
import { HomeFeaturedProducts } from './components/HomeFeaturedProducts';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteDrawer } from './components/QuoteDrawer';
import { ChassisQuoteModal } from './components/ChassisQuoteModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AuthModal } from './components/AuthModal';
import { UserAccountPage } from './components/UserAccountPage';
import { LegalPageModal, LegalDocType } from './components/LegalPageModal';
import { PRODUCTS } from './data/products';
import { CATEGORIES } from './data/categories';
import { 
  Product, 
  MachineCategory, 
  QuoteItem, 
  SiteConfig, 
  CategoryItem, 
  UserProfile, 
  Order, 
  MachineFleetItem 
} from './types';
import { 
  getStoredUser, 
  storeUserSession, 
  getStoredOrders, 
  saveOrderToUser 
} from './data/userOrdersData';

const DEFAULT_SITE_CONFIG: SiteConfig = {
  headerHorario: 'Seg-Sex 7:30 às 18:00h',
  headerPhone: '(65) 3626-1010',
  headerLocalizacao: 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT',
  topUrgentAlert: 'MÁQUINA PARADA? DESPACHAMOS PEÇAS HOJE MESMO PARA TODO O BRASIL VIA AÉREO E RODOVIÁRIO',
  whatsappNumber: '556536261010',
  whatsappMessage: 'Olá! Estou no site da COMMAQ e gostaria de um orçamento de peças.',
  floatingWhatsAppActive: true,
  email: 'vendas@commaquinas.com.br',
  address: 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá - MT',
  pdfCatalogUrl: '/downloads/catalogo-commaquinas-2026.pdf',
  pdfCatalogTitle: 'Catálogo de Peças & Máquinas COMMAQ 2026',
  razaoSocial: 'COM CENTRO OESTE MÁQUINAS E MANUTENÇÕES LTDA',
  cnpj: '12.345.678/0001-90',
  chavePix: '12.345.678/0001-90 (CNPJ)',
  bancosDados: 'Banco do Brasil e Bradesco (Conta Jurídica COMMAQ)',
  instagramUrl: 'https://instagram.com/commaqmt/',
  facebookUrl: 'https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr'
};

const DEFAULT_CATEGORIES: CategoryItem[] = CATEGORIES.map((cat) => ({
  id: cat.id,
  name: cat.name,
  description: cat.shortDesc,
  slug: cat.id,
  iconName: cat.iconName,
  image: cat.image,
  subcategories: cat.subcategories
}));

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedMachineType, setSelectedMachineType] = useState<string>('');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState<boolean>(false);
  const [isChassisModalOpen, setIsChassisModalOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'home' | 'catalog'>('home');

  // Legal / Institutional Policies Modal
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>('politica-troca');

  const handleOpenLegalDoc = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    setIsLegalModalOpen(true);
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('politica') || hash.includes('troca')) {
        setActiveLegalDoc('politica-troca');
        setIsLegalModalOpen(true);
      } else if (hash.includes('termo') || hash.includes('seguranca') || hash.includes('privacidade')) {
        setActiveLegalDoc('termos-uso');
        setIsLegalModalOpen(true);
      } else if (hash.includes('catalogo')) {
        setCurrentView('catalog');
      } else if (hash.includes('inicio')) {
        setCurrentView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // User Authentication & Customer Account State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredUser());
  const [userOrders, setUserOrders] = useState<Order[]>(() => getStoredOrders(currentUser?.id));
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'register'>('login');
  const [isAccountPageActive, setIsAccountPageActive] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setUserOrders(getStoredOrders(currentUser.id));
    }
  }, [currentUser]);

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setUserOrders(getStoredOrders(user.id));
    setIsAccountPageActive(true);
  };

  const handleLogout = () => {
    storeUserSession(null);
    setCurrentUser(null);
    setIsAccountPageActive(false);
  };

  const handleUpdateUser = (updated: UserProfile) => {
    setCurrentUser(updated);
    storeUserSession(updated);
  };

  const handleSaveNewOrder = (newOrder: Order) => {
    const updated = saveOrderToUser(newOrder, currentUser?.id);
    setUserOrders(updated);
  };

  const handleRepeatOrder = (order: Order) => {
    order.items.forEach(it => {
      const existingProd = products.find(p => p.id === it.productId || p.partNumber === it.partNumber);
      if (existingProd) {
        handleAddToQuote(existingProd);
      } else {
        const fallbackProd: Product = {
          id: it.productId || `prod-${Date.now()}`,
          name: it.name,
          partNumber: it.partNumber,
          brand: (it.brand as any) || 'Multimarcas',
          category: 'pecas',
          categoryName: 'Peças de Reposição',
          machineTypes: ['Pá Carregadeira'],
          compatibleModels: [order.machineModel || 'Diversos'],
          description: `Peça de reposição ${it.name}.`,
          specifications: { 'Part Number': it.partNumber, 'Marca': it.brand },
          image: it.image,
          inStock: true,
          condition: 'Novo',
          warranty: '6 meses'
        };
        handleAddToQuote(fallbackProd);
      }
    });
    setIsAccountPageActive(false);
    setIsQuoteDrawerOpen(true);
  };

  const handleQuoteForMachine = (machine: MachineFleetItem) => {
    setSelectedBrand(machine.brand);
    setSearchTerm(machine.model);
    setIsAccountPageActive(false);
    scrollToCatalog();
  };

  // Dynamic Site Config managed via CPT
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('com_maquinas_site_config');
      return saved ? { 
        ...DEFAULT_SITE_CONFIG, 
        ...JSON.parse(saved),
        headerHorario: 'Seg-Sex 7:30 às 18:00h',
        headerPhone: '(65) 3626-1010',
        headerLocalizacao: 'Rua S, N° 269, Qd 14, Lt 50 - Cuiabá/MT',
        whatsappNumber: '556536261010',
        address: 'Rua S, N° 269 ,Complemento Quadra 14, lotes 50 - Cuiabá - Mato Grosso'
      } : DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('com_maquinas_site_config', JSON.stringify(siteConfig));
    } catch (e) {
      console.error(e);
    }
  }, [siteConfig]);

  // Dynamic Categories managed via CPT (Initializes with default categories, ensures pas-carregadeiras and empilhadeiras are present)
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('com_maquinas_cpt_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          const existingIds = new Set(parsed.map((c: any) => c.id));
          const missing = DEFAULT_CATEGORIES.filter(c => !existingIds.has(c.id));
          if (missing.length > 0) {
            return [...missing, ...parsed];
          }
          return parsed;
        }
      }
      return DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('com_maquinas_cpt_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  // Dynamic Products managed via CPT (Initializes with PRODUCTS, ensuring the 7 new COMMAQ machines are present)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('com_maquinas_cpt_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((p: any) => p.id));
          const missing = PRODUCTS.filter(p => !existingIds.has(p.id));
          if (missing.length > 0) {
            return [...missing, ...parsed];
          }
          return parsed;
        }
      }
      return PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('com_maquinas_cpt_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Local storage for quote basket
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('com_maquinas_quote_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('com_maquinas_quote_items', JSON.stringify(quoteItems));
    } catch (e) {
      console.error(e);
    }
  }, [quoteItems]);

  const handleAddToQuote = (product: Product) => {
    setQuoteItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveQuoteItem(productId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveQuoteItem = (productId: string) => {
    setQuoteItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearQuote = () => {
    setQuoteItems([]);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToCatalog = (cat?: string, search?: string) => {
    if (cat) {
      setActiveCategory(cat);
    }
    if (search !== undefined) {
      setSearchTerm(search);
    }
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    handleGoToCatalog(cat);
  };

  const handleSearchByMachine = (machineType: string, brand: string, model: string) => {
    setSelectedMachineType(machineType);
    setSelectedBrand(brand);
    if (model) {
      setSearchTerm(model);
    }
    handleGoToCatalog(undefined, model);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'inicio') {
      handleGoToHome();
      return;
    }
    if (sectionId === 'catalogo') {
      handleGoToCatalog();
      return;
    }
    if (currentView === 'catalog') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quoteItemIds = quoteItems.map((item) => item.product.id);
  const totalQuoteQuantity = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  // If user navigated to their customer portal / account page
  if (isAccountPageActive && currentUser) {
    return (
      <UserAccountPage
        user={currentUser}
        orders={userOrders}
        onLogout={handleLogout}
        onBackToCatalog={() => setIsAccountPageActive(false)}
        onUpdateUser={handleUpdateUser}
        whatsappNumber={siteConfig.whatsappNumber}
        onRepeatOrder={handleRepeatOrder}
        onQuoteForMachine={handleQuoteForMachine}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      
      {/* Header */}
      <Header
        quoteCount={totalQuoteQuantity}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenChassisModal={() => setIsChassisModalOpen(true)}
        siteConfig={siteConfig}
        categories={categories}
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          if (val.trim()) {
            handleGoToCatalog(undefined, val);
          }
        }}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        onNavigateSection={handleNavigateSection}
        currentUser={currentUser}
        onOpenAuthModal={() => {
          setAuthModalInitialMode('login');
          setIsAuthModalOpen(true);
        }}
        onOpenUserAccount={() => setIsAccountPageActive(true)}
        onOpenLegalDoc={handleOpenLegalDoc}
        currentView={currentView}
        onNavigateView={(view) => view === 'catalog' ? handleGoToCatalog() : handleGoToHome()}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            {/* Hero with Machine Finder & COMMAQ Showcase */}
            <Hero
              onSearchByMachine={handleSearchByMachine}
              onOpenChassisModal={() => setIsChassisModalOpen(true)}
              onScrollToCatalog={() => handleGoToCatalog()}
              onSelectProduct={(prod) => setSelectedProductForDetail(prod)}
            />

            {/* Categories Showcase (Visual Clarity on Business offerings) */}
            <CategoryGrid
              onSelectCategory={(cat) => handleSelectCategory(cat)}
              activeCategory={activeCategory}
              customCategories={categories}
            />

            {/* Featured Selection on Home (Principais, Mais Recentes & Destaques) */}
            <HomeFeaturedProducts
              products={products}
              onSelectProduct={(prod) => setSelectedProductForDetail(prod)}
              onAddToQuote={handleAddToQuote}
              quoteItemIds={quoteItemIds}
              onOpenFullCatalog={(cat) => handleGoToCatalog(cat)}
            />

            {/* Competitive Differentiators */}
            <WhyChooseUs />

            {/* About COMMAQ */}
            <AboutSection />

            {/* FAQ */}
            <FaqSection />

            {/* Contact & Quote Inquiry */}
            <ContactSection />
          </>
        ) : (
          <>
            {/* Comprehensive Searchable & Filterable Catalog (Paginated, Full 560+ items) */}
            <ProductCatalog
              products={products}
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              selectedMachineType={selectedMachineType}
              onSelectMachineType={setSelectedMachineType}
              onOpenProductDetail={(prod) => setSelectedProductForDetail(prod)}
              onAddToQuote={handleAddToQuote}
              quoteItemIds={quoteItemIds}
              customCategories={categories}
              onBackToHome={handleGoToHome}
              isStandalonePage={true}
            />

            {/* Competitive Differentiators */}
            <WhyChooseUs />

            {/* Contact & Quote Inquiry */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => handleSelectCategory(cat)}
        onNavigateSection={handleNavigateSection}
        onOpenChassisModal={() => setIsChassisModalOpen(true)}
        onOpenLegalDoc={handleOpenLegalDoc}
        categories={categories}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToQuote={handleAddToQuote}
        isAddedToQuote={
          selectedProductForDetail ? quoteItemIds.includes(selectedProductForDetail.id) : false
        }
      />

      {/* Quotation Basket Drawer */}
      <QuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        items={quoteItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearQuote={handleClearQuote}
        currentUser={currentUser}
        onSaveOrder={handleSaveNewOrder}
      />

      {/* Auth Modal (Login & Cadastro com redirecionamento) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalInitialMode}
      />

      {/* Chassis / Serial Plate Quote Request Modal */}
      <ChassisQuoteModal
        isOpen={isChassisModalOpen}
        onClose={() => setIsChassisModalOpen(false)}
      />

      {/* Legal & Policy Pages Modal (Política de Trocas, Termos de Uso e Segurança) */}
      <LegalPageModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialDoc={activeLegalDoc}
        onNavigateHome={() => {
          setIsLegalModalOpen(false);
          handleNavigateSection('inicio');
        }}
        onOpenChassisModal={() => {
          setIsLegalModalOpen(false);
          setIsChassisModalOpen(true);
        }}
      />


      {/* Floating Fast WhatsApp Assistance */}
      <FloatingWhatsApp
        whatsappNumber={siteConfig.whatsappNumber}
        isActive={siteConfig.floatingWhatsAppActive}
      />
    </div>
  );
}
