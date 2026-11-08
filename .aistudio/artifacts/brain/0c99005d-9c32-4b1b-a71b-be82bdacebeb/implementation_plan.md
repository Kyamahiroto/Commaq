# Plano de Implementação: Cadastro Geral de Produtos da Planilha por Categoria

Cadastro e organização de todos os mais de 160 produtos e peças industriais fornecidos na planilha, estruturando suas categorias, códigos, marcas compatíveis e especificações comerciais ("Sob Consulta" via WhatsApp), com suporte visual padrão imediato e preparação da ferramenta para cadastro posterior das fotos de cada item pelo cliente.

---

## Decisões & Alinhamento com a Solicitação

- **Importação Completa da Planilha**:
  - Todos os itens da tabela (rolamentos, solenoides, discos de transmissão, tubos hidráulicos, turbinas, filtros, calços, juntas, buchas, pinos, coroas e pinhões, etc.) serão cadastrados com fidelidade ao nome original, categoria, código/SKU e compatibilidade de equipamentos (XGMA, Degong, Changlin, Maximal, Hangcha, Heli, Xinchai, Nissan, Yanmar, Cummins, etc.).
- **Categorização Padronizada**:
  - Cada produto será associado à sua categoria correspondente da planilha:
    1. `ROLAMENTOS` (Rolamentos, Agulhas, Gaiolas e Mancais)
    2. `SISTEMA ELÉTRICO` (Chaves, Bombas elétricas, Faróis, Contatoras, Alternadores)
    3. `TRANSMISSÃO` (Discos, Conversores de Torque, Flanges, Eixos, Tambores, Solenoides)
    4. `SISTEMA DE FREIO` (Cabos de mão, Cilindros mestres, Pastilhas, Tubos de freio, Válvulas)
    5. `RETENTORES` (Retentores de bomba, vedações, gaxetas, protetores contra poeira)
    6. `SISTEMA HIDRÁULICO` (Tubulações de alta pressão, bombas hidráulicas, visores, mangueiras)
    7. `MOTOR` (Turbinas, Válvulas de admissão e escape, Bicos injetores, Juntas de cabeçote, Bielas)
    8. `FILTROS` (Combustível, Lubrificante, Hidráulico, Ar interno e externo, Separadores de água)
    9. `JUNTAS E CALÇOS` (Calços de torque, Espaçadores, Bronzinas, Mancais de ajuste)
    10. `PORCAS E PARAFUSOS / ARRUELAS` (Arruelas especiais de nylon/bronze, Coxins, Parafusos)
    11. `DIFERENCIAL` (Coroa e pinhão, Cruzetas de cardan, Caixas satélite, Tampas de cubo)
    12. `USO GERAL` (Travas, Buchas universais, Alavancas, Adesivos e Consumíveis)
    13. `EMPILHADEIRAS` e `PÁS CARREGADEIRAS` (Componentes e Máquinas)
- **Gestão Posterior de Imagens**:
  - Como o usuário informou que *cadastrará as imagens posteriormente*, cada produto receberá uma imagem ilustrativa industrial de alta qualidade correspondente à sua categoria e família mecânica, garantindo que o site fique com acabamento profissional imediato.
  - O sistema manterá o campo de imagem e disponibilizará ferramenta/modal de edição rápida para que as fotos possam ser inseridas posteriormente via link direto ou upload com salvamento automático.
- **Condição Comercial**:
  - Itens com preço zerado na planilha serão exibidos como **"Sob Consulta"** com botão direto para cotação no WhatsApp COMMAQ `(65) 3626-1010` e inclusão na Lista de Cotação.

---

## 1. Arquitetura de Dados & Catálogo

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Dados dos Produtos da Planilha                       │
│  src/data/importedProducts.ts ou src/data/products.ts                  │
│  • +160 produtos normalizados com id, name, sku, category,             │
│    categoryName, brand, compatibleModels, description e inStock        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Estrutura das Categorias                             │
│  src/data/categories.ts                                                │
│  • Categorias industriais mapeadas (Rolamentos, Freios, Motor, etc.)   │
│  • Contadores reais de itens por categoria                             │
│  • Ícones temáticos e descrições claras para filtros e menus           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Experiência do Catálogo                              │
│  • Busca instantânea por Nome, Código SKU, Aplicação ou Máquina        │
│  • Filtros por Categoria lateral e superior                            │
│  • Card com foto padrão da categoria (pronta para substituição futura) │
│  • Ficha detalhada com botão "Cotar no WhatsApp" e "Adicionar à Lista" │
│  • Gerenciador de Fotos para atualização posterior                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Etapas Detalhadas de Implementação

### Etapa 1: Cadastro dos Produtos da Planilha
- Criar a base de dados estruturada com os ~160 produtos extraídos da planilha:
  - Mapear cada linha CSV para o modelo `Product` do TypeScript.
  - Normalizar campos: `id`, `name`, `partNumber` (SKU original), `brand` (identificando marcas referenciadas no nome como XGMA, Degong, Changlin, Maximal, Hangcha, Heli, Cummins, Deutz, Xinchai, Nissan, Yanmar, Hyster, etc.), `category`, `categoryName`, `inStock: true`, `isUnderQuote: true`.
  - Gerar descrições técnicas comerciais explicativas para cada item com base em sua aplicação prática.

### Etapa 2: Atualização e Sincronização das Categorias
- Revisar `src/data/categories.ts` para garantir que todas as categorias da planilha estejam ativas, categorizadas com fotos ilustrativas elegantes e contadores dinâmicos de itens.
- Adicionar as categorias faltantes ou unificá-las com nomes claros e intuitivos para navegação.

### Etapa 3: Busca, Filtros e Navegação
- Garantir que a barra de busca principal localize peças tanto pelo nome exato (ex: "ROLAMENTO CONICO", "VALVULA TERMOSTATICA"), quanto por modelos de máquinas (ex: "932", "938", "937H", "PY165", "ZL30H", "M25", "K25", "498").
- Exibir os filtros de categoria no cabeçalho e na barra lateral do catálogo.

### Etapa 4: Suporte ao Cadastro Posterior das Fotos
- Configurar cada produto com uma foto ilustrativa de alta resolução representativa de sua categoria técnica (ex: rolamentos mecânicos, discos de transmissão, filtros de ar, válvulas hidráulicas, etc.).
- Manter o painel "Atualizar Fotos" / ferramenta de edição rápida acessível, permitindo ao usuário colar os links das fotos de qualquer peça quando desejar, com persistência no navegador.

---

## 3. Critérios de Aceite e Verificação
- Todos os produtos da planilha aparecem listados no catálogo sob suas respectivas categorias.
- A contagem e os filtros por categoria funcionam perfeitamente.
- O clique em qualquer peça abre a ficha técnica com opção de cotação via WhatsApp pré-preenchida com nome e código da peça.
- A busca por palavras-chave, códigos de peças e modelos de máquinas retorna os produtos correspondentes instantaneamente.
- O site compila sem erros de tipagem TypeScript e mantém performance rápida.
