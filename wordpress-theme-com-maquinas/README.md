# Tema WordPress: Com Máquinas - Peças Pesadas & Tratores

Tema profissional pronto para instalação no WordPress, desenvolvido especificamente para distribuidoras e revendedoras de peças para linha amarela, tratores, escavadeiras e retroescavadeiras.

---

## 📁 Estrutura de Arquivos Criada
- `style.css`: Declaração oficial do tema WordPress com metadados e compatibilidade.
- `functions.php`:
  - Carregamento de scripts (Tailwind Play, Lucide Icons, Theme JS).
  - Suporte nativo a **WooCommerce** (caso queira usar loja virtual completa com carrinho de compras oficial).
  - Criação automática do **Custom Post Type (CPT) `peca`** com taxonomias para Marca/Montadora (`montadora`), Categoria (`categoria_peca`) e Tipo de Equipamento (`tipo_equipamento`) caso não utilize WooCommerce.
  - **Novo CPT `configuracao` (Configurações CM)**: Menu dedicado no painel administrativo para alterar telefones, WhatsApp, horários, botão flutuante e campos estruturados para expansões futuras.
  - Painel do **Personalizar (Customizer)** de suporte.
- `header.php`: Faixa de urgência para "máquina parada", logo dinâmica, barra de busca técnica por Part Number e gatilhos de cotação.
- `footer.php`: Rodapé com garantias, links institucionais, modal de "Cotação por Plaqueta ou Chassi", gaveta lateral de cotação e **botão flutuante de WhatsApp limpo (sem balão e com ícone oficial)**.
- `index.php`: Página inicial completa contendo Hero com localizador por máquina, grid de categorias e loop de peças prontas para cotação.
- `assets/js/theme.js`: Mecanismo do **Carrinho de Cotações com Disparo Direto para o WhatsApp** (armazena no navegador do cliente e monta mensagem pronta com itens, quantidades, dados da máquina e local de entrega).

---

## 🚀 Como Instalar no seu WordPress

### Opção 1: Via Painel do WordPress (.ZIP)
1. Compacte a pasta `wordpress-theme-com-maquinas` em um arquivo `.zip` (ex: `com-maquinas-theme.zip`).
2. Acesse seu painel do WordPress (`seusite.com.br/wp-admin`).
3. Vá em **Aparência > Temas > Adicionar Novo > Enviar Tema**.
4. Selecione o arquivo `.zip` gerado e clique em **Instalar Agora**.
5. Clique em **Ativar**.

### Opção 2: Via FTP ou Gerenciador de Arquivos (cPanel/HostGator/Locaweb)
1. Envie a pasta `wordpress-theme-com-maquinas` para o diretório:
   `/wp-content/themes/wordpress-theme-com-maquinas`
2. No painel do WordPress, vá em **Aparência > Temas** e ative o tema **Com Máquinas**.

---

## ⚙️ Gestão 100% pelo Painel WordPress (wp-admin)

Todos os menus administrativos (**Painel CPT**, **Tema WP**, **Editar no CPT**) foram retirados do frontend público e centralizados exclusivamente dentro do painel do WordPress:

1. **Menu Principal "Com Máquinas"**:
   - Acesse seu painel `/wp-admin` &gt; **Com Máquinas** (ícone de martelo no menu lateral).
   - O painel exibe resumo em tempo real: total de peças, categorias cadastradas, marcas e links diretos.

2. **Configurações do Site (CPT `configuracao`)**:
   - Vá em **Configurações CM** ou no atalho do menu **Com Máquinas > Configurações (CPT)**.
   - Edite o registro **"Configurações Principais - Com Máquinas"** (criado automaticamente ao ativar o tema).
   - **Campos Disponíveis**:
     - **WhatsApp Comercial**: com DDI e DDD (ex: `5565999884000`).
     - **Telefone Fixo / PABX**: Ex: `(65) 3688-4000`.
     - **Telefone Secundário / Plantão 24h**.
     - **Textos do Cabeçalho**: Horário de atendimento, Telefone do topo e Localização.
     - **Alerta de Urgência**: Faixa superior de "Máquina Parada / Despacho Aéreo".
     - **E-mail de Cotações**: Ex: `vendas@commaquinas.com.br`.
     - **Mensagem Padrão de WhatsApp**.
     - **Botão Flutuante de WhatsApp**: Ativar ou desativar com 1 clique.
     - **Campos para Expansões Futuras**: Endereço, link de catálogo PDF, chave PIX, Instagram e parâmetros adicionais (chave=valor).

3. **Catálogo de Peças (CPT `peca`)**:
   - Acesse **Catálogo de Peças** &gt; **Todas as Peças** ou **Adicionar Nova**.
   - **Campos estruturados**: Part Number (PN), Fabricante/Montadora, Modelos compatíveis, Status em Estoque (Pronta Entrega, Em Estoque, Sob Encomenda), Preço (ou flag Sob Consulta), Condição (Nova Genuína, OEM, etc.), Garantia e Dimensões/Peso.

4. **Categorias & Taxonomias**:
   - Acesse **Catálogo de Peças > Categorias de Peça** para gerenciar os departamentos (já criados automaticamente com 25 departamentos oficiais na ativação).
   - Acesse **Catálogo de Peças > Marcas / Montadoras** para gerenciar as montadoras compatíveis (CAT, Komatsu, Volvo, SDLG, Case, New Holland, Hyundai, XCMG, etc.).

5. **Importador Automático de Peças & Imagens (CSV)**:
   - Acesse **Catálogo de Peças > Importar CSV & Imagens**.
   - O importador lê a planilha `produtos_commaq_com_imagens_215999ac.csv` com todos os 542 produtos e vincula as fotos automaticamente.
   - **Como vincular as fotos automaticamente?**
     - **Opção A (Arquivos Locais - Mais Rápida)**: Como você possui a pasta `C:\Users\Usuário\Desktop\commaq\wp-content\uploads\`, copie essa pasta para o diretório `wp-content/uploads/` do seu WordPress no servidor. O importador detecta os nomes dos arquivos (`img_30211.jpg`, etc.) e cria nativamente as miniaturas e a **Imagem Destacada** (`_thumbnail_id`) para cada produto!
     - **Opção B (URLs Remotas)**: Se as fotos estiverem publicadas em domínio ou CDN ativo, o importador baixa e anexa via `media_sideload_image`.
     - **Opção C (Exibição Direta / Fallback)**: O tema grava o link em `_cm_image_url` e exibe diretamente com fallback automático caso a imagem física não tenha sido baixada ainda.

6. **Segurança de Acesso (Perfil de Usuário vs Administrador)**:
   - Usuários comuns ou clientes que acessam a Área do Cliente (`/minha-conta`) têm permissão exclusiva para acompanhar cotações, rastreamento de frete aéreo/rodoviário e suas máquinas na frota.
   - **Nenhum usuário comum pode cadastrar ou alterar produtos.**
   - O cadastro, edição e exclusão de produtos é restrito com validação de capacidade (`manage_options`), acessível apenas por administradores no painel wp-admin.


