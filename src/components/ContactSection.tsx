import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  Building,
  ShieldCheck,
  Instagram,
  Facebook
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*NOVA MENSAGEM VIA SITE COMMAQ*\n\n` +
      `👤 *Nome:* ${name}\n` +
      `📞 *Telefone:* ${phone}\n` +
      `✉️ *E-mail:* ${email || 'Não informado'}\n` +
      `📝 *Mensagem/Dúvida:* ${message}`;

    window.open(`https://wa.me/556536261010?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contato" className="py-14 sm:py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct channels and addresses */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-amber-400 font-extrabold text-xs tracking-wider uppercase">
                Canais de Atendimento
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-white">
                Fale com a Mesa Técnica da COMMAQ
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Nossos consultores estão a postos para esclarecer dúvidas técnicas, verificar compatibilidade e emitir propostas comerciais.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* WhatsApp */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">WhatsApp Vendas Rápidas</span>
                  <a 
                    href="https://wa.me/556536261010?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20de%20pe%C3%A7as%20na%20COMMAQ." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-emerald-400 hover:text-emerald-300 text-base transition-colors"
                  >
                    (65) 3626-1010
                  </a>
                  <p className="text-slate-500 text-xs mt-0.5">Envio de fotos de peças, códigos e cotações</p>
                </div>
              </div>

              {/* E-mail */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">E-mail Comercial & Cotações</span>
                  <a href="mailto:vendas@commaquinas.com.br" className="font-bold text-white hover:text-amber-400 transition-colors">
                    vendas@commaquinas.com.br
                  </a>
                  <p className="text-slate-500 text-xs mt-0.5">Envio de editais, concorrências e ordens de compra</p>
                </div>
              </div>

              {/* Horário */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Horário de Funcionamento</span>
                  <p className="font-bold text-white">
                    Seg-Sex 7:30 às 18:00h
                  </p>
                  <p className="text-slate-400 text-xs">Atendimento presencial e plantão remoto</p>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Endereço & Distribuição</span>
                  <p className="font-bold text-white leading-snug">
                    Rua S, N° 269 ,Complemento Quadra 14, lotes 50
                  </p>
                  <p className="text-amber-400 font-semibold text-xs mt-0.5">Cuiabá - Mato Grosso</p>
                  <p className="text-slate-400 text-xs mt-0.5">Despacho para todo o Brasil via transportadora e frete aéreo</p>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="text-slate-400 text-xs font-semibold block">Redes Sociais Oficiais</span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://instagram.com/commaqmt/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold px-3 py-2 rounded-lg text-xs transition-all shadow"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram @commaqmt</span>
                  </a>

                  <a
                    href="https://www.facebook.com/p/Centro-Oeste-Com%C3%A9rcio-De-M%C3%A1quinas-E-Movimenta%C3%A7%C3%A3o-Me-100067424528434/?_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold px-3 py-2 rounded-lg text-xs transition-all shadow"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook COMMAQ</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Direct Fast Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-400" />
                <span>Envie Sua Mensagem ou Solicitação</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Preencha os campos abaixo e nosso consultor entrará em contato prontamente:
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-950/60 border border-emerald-800 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Mensagem Encaminhada!</h4>
                  <p className="text-xs text-emerald-300">
                    Sua solicitação foi direcionada para a equipe comercial. Agradecemos o contato.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1.5">
                        Seu Nome ou Empresa *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: João da Silva / Construtora Norte"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-medium mb-1.5">
                        WhatsApp / Telefone com DDD *
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(65) 99999-0000"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@empresa.com.br"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">
                      Descreva as peças que você precisa ou sua dúvida *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ex: Preciso de cotação para 1 jogo de dentes da CAT 320D e 2 filtros de combustível..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Mensagem para Vendas</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
