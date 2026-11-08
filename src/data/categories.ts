import { MachineCategory } from '../types';

export interface CategoryInfo {
  id: MachineCategory;
  name: string;
  shortDesc: string;
  itemCount: string;
  image: string;
  iconName: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'venda-de-maquinas',
    name: 'VENDA DE MAQUINAS',
    shortDesc: 'Venda de equipamentos pesados, pás carregadeiras, escavadeiras e tratores novos e seminovos revisados.',
    itemCount: '+45 máquinas',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    iconName: 'Truck',
    subcategories: ['Pás Carregadeiras', 'Escavadeiras Hidráulicas', 'Retroescavadeiras', 'Motoniveladoras', 'Tratores de Esteira']
  },
  {
    id: 'pas-carregadeiras',
    name: 'PÁS CARREGADEIRAS',
    shortDesc: 'Pás carregadeiras pesadas articuladas e telescópicas COMMAQ com motorização Deutz e Cummins.',
    itemCount: '3 modelos',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    iconName: 'Truck',
    subcategories: ['COMMAQ 938 (3t)', 'COMMAQ Telescópica 930t', 'COMMAQ 937H (3t)', 'Engate Rápido', 'Concha Reforçada']
  },
  {
    id: 'empilhadeiras',
    name: 'EMPILHADEIRAS',
    shortDesc: 'Empilhadeiras industriais a combustão Diesel e GLP COMMAQ com torres de 4,7m e 6,0m e transmissão TCM.',
    itemCount: '4 modelos',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    iconName: 'Layers',
    subcategories: ['FD30 Diesel 4,7m', 'FD30 GLP 4,7m', 'FD30 GLP 6,0m', 'FD30 Diesel 6,0m', 'Torre Triplex', 'Deslocador Lateral']
  },
  {
    id: 'pecas',
    name: 'PEÇAS',
    shortDesc: 'Distribuição completa de peças de reposição industrial para linha amarela multimarcas com despacho imediato.',
    itemCount: '+35.000 itens',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench',
    subcategories: ['Material Rodante', 'FPS e Lâminas', 'Hidráulica', 'Motor e Filtros', 'Transmissão e Diferencial']
  },
  {
    id: 'motor',
    name: 'MOTOR',
    shortDesc: 'Turbinas, válvulas de admissão e escape, pistões, juntas de cabeçote, bombas d\'água e bicos injetores.',
    itemCount: '+112 itens',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    iconName: 'Zap',
    subcategories: ['Turbinas e Coletores', 'Válvulas e Guias', 'Bicos Injetores', 'Juntas de Cabeçote', 'Bombas d\'Água e Óleo']
  },
  {
    id: 'transmissao',
    name: 'TRANSMISSÃO',
    shortDesc: 'Discos sinterizados e de aço, conversores de torque, engrenagens, tambores, placas de reversão e solenoides.',
    itemCount: '+85 itens',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Discos de Fricção', 'Conversores de Torque', 'Solenoides 12V/24V', 'Tambores e Engrenagens', 'Flanges e Eixos']
  },
  {
    id: 'rolamentos',
    name: 'ROLAMENTOS',
    shortDesc: 'Rolamentos cônicos de eixo, roletes, agulha, mancal, ponta de pinhão e gaiolas de alta resistência.',
    itemCount: '+62 itens',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    iconName: 'Layers',
    subcategories: ['Rolamento Cônico', 'Rolamento de Agulha', 'Mancais e Gaiolas', 'Rolamento Ponta Pinhão']
  },
  {
    id: 'filtros',
    name: 'FILTROS',
    shortDesc: 'Filtros de combustível, lubrificante, ar interno/externo, separadores de água e telas de sucção hidráulica.',
    itemCount: '+32 itens',
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
    iconName: 'Filter',
    subcategories: ['Filtros de Combustível', 'Filtros Lubrificantes', 'Filtros de Ar Primário e Secundário', 'Separadores de Água']
  },
  {
    id: 'retentores',
    name: 'RETENTORES',
    shortDesc: 'Retentores de cubo dianteiro/traseiro, vedadores de bomba, gaxetas, vedações de haste e guarda-pó.',
    itemCount: '+28 itens',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldAlert',
    subcategories: ['Retentores de Cubo de Roda', 'Retentores de Transmissão', 'Gaxetas e Vedadores de Pó', 'Kits de Reparo de Pinça']
  },
  {
    id: 'sistema-de-freio',
    name: 'SISTEMA DE FREIO',
    shortDesc: 'Cilindros mestre com reservatório, cabos de freio de mão, pastilhas quadradas, válvulas de descarga e tubos de freio.',
    itemCount: '+24 itens',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    iconName: 'Activity',
    subcategories: ['Cilindro Mestre', 'Pastilhas de Freio', 'Tubos e Flexíveis', 'Cabos de Freio de Mão', 'Válvula de Freio']
  },
  {
    id: 'juntas-e-calcos',
    name: 'JUNTAS E CALÇOS',
    shortDesc: 'Calços de regulagem de pinhão, placas de torque, espaçadores usinados, bronzinas de mancal e mancais de torre.',
    itemCount: '+22 itens',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    iconName: 'Layers',
    subcategories: ['Calços de Regulagem Meia Lua', 'Espaçadores e Arruelas de Calço', 'Bronzinas STD / 0.50', 'Mancais de Articulação']
  },
  {
    id: 'porcas-e-parafusos',
    name: 'PORCAS E PARAFUSOS',
    shortDesc: 'Arruelas de nylon e bronze reforçadas, porcas de aperto de sede e ponta de eixo, prisioneiros de roda e parafusos de motor.',
    itemCount: '+20 itens',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench',
    subcategories: ['Arruelas de Nylon / Bronze', 'Prisioneiros e Tuchos de Roda', 'Porcas Ponta de Eixo', 'Parafusos Especiais de Motor']
  },
  {
    id: 'diferencial',
    name: 'DIFERENCIAL',
    shortDesc: 'Coroa e pinhão dianteiro/traseiro, cruzetas de cardan, caixas satélite, engrenagens planetárias e tampas de cubo.',
    itemCount: '+18 itens',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Coroa e Pinhão', 'Cruzetas de Cardan', 'Engrenagens Planetárias', 'Caixas Satélite e Eixos']
  },
  {
    id: 'sistema-hidraulico',
    name: 'SISTEMA HIDRÁULICO',
    shortDesc: 'Bombas hidráulicas de engrenagem, bombas de direção e transmissão, tubulações de aço, mangueiras e comandos.',
    itemCount: '+15 itens',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    iconName: 'Maximize2',
    subcategories: ['Bombas de Direção e Hidráulica', 'Tubos de Alta Pressão', 'Mangueiras Hidráulicas', 'Comandos e Válvulas']
  },
  {
    id: 'sistema-eletrico',
    name: 'SISTEMA ELÉTRICO',
    shortDesc: 'Alternadores 12V, motores de partida, chaves comutadoras frente/ré, faróis com seta, chicotes e sinalizadores.',
    itemCount: '+15 itens',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    iconName: 'Zap',
    subcategories: ['Alternadores e Reguladores', 'Motores de Partida', 'Chaves e Comutadores', 'Faróis de Milha e Setas']
  },
  {
    id: 'uso-geral',
    name: 'USO GERAL',
    shortDesc: 'Pinos de articulação, buchas cementadas, alavancas, amortecedores, fechaduras, anéis elásticos e consumíveis industriais.',
    itemCount: '+108 itens',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench',
    subcategories: ['Pinos e Buchas de Articulação', 'Coxins e Apoios', 'Travas e Anéis Elásticos', 'Alavancas e Cabos']
  },
  {
    id: 'locacao',
    name: 'LOCAÇÃO',
    shortDesc: 'Locação ágil de máquinas pesadas e equipamentos industriais para obras, mineração e terraplenagem.',
    itemCount: 'Frota ativa',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    iconName: 'Layers',
    subcategories: ['Locação Mensal', 'Locação por Safra', 'Equipamentos com Operador', 'Suporte Técnico no Canteiro']
  },
  {
    id: 'changlin',
    name: 'CHANGLIN',
    shortDesc: 'Peças originais e de reposição técnica para pás carregadeiras e motoniveladoras Changlin.',
    itemCount: '+1.400 itens',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Carregadeiras 936 / 956', 'Filtros Changlin', 'Bombas e Cilindros', 'Dentes e Facas de Caçamba']
  },
  {
    id: 'empilhadeiras-clarck',
    name: 'EMPILHADEIRAS CLARCK',
    shortDesc: 'Componentes, reparos mecânicos, torres, garfos e transmissões para empilhadeiras Clark.',
    itemCount: '+850 itens',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Maximize2',
    subcategories: ['Torres de Elevação', 'Garfos Reforçados', 'Sistemas de Freio', 'Kits GLP e Diesel']
  },
  {
    id: 'locacao-contratos',
    name: 'LOCACAO',
    shortDesc: 'Gestão de contratos de locação de frotas industriais e máquinas da linha amarela.',
    itemCount: 'Contratos Dedicados',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    iconName: 'Activity',
    subcategories: ['Locação Customizada', 'Contratos de Longo Prazo', 'Manutenção Preventiva Inclusa']
  },
  {
    id: 'empilhadeiras-hangcha',
    name: 'EMPILHADEIRAS HANGCHA',
    shortDesc: 'Peças genuínas e de manutenção para empilhadeiras a combustão e elétricas Hangcha.',
    itemCount: '+920 itens',
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Série XF / Série A', 'Vedações e Pistões', 'Eixos Direcionais', 'Pneus Maciços e Rodantes']
  },
  {
    id: 'uso-e-consumo',
    name: 'USO E CONSUMO',
    shortDesc: 'Suprimentos operacionais para oficina e canteiro: óleos lubrificantes, graxas especiais, EPIs e químicos.',
    itemCount: '+1.600 itens',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    iconName: 'Filter',
    subcategories: ['Óleo Hidráulico ISO 68', 'Graxa de Alta Pressão', 'Desengraxantes Industriais', 'EPIs de Segurança']
  },
  {
    id: 'pecas-pa-carregadeira-hyundai',
    name: 'PEÇAS PA CARREGADEIRA HYUNDAI',
    shortDesc: 'Peças para carregadeiras Hyundai HL730, HL740, HL757, HL760, HL770 e novas séries HL900.',
    itemCount: '+2.800 itens',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldAlert',
    subcategories: ['Transmissão ZF Hyundai', 'Bombas Principais Kawasaki', 'Pinos e Buchas de Articulação', 'Dentes e Caçambas']
  },
  {
    id: 'pecas-empilhadeiras-heli',
    name: 'PEÇAS EMPILHADEIRAS HELI',
    shortDesc: 'Distribuição técnica de peças originais para empilhadeiras Heli a diesel, GLP e elétricas.',
    itemCount: '+1.100 itens',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench',
    subcategories: ['Motor Isuzu / Xinchai Heli', 'Bombas Hidráulicas Heli', 'Discos de Embreagem', 'Filtros Originais']
  },
  {
    id: 'peca-pa-carregadeiras-thiagong',
    name: 'PEÇA PA CARREGADEIRAS THIAGONG',
    shortDesc: 'Componentes estruturais, hidráulicos e mecânicos para carregadeiras Tiangong / Thiagong.',
    itemCount: '+780 itens',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Caixas de Câmbio', 'Diferenciais e Cruzetas', 'Lâminas de Corte', 'Kits de Vedação']
  },
  {
    id: 'peca-pa-carregadeiras-degong',
    name: 'PEÇA PÁ CARREGADEIRAS DEGONG',
    shortDesc: 'Linha completa de peças de reposição para carregadeiras Degong DGMG e DGM.',
    itemCount: '+650 itens',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    iconName: 'Layers',
    subcategories: ['Comandos Hidráulicos', 'Válvulas de Freio', 'Conversores de Torque', 'Pinos de Chassi']
  },
  {
    id: 'peca-pa-carregadeiras-liu-gong',
    name: 'PEÇA PA CARREGADEIRAS LIU GONG',
    shortDesc: 'Peças para carregadeiras LiuGong 835, 856, 856H, 877H e motoniveladoras da marca.',
    itemCount: '+3.400 itens',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldAlert',
    subcategories: ['Motores Cummins LiuGong', 'Transmissões ZF LiuGong', 'Eixos Carraro / ArvinMeritor', 'Dentes e Facas']
  },
  {
    id: 'motoniveladora-xcmg',
    name: 'MOTONIVELADORA XCMG',
    shortDesc: 'Peças técnicas, círculos de giro, lâminas curvadas e comandos para motoniveladoras XCMG GR180, GR215.',
    itemCount: '+1.900 itens',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    iconName: 'Activity',
    subcategories: ['Lâminas de Aço Tratado', 'Pinhão e Círculo de Giro', 'Comandos do Ripper', 'Tandem e Eixos Traseiros']
  },
  {
    id: 'pecas-pa-carregadeiras-sem',
    name: 'PEÇAS PA CARREGADEIRAS SEM',
    shortDesc: 'Peças de reposição para carregadeiras SEM 636D, 655D, 656D e 660D (Caterpillar Machinery).',
    itemCount: '+2.100 itens',
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench',
    subcategories: ['Motores Weichai SEM', 'Transmissões SEM TR200', 'Freios a Ar / Hidráulicos', 'Bordas de Caçamba']
  },
  {
    id: 'pecas-pa-carregadeiras-xgma',
    name: 'PEÇAS PA CARREGADEIRAS XGMA',
    shortDesc: 'Componentes de alta durabilidade para pás carregadeiras XGMA XG932, XG935, XG951, XG958.',
    itemCount: '+1.350 itens',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Kits de Reparo de Cilindros', 'Bomba Hidráulica Dupla', 'Discos e Separadores', 'Cruzetas Cardan']
  },
  {
    id: 'peca-pa-carregadeiras-yutong',
    name: 'PEÇA PÁ CARREGADEIRAS YUTONG',
    shortDesc: 'Reposição mecânica e hidráulica para pás carregadeiras pesadas Yutong 936H e 956H.',
    itemCount: '+710 itens',
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    iconName: 'Maximize2',
    subcategories: ['Transmissão Planetária', 'Pastilhas de Freio', 'Radiadores de Água e Óleo', 'Filtros de Sucção']
  },
  {
    id: 'pa-carregadeiras-case',
    name: 'PÁ CARREGADEIRAS CASE',
    shortDesc: 'Peças para carregadeiras Case W20E, 621D, 621E, 721D, 721E, 821E e série G.',
    itemCount: '+4.200 itens',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldAlert',
    subcategories: ['Transmissão ZF 4WG / Case', 'Motores Cummins / FPT', 'Cilindros de Inclinação', 'Dentes e Cantos Case']
  },
  {
    id: 'pa-carregadeira-new-holland',
    name: 'PÁ CARREGADEIRA NEW HOLLAND',
    shortDesc: 'Linha completa para carregadeiras New Holland W130, W170, W190, 12D e retroescavadeiras B95B.',
    itemCount: '+3.900 itens',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Eixos ZF New Holland', 'Cardans e Rolamentos', 'Kits de Motor FPT', 'Facas Reversíveis']
  },
  {
    id: 'pa-carregadeira-sdlg',
    name: 'PÁ CARREGADEIRA SDLG',
    shortDesc: 'Peças líderes de vendas para carregadeiras SDLG LG936L, LG938L, LG956L, LG958L, L956F.',
    itemCount: '+5.300 itens',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    iconName: 'Wrench',
    subcategories: ['Caixa de Câmbio SDLG', 'Freio Pinça e Disco', 'Turbinas Weichai / Deutz', 'Pinos da Haste e Caçamba']
  },
  {
    id: 'pecas-pa-carregadeira-shantui',
    name: 'PEÇAS PÁ CARREGADEIRA SHANTUI',
    shortDesc: 'Peças para carregadeiras SL30W, SL50W e tratores de esteira Shantui SD16, SD22, SD32.',
    itemCount: '+3.100 itens',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    iconName: 'Layers',
    subcategories: ['Material Rodante Shantui', 'Conversores de Torque', 'Bomba Hidráulica Shantui', 'Lâminas e Cantos']
  },
  {
    id: 'pa-carregadeira-jhon-deere',
    name: 'PÁ CARREGADEIRA JHON DEERE',
    shortDesc: 'Peças de reposição para pás carregadeiras John Deere 524K, 544K, 624K, 644K, 724K e linha L.',
    itemCount: '+3.700 itens',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    iconName: 'ShieldAlert',
    subcategories: ['Motores PowerTech John Deere', 'Transmissões PowerShift', 'Kits de Reparo Hidráulico', 'Bordas de Ataque']
  },
  {
    id: 'pecas-pa-carregadeira-sinomach',
    name: 'PEÇAS PÁ CARREGADEIRA SINOMACH',
    shortDesc: 'Componentes mecânicos, hidráulicos e filtros para pás carregadeiras Sinomach 937H, 957H.',
    itemCount: '+1.200 itens',
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
    iconName: 'Cog',
    subcategories: ['Transmissão Sinomach', 'Comandos Monobloco', 'Dentes e Facas', 'Válvula Reguladora de Pressão']
  },
  {
    id: 'pa-carregadeira-titan',
    name: 'PÁ CARREGADEIRA TITAN',
    shortDesc: 'Peças técnicas, pinos, buchas e vedações de fábrica para carregadeiras Titan.',
    itemCount: '+680 itens',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    iconName: 'Maximize2',
    subcategories: ['Eixos e Redutores', 'Kits de Vedação', 'Radiadores e Mangueiras', 'Dentes de Concha']
  },
  {
    id: 'empilhadeiras-hyundai',
    name: 'EMPILHADEIRAS HYUNDAI',
    shortDesc: 'Componentes originais e pós-venda para empilhadeiras Hyundai séries 25L, 30L, 35D, 50D e 70D.',
    itemCount: '+1.500 itens',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    iconName: 'Activity',
    subcategories: ['Motores Hyundai / Yanmar', 'Torres Triplex e Duplex', 'Pastilhas e Tambores de Freio', 'Chicotes e Sensores']
  }
];
