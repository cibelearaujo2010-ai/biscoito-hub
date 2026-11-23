import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, OrderStatus, KitchenBatch, RHCandidate, B2BLead, SiteConfig, CompanyAction } from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_BATCHES, 
  INITIAL_CANDIDATES, 
  INITIAL_B2B_LEADS,
  DEFAULT_SITE_CONFIG,
  INITIAL_COMPANY_ACTIONS
} from '../data/initialData';

export type AppSpace = 'store' | 'kitchen' | 'delivery' | 'admin';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  activeSpace: AppSpace;
  setActiveSpace: (space: AppSpace) => void;
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  toggleStock: (id: string) => void;
  deleteProduct: (id: string) => void;
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  assignDriver: (orderId: string, driverName: string, vehicle: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
  // Kitchen
  batches: KitchenBatch[];
  updateBatchStatus: (batchId: string, newStatus: KitchenBatch['status']) => void;
  addBatch: (batch: Omit<KitchenBatch, 'id' | 'remainingSeconds'>) => void;
  adjustBatchTime: (batchId: string, deltaSeconds: number) => void;
  fastForwardBatch: (batchId: string) => void;
  adjustOvenTemp: (batchId: string, deltaTemp: number) => void;
  // HR / Candidates
  candidates: RHCandidate[];
  addCandidate: (candidateData: Omit<RHCandidate, 'id' | 'appliedDate' | 'status'>) => void;
  updateCandidateStatus: (candidateId: string, status: RHCandidate['status']) => void;
  deleteCandidate: (candidateId: string) => void;
  // B2B Leads
  b2bLeads: B2BLead[];
  addB2BLead: (lead: Omit<B2BLead, 'id' | 'createdAt' | 'status'>) => B2BLead;
  updateLeadStatus: (leadId: string, status: B2BLead['status']) => void;
  deleteB2BLead: (leadId: string) => void;
  // Company Actions & Social Initiatives
  companyActions: CompanyAction[];
  addCompanyAction: (actionData: Omit<CompanyAction, 'id'>) => void;
  updateCompanyAction: (id: string, updates: Partial<CompanyAction>) => void;
  deleteCompanyAction: (id: string) => void;
  // Site Configuration & Developer Portal
  siteConfig: SiteConfig;
  updateSiteConfig: (updates: Partial<SiteConfig>) => void;
  resetSiteConfig: () => void;
  isDeveloperBioOpen: boolean;
  setIsDeveloperBioOpen: (open: boolean) => void;
  toggleDeveloperBio: () => void;
  isDeveloperPanelVisible: boolean;
  setIsDeveloperPanelVisible: (visible: boolean) => void;
  toggleDeveloperPanel: () => void;
  // Notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation space
  const [activeSpace, setActiveSpace] = useState<AppSpace>('store');

  // Persistence in localStorage with safe hydration
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('rose_products');
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed: Product[] = JSON.parse(saved);
      const hasBrigadeiro = parsed.some((p) => p.id === 'prod-brigadeiro');
      const hasMms = parsed.some((p) => p.id === 'prod-mms');
      if (!hasBrigadeiro || !hasMms) {
        return INITIAL_PRODUCTS;
      }
      return parsed.map((p) => {
        const normalizedImage = p.image?.startsWith('/src/assets/images/')
          ? p.image.replace('/src/assets/images/', '/assets/images/')
          : p.image;
        if (p.description && p.description.includes('Clara')) {
          return {
            ...p,
            image: normalizedImage,
            description: p.description.replace('irmã Clara', 'irmã Nicole').replace('Clara', 'Nicole'),
          };
        }
        return normalizedImage !== p.image ? { ...p, image: normalizedImage } : p;
      });
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('rose_orders');
    if (!saved) return INITIAL_ORDERS;
    try {
      const parsed: Order[] = JSON.parse(saved);
      return parsed.map((ord) => ({ ...ord, customerPhone: '' }));
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [batches, setBatches] = useState<KitchenBatch[]>(() => {
    const saved = localStorage.getItem('rose_batches');
    if (!saved) return INITIAL_BATCHES;
    try {
      const parsed: KitchenBatch[] = JSON.parse(saved);
      return parsed.map((b) => {
        let baker = b.masterBaker;
        if (baker.includes('Lucas')) baker = 'Irmão Adão (Mestre dos Fornos)';
        if (baker.includes('Clara')) baker = 'Irmã Nicole (Confeitaria & Massas)';
        if (baker.includes('Beatriz') || baker.includes('Viviane')) baker = 'Irmã Neudyelle (Pâtisserie & Recheios)';
        if (baker.includes('Helena')) baker = 'Irmã Elizene (Controle de Qualidade)';
        return { ...b, masterBaker: baker };
      });
    } catch {
      return INITIAL_BATCHES;
    }
  });

  const [candidates, setCandidates] = useState<RHCandidate[]>(() => {
    const saved = localStorage.getItem('rose_candidates');
    if (!saved) return INITIAL_CANDIDATES;
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_CANDIDATES;
    }
  });

  const [b2bLeads, setB2BLeads] = useState<B2BLead[]>(() => {
    const saved = localStorage.getItem('rose_b2bleads');
    if (!saved) return INITIAL_B2B_LEADS;
    try {
      return JSON.parse(saved);
    } catch {
      return INITIAL_B2B_LEADS;
    }
  });

  const [companyActions, setCompanyActions] = useState<CompanyAction[]>(() => {
    const saved = localStorage.getItem('rose_company_actions');
    if (!saved) return INITIAL_COMPANY_ACTIONS;
    try {
      const parsed: CompanyAction[] = JSON.parse(saved);
      return parsed.map((act) =>
        act.image?.startsWith('/src/assets/images/')
          ? { ...act, image: act.image.replace('/src/assets/images/', '/assets/images/') }
          : act
      );
    } catch {
      return INITIAL_COMPANY_ACTIONS;
    }
  });

  const [isDeveloperPanelVisible, setIsDeveloperPanelVisible] = useState<boolean>(() => {
    const saved = localStorage.getItem('cibele_dev_unlocked');
    return saved === 'true';
  });

  const toggleDeveloperPanel = () => {
    setIsDeveloperPanelVisible((prev) => !prev);
  };

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('cibele_site_config');
    if (!saved) return DEFAULT_SITE_CONFIG;
    try {
      const parsed = JSON.parse(saved);
      const siblings = {
        sister1: parsed.siblings?.sister1 || 'Nicole',
        sister2: parsed.siblings?.sister2 === 'Viviane' ? 'Neudyelle' : (parsed.siblings?.sister2 || 'Neudyelle'),
        sister3: parsed.siblings?.sister3 === 'Neudyelle' ? 'Elizene' : (parsed.siblings?.sister3 || 'Elizene'),
        brother: parsed.siblings?.brother || 'Adão',
      };
      return { ...DEFAULT_SITE_CONFIG, ...parsed, siblings };
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rose_cart');
    if (!saved) return [];
    try {
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.map((item) =>
        item.product?.image?.startsWith('/src/assets/images/')
          ? {
              ...item,
              product: {
                ...item.product,
                image: item.product.image.replace('/src/assets/images/', '/assets/images/'),
              },
            }
          : item
      );
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Developer Mini-biography toggle (button "Desenvolvedora")
  const [isDeveloperBioOpen, setIsDeveloperBioOpen] = useState(false);
  const toggleDeveloperBio = () => setIsDeveloperBioOpen((prev) => !prev);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3800);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cibele_dev_unlocked', String(isDeveloperPanelVisible));
  }, [isDeveloperPanelVisible]);

  useEffect(() => {
    localStorage.setItem('rose_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('rose_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('rose_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('rose_candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('rose_b2bleads', JSON.stringify(b2bLeads));
  }, [b2bLeads]);

  useEffect(() => {
    localStorage.setItem('rose_company_actions', JSON.stringify(companyActions));
  }, [companyActions]);

  useEffect(() => {
    localStorage.setItem('cibele_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('rose_cart', JSON.stringify(cart));
  }, [cart]);

  // Oven batch timer countdown simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setBatches((prev) =>
        prev.map((batch) => {
          if (batch.status === 'assando' && batch.remainingSeconds > 0) {
            const nextSec = batch.remainingSeconds - 1;
            if (nextSec === 0) {
              return { ...batch, remainingSeconds: 0, status: 'resfriando' };
            }
            return { ...batch, remainingSeconds: nextSec };
          }
          return batch;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Adicionado ao carrinho: ${product.name}`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const orderNumber = 1045 + orders.length;
    const newOrder: Order = {
      ...orderData,
      id: `BIS-${orderNumber}`,
      createdAt: new Date().toISOString(),
      status: 'recebido',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Pedido #${newOrder.id} confirmado e enviado à Cozinha da Fábrica!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Status do Pedido #${orderId} atualizado.`);
  };

  const assignDriver = (orderId: string, driverName: string, vehicle: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              driverName,
              driverVehicle: vehicle,
              status: 'saiu_entrega',
            }
          : ord
      )
    );
    showToast(`Motorista ${driverName} atribuído ao pedido #${orderId}.`);
  };

  const getOrderById = (orderId: string) => {
    const cleaned = orderId.trim().toUpperCase().replace('#', '');
    return orders.find(
      (ord) =>
        ord.id.toUpperCase() === cleaned ||
        ord.id.toUpperCase() === `BIS-${cleaned}` ||
        ord.id.toUpperCase() === `ROS-${cleaned}` ||
        ord.id.toUpperCase().replace(/\D/g, '') === cleaned.replace(/\D/g, '')
    );
  };

  // Products
  const addProduct = (prod: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = { ...prod, id: newId };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Novo biscoito "${newProduct.name}" cadastrado.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Biscoito atualizado com sucesso.');
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Biscoito removido do cardápio.');
  };

  // Batches
  const updateBatchStatus = (batchId: string, newStatus: KitchenBatch['status']) => {
    setBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: newStatus } : b))
    );
  };

  const addBatch = (batchData: Omit<KitchenBatch, 'id' | 'remainingSeconds'>) => {
    const newBatch: KitchenBatch = {
      ...batchData,
      id: `FORNADA-${String(batches.length + 1).padStart(2, '0')}`,
      remainingSeconds: batchData.totalMinutes * 60,
    };
    setBatches((prev) => [newBatch, ...prev]);
    showToast(`Fornada #${newBatch.id} iniciada no Forno ${newBatch.ovenNumber}!`);
  };

  const adjustBatchTime = (batchId: string, deltaSeconds: number) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id === batchId) {
          const nextSec = Math.max(0, b.remainingSeconds + deltaSeconds);
          return {
            ...b,
            remainingSeconds: nextSec,
            status: nextSec === 0 ? 'resfriando' : b.status,
          };
        }
        return b;
      })
    );
    showToast(deltaSeconds > 0 ? `+${deltaSeconds / 60}min adicionados ao forno` : 'Tempo de forno adiantado');
  };

  const fastForwardBatch = (batchId: string) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId ? { ...b, remainingSeconds: 0, status: 'resfriando' } : b
      )
    );
    showToast(`Fornada #${batchId} assada com sucesso e movida para resfriamento!`);
  };

  const adjustOvenTemp = (batchId: string, deltaTemp: number) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId ? { ...b, temperatureC: Math.max(140, Math.min(240, b.temperatureC + deltaTemp)) } : b
      )
    );
    showToast(`Temperatura do forno ajustada`);
  };

  // HR Candidates
  const addCandidate = (candidateData: Omit<RHCandidate, 'id' | 'appliedDate' | 'status'>) => {
    const newCand: RHCandidate = {
      ...candidateData,
      id: `cand-${Date.now()}`,
      appliedDate: 'Hoje, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'novo',
    };
    setCandidates((prev) => [newCand, ...prev]);
    showToast('Candidatura enviada ao time de RH da fábrica! Boa sorte.');
  };

  const updateCandidateStatus = (candidateId: string, status: RHCandidate['status']) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status } : c))
    );
  };

  const deleteCandidate = (candidateId: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
    showToast('Currículo / candidatura excluída com sucesso.');
  };

  // B2B Leads
  const addB2BLead = (leadData: Omit<B2BLead, 'id' | 'createdAt' | 'status'>): B2BLead => {
    const newLead: B2BLead = {
      ...leadData,
      id: `b2b-${Date.now()}`,
      createdAt: 'Hoje, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'pendente',
    };
    setB2BLeads((prev) => [newLead, ...prev]);
    showToast('Solicitação de revenda B2B enviada ao setor de logística.');
    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: B2BLead['status']) => {
    setB2BLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const deleteB2BLead = (leadId: string) => {
    setB2BLeads((prev) => prev.filter((l) => l.id !== leadId));
    showToast('Solicitação B2B apagada com sucesso.');
  };

  // Company Actions & Social Responsibility
  const addCompanyAction = (actionData: Omit<CompanyAction, 'id'>) => {
    const newAction: CompanyAction = {
      ...actionData,
      id: `act-${Date.now()}`,
    };
    setCompanyActions((prev) => [newAction, ...prev]);
    showToast(`Nova ação "${newAction.title}" cadastrada com sucesso!`);
  };

  const updateCompanyAction = (id: string, updates: Partial<CompanyAction>) => {
    setCompanyActions((prev) =>
      prev.map((act) => (act.id === id ? { ...act, ...updates } : act))
    );
    showToast('Ação da empresa atualizada com sucesso.');
  };

  const deleteCompanyAction = (id: string) => {
    setCompanyActions((prev) => prev.filter((act) => act.id !== id));
    showToast('Ação da empresa excluída com sucesso.');
  };

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updates }));
    showToast('Atualizações do site salvas com sucesso por Cibele Araújo!');
  };

  const resetSiteConfig = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    showToast('Configurações do site restauradas para os padrões originais.');
  };

  return (
    <AppContext.Provider
      value={{
        activeSpace,
        setActiveSpace,
        products,
        addProduct,
        updateProduct,
        toggleStock,
        deleteProduct,
        orders,
        createOrder,
        updateOrderStatus,
        assignDriver,
        getOrderById,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
        batches,
        updateBatchStatus,
        addBatch,
        adjustBatchTime,
        fastForwardBatch,
        adjustOvenTemp,
        candidates,
        addCandidate,
        updateCandidateStatus,
        deleteCandidate,
        b2bLeads,
        addB2BLead,
        updateLeadStatus,
        deleteB2BLead,
        companyActions,
        addCompanyAction,
        updateCompanyAction,
        deleteCompanyAction,
        siteConfig,
        updateSiteConfig,
        resetSiteConfig,
        isDeveloperBioOpen,
        setIsDeveloperBioOpen,
        toggleDeveloperBio,
        isDeveloperPanelVisible,
        setIsDeveloperPanelVisible,
        toggleDeveloperPanel,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
