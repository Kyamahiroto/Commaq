import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Headphones, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  PackageCheck,
  TrendingDown
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const differentials = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Máquina Parada é Prejuízo Imediato',
      description: 'Entendemos o custo diário de um equipamento inoperante na obra ou na lavoura. Priorizamos cotações em minutos e despachos com urgência no mesmo dia.'
    },
    {
      icon: <Headphones className="w-6 h-6 text-amber-500" />,
      title: 'Consultoria Técnica de Verdade',
      description: 'Nossa equipe cruza números de peças, medidas e números de série no catálogo oficial para garantir que você receba o item 100% correto na primeira vez.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      title: 'Qualidade OEM e Genuína Certificada',
      description: 'Trabalhamos com aço boro tratado termicamente, borrachas e retentores com padrões de engenharia internacional. Dureza e durabilidade comprovadas.'
    },
    {
      icon: <Truck className="w-6 h-6 text-amber-500" />,
      title: 'Logística Rodoviária e Aérea Expressa',
      description: 'Parcerias com as maiores transportadoras rodoviárias de carga pesada e frete aéreo de emergência para todas as regiões do Brasil.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-amber-500" />,
      title: 'Faturamento para PJ e Produtor Rural',
      description: 'Condições de pagamento facilitadas para frotistas, empreiteiras, prefeituras, oficinas mecânicas e produtores cadastrados sob aprovação de crédito.'
    },
    {
      icon: <PackageCheck className="w-6 h-6 text-amber-500" />,
      title: 'Estoque Físico Real com Pronta Entrega',
      description: 'Mais de 35.000 itens físicos armazenados em nosso centro de distribuição para envio imediato sem intermediários desnecessários.'
    }
  ];

  return (
    <section id="diferenciais" className="py-14 sm:py-20 bg-slate-950 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-extrabold text-xs tracking-wider uppercase">
            Por que Comprar na COMMAQ?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Construímos Relações de Confiança para Não Deixar Sua Obra Parar
          </h2>
          <p className="text-sm text-slate-300 mt-2">
            Conheça os diferenciais que tornam a COMMAQ a parceira de reposição de peças pesadas mais procurada por frotistas e operadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {differentials.map((diff, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/80 hover:bg-slate-900 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 shadow-inner">
                  {diff.icon}
                </div>
                <h3 className="font-extrabold text-base text-white mb-2">
                  {diff.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <h4 className="text-lg sm:text-xl font-extrabold text-white flex items-center justify-center lg:justify-start gap-2">
              <span className="text-amber-400">Máquina parada agora?</span> Nós resolvemos com prioridade máxima.
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Envie fotos ou códigos e receba cotação técnica com disponibilidade em até 15 minutos úteis.
            </p>
          </div>

          <a
            href="https://wa.me/5565999884000?text=Ol%C3%A1!%20Estou%20com%20uma%20m%C3%A1quina%20parada%20e%20preciso%20de%20pe%C3%A7as%20urgente."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wide transition-all shadow-lg cursor-pointer"
          >
            Falar com Plantão de Peças
          </a>
        </div>

      </div>
    </section>
  );
};
