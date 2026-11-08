export type MachineCategory = string;

export type Brand = 
  | 'Caterpillar'
  | 'Komatsu'
  | 'Case Construction'
  | 'JCB'
  | 'New Holland'
  | 'Volvo CE'
  | 'Hyundai'
  | 'John Deere'
  | 'Doosan'
  | 'XCMG'
  | 'LiuGong'
  | 'SDLG'
  | 'Shantui'
  | 'SEM'
  | 'XGMA'
  | 'Yutong'
  | 'Changlin'
  | 'Clark'
  | 'Hangcha'
  | 'Heli'
  | 'Tiangong'
  | 'Degong'
  | 'Sinomach'
  | 'Titan'
  | 'COMMAQ'
  | 'Multimarcas';

export type MachineType = 
  | 'Escavadeira Hidráulica'
  | 'Retroescavadeira'
  | 'Pá Carregadeira'
  | 'Motoniveladora'
  | 'Trator de Esteira'
  | 'Miniescavadeira / Bobcat'
  | 'Trator Agrícola'
  | 'Empilhadeira';

export interface Product {
  id: string;
  name: string;
  partNumber: string;
  oemCode?: string;
  brand: Brand;
  category: MachineCategory;
  categoryName: string;
  machineTypes: MachineType[];
  compatibleModels: string[];
  description: string;
  specifications: Record<string, string>;
  image: string;
  secondaryImages?: string[];
  inStock: boolean;
  stockQuantityText?: string;
  condition: 'Novo' | 'OEM' | 'Genuíno';
  featured?: boolean;
  warranty: string;
  weightKg?: number;
  price?: string;
  isUnderQuote?: boolean;
  originalImageUrl?: string;
  localImagePath?: string;
  fallbackImage?: string;
  futureFields?: Record<string, string>;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface MachineFilterState {
  machineType: string;
  brand: string;
  model: string;
}

export interface SiteConfig {
  headerHorario: string;
  headerPhone: string;
  headerLocalizacao: string;
  topUrgentAlert: string;
  whatsappNumber: string;
  whatsappMessage: string;
  floatingWhatsAppActive: boolean;
  email: string;
  address: string;
  // Future Expansion & Company Details
  pdfCatalogUrl?: string;
  pdfCatalogTitle?: string;
  razaoSocial?: string;
  cnpj?: string;
  chavePix?: string;
  bancosDados?: string;
  instagramUrl?: string;
  facebookUrl?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  itemCount?: number | string;
  slug?: string;
  iconName?: string;
  image?: string;
  subcategories?: string[];
}

export interface MachineFleetItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  serialNumber?: string;
  year?: string;
  notes?: string;
}

export interface UserAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  reference?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  tradeName?: string;
  email: string;
  document: string;
  documentType: 'PJ' | 'PF';
  contactPerson: string;
  phone: string;
  stateRegistration?: string;
  address: UserAddress;
  createdAt: string;
  fleet?: MachineFleetItem[];
}

export interface OrderItem {
  productId: string;
  name: string;
  partNumber: string;
  brand: string;
  quantity: number;
  unitPrice?: string;
  image: string;
}

export type OrderStatus = 
  | 'em_analise' 
  | 'cotado' 
  | 'aprovado' 
  | 'faturado' 
  | 'em_transporte' 
  | 'entregue';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  statusLabel: string;
  items: OrderItem[];
  totalValue?: string;
  shippingMethod: string;
  trackingCode?: string;
  trackingUrl?: string;
  invoiceNumber?: string;
  notes?: string;
  estimatedDelivery?: string;
  machineModel?: string;
}

