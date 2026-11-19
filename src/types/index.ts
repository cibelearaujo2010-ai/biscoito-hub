export type ProductCategory = 'amanteigados' | 'recheados' | 'gourmet' | 'combos' | 'salgados';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  ingredients: string;
  weight: string; // ex: "250g", "400g"
  price: number;
  image: string;
  isPopular?: boolean;
  inStock: boolean;
  isCombo?: boolean;
  comboItems?: string[];
}

export type OrderStatus = 
  | 'recebido' 
  | 'cozinha_massa' 
  | 'no_forno' 
  | 'resfriando' 
  | 'embalagem' 
  | 'pronto_despacho' 
  | 'saiu_entrega' 
  | 'entregue' 
  | 'cancelado';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  weight: string;
}

export interface Order {
  id: string; // e.g. "ROS-1042"
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  deliveryType: 'express' | 'padrao' | 'retirada_fabrica';
  deliveryFee: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  driverName?: string;
  driverVehicle?: string;
  notes?: string;
}

export interface KitchenBatch {
  id: string; // e.g. "FORNADA-08"
  cookieName: string;
  quantityUnits: number; // e.g. 120 biscoitos
  ovenNumber: number; // Forno 1, 2, 3
  temperatureC: number; // e.g. 175
  startedAt: string;
  totalMinutes: number;
  remainingSeconds: number;
  status: 'preparo' | 'assando' | 'resfriando' | 'embalado';
  masterBaker: string;
}

export interface RHCandidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  roleApplied: string;
  experienceYears: number;
  summary: string;
  appliedDate: string;
  status: 'novo' | 'em_analise' | 'entrevista' | 'aprovado' | 'arquivado';
}

export interface B2BLead {
  id: string;
  companyName: string;
  cnpj?: string;
  contactName: string;
  phone: string;
  city: string;
  businessType: 'emporio' | 'hotel' | 'cafeteria' | 'supermercado' | 'eventos';
  estimatedVolume: string; // ex: "50kg/mês"
  createdAt: string;
  status: 'pendente' | 'contatado' | 'proposta_enviada' | 'fechado';
}

export interface CompanyAction {
  id: string;
  title: string;
  category: 'social' | 'sustentabilidade' | 'comunidade' | 'educacao' | 'parceria';
  categoryLabel: string;
  summary: string;
  fullDescription: string;
  impactMetric: string; // ex: "3.840 kg de biscoitos doados", "100% energia limpa"
  date: string;
  status: 'ativa' | 'concluida' | 'em_andamento';
  leadSibling: string; // ex: "Irmã Nicole", "Irmão Adão", etc.
  location: string;
  image?: string;
}

export interface SiblingsConfig {
  sister1: string; // Nicole
  sister2: string; // Neudyelle
  sister3: string; // Elizene
  brother: string; // Adão
}

export interface SiteConfig {
  developerName: string;
  developerRole: string;
  developerBio: string;
  developerHobbies: string[];
  developerEmail: string;
  bannerAnnouncement: string;
  isAnnouncementActive: boolean;
  factoryStatusText: string;
  isAcceptingOrders: boolean;
  specialPromoCode: string;
  specialPromoDiscount: number;
  devPin: string;
  siblings: SiblingsConfig;
  heroTitle?: string;
  heroSubtitle?: string;
  factoryAddress?: string;
  factoryHours?: string;
  dailyCapacityKg?: number;
  deliveryFeeExpress?: number;
}
