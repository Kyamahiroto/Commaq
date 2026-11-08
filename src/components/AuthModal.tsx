import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Building, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Sparkles,
  MapPin,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { UserProfile } from '../types';
import { DEFAULT_DEMO_USER, storeUserSession } from '../data/userOrdersData';
import { Logo } from './Logo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form states
  const [docType, setDocType] = useState<'PJ' | 'PF'>('PJ');
  const [companyName, setCompanyName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Cuiabá');
  const [state, setState] = useState('MT');
  const [street, setStreet] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isOpen) return null;

  // Format CNPJ or CPF automatically
  const handleDocumentChange = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (docType === 'PJ') {
      // CNPJ: 00.000.000/0001-00
      let formatted = raw;
      if (raw.length <= 14) {
        formatted = raw
          .replace(/^(\d{2})(\d)/, '$1.$2')
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/\.(\d{3})(\d)/, '.$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2');
      }
      setDocumentNumber(formatted.slice(0, 18));
    } else {
      // CPF: 000.000.000-00
      let formatted = raw;
      if (raw.length <= 11) {
        formatted = raw
          .replace(/^(\d{3})(\d)/, '$1.$2')
          .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/\.(\d{3})(\d)/, '.$1-$2');
      }
      setDocumentNumber(formatted.slice(0, 14));
    }
  };

  // Format Phone (XX) XXXXX-XXXX
  const handlePhoneChange = (val: string) => {
    const raw = val.replace(/\D/g, '');
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}${raw.length > 7 ? `-${raw.slice(7, 11)}` : ''}`;
    }
    setPhone(formatted.slice(0, 15));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginIdentifier.trim()) {
      setErrorMsg('Informe seu E-mail ou CNPJ para acessar sua conta.');
      return;
    }
    if (!loginPassword) {
      setErrorMsg('Informe sua senha de acesso.');
      return;
    }

    // Check if matches demo or stored user
    let userToLogin = DEFAULT_DEMO_USER;
    
    try {
      const storedUsersRaw = localStorage.getItem('com_maquinas_registered_users');
      if (storedUsersRaw) {
        const users: UserProfile[] = JSON.parse(storedUsersRaw);
        const cleanId = loginIdentifier.replace(/\D/g, '');
        const matched = users.find(u => 
          u.email.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
          u.document.replace(/\D/g, '') === cleanId
        );
        if (matched) {
          userToLogin = matched;
        }
      }
    } catch (e) {
      console.error(e);
    }

    storeUserSession(userToLogin);
    setSuccessMsg(`Bem-vindo de volta, ${userToLogin.name.split(' ')[0]}! Redirecionando...`);

    setTimeout(() => {
      onLoginSuccess(userToLogin);
      onClose();
    }, 700);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!companyName.trim()) {
      setErrorMsg('Informe a Razão Social ou Nome Completo.');
      return;
    }
    if (!documentNumber.trim()) {
      setErrorMsg(docType === 'PJ' ? 'Informe o CNPJ da empresa.' : 'Informe o CPF.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Informe um endereço de e-mail corporativo válido.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Informe um número de WhatsApp/Telefone para contato.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('A senha deve conter no mínimo 6 dígitos.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: companyName.trim(),
      tradeName: tradeName.trim() || companyName.trim(),
      email: email.trim().toLowerCase(),
      document: documentNumber.trim(),
      documentType: docType,
      contactPerson: contactName.trim() || companyName.trim(),
      phone: phone.trim(),
      address: {
        street: street.trim() || 'Rodovia de Acesso Principal',
        number: 'S/N',
        neighborhood: 'Setor Industrial / Zona Rural',
        city: city.trim(),
        state: state.trim(),
        zipCode: '78000-000'
      },
      createdAt: new Date().toLocaleDateString('pt-BR'),
      fleet: []
    };

    // Save to list of registered users
    try {
      const storedUsersRaw = localStorage.getItem('com_maquinas_registered_users');
      const users: UserProfile[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      users.push(newUser);
      localStorage.setItem('com_maquinas_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }

    storeUserSession(newUser);
    setSuccessMsg('Cadastro realizado com sucesso! Redirecionando para a sua área...');

    setTimeout(() => {
      onLoginSuccess(newUser);
      onClose();
    }, 800);
  };

  const handleQuickDemoLogin = () => {
    storeUserSession(DEFAULT_DEMO_USER);
    setSuccessMsg('Acessando como Cliente Demo (Agro MT)...');
    setTimeout(() => {
      onLoginSuccess(DEFAULT_DEMO_USER);
      onClose();
    }, 500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Branding Header */}
        <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-9 w-auto" />
            <div className="border-l border-slate-700 pl-3">
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 block leading-none">
                Área do Cliente
              </span>
              <span className="text-[11px] text-slate-400">Portal de Pedidos & Cotações</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-950/60 border-b border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'login'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Já sou Cadastrado (Entrar)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`py-2.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              mode === 'register'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Criar Nova Conta</span>
          </button>
        </div>

        {/* Error / Success Feedback */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Fast Demo Login Banner */}
        <div className="mx-6 mt-4 p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Acesso Rápido de Teste
            </span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Consulte pedidos e frota usando a conta de demonstração (Agro MT).
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] px-3 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer"
          >
            Entrar Demo
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                E-mail Corporativo ou Documento
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="ex: compras@empresa.com.br ou documento"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Senha de Acesso
                </label>
                <button
                  type="button"
                  onClick={() => alert('Para redefinir sua senha, entre em contato com nosso suporte via WhatsApp no topo do site.')}
                  className="text-[11px] text-amber-400 hover:underline"
                >
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Sua senha cadastrada"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2.5 pl-10 pr-10 text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Acessar Meus Pedidos & Conta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400 pt-1">
              Ainda não tem cadastro na COMMAQ?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-amber-400 font-bold hover:underline"
              >
                Cadastre sua empresa aqui
              </button>
            </p>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            {/* Person Type Selector */}
            <div className="flex items-center gap-4 bg-slate-950/60 p-2 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold pl-2">Tipo de Cliente:</span>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-200">
                <input
                  type="radio"
                  name="docType"
                  checked={docType === 'PJ'}
                  onChange={() => {
                    setDocType('PJ');
                    setDocumentNumber('');
                  }}
                  className="accent-amber-500"
                />
                <span>Pessoa Jurídica (Empresa/CNPJ)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-200">
                <input
                  type="radio"
                  name="docType"
                  checked={docType === 'PF'}
                  onChange={() => {
                    setDocType('PF');
                    setDocumentNumber('');
                  }}
                  className="accent-amber-500"
                />
                <span>Produtor / Pessoa Física (CPF)</span>
              </label>
            </div>

            {/* Company / Personal Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {docType === 'PJ' ? 'Razão Social da Empresa *' : 'Nome Completo *'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder={docType === 'PJ' ? 'ex: Construtora e Terraplenagem MT Ltda' : 'ex: João Carlos da Silva'}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-500"
                  required
                />
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Document (CNPJ / CPF) & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {docType === 'PJ' ? 'CNPJ *' : 'CPF *'}
                </label>
                <input
                  type="text"
                  value={documentNumber}
                  onChange={(e) => handleDocumentChange(e.target.value)}
                  placeholder={docType === 'PJ' ? '00.000.000/0001-00' : '000.000.000-00'}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nome do Comprador / Contato
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="ex: Marcos (Almoxarifado)"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Email & WhatsApp Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  E-mail Corporativo *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="compras@empresa.com.br"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-500"
                    required
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  WhatsApp com DDD *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(65) 99999-9999"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-500 font-mono"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Location (City / State / Address) */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cidade de Entrega / Base *
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="ex: Cuiabá, Sorriso, Sinop"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-400 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Estado (UF) *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-400 transition-all"
                >
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="GO">GO</option>
                  <option value="RO">RO</option>
                  <option value="PA">PA</option>
                  <option value="TO">TO</option>
                  <option value="SP">SP</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Endereço de Entrega (Oficina, Canteiro de Obras ou Fazenda)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="ex: Rodovia BR-163 KM 700 - Fazenda Santa Luzia"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-500"
                />
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Criar Senha *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 dígitos"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-400 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirmar Senha *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-amber-400 transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Concluir Cadastro & Entrar</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
