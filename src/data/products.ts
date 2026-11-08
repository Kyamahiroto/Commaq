import { Product } from '../types';
import { IMPORTED_PRODUCTS } from './importedProducts';

export const PRODUCTS: Product[] = [
  // ─── 0. MÁQUINAS PESADAS COMMAQ (CATÁLOGOS OFICIAIS) ───
  // 1. Pá Carregadeira COMMAQ 938
  {
    id: 'commaq-938-loader',
    name: 'Pá Carregadeira COMMAQ 938 (3.000 kg / 1,8 m³)',
    partNumber: 'CMQ-938-LDR',
    oemCode: 'COMMAQ 938 / LINHA PESADA',
    brand: 'COMMAQ',
    category: 'pas-carregadeiras',
    categoryName: 'PÁS CARREGADEIRAS',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['COMMAQ 938', 'Motor Deutz 125cv', 'Concha 1,8m³'],
    description: 'Pá Carregadeira pesada COMMAQ 938 com capacidade nominal de 3.000 kg e caçamba de 1,8 m³. Equipada com robusto motor Deutz 6 cilindros de 125cv turbo com bomba injetora mecânica de baixa manutenção. Acompanha engate rápido hidráulico para troca ágil de implementos, cabine fechada climatizada com ar condicionado, comandos via joystick de alta sensibilidade, peso operacional robusto de 11.000 kg e altura de pino de articulação de 4.050 mm.',
    specifications: {
      'Capacidade de Carga': '3.000 kg (3 toneladas)',
      'Capacidade da Concha': '1,8 m³',
      'Peso Operacional': '11.000 kg',
      'Motor': 'Deutz 6 Cilindros (125 cv) Turbo',
      'Sistema de Injeção': 'Bomba Injetora Mecânica (Manutenção Fácil)',
      'Altura do Pino de Articulação': '4.050 mm',
      'Sistema de Engate': 'Engate Rápido Hidráulico de Fábrica',
      'Cabine e Conforto': 'Fechada com Ar Condicionado e Joystick',
      'Garantia': '1 ano ou 1.000 horas',
      'Suporte Técnico': 'Peças de reposição e assistência técnica imediata em Cuiabá/MT'
    },
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1000&q=80',
    inStock: true,
    stockQuantityText: 'Disponível para faturamento e pronta-entrega em MT',
    condition: 'Novo',
    featured: true,
    warranty: '1 ano ou 1.000 horas / Suporte com estoque local em Cuiabá',
    weightKg: 11000,
    isUnderQuote: true,
    futureFields: {
      'Transmissão': 'Powershift de alto torque com reversão rápida',
      'Pneus': '17.5-25 industriais reforçados para serviço pesado',
      'Sistema de Freio': 'Freio a ar com discos nas 4 rodas'
    }
  },

  // 2. Pá Carregadeira Telescópica COMMAQ 930t
  {
    id: 'commaq-930t-telescopic',
    name: 'Pá Carregadeira Telescópica COMMAQ 930t (Braço Telescópico)',
    partNumber: 'CMQ-930T-TEL',
    oemCode: 'COMMAQ 930t / TELESCOPIC BOOM',
    brand: 'COMMAQ',
    category: 'pas-carregadeiras',
    categoryName: 'PÁS CARREGADEIRAS',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['COMMAQ 930t', 'Weichai Deutz WP6G', 'Braço Telescópico'],
    description: 'Pá Carregadeira com braço telescópico COMMAQ 930t projetada para alto alcance vertical em operações agrícolas e industriais (carregamento de bi-trens, carretas de grãos altas, vagões, armazéns e fardos). Equipada com motor Weichai Deutz WP6G de 125 cv, transmissão 32.000 BS428 com conversor YJ315, concha de 1,6 m³, alcance vertiginoso de altura de pino de 5.625 mm e altura de descarga de 4.710 mm. Inclui câmera de ré com monitor, rádio, cabine com ar condicionado e joystick integrado.',
    specifications: {
      'Tipo de Braço': 'Braço Telescópico de Longo Alcance',
      'Capacidade da Concha': '1,6 m³',
      'Motor': 'Weichai Deutz WP6G (125 cv)',
      'Transmissão': 'Transmissão 32.000 BS428 / Conversor YJ315',
      'Altura do Pino (Estendido)': '5.625 mm',
      'Altura de Despejo Máxima': '4.710 mm',
      'Cabine e Recursos': 'Ar Condicionado, Câmera de Ré, Rádio e Joystick',
      'Aplicação': 'Carregamento de carretas altas, caçambas agrícolas, armazéns e moendas',
      'Garantia': '1 ano ou 1.000 horas'
    },
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1000&q=80',
    inStock: true,
    stockQuantityText: 'Unidades disponíveis para entrega e demonstração',
    condition: 'Novo',
    featured: true,
    warranty: '1 ano ou 1.000 horas / Suporte com peças em estoque',
    weightKg: 10500,
    isUnderQuote: true,
    futureFields: {
      'Sistema de Visão': 'Câmera traseira com display dedicado no painel',
      'Acoplamento': 'Engate rápido hidráulico para concha, garfo porta-palete e fardos'
    }
  },

  // 3. Pá Carregadeira COMMAQ 937H
  {
    id: 'commaq-937h-loader',
    name: 'Pá Carregadeira COMMAQ 937H (Motor Cummins 130cv / 3t)',
    partNumber: 'CMQ-937H-LDR',
    oemCode: 'COMMAQ 937H / CUMMINS 6BT',
    brand: 'COMMAQ',
    category: 'pas-carregadeiras',
    categoryName: 'PÁS CARREGADEIRAS',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['COMMAQ 937H', 'Cummins 6BT 130cv', 'Articulada 3.000kg'],
    description: 'Pá Carregadeira COMMAQ 937H equipada com motor Cummins 6 cilindros de 130 cv turboalimentado com bomba injetora mecânica. Máxima confiabilidade mecânica, alto torque em baixas rotações e facilidade de manutenção em campo. Capacidade nominal de carga de 3.000 kg, concha reforçada de 1,83 m³, peso operacional de 10.200 kg, controle suave por joystick hidráulico e cabine pressurizada com ar condicionado de alto fluxo.',
    specifications: {
      'Capacidade de Carga': '3.000 kg (3 toneladas)',
      'Capacidade da Concha': '1,83 m³',
      'Peso Operacional': '10.200 kg',
      'Motor': 'Cummins 6 Cilindros (130 cv) Turbo',
      'Sistema de Combustível': 'Bomba Injetora Mecânica (Padrão Bosch)',
      'Comandos Operacionais': 'Joystick Servo-assistido de precisão',
      'Cabine e Conforto': 'Ar Condicionado de alta vazão e banco com suspensão',
      'Garantia': '1 ano ou 1.000 horas'
    },
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80',
    inStock: true,
    stockQuantityText: 'Pronta entrega em Cuiabá / Despacho para MT e todo o Brasil',
    condition: 'Novo',
    featured: true,
    warranty: '1 ano ou 1.000 horas / Assistência técnica dedicada COMMAQ',
    weightKg: 10200,
    isUnderQuote: true,
    futureFields: {
      'Transmissão': 'Powershift com conversor de torque de duplo estágio',
      'Chassi': 'Articulação central reforçada com pinos cementados e pontos de graxa acessíveis'
    }
  },

  // 4. Empilhadeira COMMAQ FD30 Diesel - Torre 4,7m
  {
    id: 'commaq-fd30-diesel-47m',
    name: 'Empilhadeira COMMAQ FD30 Diesel - Torre Triplex 4,7m (3.000 kg)',
    partNumber: 'CMQ-FD30-D47',
    oemCode: 'COMMAQ FD30-D / 4.7M',
    brand: 'COMMAQ',
    category: 'empilhadeiras',
    categoryName: 'EMPILHADEIRAS',
    machineTypes: ['Empilhadeira'],
    compatibleModels: ['COMMAQ FD30', 'Motor Xinchai Diesel', 'Torre Triplex 4,7m'],
    description: 'Empilhadeira industrial a combustão COMMAQ FD30 Diesel com capacidade de carga de 3.000 kg. Equipada com motor diesel Xinchai de alto torque contínuo, transmissão automática TCM, torre triplex de 4,70 metros com elevação livre total (permite estufar e descarregar dentro de baús e contêineres), deslocador lateral de carga integrado e 4ª via hidráulica completa instalada de fábrica para acoplamento de implementos especiais. Cabine montada sobre coxins de borracha que absorvem impactos e ruídos, painel digital com todos os indicadores operacionais e freio de estacionamento reforçado.',
    specifications: {
      'Capacidade Nominal': '3.000 kg (3 toneladas)',
      'Combustível / Motorização': 'Diesel - Motor Industrial Xinchai',
      'Transmissão': 'TCM Automática Powershift',
      'Altura de Elevação da Torre': '4,70 metros (Torre Triplex)',
      'Elevação Livre': 'Sim (ideal para contêineres e carretas fechadas)',
      'Deslocador Lateral': 'Incluso de série',
      'Vias Hidráulicas': '4ª Via Hidráulica instalada de fábrica',
      'Amortecimento': 'Cabine montada sobre coxins de alta absorção',
      'Painel de Instrumentos': 'Digital com horímetro, temperatura, óleo e carga de bateria',
      'Garantia': '1 ano ou 1.000 horas'
    },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    inStock: true,
    stockQuantityText: 'Pronta entrega em estoque / Pronta para faturamento imediato',
    condition: 'Novo',
    featured: true,
    warranty: '1 ano ou 1.000 horas / Rede completa de peças em Cuiabá',
    weightKg: 4350,
    isUnderQuote: true,
    futureFields: {
      'Freio de Estacionamento': 'Alavanca ergonômica com trava de segurança mecânica',
      'Garfos': '1.070 mm ou 1.220 mm temperados com regulagem rápida'
    }
  },

  // 5. Empilhadeira COMMAQ FD30 GLP - Torre 4,7m
  {
    id: 'commaq-fd30-glp-47m',
    name: 'Empilhadeira COMMAQ FD30 GLP - Torre Triplex 4,7m (Motor Nissan K25 / 3.000 kg)',
    partNumber: 'CMQ-FD30-G47',
    oemCode: 'COMMAQ FD30-G / NISSAN K25 / 4.7M',
    brand: 'COMMAQ',
    category: 'empilhadeiras',
    categoryName: 'EMPILHADEIRAS',
    machineTypes: ['Empilhadeira'],
    compatibleModels: ['COMMAQ FD30 GLP', 'Nissan K25', 'Torre Triplex 4,7m'],
    description: 'Empilhadeira industrial COMMAQ FD30 GLP equipada com motor japonês Nissan K25 de baixíssima emissão de poluentes e rodagem extremamente silenciosa e suave. Capacidade para 3.000 kg, transmissão TCM de resposta rápida, torre triplex de 4,70 metros com elevação livre, deslocador lateral de fábrica, cabine montada sobre coxins de absorção antivibração e painel digital com diagnóstico operacional. Ideal para centros de distribuição cobertos, indústrias alimentícias e depósitos logísticos.',
    specifications: {
      'Capacidade Nominal': '3.000 kg (3 toneladas)',
      'Combustível / Motorização': 'GLP / Gasolina - Motor Nissan K25',
      'Transmissão': 'TCM Automática Powershift',
      'Altura de Elevação da Torre': '4,70 metros (Torre Triplex)',
      'Elevação Livre': 'Sim (opera em interiores e contêineres)',
      'Deslocador Lateral': 'Integrado de série',
      'Amortecimento': 'Cabine sobre coxins de alta densidade',
      'Painel de Instrumentos': 'Digital multifuncional com indicadores completos',
      'Garantia': '1 ano ou 1.000 horas'
    },
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=80',
    inStock: true,
    stockQuantityText: 'Pronta entrega em Cuiabá / Condições Finame disponíveis',
    condition: 'Novo',
    featured: true,
    warranty: '1 ano ou 1.000 horas / Suporte com peças originais em estoque',
    weightKg: 4300,
    isUnderQuote: true,
    futureFields: {
      'Suporte de Cilindro': 'Suporte basculante com trava rápida para botijão P20',
      'Emissões': 'Sistema de carburação GLP com catalisador de baixo impacto ambiental'
    }
  },

  // 6. Empilhadeira COMMAQ FD30 GLP - Torre 6,0m
  {
    id: 'commaq-fd30-glp-60m',
    name: 'Empilhadeira COMMAQ FD30 GLP - Torre Triplex 6,0m (Grande Altura / Nissan K25)',
    partNumber: 'CMQ-FD30-G60',
    oemCode: 'COMMAQ FD30-G / NISSAN K25 / 6.0M',
    brand: 'COMMAQ',
    category: 'empilhadeiras',
    categoryName: 'EMPILHADEIRAS',
    machineTypes: ['Empilhadeira'],
    compatibleModels: ['COMMAQ FD30 GLP', 'Nissan K25', 'Torre Triplex 6,0m'],
    description: 'Empilhadeira industrial COMMAQ FD30 GLP especialmente configurada para verticalização e armazenagem em altura com torre triplex de 6,0 metros de elevação. Motor Nissan K25 confiável e econômico, transmissão TCM, deslocador lateral de fábrica, cabine isolada sobre coxins de amortecimento, painel digital de comando e freio de estacionamento reforçado. A máquina perfeita para porta-paletes de 4 a 5 níveis em armazéns de alta densidade.',
    specifications: {
      'Capacidade Nominal': '3.000 kg (3 toneladas)',
      'Combustível / Motorização': 'GLP / Gasolina - Motor Nissan K25',
      'Transmissão': 'TCM Automática Powershift',
      'Altura de Elevação da Torre': '6,00 metros (Torre Triplex de Alto Alcance)',
      'Deslocador Lateral': 'Integrado de série',
      'Amortecimento': 'Cabine montada sobre coxins antivibração',
      'Painel de Instrumentos': 'Digital com alertas de pressão, temperatura e fluidos',
      'Garantia': '1 ano ou 1.000 horas'
    },
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=1000&q=80',
    inStock: true,
    stockQuantityText: 'Disponível para faturamento imediato em MT',
    condition: 'Novo',
    featured: true,
    warranty: '1 ano ou 1.000 horas / Suporte com estoque local em Cuiabá',
    weightKg: 4480,
    isUnderQuote: true,
    futureFields: {
      'Estrutura da Torre': 'Vigas de aço de alta resistência com perfil em J para estabilidade em 6m',
      'Visibilidade': 'Mastro com visão panorâmica entre os cilindros de elevação'
    }
  },

  // 7. Empilhadeira COMMAQ FD30 Diesel - Torre 6,0m
  {
    id: 'commaq-fd30-diesel-60m',
    name: 'Empilhadeira COMMAQ FD30 Diesel - Torre Triplex 6,0m (Motor Xinchai / 3.000 kg)',
    partNumber: 'CMQ-FD30-D60',
    oemCode: 'COMMAQ FD30-D / TRIPLEX 6.0M',
    brand: 'COMMAQ',
    category: 'empilhadeiras',
    categoryName: 'EMPILHADEIRAS',
    machineTypes: ['Empilhadeira'],
    compatibleModels: ['COMMAQ FD30', 'Xinchai Diesel', 'Torre Triplex 6,0m'],
    description: 'Empilhadeira pesada COMMAQ FD30 Diesel com torre triplex de 6,00 metros de elevação e 4ª via hidráulica completa de fábrica. Motor industrial diesel Xinchai de alta durabilidade e torque contínuo para pátios externos, depósitos de materiais de construção, agroindústrias e terminais logísticos. Transmissão TCM automática com reversão ágil, deslocador lateral de carga, cabine sobre coxins de alta absorção e painel digital com diagnóstico contínuo de parâmetros operacionais.',
    specifications: {
      'Capacidade Nominal': '3.000 kg (3 toneladas)',
      'Combustível / Motorização': 'Diesel - Motor Industrial Xinchai',
      'Transmissão': 'TCM Automática Powershift',
      'Altura de Elevação da Torre': '6,00 metros (Torre Triplex)',
      'Deslocador Lateral': 'Incluso de série',
      'Vias Hidráulicas': '4ª Via Hidráulica instalada de fábrica',
      'Amortecimento': 'Cabine montada sobre coxins de alta absorção',
      'Painel de Instrumentos': 'Digital com indicadores de alerta e horímetro',
      'Garantia': '1 ano ou 1.000 horas'
    },
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    inStock: true,
    stockQuantityText: 'Pronta entrega em Cuiabá / Envio imediato para todo o estado',
    condition: 'Novo',
    featured: true,
    warranty: '1 ano ou 1.000 horas / Peças genuínas e assistência técnica',
    weightKg: 4520,
    isUnderQuote: true,
    futureFields: {
      'Iluminação Operacional': 'Faróis dianteiros e traseiros em LED com sinalizador sonoro de ré',
      'Proteção do Operador': 'Teto de proteção FOPS reforçado contra queda de materiais'
    }
  },

  // 1. PEÇAS PA CARREGADEIRA HYUNDAI
  {
    id: 'hyu-hl-pin',
    name: 'Pino e Bucha Cementada da Caçamba / Braço Carregadeira',
    partNumber: '71L7-00120',
    oemCode: '71L700120 / 71L6-00450',
    brand: 'Hyundai',
    category: 'pecas-pa-carregadeira-hyundai',
    categoryName: 'PEÇAS PA CARREGADEIRA HYUNDAI',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['Hyundai HL740-7', 'Hyundai HL740-9', 'Hyundai HL757-7', 'Hyundai HL760-9'],
    description: 'Pino em aço cromo temperado com bucha cementada e ranhuras helicoidais para lubrificação forçada de graxa sob impacto severo na caçamba.',
    specifications: {
      'Diâmetro': '70 mm',
      'Comprimento': '380 mm',
      'Dureza Superficial': '58 - 62 HRC',
      'Aplicação': 'Articulação do braço e caçamba de pá carregadeira'
    },
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    stockQuantityText: 'Em estoque para despacho imediato',
    condition: 'Genuíno',
    featured: true,
    warranty: '12 meses contra defeitos de fabricação',
    weightKg: 14.5
  },
  {
    id: 'hyu-hl-pump',
    name: 'Bomba Hidráulica Principal de Engrenagens Dupla',
    partNumber: '31N8-10020',
    oemCode: '31N810020 / Parker PGP',
    brand: 'Hyundai',
    category: 'pecas-pa-carregadeira-hyundai',
    categoryName: 'PEÇAS PA CARREGADEIRA HYUNDAI',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['Hyundai HL740-9', 'Hyundai HL757-9', 'Hyundai HL760-9A'],
    description: 'Bomba hidráulica de alto volume e pressurização para acionamento do levante, basculamento e sistema de direção rápida.',
    specifications: {
      'Pressão Nominal': '250 bar',
      'Vazão': '95 + 45 L/min a 2200 RPM',
      'Flange': 'Padrão SAE B 2 furos'
    },
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'OEM',
    featured: true,
    warranty: '12 meses ou 1.500 horas',
    weightKg: 32.0
  },

  // 2. PÁ CARREGADEIRAS CASE
  {
    id: 'case-blade-621',
    name: 'Borda Cortante Reversível Central e Cantos da Caçamba',
    partNumber: '84217228',
    oemCode: '84217228 / 87693421',
    brand: 'Case Construction',
    category: 'pa-carregadeiras-case',
    categoryName: 'PÁ CARREGADEIRAS CASE',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['Case 621D', 'Case 621E', 'Case 721D', 'Case 721E', 'Case W20E'],
    description: 'Lâmina de corte reversível forjada em aço boro temperado de alta resistência ao atrito com solo, cascalho e minério.',
    specifications: {
      'Espessura': '25,4 mm (1")',
      'Largura': '254 mm (10")',
      'Furação': 'Parafuso arado 3/4" x 2.1/2"',
      'Dureza': '480 - 520 HBW'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'OEM',
    featured: true,
    warranty: '6 meses contra trinca ou quebra',
    weightKg: 52.0
  },
  {
    id: 'case-trans-disc',
    name: 'Disco de Fricção Sinterizado Transmissão ZF',
    partNumber: '0501313374',
    oemCode: '0501-313-374 / 333/Y4521',
    brand: 'Case Construction',
    category: 'pa-carregadeiras-case',
    categoryName: 'PÁ CARREGADEIRAS CASE',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['Case 621D', 'Case 621E', 'Case 721E', 'Case 821E', 'Transmissão ZF 4WG200'],
    description: 'Disco com pastilhas de fricção sinterizada em bronze especial para reversão instantânea de marcha sem patinar.',
    specifications: {
      'Estrias': '28 dentes internos',
      'Diâmetro Externo': '180 mm',
      'Espessura': '3,0 mm'
    },
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: false,
    warranty: '12 meses',
    weightKg: 0.95
  },

  // 3. PÁ CARREGADEIRA NEW HOLLAND
  {
    id: 'nh-pin-w130',
    name: 'Conjunto de Articulação Central do Chassi e Buchas',
    partNumber: '75298842',
    oemCode: '75298842 / 87384102',
    brand: 'New Holland',
    category: 'pa-carregadeira-new-holland',
    categoryName: 'PÁ CARREGADEIRA NEW HOLLAND',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['New Holland W130', 'New Holland W130B', 'New Holland W170', 'New Holland W170B'],
    description: 'Pino temperado de articulação central do chassi (chassi dianteiro e traseiro) com retentores guarda-pó e rolamentos cônicos.',
    specifications: {
      'Tratamento': 'Cementação por indução profunda',
      'Diâmetro': '90 mm',
      'Incluso': 'Pino superior e inferior, buchas de aço e calços de folga'
    },
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: true,
    warranty: '12 meses ou 2.000 horas',
    weightKg: 28.0
  },

  // 4. PÁ CARREGADEIRA SDLG
  {
    id: 'sdlg-turbo-936',
    name: 'Turbocompressor Motor Weichai / Deutz SDLG LG936L',
    partNumber: '13038511',
    oemCode: '13038511 / 4110000076 / TB28',
    brand: 'SDLG',
    category: 'pa-carregadeira-sdlg',
    categoryName: 'PÁ CARREGADEIRA SDLG',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['SDLG LG936L', 'SDLG LG938L', 'SDLG L936F', 'Weichai WP6G125E22'],
    description: 'Turbocompressor balanceado com carcaça fria em alumínio fundido e rotor quente em Inconel resistente a altíssimas temperaturas.',
    specifications: {
      'Motor': 'Weichai WP6G125 / Deutz WP6',
      'Giro Máximo': '150.000 RPM',
      'Acompanha': 'Jogo de juntas de admissão e escape'
    },
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'OEM',
    featured: true,
    warranty: '12 meses',
    weightKg: 8.4
  },
  {
    id: 'sdlg-brake-pad',
    name: 'Pastilha de Freio e Êmbolo da Pinça SDLG LG956L',
    partNumber: '4120001740',
    oemCode: '4120001740 / 75700438',
    brand: 'SDLG',
    category: 'pa-carregadeira-sdlg',
    categoryName: 'PÁ CARREGADEIRA SDLG',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['SDLG LG956L', 'SDLG LG958L', 'SDLG L956F', 'SDLG L958F'],
    description: 'Jogo com 4 pastilhas de freio a disco com composto orgânico cerâmico de alta dissipação térmica para paradas seguras sob carga.',
    specifications: {
      'Tipo': 'Pinça a ar sobre óleo',
      'Composição': 'Composto cerâmico livre de amianto',
      'Espessura': '22 mm'
    },
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Novo',
    featured: false,
    warranty: '6 meses',
    weightKg: 4.8
  },

  // 5. MOTONIVELADORA XCMG
  {
    id: 'xcmg-blade-gr180',
    name: 'Lâmina Curvada Tratada 7 Furos para Motoniveladora',
    partNumber: '803164923',
    oemCode: '803164923 / 5D9558X',
    brand: 'XCMG',
    category: 'motoniveladora-xcmg',
    categoryName: 'MOTONIVELADORA XCMG',
    machineTypes: ['Motoniveladora'],
    compatibleModels: ['XCMG GR180', 'XCMG GR1803', 'XCMG GR215', 'XCMG GR2153'],
    description: 'Lâmina curvada com tratamento térmico especial para nivelamento e conformação de solos compactados e cascalho pesado.',
    specifications: {
      'Comprimento': '6 pés (1.828 mm) ou 7 pés (2.133 mm)',
      'Espessura': '19 mm (3/4")',
      'Furação': 'Furos cônicos para parafuso arado 5/8"',
      'Dureza': '450 - 500 HBW'
    },
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'OEM',
    featured: true,
    warranty: '6 meses contra trincas',
    weightKg: 41.0
  },

  // 6. PÁ CARREGADEIRA JHON DEERE
  {
    id: 'jd-pump-524k',
    name: 'Bomba Principal Hidráulica de Pistões Fluxo Variável',
    partNumber: 'AT358392',
    oemCode: 'AT-358392 / PG201488',
    brand: 'John Deere',
    category: 'pa-carregadeira-jhon-deere',
    categoryName: 'PÁ CARREGADEIRA JHON DEERE',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['John Deere 524K', 'John Deere 544K', 'John Deere 624K', 'John Deere 644K'],
    description: 'Bomba de deslocamento volumétrico variável com compensador de pressão e sensor de carga (Load Sensing).',
    specifications: {
      'Pressão Máxima': '310 bar',
      'Deslocamento': '75 cc/rev',
      'Eixo': 'Estriado SAE 14 dentes'
    },
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: true,
    warranty: '12 meses',
    weightKg: 46.0
  },

  // 7. CHANGLIN
  {
    id: 'changlin-teeth',
    name: 'Dente e Adaptador de Caçamba Carregadeira Changlin',
    partNumber: '936-71-0001',
    oemCode: '936710001 / ZL30G-01',
    brand: 'Changlin',
    category: 'changlin',
    categoryName: 'CHANGLIN',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['Changlin 936', 'Changlin 937H', 'Changlin 956', 'Changlin 957H'],
    description: 'Ponta forjada em liga de aço de alta penetração em solos compactados. Acompanha pino e anel elástico de retenção.',
    specifications: {
      'Material': 'Aço liga com boro e cromo',
      'Fixação': 'Pino vertical / horizontal com trava de borracha',
      'Peso': '4,3 kg'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'OEM',
    featured: false,
    warranty: '6 meses',
    weightKg: 4.3
  },

  // 8. EMPILHADEIRAS CLARCK
  {
    id: 'clark-fork-c25',
    name: 'Par de Garfos Forjados Classe 2A / 2B para Empilhadeira',
    partNumber: 'CLK-2A-1070',
    oemCode: '921134 / 2774581',
    brand: 'Clark',
    category: 'empilhadeiras-clarck',
    categoryName: 'EMPILHADEIRAS CLARCK',
    machineTypes: ['Escavadeira Hidráulica'],
    compatibleModels: ['Clark C25', 'Clark C30', 'Clark CMP25', 'Clark GTS25'],
    description: 'Garfos forjados inteiriços em aço 40Cr com tratamento térmico para capacidade nominal de 2.500 kg a 3.000 kg no centro de carga 500 mm.',
    specifications: {
      'Comprimento': '1.070 mm (ou 1.200 mm sob encomenda)',
      'Seção': '100 mm x 40 mm',
      'Classe de Montagem': 'ISO 2A (altura de encosto 407 mm)',
      'Capacidade do Par': '2.500 kg a 500 mm'
    },
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Novo',
    featured: false,
    warranty: '12 meses',
    weightKg: 85.0
  },

  // 9. EMPILHADEIRAS HANGCHA
  {
    id: 'hangcha-seal-kit',
    name: 'Kit de Vedação do Cilindro de Elevação e Inclinação',
    partNumber: 'HC-N163-510000-000',
    oemCode: 'N163510000000 / A22A4',
    brand: 'Hangcha',
    category: 'empilhadeiras-hangcha',
    categoryName: 'EMPILHADEIRAS HANGCHA',
    machineTypes: ['Escavadeira Hidráulica'],
    compatibleModels: ['Hangcha CPCD25', 'Hangcha CPCD30', 'Hangcha CPCD35 Série XF / Série A'],
    description: 'Kit completo de reparo com gaxetas de poliuretano e anéis anti-extrusão para evitar vazamentos na torre de elevação.',
    specifications: {
      'Haste': '55 mm / 60 mm',
      'Camisa': '80 mm',
      'Material': 'Poliuretano + Viton'
    },
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: false,
    warranty: '6 meses',
    weightKg: 1.2
  },

  // 10. EMPILHADEIRAS HYUNDAI
  {
    id: 'hyu-fork-brake',
    name: 'Kit de Sapatas e Cilindro de Freio Empilhadeira Hyundai',
    partNumber: '51840-FK000',
    oemCode: '51840FK000 / 51830-FK000',
    brand: 'Hyundai',
    category: 'empilhadeiras-hyundai',
    categoryName: 'EMPILHADEIRAS HYUNDAI',
    machineTypes: ['Escavadeira Hidráulica'],
    compatibleModels: ['Hyundai 25L-7A', 'Hyundai 30L-7A', 'Hyundai 25D-7', 'Hyundai 30D-7'],
    description: 'Conjunto completo de lonas coladas de alta durabilidade e cilindro mestre de acionamento das rodas motrizes.',
    specifications: {
      'Diâmetro do Tambor': '310 mm',
      'Largura da Lona': '65 mm',
      'Incluso': 'Molas de retorno e pinos de fixação'
    },
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: false,
    warranty: '12 meses',
    weightKg: 6.8
  },

  // 11. PEÇAS EMPILHADEIRAS HELI
  {
    id: 'heli-pump-h2000',
    name: 'Bomba Hidráulica de Engrenagens Dupla Empilhadeira Heli',
    partNumber: 'CBHZ-F31.5-ALH4',
    oemCode: 'CBHZF315 / H2000-2.5T',
    brand: 'Heli',
    category: 'pecas-empilhadeiras-heli',
    categoryName: 'PEÇAS EMPILHADEIRAS HELI',
    machineTypes: ['Escavadeira Hidráulica'],
    compatibleModels: ['Heli CPCD25 H2000', 'Heli CPCD30 H2000', 'Heli CPCD35 Série G'],
    description: 'Bomba hidráulica de alumínio fundido de alta resistência para controle de torre e direção hidrostática.',
    specifications: {
      'Deslocamento': '31.5 cc/rev',
      'Sentido': 'Esquerdo (CCW)',
      'Pressão de Trabalho': '20 MPa (200 bar)'
    },
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: false,
    warranty: '12 meses',
    weightKg: 9.5
  },

  // 12. PEÇA PA CARREGADEIRAS LIU GONG
  {
    id: 'liugong-clg835-edge',
    name: 'Faca Cortante Reversível Caçamba LiuGong CLG835 / 856',
    partNumber: '72A0005',
    oemCode: '72A0005 / 42C0045',
    brand: 'LiuGong',
    category: 'peca-pa-carregadeiras-liu-gong',
    categoryName: 'PEÇA PA CARREGADEIRAS LIU GONG',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['LiuGong CLG835', 'LiuGong CLG835H', 'LiuGong CLG856', 'LiuGong CLG856H'],
    description: 'Lâmina de corte central em aço temperado resistente à abrasão e impacto em terrenos pedregosos e agrícolas.',
    specifications: {
      'Espessura': '25,4 mm',
      'Comprimento': '1.320 mm',
      'Furação': '8 furos arado 3/4"'
    },
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'OEM',
    featured: true,
    warranty: '6 meses',
    weightKg: 58.0
  },

  // 13. PEÇAS PA CARREGADEIRAS SEM
  {
    id: 'sem-tr200-pack',
    name: 'Discos e Separadores da Transmissão SEM TR200',
    partNumber: 'W044000000',
    oemCode: 'W044000000 / SEM656D',
    brand: 'SEM',
    category: 'pecas-pa-carregadeiras-sem',
    categoryName: 'PEÇAS PA CARREGADEIRAS SEM',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['SEM 655D', 'SEM 656D', 'SEM 658D', 'SEM 660D'],
    description: 'Pacote de embreagens sinterizadas e discos de aço para reparo e revisão total da transmissão SEM PowerShift.',
    specifications: {
      'Aplicação': 'Transmissão SEM TR200 (Caterpillar Technology)',
      'Incluso': 'Discos de aço e discos de atrito com revestimento especial'
    },
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: false,
    warranty: '12 meses',
    weightKg: 7.2
  },

  // 14. PEÇAS PÁ CARREGADEIRA SHANTUI
  {
    id: 'shantui-roller',
    name: 'Rolete Inferior Flange Simples para Tratores e Carregadeiras',
    partNumber: '16Y-40-09000',
    oemCode: '16Y4009000 / 16Y-40-10000',
    brand: 'Shantui',
    category: 'pecas-pa-carregadeira-shantui',
    categoryName: 'PEÇAS PÁ CARREGADEIRA SHANTUI',
    machineTypes: ['Trator de Esteira', 'Pá Carregadeira'],
    compatibleModels: ['Shantui SD16', 'Shantui SD22', 'Shantui SL30W', 'Shantui SL50W'],
    description: 'Rolete de esteira forjado com profundidade de têmpera superior a 10 mm e vedação mecânica Duo-Cone lubrificada para vida toda.',
    specifications: {
      'Dureza': '56 - 60 HRC',
      'Flange': 'Simples (Single Flange)',
      'Peso': '36,5 kg'
    },
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: false,
    warranty: '12 meses ou 2.000 horas',
    weightKg: 36.5
  },

  // 15. VENDA DE MAQUINAS
  {
    id: 'venda-pa-956',
    name: 'Pá Carregadeira 956 Caçamba 3.0 m³ - Revisada & Pronta para Operar',
    partNumber: 'MAQ-CARREG-956',
    oemCode: 'COM-MÁQUINAS-SEMINOVOS',
    brand: 'Multimarcas',
    category: 'venda-de-maquinas',
    categoryName: 'VENDA DE MAQUINAS',
    machineTypes: ['Pá Carregadeira'],
    compatibleModels: ['Obras civis', 'Mineração', 'Agropecuária / Grãos', 'Terraplenagem'],
    description: 'Máquina inspecionada em mais de 120 pontos técnicos. Motor diesel 6 cilindros turbo intercooler, transmissão PowerShift e ar-condicionado na cabine.',
    specifications: {
      'Capacidade de Carga': '5.000 kg',
      'Volume da Caçamba': '3,0 m³',
      'Horímetro': '2.140 horas originais',
      'Pneus': 'Pneus 23.5-25 16PR novos',
      'Garantia': '90 dias no trem de força'
    },
    image: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Novo',
    featured: true,
    warranty: 'Garantia operacional COMMAQ',
    weightKg: 16800,
    price: 'Sob Consulta',
    isUnderQuote: true
  },

  // 16. LOCAÇÃO
  {
    id: 'locacao-escavadeira-20t',
    name: 'Locação Mensal / Safra de Escavadeira Hidráulica 20 a 22 Toneladas',
    partNumber: 'LOC-ESCAV-20T',
    oemCode: 'FROTA-COM-MÁQUINAS',
    brand: 'Multimarcas',
    category: 'locacao',
    categoryName: 'LOCAÇÃO',
    machineTypes: ['Escavadeira Hidráulica'],
    compatibleModels: ['Contratos de Abertura de Estrada', 'Drenagem', 'Represas e Valas', 'Mineração'],
    description: 'Equipamento moderno com manutenção preventiva garantida por nossa equipe técnica volante no canteiro de obras.',
    specifications: {
      'Peso Operacional': '21.500 kg',
      'Alcance de Escavação': '9.800 mm',
      'Condição de Locação': 'Com ou sem operador qualificado',
      'Disponibilidade': 'Imediata em Mato Grosso e regiões vizinhas'
    },
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: true,
    warranty: 'Substituição imediata em caso de avaria mecânica',
    weightKg: 21500,
    price: 'Orçamento Sob Medida',
    isUnderQuote: true
  },

  // 17. USO E CONSUMO
  {
    id: 'uso-graxa-ep2',
    name: 'Balde de Graxa Especial Alta Pressão EP-2 com Bissulfeto de Molibdênio',
    partNumber: 'LUB-GRAXA-EP2-18KG',
    oemCode: 'NLGI-2 / MOLIBDÊNIO',
    brand: 'Multimarcas',
    category: 'uso-e-consumo',
    categoryName: 'USO E CONSUMO',
    machineTypes: ['Escavadeira Hidráulica', 'Pá Carregadeira', 'Retroescavadeira', 'Motoniveladora', 'Trator de Esteira'],
    compatibleModels: ['Pinos de Caçamba', 'Articulações Centrais', 'Rolamentos de Roda', 'Quinta Roda'],
    description: 'Graxa à base de sabão de lítio aditivada com MoS2 (Bissulfeto de Molibdênio) para resistir a cargas de choque extremas e lavagem por água.',
    specifications: {
      'Consistência': 'NLGI 2',
      'Ponto de Gota': '> 190 °C',
      'Carga 4 Esferas': '> 315 kgf',
      'Embalagem': 'Balde reforçado de 18 kg ou Tambor de 180 kg'
    },
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Novo',
    featured: false,
    warranty: 'Garantia de fábrica e laudo técnico',
    weightKg: 18.0
  },

  // 18. PEÇAS GERAIS DE LINHA AMARELA (PEÇAS)
  {
    id: 'pecas-filtro-lf9009',
    name: 'Filtro de Óleo Lubrificante Venturi Combo de Alto Rendimento',
    partNumber: 'LF9009',
    oemCode: '3401544 / Fleetguard',
    brand: 'Multimarcas',
    category: 'pecas',
    categoryName: 'PEÇAS',
    machineTypes: ['Escavadeira Hidráulica', 'Pá Carregadeira', 'Motoniveladora', 'Trator de Esteira'],
    compatibleModels: ['Komatsu PC200', 'Case 821E', 'Hyundai R210', 'Liugong CLG835', 'Motores Cummins'],
    description: 'Filtro duplo Full-Flow e By-Pass integrados no mesmo elemento blindado. Retém micropartículas e fuligem sem gerar queda de pressão.',
    specifications: {
      'Rosca': 'M27 x 2',
      'Diâmetro Externo': '118 mm',
      'Comprimento': '301 mm',
      'Eficiência': '98,7% a 30 mícrons'
    },
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    condition: 'Genuíno',
    featured: true,
    warranty: 'Garantia contra defeito de fabricação',
    weightKg: 1.5
  },
  ...IMPORTED_PRODUCTS
];

export const MACHINE_MODELS_BY_BRAND: Record<string, string[]> = {
  'Hyundai': ['Hyundai HL740-9 / HL757', 'Hyundai HL760-9A / HL960', 'Hyundai R210LC-7 / 9S', 'Hyundai R220LC-9SB', 'Hyundai HX220HD', 'Empilhadeiras 25L / 30D'],
  'Case Construction': ['Case 580M / 580N', 'Case 621D / 621E / 721E', 'Case CX210B / CX220C', 'Case 845B / 865B', 'Case 1150L / 1650L'],
  'New Holland': ['New Holland W130 / W170 / W190', 'New Holland B95B / B110B', 'New Holland E215B / E215C', 'New Holland RG140.B / RG170.B'],
  'SDLG': ['SDLG LG936L / LG938L', 'SDLG LG956L / LG958L', 'SDLG L936F / L956F / L958F'],
  'John Deere': ['John Deere 524K / 544K / 624K', 'John Deere 310J / 310K / 310L', 'John Deere 210G / 670G'],
  'XCMG': ['XCMG GR180 / GR1803', 'XCMG GR215 / GR2153', 'XCMG LW300K / LW500K'],
  'LiuGong': ['LiuGong CLG835 / CLG835H', 'LiuGong CLG856 / CLG856H', 'LiuGong 922E'],
  'Changlin': ['Changlin 936 / 937H', 'Changlin 956 / 957H'],
  'Clark': ['Clark C25 / C30', 'Clark CMP25 / CMP30', 'Clark GTS25'],
  'Hangcha': ['Hangcha CPCD25 / CPCD30 / CPCD35 Série XF / A'],
  'Heli': ['Heli CPCD25 H2000', 'Heli CPCD30 H2000', 'Heli Série G 3.5T'],
  'Shantui': ['Shantui SD16 / SD22 / SD32', 'Shantui SL30W / SL50W'],
  'SEM': ['SEM 636D / 655D', 'SEM 656D / 660D'],
  'Caterpillar': ['CAT 320D / 320GC', 'CAT 330D / 336D', 'CAT 924H / 938K', 'CAT 120K / 140K', 'CAT 416E / 420F', 'CAT D6D / D6R / D6T'],
  'Komatsu': ['Komatsu PC200-8', 'Komatsu PC210-10', 'Komatsu PC350LC', 'Komatsu WA200 / WA320', 'Komatsu D65EX', 'Komatsu GD655'],
  'COMMAQ': ['COMMAQ 938 (3t)', 'COMMAQ Telescópica 930t', 'COMMAQ 937H (3t)', 'Empilhadeira FD30 Diesel 4,7m', 'Empilhadeira FD30 GLP 4,7m', 'Empilhadeira FD30 GLP 6,0m', 'Empilhadeira FD30 Diesel 6,0m'],
  'Multimarcas': ['Linha Amarela Geral', 'Tratores e Escavadeiras', 'Empilhadeiras Multimarcas']
};

export const MACHINE_TYPES: string[] = [
  'Pá Carregadeira',
  'Escavadeira Hidráulica',
  'Retroescavadeira',
  'Motoniveladora',
  'Trator de Esteira',
  'Miniescavadeira / Bobcat',
  'Trator Agrícola',
  'Empilhadeira'
];
