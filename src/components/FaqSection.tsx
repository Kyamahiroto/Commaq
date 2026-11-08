import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como saber se a peça é compatível com minha máquina antes de comprar?',
      a: 'Nossa equipe técnica consulta o catálogo oficial de peças (Parts Manual) cruzando o modelo exato, ano e o número de série (chassi / PIN) do seu equipamento. Dessa forma, você tem 100% de garantia de compatibilidade antes do envio.'
    },
    {
      q: 'Se eu não tiver o código da peça (Part Number), como posso comprar?',
      a: 'Você pode utilizar nosso recurso "Cotação por Plaqueta ou Chassi" ou enviar pelo WhatsApp fotos da peça danificada e da plaqueta metálica da máquina. Nossos consultores localizam o código técnico original para você.'
    },
    {
      q: 'Vocês faturam para empresas (Pessoa Jurídica) e Produtores Rurais?',
      a: 'Sim! Oferecemos faturamento a prazo via boleto bancário para empresas cadastradas, frotistas, empreiteiras, prefeituras e produtores rurais, mediante análise rápida de crédito cadastral.'
    },
    {
      q: 'Como funciona a logística e o prazo de entrega para outros estados?',
      a: 'Despachamos mercadorias no mesmo dia da confirmação para itens em estoque. Trabalhamos com transporte rodoviário expresso (Jadlog, Braspress, Bauer, TNT, etc.) e modal aéreo (Gollog, Latam Cargo, Azul Cargo) para emergências de máquina parada.'
    },
    {
      q: 'As peças possuem garantia e Nota Fiscal?',
      a: 'Sim, 100% das nossas mercadorias saem acompanhadas de Nota Fiscal Eletrônica (NF-e) e contam com garantia legal e de fábrica contra qualquer defeito de fabricação ou forjamento (variando de 6 a 12 meses conforme o componente).'
    },
    {
      q: 'Vocês vendem kits completos para reforma (motor, material rodante, vedações)?',
      a: 'Sim, montamos pacotes completos com condições especiais para revisões gerais: kits de motor (camisas, pistões, juntas), reformas de esteira (correntes, roletes, rodas guia), reparos de cilindros e kits de filtros para 250h, 500h e 1000h.'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <span className="text-amber-600 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            Tire Suas Dúvidas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Perguntas Frequentes sobre Nossas Peças e Atendimento
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Entenda como operamos para garantir rapidez, segurança fiscal e a peça certa para sua operação.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
