import fs from 'fs';
import path from 'path';

const preferredCsv = path.resolve('public/assets/aistudio/produtos_commaq_com_imagens_215999ac.csv');
const fallbackCsv = path.resolve('scripts/raw_products.csv');
const csvPath = fs.existsSync(preferredCsv) ? preferredCsv : fallbackCsv;
console.log('Using CSV source:', csvPath);
const rawText = fs.readFileSync(csvPath, 'utf-8');

// Parse CSV lines accounting for quoted strings and embedded commas/line breaks
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  const rows = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const cells = [];
    let cur = '';
    let inQuote = false;
    
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        if (inQuote && line[c + 1] === '"') {
          cur += '"';
          c++;
        } else {
          inQuote = !inQuote;
        }
      } else if (char === ',' && !inQuote) {
        cells.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    cells.push(cur.trim());
    if (cells.length >= 5) {
      rows.push(cells);
    }
  }
  return rows;
}

const rows = parseCSV(rawText);

const CATEGORY_IMAGES = {
  'rolamentos': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  'sistema-eletrico': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  'transmissao': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  'sistema-de-freio': 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
  'retentores': 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
  'sistema-hidraulico': 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
  'motor': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  'filtros': 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=800&q=80',
  'juntas-e-calcos': 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
  'porcas-e-parafusos': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  'diferencial': 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=800&q=80',
  'uso-geral': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  'empilhadeiras': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
};

function normalizeCategory(catStr) {
  const upper = (catStr || '').toUpperCase().trim();
  if (upper.includes('ROLAMENTO')) return { id: 'rolamentos', name: 'ROLAMENTOS' };
  if (upper.includes('ELÉTRICO') || upper.includes('ELETRICO')) return { id: 'sistema-eletrico', name: 'SISTEMA ELÉTRICO' };
  if (upper.includes('TRANSMISSÃO') || upper.includes('TRANSMISSAO')) {
    if (upper.includes('EMPILHADEIRA')) return { id: 'empilhadeiras', name: 'EMPILHADEIRAS' };
    return { id: 'transmissao', name: 'TRANSMISSÃO' };
  }
  if (upper.includes('FREIO')) return { id: 'sistema-de-freio', name: 'SISTEMA DE FREIO' };
  if (upper.includes('RETENTOR')) return { id: 'retentores', name: 'RETENTORES' };
  if (upper.includes('HIDRÁULICO') || upper.includes('HIDRAULICO')) return { id: 'sistema-hidraulico', name: 'SISTEMA HIDRÁULICO' };
  if (upper.includes('MOTOR')) return { id: 'motor', name: 'MOTOR' };
  if (upper.includes('FILTRO')) return { id: 'filtros', name: 'FILTROS' };
  if (upper.includes('JUNTA') || upper.includes('CALÇO') || upper.includes('CALCO')) return { id: 'juntas-e-calcos', name: 'JUNTAS E CALÇOS' };
  if (upper.includes('PARAFUSO') || upper.includes('PORCA') || upper.includes('ARRUELA')) return { id: 'porcas-e-parafusos', name: 'PORCAS E PARAFUSOS' };
  if (upper.includes('DIFERENCIAL')) return { id: 'diferencial', name: 'DIFERENCIAL' };
  if (upper.includes('EMPILHADEIRA')) return { id: 'empilhadeiras', name: 'EMPILHADEIRAS' };
  return { id: 'uso-geral', name: 'USO GERAL' };
}

function detectBrand(name) {
  const u = name.toUpperCase();
  if (u.includes('XGMA') || u.includes('XG 932') || u.includes('XG932') || u.includes('XG31802')) return 'XGMA';
  if (u.includes('DEGONG') || u.includes('DG938') || u.includes('DG958') || u.includes('DG 938') || u.includes('DGONG')) return 'Degong';
  if (u.includes('CHANGLIN')) return 'Changlin';
  if (u.includes('HANGCHA')) return 'Hangcha';
  if (u.includes('HELI') || u.includes('HELLI')) return 'Heli';
  if (u.includes('CLARK')) return 'Clark';
  if (u.includes('XCMG')) return 'XCMG';
  if (u.includes('SHANTUI')) return 'Shantui';
  if (u.includes('SDLG')) return 'SDLG';
  if (u.includes('YUTONG')) return 'Yutong';
  if (u.includes('HYUNDAI') || u.includes('HUNDAY')) return 'Hyundai';
  if (u.includes('MAXIMAL')) return 'Multimarcas';
  if (u.includes('XINCHAI')) return 'Multimarcas';
  if (u.includes('YANMAR')) return 'Multimarcas';
  if (u.includes('NISSAN')) return 'Multimarcas';
  if (u.includes('CUMMINS') || u.includes('6BT')) return 'Multimarcas';
  if (u.includes('COMMAQ')) return 'COMMAQ';
  return 'Multimarcas';
}

function detectMachineTypes(name, catId) {
  const u = name.toUpperCase();
  if (catId === 'empilhadeiras' || u.includes('EMPILHADEIRA') || u.includes('EMP.') || u.includes('TORRE') || u.includes('CARGA') || u.includes('MAXIMAL') || u.includes('HANGCHA') || u.includes('HELI') || u.includes('STILL') || u.includes('HYSTER') || u.includes('CLARK') || u.includes('M25') || u.includes('M35') || u.includes('M40') || u.includes('M16') || u.includes('FD35') || u.includes('FD30')) {
    return ['Empilhadeira'];
  }
  if (u.includes('PATROL') || u.includes('PY165') || u.includes('MOTONIVELADORA') || u.includes('XG31802') || u.includes('GR180')) {
    return ['Motoniveladora'];
  }
  if (u.includes('ROLO') || u.includes('612H')) {
    return ['Pá Carregadeira'];
  }
  if (u.includes('210LC') || u.includes('ESCAVADEIRA')) {
    return ['Escavadeira Hidráulica'];
  }
  return ['Pá Carregadeira'];
}

