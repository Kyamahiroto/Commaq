import { PRODUCTS } from '../src/data/products';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.resolve(process.cwd(), 'wordpress-theme-com-maquinas/assets/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFile = path.join(outDir, 'products-seed.json');
fs.writeFileSync(outFile, JSON.stringify(PRODUCTS, null, 2), 'utf-8');
console.log(`Successfully exported ${PRODUCTS.length} products to ${outFile}`);
