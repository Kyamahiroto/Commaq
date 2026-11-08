import { UserProfile, Order } from '../types';

export const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-01',
  name: 'Construtora & Agropecuária Rio Verde Ltda',
  tradeName: 'Grupo Agro & Terraplenagem MT',
  email: 'compras@agroterramt.com.br',
  document: '14.892.410/0001-35',
  documentType: 'PJ',
  contactPerson: 'Marcos Silveira (Gerente de Frotas)',
  phone: '(65) 99844-3210',
  stateRegistration: '13.489.201-9',
  address: {
    street: 'Rodovia BR-163, KM 742 - Setor Industrial',
    number: '4500',
    complement: 'Galpão 02 / Pátio de Máquinas',
    neighborhood: 'Distrito Industrial',
    city: 'Cuiabá',
    state: 'MT',
    zipCode: '78098-000',
    reference: 'Próximo ao Trevo do Lagarto e Posto São Matheus'
  },
  createdAt: '15/01/2025',
  fleet: [
    {
      id: 'flt-01',
      name: 'Pá Carregadeira Hyundai HL757-9',
      brand: 'Hyundai',
      model: 'HL757-9 Heavy Duty',
      serialNumber: 'HL7579-MT0482',
      year: '2021',
      notes: 'Operação em cascalheira e carregamento de calcário'
    },
    {
      id: 'flt-02',
      name: 'Motoniveladora XCMG GR1803',
      brand: 'XCMG',
      model: 'GR1803',
      serialNumber: 'GR180-89104',
      year: '2022',
      notes: 'Manutenção de estradas vicinais da fazenda'
    },
    {
      id: 'flt-03',
      name: 'Pá Carregadeira SDLG LG936L',
      brand: 'SDLG',
      model: 'LG936L',
      serialNumber: 'LG936-33918',
      year: '2020',
      notes: 'Almoxarifado central de obras'
    }
  ]
};

export const DEFAULT_DEMO_ORDERS: Order[] = [
  {
    id: 'CM-2026-0842',
    date: '20/09/2026',
    status: 'em_transporte',
    statusLabel: 'Em Transporte Expresso',
    shippingMethod: 'Aéreo Expresso (LATAM Cargo - Voo Direto Várzea Grande/CGB)',
    trackingCode: 'LA-CGB-7849102',
    trackingUrl: 'https://www.latamcargo.com',
    invoiceNumber: 'NF-e 048.912',
    machineModel: 'Pá Carregadeira Hyundai HL757-9 (Frota #01)',
    totalValue: 'R$ 7.840,00',
    notes: 'Despacho prioritário (máquina parada no canteiro de obras). Acompanha laudo de teste e garantia de 6 meses.',
    estimatedDelivery: '22/09/2026 (Hoje até 17h)',
    items: [
      {
        productId: 'hyu-hl-pin',
        name: 'Jogo de Pinos Temperados e Buchas de Aço Articulação Dianteira',
        partNumber: '11N6-90020-HD',
        brand: 'Hyundai',
        quantity: 2,
        unitPrice: 'R$ 2.450,00',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'filtro-oleo-cat-1r0716',
        name: 'Filtro Separador de Água e Combustível Primário Heavy Duty',
        partNumber: '326-1644 / FS19816',
        brand: 'Hyundai',
        quantity: 4,
        unitPrice: 'R$ 380,00',
        image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'graxa-ep2-special',
        name: 'Balde de Graxa Especial EP-2 com Bissulfeto de Molibdênio 18kg',
        partNumber: 'LUB-EP2-18KG',
        brand: 'Multimarcas',
        quantity: 2,
        unitPrice: 'R$ 710,00',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'CM-2026-0795',
    date: '08/09/2026',
    status: 'entregue',
    statusLabel: 'Entregue com Sucesso',
    shippingMethod: 'Transportadora Rodoviária Dedicada (Expresso São Miguel)',
    trackingCode: 'ESM-948102-MT',
    trackingUrl: 'https://www.expressosaomiguel.com.br',
    invoiceNumber: 'NF-e 047.803',
    machineModel: 'Pá Carregadeira SDLG LG936L',
    totalValue: 'R$ 5.920,00',
    notes: 'Entregue e conferido na recepção da Fazenda Primavera (Sorriso - MT). Assinado pelo encarregado de manutenção.',
    estimatedDelivery: '10/09/2026 (Entregue)',
    items: [
      {
        productId: 'dente-concha-cat-j350',
        name: 'Jogo de Dentes e Cantos com Parafusos Tratados 5/8"',
        partNumber: '1U3352-HD / 9J9600',
        brand: 'SDLG',
        quantity: 8,
        unitPrice: 'R$ 490,00',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'sdlg-turbo-936',
        name: 'Turbocompressor Completo Garret / Weichai Deuto',
        partNumber: '4110000054002',
        brand: 'SDLG',
        quantity: 1,
        unitPrice: 'R$ 3.800,00',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'CM-2026-0914',
    date: '21/09/2026',
    status: 'em_analise',
    statusLabel: 'Cotação em Análise Técnica',
    shippingMethod: 'A Definir (Aéreo ou Retirada Balcão Cuiabá)',
    machineModel: 'Pá Carregadeira Case W20E',
    totalValue: 'Sob Consulta Técnica',
    notes: 'Verificação do número de estrias do eixo e modelo exato do conversor de torque com a equipe técnica da COMMAQ.',
    estimatedDelivery: 'Em validação com o setor de peças',
    items: [
      {
        productId: 'disco-transmissao-case-w20',
        name: 'Disco de Fricção e Aço da Transmissão Clark 28000',
        partNumber: '243224 / 243225',
        brand: 'Case Construction',
        quantity: 6,
        unitPrice: 'Sob Consulta',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'bomba-hidraulica-w20',
        name: 'Bomba Hidráulica Principal Dupla de Engrenagens',
        partNumber: 'D45281-CASE',
        brand: 'Case Construction',
        quantity: 1,
        unitPrice: 'Sob Consulta',
        image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

const USER_SESSION_KEY = 'com_maquinas_logged_user';
const USERS_REGISTRY_KEY = 'com_maquinas_registered_users';
const ORDERS_STORAGE_KEY = 'com_maquinas_user_orders';

// Get currently logged-in user
export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Store logged-in user
export function storeUserSession(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_SESSION_KEY);
    }
  } catch (e) {
    console.error('Error saving user session', e);
  }
}

// Get user orders from storage or default
export function getStoredOrders(userId?: string): Order[] {
  try {
    const key = userId ? `${ORDERS_STORAGE_KEY}_${userId}` : ORDERS_STORAGE_KEY;
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
    // If demo user or empty, return default demo orders
    return DEFAULT_DEMO_ORDERS;
  } catch {
    return DEFAULT_DEMO_ORDERS;
  }
}

// Save order to user list
export function saveOrderToUser(order: Order, userId?: string): Order[] {
  try {
    const key = userId ? `${ORDERS_STORAGE_KEY}_${userId}` : ORDERS_STORAGE_KEY;
    const current = getStoredOrders(userId);
    const updated = [order, ...current];
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving order', e);
    return DEFAULT_DEMO_ORDERS;
  }
}
