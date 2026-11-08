import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Truck, 
  Plane, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building, 
  Phone, 
  Mail, 
  LogOut, 
  ArrowLeft, 
  ExternalLink, 
  Plus, 
  Search, 
  Eye, 
  MessageCircle, 
  RotateCcw, 
  Wrench, 
  ShieldCheck, 
  Save, 
  Printer,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { UserProfile, Order, MachineFleetItem } from '../types';
import { storeUserSession } from '../data/userOrdersData';
import { Logo } from './Logo';
import { OrderDetailModal } from './OrderDetailModal';

interface UserAccountPageProps {
  user: UserProfile;
  orders: Order[];
  onLogout: () => void;
  onBackToCatalog: () => void;
  onUpdateUser: (updated: UserProfile) => void;
  whatsappNumber: string;
  onRepeatOrder: (order: Order) => void;
  onQuoteForMachine: (machine: MachineFleetItem) => void;
}

export const UserAccountPage: React.FC<UserAccountPageProps> = ({
  user,
  orders,
  onLogout,
  onBackToCatalog,
  onUpdateUser,
  whatsappNumber,
  onRepeatOrder,
  onQuoteForMachine
}) => {
  const [activeTab, setActiveTab] = useState<'pedidos' | 'frota' | 'perfil'>('pedidos');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchOrderTerm, setSearchOrderTerm] = useState('');
  
  // Profile edit states
  const [editSuccessMsg, setEditSuccessMsg] = useState('');
  const [name, setName] = useState(user.name);
  const [tradeName, setTradeName] = useState(user.tradeName || '');
  const [contactPerson, setContactPerson] = useState(user.contactPerson);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [street, setStreet] = useState(user.address.street);
  const [number, setNumber] = useState(user.address.number);
  const [city, setCity] = useState(user.address.city);
  const [state, setState] = useState(user.address.state);
  const [reference, setReference] = useState(user.address.reference || '');

  // New machine registration modal state
  const [isAddMachineOpen, setIsAddMachineOpen] = useState(false);
  const [newMachineName, setNewMachineName] = useState('');
  const [newMachineBrand, setNewMachineBrand] = useState('Hyundai');
  const [newMachineModel, setNewMachineModel] = useState('');
  const [newMachineSerial, setNewMachineSerial] = useState('');
  const [newMachineYear, setNewMachineYear] = useState('2022');

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const matchesSearch = 
      searchOrderTerm === '' ||
      ord.id.toLowerCase().includes(searchOrderTerm.toLowerCase()) ||
      (ord.trackingCode && ord.trackingCode.toLowerCase().includes(searchOrderTerm.toLowerCase())) ||
      (ord.machineModel && ord.machineModel.toLowerCase().includes(searchOrderTerm.toLowerCase())) ||
      ord.items.some(item => 
        item.name.toLowerCase().includes(searchOrderTerm.toLowerCase()) ||
        item.partNumber.toLowerCase().includes(searchOrderTerm.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  // Calculate order statistics
  const totalOrders = orders.length;
  const inTransitCount = orders.filter(o => o.status === 'em_transporte').length;
  const deliveredCount = orders.filter(o => o.status === 'entregue').length;
  const inReviewCount = orders.filter(o => o.status === 'em_analise' || o.status === 'cotado').length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name,
      tradeName,
      contactPerson,
      phone,
      email,
      address: {
        ...user.address,
        street,
        number,
        city,
        state,
        reference
      }
    };
    onUpdateUser(updated);
    storeUserSession(updated);
    setEditSuccessMsg('Dados cadastrais atualizados com sucesso!');
    setTimeout(() => setEditSuccessMsg(''), 4000);
  };

  const handleAddMachine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMachineName.trim()) return;

    const newMachine: MachineFleetItem = {
      id: `flt-${Date.now()}`,
      name: newMachineName.trim(),
      brand: newMachineBrand,
      model: newMachineModel.trim() || newMachineName.trim(),
      serialNumber: newMachineSerial.trim() || 'A informar',
      year: newMachineYear.trim()
    };

    const updatedFleet = [...(user.fleet || []), newMachine];
    const updatedUser: UserProfile = {
      ...user,
      fleet: updatedFleet
    };

    onUpdateUser(updatedUser);
    storeUserSession(updatedUser);
    setIsAddMachineOpen(false);
    setNewMachineName('');
    setNewMachineModel('');
    setNewMachineSerial('');
  };

  const cleanWhatsApp = whatsappNumber.replace(/\D/g, '');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Banner Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToCatalog}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Catálogo de Peças</span>
            </button>

            <Logo className="h-9 w-auto hidden sm:inline-flex" />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <span className="text-xs font-bold text-white block">{user.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">{user.document}</span>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              title="Sair da Minha Conta"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-grow w-full space-y-6">
        
        {/* User Profile Hero Card */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border-2 border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-2xl shadow-inner shrink-0">
                {user.documentType === 'PJ' ? <Building className="w-8 h-8" /> : <User className="w-8 h-8" />}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {user.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3.5 h-3.5" /> Cliente Verificado COMMAQ
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 mt-1.5">
                  <span>Doc: <strong className="text-slate-200 font-mono">{user.document}</strong></span>
                  <span>•</span>
                  <span>Responsável: <strong className="text-slate-200">{user.contactPerson}</strong></span>
                  <span>•</span>
                  <span>WhatsApp: <strong className="text-slate-200">{user.phone}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <MapPin className="w-3.5 h-3.5" /> {user.address.city} - {user.address.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onBackToCatalog}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Cotação de Peças</span>
              </button>

              <a
                href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Olá! Sou ${user.contactPerson} da empresa ${user.name}. Gostaria de atendimento com meu consultor de peças.`)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com Vendedor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pedidos')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'pedidos'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Meus Pedidos & Cotações ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('frota')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'frota'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Minhas Máquinas / Frota ({user.fleet?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('perfil')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'perfil'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Dados da Empresa & Entrega</span>
          </button>
        </div>

        {/* Client Access Notice */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span><strong>Área do Cliente:</strong> Acompanhe cotações, rastreamento de despachos e máquinas da frota.</span>
          </div>
          <span className="text-[11px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
            Cadastro de produtos exclusivo para administradores no Painel WordPress (CPT Peças)
          </span>
        </div>

        {/* TAB 1: MEUS PEDIDOS & COTAÇÕES */}
        {activeTab === 'pedidos' && (
          <div className="space-y-6">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total de Pedidos
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {totalOrders}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Histórico de aquisição de peças
                </span>
              </div>

              <div className="bg-slate-900 border border-amber-500/20 p-4 rounded-xl shadow-sm">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 animate-pulse" /> Em Transporte
                </span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">
                  {inTransitCount}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Despacho aéreo / rodoviário em curso
                </span>
              </div>

              <div className="bg-slate-900 border border-emerald-500/20 p-4 rounded-xl shadow-sm">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Entregues
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  {deliveredCount}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Entregas concluídas com sucesso
                </span>
              </div>

              <div className="bg-slate-900 border border-blue-500/20 p-4 rounded-xl shadow-sm">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Em Análise
                </span>
                <span className="text-2xl font-black text-blue-400 mt-1 block">
                  {inReviewCount}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Cotações aguardando conferência
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    statusFilter === 'all'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Todos ({orders.length})
                </button>
                <button
                  onClick={() => setStatusFilter('em_transporte')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    statusFilter === 'em_transporte'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Em Transporte ({inTransitCount})
                </button>
                <button
                  onClick={() => setStatusFilter('entregue')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    statusFilter === 'entregue'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Entregues ({deliveredCount})
                </button>
                <button
                  onClick={() => setStatusFilter('em_analise')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                    statusFilter === 'em_analise'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Em Análise ({inReviewCount})
                </button>
              </div>

              {/* Search in Orders */}
              <div className="relative min-w-[240px]">
                <input
                  type="text"
                  value={searchOrderTerm}
                  onChange={(e) => setSearchOrderTerm(e.target.value)}
                  placeholder="Buscar por P/N, máquina ou pedido..."
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-14 bg-slate-900/40 rounded-2xl border border-slate-800 p-8">
                <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-white font-bold text-base">Nenhum pedido encontrado</h3>
                <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                  Não localizamos pedidos com os filtros atuais. Solicite uma cotação no catálogo para registrar seu primeiro pedido.
                </p>
                <button
                  onClick={onBackToCatalog}
                  className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Explorar Catálogo de Peças
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const whatsappOrderUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                    `Olá! Preciso de suporte referente ao meu Pedido #${order.id} (${order.machineModel || 'Peças'}). Podem me atualizar?`
                  )}`;

                  return (
                    <div 
                      key={order.id}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all shadow-md space-y-4"
                    >
                      {/* Top Order Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-white text-base">
                                #{order.id}
                              </span>
                              {order.machineModel && (
                                <span className="text-[11px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                                  {order.machineModel}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">
                              Realizado em {order.date}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          {order.status === 'em_transporte' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                              <Plane className="w-3.5 h-3.5 animate-pulse" />
                              {order.statusLabel}
                            </span>
                          )}
                          {order.status === 'entregue' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {order.statusLabel}
                            </span>
                          )}
                          {(order.status === 'em_analise' || order.status === 'cotado') && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                              <Clock className="w-3.5 h-3.5" />
                              {order.statusLabel}
                            </span>
                          )}
                          {order.totalValue && (
                            <span className="text-white font-extrabold text-sm pl-2">
                              {order.totalValue}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-700"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-white text-xs font-semibold truncate">{item.name}</p>
                              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                                P/N: <strong className="text-amber-400">{item.partNumber}</strong>
                              </p>
                              <p className="text-[10px] text-slate-500">
                                Qtd: <strong className="text-slate-300">{item.quantity} un.</strong>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping & Tracking Strip */}
                      <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                          <span>Envio: <strong className="text-white">{order.shippingMethod}</strong></span>
                        </div>

                        {order.trackingCode && (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-[11px]">Rastreamento:</span>
                            <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {order.trackingCode}
                            </span>
                            {order.trackingUrl && (
                              <a
                                href={order.trackingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] text-amber-400 hover:underline flex items-center gap-0.5"
                              >
                                Rastrear <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedOrderForDetail(order)}
                            className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-amber-400" />
                            <span>Ver Espelho Completo</span>
                          </button>

                          <button
                            onClick={() => onRepeatOrder(order)}
                            className="bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="Adicionar estas peças novamente à sua cotação"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                            <span>Repetir Cotação</span>
                          </button>
                        </div>

                        <a
                          href={whatsappOrderUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Suporte no WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MINHAS MÁQUINAS / FROTA */}
        {activeTab === 'frota' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <h3 className="text-white font-bold text-sm">
                  Máquinas & Equipamentos Cadastrados
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Vincule suas máquinas para agilizar a cotação de peças sem precisar redigitar o chassi toda vez.
                </p>
              </div>

              <button
                onClick={() => setIsAddMachineOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Cadastrar Nova Máquina</span>
              </button>
            </div>

            {/* Fleet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(user.fleet || []).map((machine) => (
                <div 
                  key={machine.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {machine.brand}
                      </span>
                      {machine.year && (
                        <span className="text-xs text-slate-400">Ano {machine.year}</span>
                      )}
                    </div>

                    <h4 className="text-white font-bold text-base">{machine.name}</h4>
                    
                    <div className="space-y-1 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-mono">
                      <p>Modelo: <strong className="text-slate-200">{machine.model}</strong></p>
                      <p>Chassi / Série: <strong className="text-amber-400">{machine.serialNumber}</strong></p>
                    </div>

                    {machine.notes && (
                      <p className="text-slate-400 text-xs italic">
                        "{machine.notes}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onQuoteForMachine(machine)}
                    className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Cotar Peças para Esta Máquina</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Add Machine Modal */}
            {isAddMachineOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-400" />
                      Cadastrar Máquina na Frota
                    </h4>
                    <button
                      onClick={() => setIsAddMachineOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleAddMachine} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Nome / Apelido da Máquina *</label>
                      <input
                        type="text"
                        value={newMachineName}
                        onChange={(e) => setNewMachineName(e.target.value)}
                        placeholder="ex: Pá Carregadeira Hyundai HL757"
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Marca *</label>
                        <select
                          value={newMachineBrand}
                          onChange={(e) => setNewMachineBrand(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                        >
                          <option value="Hyundai">Hyundai</option>
                          <option value="XCMG">XCMG</option>
                          <option value="SDLG">SDLG</option>
                          <option value="Case">Case</option>
                          <option value="New Holland">New Holland</option>
                          <option value="Caterpillar">Caterpillar</option>
                          <option value="Komatsu">Komatsu</option>
                          <option value="Volvo">Volvo</option>
                          <option value="LiuGong">LiuGong</option>
                          <option value="Changlin">Changlin</option>
                          <option value="Outra">Outra</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Ano</label>
                        <input
                          type="text"
                          value={newMachineYear}
                          onChange={(e) => setNewMachineYear(e.target.value)}
                          placeholder="ex: 2022"
                          className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Modelo Exato</label>
                      <input
                        type="text"
                        value={newMachineModel}
                        onChange={(e) => setNewMachineModel(e.target.value)}
                        placeholder="ex: HL757-9 TM / Heavy Duty"
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Chassi ou Número de Série</label>
                      <input
                        type="text"
                        value={newMachineSerial}
                        onChange={(e) => setNewMachineSerial(e.target.value)}
                        placeholder="Número gravado na plaqueta"
                        className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsAddMachineOpen(false)}
                        className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black"
                      >
                        Salvar Máquina
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DADOS DA EMPRESA & ENTREGA */}
        {activeTab === 'perfil' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-white font-bold text-base flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-400" />
                Dados Cadastrais & Endereço de Entrega
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Mantenha seus dados atualizados para garantir emissão correta de Nota Fiscal e rapidez no despacho das peças.
              </p>
            </div>

            {editSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{editSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Razão Social / Nome Completo *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nome Fantasia</label>
                  <input
                    type="text"
                    value={tradeName}
                    onChange={(e) => setTradeName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Documento de Identificação</label>
                  <input
                    type="text"
                    value={user.document}
                    disabled
                    className="w-full bg-slate-950/50 border border-slate-800 text-slate-400 rounded-xl py-2 px-3 font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Responsável de Peças / Comprador</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">WhatsApp de Contato *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">E-mail para Envio de Notas Fiscais e XML</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              {/* Delivery Address */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <span className="font-bold text-amber-400 text-xs block uppercase tracking-wider">
                  Endereço para Despacho de Peças (Oficina, Fazenda ou Canteiro de Obras)
                </span>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1">Logradouro / Rodovia</label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Número / KM</label>
                    <input
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Cidade</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Estado (UF)</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Ponto de Referência para a Transportadora</label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="ex: Entrada da Fazenda pelo KM 740, galpão de máquinas"
                    className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl py-2 px-3 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações do Cadastro</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrderForDetail}
        user={user}
        onClose={() => setSelectedOrderForDetail(null)}
        whatsappNumber={whatsappNumber}
        onRepeatOrder={onRepeatOrder}
      />
    </div>
  );
};
