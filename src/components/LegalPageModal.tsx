import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  FileText, 
  Lock, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  Printer, 
  ExternalLink,
  ChevronRight,
  Phone,
  MessageSquare
} from 'lucide-react';
import { Logo } from './Logo';

export type LegalDocType = 'politica-troca' | 'termos-uso';

interface LegalPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc?: LegalDocType;
  onNavigateHome?: () => void;
  onOpenChassisModal?: () => void;
}

export const LegalPageModal: React.FC<LegalPageModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'politica-troca',
  onNavigateHome,
  onOpenChassisModal
}) => {
  const [activeDoc, setActiveDoc] = useState<LegalDocType>(initialDoc);

  useEffect(() => {
    if (initialDoc) {
      setActiveDoc(initialDoc);
    }
  }, [initialDoc]);

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen, activeDoc]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex flex-col justify-start">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-20 bg-slate-950 text-white border-b border-slate-800 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-slate-300 hover:text-amber-400 font-semibold text-xs sm:text-sm transition-colors py-2 px-3 rounded-lg hover:bg-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar à Loja</span>
            </button>
            <div className="h-5 w-px bg-slate-800 hidden sm:block" />
            <div 
              onClick={() => {
                onClose();
                if (onNavigateHome) onNavigateHome();
              }}
              className="cursor-pointer hidden sm:block"
            >
              <Logo className="h-9 w-auto" />
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveDoc('politica-troca')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeDoc === 'politica-troca'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Política de</span> Troca
            </button>

            <button
              onClick={() => setActiveDoc('termos-uso')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeDoc === 'termos-uso'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Termos de</span> Uso e Segurança
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Imprimir documento"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors hidden md:flex items-center gap-1.5 text-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8 my-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <button 
            onClick={() => {
              onClose();
              if (onNavigateHome) onNavigateHome();
            }}
            className="hover:text-amber-400 transition-colors"
          >
            Início
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-400">Institucional & Jurídico</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-amber-400 font-semibold">
            {activeDoc === 'politica-troca' ? 'Política de Troca' : 'Termo de Uso e Segurança'}
          </span>
        </nav>

        {/* Paper Container */}
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
          
          {/* Header Banner of the Document */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 sm:p-8 border-b border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-amber-400 text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                  {activeDoc === 'politica-troca' ? (
                    <>
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>Transparência & Defesa do Consumidor</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Termos Legais e Proteção de Dados</span>
                    </>
                  )}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activeDoc === 'politica-troca' ? 'Política de Troca' : 'Termo de Uso e Segurança'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  COMMAQ - Centro-Oeste Comércio de Máquinas e Peças
                </p>
              </div>

              <div className="hidden sm:flex flex-col items-end text-xs text-slate-400">
                <span className="bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono text-[11px]">
                  Versão Oficial Vigente
                </span>
                <span className="mt-1 text-[11px]">Atualizado: {new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="p-6 sm:p-10 space-y-8 text-sm sm:text-base leading-relaxed text-slate-700">
            
            {activeDoc === 'politica-troca' ? (
              /* POLÍTICA DE TROCA CONTENT */
              <div className="space-y-6">
                
                <div className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-sm">
                  <p className="font-semibold text-amber-900">
                    A loja virtual deseja a sua satisfação ao realizar suas compras em nossa loja virtual. Para isso, criamos uma Política de Troca e Devolução com respeito às suas necessidades e baseada no Código de Defesa do Consumidor.
                  </p>
                </div>

                <div className="space-y-4">
                  <p>
                    Estas condições compõem as cláusulas de contratação por adesão que você, consumidor, concede ciência e aceitação para a realização das suas compras. A efetivação da compra consiste na plena concordância com as regras presentes.
                  </p>
                </div>

                {/* Critical Highlights Box */}
                <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 text-rose-700">
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>Recusa Imediata no Recebimento</span>
                  </h3>
                  <p className="text-slate-700 text-sm font-medium">
                    É importante ressaltar que você deve recusar imediatamente o recebimento do seu produto caso:
                  </p>
                  
                  <ul className="space-y-3 text-sm text-slate-800">
                    <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✕
                      </div>
                      <div>
                        <strong className="block text-slate-900">A embalagem do produto está violada;</strong>
                        <span className="text-xs text-slate-500">Recuse a entrega e registre a observação no conhecimento de transporte da transportadora.</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✕
                      </div>
                      <div>
                        <strong className="block text-slate-900">O produto apresentar avarias;</strong>
                        <span className="text-xs text-slate-500">Constatados amassados, quebras, fissuras ou danos ocorridos durante o frete.</span>
                      </div>
                    </li>

                    <li className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200">
                      <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        ✕
                      </div>
                      <div>
                        <strong className="block text-slate-900">Pedido em desacordo com o solicitado no e-commerce.</strong>
                        <span className="text-xs text-slate-500">Divergência de código de peça (Part Number), quantidade ou especificação técnica.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Additional Guidance */}
                <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
                  <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Como Acionar o Suporte Técnico de Pós-Venda</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Caso tenha ocorrido qualquer inconsistência com seu pedido após a entrega, entre em contato imediatamente com nossa central comercial pelo telefone <strong>(65) 3626-1010</strong> ou pelo WhatsApp comercial informando o número da Nota Fiscal e o Part Number da peça.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <a
                      href="https://wa.me/556536261010?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20troca%20ou%20garantia%20de%20pe%C3%A7as."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Falar com o Pós-Venda no WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            ) : (
              /* TERMOS DE USO E SEGURANÇA CONTENT */
              <div className="space-y-8">
                
                {/* 1. TERMOS DE USO */}
                <section className="space-y-6">
                  <div className="border-b border-slate-200 pb-3">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center text-sm font-extrabold">
                        1
                      </span>
                      <span>TERMOS DE USO</span>
                    </h2>
                  </div>

                  {/* 1.1 Copyright */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-amber-600 font-mono text-sm">1.1.</span> Copyright
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      O conteúdo integral deste site, incluindo, textos, gráficos, imagens, sons e quaisquer outras informações, é de propriedade da loja virtual, que detém os direitos de autor sobre o mesmo. A proteção dos direitos de autor do mencionado conteúdo estende-se a todas as reproduções ou cópias, obtidas a partir deste site. Nenhum conteúdo pode ser modificado, transmitido, reproduzido, publicado, licenciado, transferido ou vendido sem o consentimento prévio, por escrito, do seu titular.
                    </p>
                  </div>

                  {/* 1.2 Correções */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-amber-600 font-mono text-sm">1.2.</span> Correções
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      As informações disponíveis no site podem, eventualmente, conter erros de natureza tipográfica, incorreções ou omissões relacionados a descrição dos produtos, preços e disponibilidade. Respeitando os direitos do consumidor e a sua política de relacionamento com o cliente, reserva-se à Loja virtual o direito de promover a correção destes eventuais erros e omissões a qualquer momento e sem comunicação prévia. Consequentemente, a Loja virtual não garante que as informações obtidas através deste site sejam, a todo o tempo, exatas, completas e mesmo atualizadas.
                    </p>
                  </div>

                  {/* 1.3 Produtos */}
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-amber-600 font-mono text-sm">1.3.</span> Produtos
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      A Loja virtual não se obriga a possuir, em todos os seus canais de venda (lojas, catálogos e venda on-line), todos os itens de sua linha, de forma que alguns produtos disponíveis nos catálogos da Loja virtual e/ou nas lojas podem não estar necessariamente disponíveis para compras online e vice-versa.
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      O cliente deverá sempre certificar-se da disponibilidade do produto para aquisição online. A Loja virtual poderá divulgar produtos neste site, em caráter meramente ilustrativo, não os disponibilizando para a venda.
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Os preços dos produtos oferecidos pela Loja virtual neste site estão expressos em reais e são válidos somente para aquisições em território nacional.
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Os preços dos produtos oferecidos neste site não guardam necessária relação e/ou equivalência com os preços de produtos idênticos, oferecidos em lojas Loja virtual e/ou multimarcas.
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      As imagens constantes neste site podem apresentar variações de cor, por força das resoluções específicas de cada equipamento e das matizes disponíveis neste ambiente. Ao apresentar os produtos, a Loja virtual sempre empenhará os melhores esforços para fazer constar as suas cores originais. Eventuais diferenças, portanto, podem ocorrer, sem que isto represente defeito ou má informação.
                    </p>
                  </div>

                  {/* 1.4 Parceiros */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-amber-600 font-mono text-sm">1.4.</span> Parceiros
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      A Loja virtual, ao divulgar seus parceiros, assim o faz em caráter exclusivamente informativo. Neste sentido, não assume nenhuma responsabilidade por informações e ações destes e, consequentemente, por eventuais danos causados por estes aos usuários.
                    </p>
                  </div>

                  {/* 1.5 Responsabilidade */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-amber-600 font-mono text-sm">1.5.</span> Responsabilidade da Loja virtual
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      A Loja virtual não medirá esforços para oferecer, neste site, uma navegabilidade segura, prática e confortável. Contudo, a Loja virtual não se responsabiliza por eventuais danos causados ao usuário e/ou ao seu equipamento, decorrentes de ataques de vírus e/ou invasões, havidos durante o uso, uma vez não responsável pela segurança das conexões.
                    </p>
                  </div>
                </section>

                {/* 2. SEGURANÇA */}
                <section className="space-y-6 pt-6 border-t border-slate-200">
                  <div className="border-b border-slate-200 pb-3">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-sm font-extrabold">
                        2
                      </span>
                      <span>SEGURANÇA</span>
                    </h2>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-sm font-medium">
                    A Loja virtual online store tem um compromisso com você no que diz respeito à segurança e privacidade de dados. O respeito ao cliente e ao sigilo de suas informações são muito importantes para nós. Por isso, tenha certeza que a sua experiência de compra na Loja virtual online store é totalmente segura e os dados informados criptografados.
                  </div>

                  {/* 2.1 Criptografia */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-700 font-mono text-sm">2.1.</span> Criptografia
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Todos os dados informados para a Loja virtual online store durante o processo de compra são automaticamente criptografados antes de serem transmitidos.
                    </p>
                  </div>

                  {/* 2.2 Compras com Cartão de Crédito */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-700 font-mono text-sm">2.2.</span> Compras com Cartão de Crédito
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Os dados do seu cartão de crédito são transmitidos diretamente para a operadora. É importante ressaltar que a Loja virtual online store não armazena em seus arquivos nenhum registro dos dados de cartão do cliente.
                    </p>
                  </div>

                  {/* 2.3 Identificação e Senha */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                      <span className="text-emerald-700 font-mono text-sm">2.3.</span> Identificação e Senha
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Com a função de facilitar a sua próxima compra, os dados cadastrais da sua primeira visita ficam armazenados para que você não precise digitá-los novamente. É importante ressaltar que esses dados são armazenados apenas para facilitar futuras compras e não são divulgados, vendidos ou disponibilizados para terceiros, exceto em estrito cumprimento de ordens judiciais. Os dados pessoais poderão ser usados para elaboração de informações estatísticas, sem identificação nominativa do consumidor. Os dados de cartão de crédito e outras informações de pagamento não são armazenados, conforme informado anteriormente no item 2.2 desse termo de uso e segurança.
                    </p>
                  </div>
                </section>

              </div>
            )}

          </div>

          {/* Footer of the Document Modal */}
          <div className="bg-slate-50 border-t border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-800">COMMAQ - Centro-Oeste Máquinas</p>
              <p>Rua S, N° 269 ,Complemento Quadra 14, lotes 50 • Cuiabá - Mato Grosso • (65) 3626-1010</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveDoc(activeDoc === 'politica-troca' ? 'termos-uso' : 'politica-troca')}
                className="text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer"
              >
                {activeDoc === 'politica-troca' ? 'Ver Termos de Uso e Segurança →' : 'Ver Política de Troca →'}
              </button>
              <button
                onClick={onClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Concluir Leitura e Fechar
              </button>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
};
