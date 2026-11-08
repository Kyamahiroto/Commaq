import React, { useState } from 'react';
import { 
  X, 
  Camera, 
  FileSpreadsheet, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  HelpCircle,
  Upload,
  AlertCircle
} from 'lucide-react';

interface ChassisQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChassisQuoteModal: React.FC<ChassisQuoteModalProps> = ({
  isOpen,
  onClose
}) => {
  const [machineBrand, setMachineBrand] = useState('');
  const [machineModel, setMachineModel] = useState('');
  const [machineYear, setMachineYear] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [partDescription, setPartDescription] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCity, setContactCity] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    let text = `*COTAÇÃO ESPECIAL POR CHASSI / PLAQUETA - COMMAQ*\n\n`;
    text += `🚜 *Equipamento:* ${machineBrand || 'Marca N/I'} - ${machineModel || 'Modelo N/I'} (Ano: ${machineYear || 'N/I'})\n`;
    text += `🔢 *Chassi / Série:* ${chassisNumber || 'Verificar com cliente'}\n`;
    text += `🔧 *Peça Necessária:* ${partDescription || 'Consultar'}\n\n`;
    text += `👤 *Responsável:* ${contactName}\n`;
    text += `📞 *WhatsApp:* ${contactPhone}\n`;
    text += `📍 *Local:* ${contactCity || 'Brasil'}\n`;
    if (hasPhoto) {
      text += `📷 *Nota:* Tenho foto da plaqueta/peça pronta para enviar no WhatsApp.\n`;
    }

    const url = `https://wa.me/556536261010?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">
                Cotação por Plaqueta ou Chassi
              </h3>
              <p className="text-xs text-slate-400">
                Não sabe o part number? Nós localizamos a peça exata para você.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitWhatsApp} className="p-5 sm:p-6 space-y-4 text-xs">
          
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              O número do chassi (ou foto da plaqueta metálica da máquina) é a forma mais segura de evitar compras de peças incorretas.
            </p>
          </div>

          {/* Machine Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Marca / Fabricante *
              </label>
              <input
                type="text"
                required
                value={machineBrand}
                onChange={(e) => setMachineBrand(e.target.value)}
                placeholder="Ex: CAT, Komatsu, Case..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Modelo da Máquina *
              </label>
              <input
                type="text"
                required
                value={machineModel}
                onChange={(e) => setMachineModel(e.target.value)}
                placeholder="Ex: 320D, PC200, 580M..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Ano de Fabricação
              </label>
              <input
                type="text"
                value={machineYear}
                onChange={(e) => setMachineYear(e.target.value)}
                placeholder="Ex: 2015"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Chassis */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Número de Série / Chassi (PIN da Máquina)
            </label>
            <input
              type="text"
              value={chassisNumber}
              onChange={(e) => setChassisNumber(e.target.value)}
              placeholder="Ex: JAB01824 / W102934..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Part needed description */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">
              Qual peça você está precisando? Descreva com suas palavras *
            </label>
            <textarea
              required
              rows={3}
              value={partDescription}
              onChange={(e) => setPartDescription(e.target.value)}
              placeholder="Ex: Preciso da bomba hidráulica de engrenagem da transmissão, ou do jogo de reparo do cilindro da caçamba e os pinos..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-amber-500 focus:outline-none resize-none"
            />
          </div>

          {/* Photo toggle indicator */}
          <div className="flex items-center gap-2.5 p-3 bg-slate-100 rounded-lg border border-slate-200 cursor-pointer" onClick={() => setHasPhoto(!hasPhoto)}>
            <input
              type="checkbox"
              id="hasPhotoCheck"
              checked={hasPhoto}
              onChange={(e) => setHasPhoto(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-400 w-4 h-4"
            />
            <label htmlFor="hasPhotoCheck" className="text-slate-800 font-medium cursor-pointer flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-600" />
              <span>Tenho foto da plaqueta ou da peça quebrada para anexar na conversa</span>
            </label>
          </div>

          {/* Contact Details */}
          <div className="pt-2 border-t border-slate-200">
            <span className="font-bold text-slate-800 uppercase tracking-wider block mb-2">
              Seus Dados de Contato
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-600 mb-1 font-medium">Seu Nome *</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="(DDD) 99999-0000"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 mb-1 font-medium">Sua Cidade / UF</label>
                <input
                  type="text"
                  value={contactCity}
                  onChange={(e) => setContactCity(e.target.value)}
                  placeholder="Ex: Cuiabá - MT"
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar para Consultor Técnico</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