function detectCompatibleModels(name) {
  const models = [];
  const u = name.toUpperCase();
  if (u.includes('932') || u.includes('XGMA 932') || u.includes('XG932')) models.push('XGMA 932 / 932III');
  if (u.includes('938') || u.includes('DG938') || u.includes('DEGONG 938')) models.push('Degong DG938');
  if (u.includes('937H') || u.includes('937') || u.includes('CHANGLIN 937')) models.push('Changlin 937H');
  if (u.includes('835') || u.includes('ZL30H')) models.push('XCMG / LiuGong ZL30H / 835');
  if (u.includes('958') || u.includes('DG958')) models.push('Degong DG958');
  if (u.includes('PY165')) models.push('Changlin Patrol PY165');
  if (u.includes('MAXIMAL')) models.push('Empilhadeira Maximal (M16/M25/M35/M40)');
  if (u.includes('HANGCHA')) models.push('Empilhadeira Hangcha (2.0 a 3.5t)');
  if (u.includes('HELI')) models.push('Empilhadeira Heli');
  if (u.includes('XINCHAI') || u.includes('498') || u.includes('C490') || u.includes('A490')) models.push('Motor Xinchai 490 / 498 / C490BPG');
  if (u.includes('NISSAN') || u.includes('K25') || u.includes('K21')) models.push('Motor Nissan K21 / K25');
  if (u.includes('YANMAR') || u.includes('4TNV') || u.includes('4TNE')) models.push('Motor Yanmar 4TNV94 / 4TNV98');
  if (u.includes('CUMMINS') || u.includes('6BT') || u.includes('6BT5.9')) models.push('Motor Cummins 6BT 5.9L');
  if (u.includes('YUCHAI')) models.push('Motor Yuchai T20');
  if (u.includes('HYSTER') || u.includes('H55FT') || u.includes('H90FT')) models.push('Empilhadeira Hyster Fortis');
  if (u.includes('CLARK') || u.includes('CQ230L')) models.push('Empilhadeira Clark');
  if (u.includes('SDLG') || u.includes('L936') || u.includes('LG936')) models.push('SDLG LG936 / L936');
  if (u.includes('SHANTUI') || u.includes('SW30')) models.push('Shantui SW30');
  if (u.includes('HYUNDAI 210LC') || u.includes('210LC')) models.push('Hyundai R210LC-7 / R210LC-9');
  
  if (models.length === 0) {
    models.push('Linha Amarela e Máquinas Pesadas');
  }
  return models;
}

const products = rows.map((r, index) => {
  const idNum = r[0] || (index + 5000);
  const name = r[3] || 'Peça Industrial';
  const slug = r[4] || `prod-${idNum}`;
  const rawCat = r[6] || 'USO GERAL';
  const sku = r[7] || `SKU-${idNum}`;
  const rawPrice = r[8] || r[9] || '';
  const descShort = r[23] || '';
  const imgUrl = (r[25] && r[25].startsWith('http')) ? r[25].trim() : '';
  const localImgPath = r[26] ? r[26].trim() : '';
  
  const catObj = normalizeCategory(rawCat);
  const brand = detectBrand(name);
  const machineTypes = detectMachineTypes(name, catObj.id);
  const compatibleModels = detectCompatibleModels(name);
  const fallbackImage = CATEGORY_IMAGES[catObj.id] || CATEGORY_IMAGES['uso-geral'];
  const image = imgUrl || fallbackImage;
  
  return {
    id: `prod-planilha-${idNum}-${slug}`.toLowerCase(),
    name: name,
    partNumber: sku || `REF-${idNum}`,
    oemCode: `ID-${idNum} / ${sku}`,
    brand: brand,
    category: catObj.id,
    categoryName: catObj.name,
    machineTypes: machineTypes,
    compatibleModels: compatibleModels,
    description: descShort ? `${descShort}. Componente técnico de reposição COMMAQ com garantia de procedência em Cuiabá/MT.` : `Componente técnico genuíno e de reposição ${name}. Alta resistência para trabalho pesado em máquinas de linha amarela e empilhadeiras. Fornecido com garantia de procedência COMMAQ em Cuiabá/MT.`,
    specifications: {
      'Código do Item': `ID ${idNum}`,
      'SKU / Referência': sku,
      'Categoria Principal': catObj.name,
      'Marca / Sistema': brand,
      'Compatibilidade': compatibleModels.join(', '),
      'Garantia': 'Garantia de procedência COMMAQ e suporte local',
      'Disponibilidade': 'Estoque físico em Cuiabá com despacho imediato'
    },
    image: image,
    originalImageUrl: imgUrl || undefined,
    localImagePath: localImgPath || undefined,
    fallbackImage: fallbackImage,
    inStock: true,
    stockQuantityText: 'Disponível em estoque / Pronta entrega',
    condition: 'Novo',
    featured: false,
    warranty: 'Garantia padrão COMMAQ e assistência técnica',
    price: rawPrice ? `R$ ${rawPrice}` : undefined,
    isUnderQuote: !rawPrice
  };
});

const fileHeader = `// Arquivo gerado automaticamente a partir da planilha de produtos fornecida pelo cliente
// Total de produtos cadastrados: ${products.length}
import { Product } from '../types';

export const IMPORTED_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(path.resolve('src/data/importedProducts.ts'), fileHeader, 'utf-8');
console.log(`Success! Generated ${products.length} products in src/data/importedProducts.ts`);
