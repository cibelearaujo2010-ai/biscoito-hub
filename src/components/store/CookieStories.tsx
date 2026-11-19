import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ShoppingBag, 
  Flame, 
  Heart, 
  Clock, 
  Check, 
  Instagram, 
  Tv,
  MessageCircle,
  MessageSquare,
  Share2,
  ThumbsUp,
  Send,
  CornerDownRight,
  User,
  CheckCircle2,
  Filter,
  Music,
  Volume2,
  VolumeX,
  Disc3,
  SkipForward
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { STORY_TRACKS, storyAudio } from '../../utils/storyAudio';

export interface CookieStoryItem {
  id: string;
  title: string;
  tagline: string;
  author: string;
  authorRole: string;
  previewImage: string;
  storyImage: string;
  timeAgo: string;
  storyText: string;
  ingredients: string[];
  bakingDetails: string;
  productId: string;
  badge: string;
  trackId: string;
}

export interface StoryMessage {
  id: string;
  storyId: string;
  storyTitle: string;
  authorName: string;
  city?: string;
  messageText: string;
  sentAt: string;
  likesCount: number;
  isLikedByUser?: boolean;
  siblingReply?: {
    author: string;
    role: string;
    replyText: string;
    replyTime: string;
  };
}

export const CookieStories: React.FC = () => {
  const { siteConfig, products, addToCart, showToast, setActiveSpace } = useApp();

  const sister1 = siteConfig.siblings?.sister1 || 'Nicole';
  const sister2 = siteConfig.siblings?.sister2 || 'Neudyelle';
  const sister3 = siteConfig.siblings?.sister3 || 'Elizene';
  const brother = siteConfig.siblings?.brother || 'Adão';

  const stories: CookieStoryItem[] = [
    {
      id: 'story-brigadeiro',
      title: 'Biscoito Vulcão de Brigadeiro Gourmet',
      tagline: 'O mais vendido de todos: brigadeiro cremoso que escorre',
      author: `Irmã ${sister1}`,
      authorRole: 'Confeitaria & Recheios Nobres',
      previewImage: '/src/assets/images/biscuit_brigadeiro_1794236667015.jpg',
      storyImage: '/src/assets/images/biscuit_brigadeiro_1794236667015.jpg',
      timeAgo: 'Há 15 min · Forno 01',
      storyText: 'Nosso campeão absoluto de pedidos! Uma massa amanteigada de chocolate com cacau nobre recheada até a borda com brigadeiro de panela artesanal feito com leite condensado puro e coberto com granulados finos.',
      ingredients: ['Brigadeiro artesanal de panela', 'Cacau 100% puro', 'Granulado belga de chocolate'],
      bakingDetails: '175°C por 15 minutos (casca crocante e coração cremoso)',
      productId: 'prod-brigadeiro',
      badge: 'Top 1 Mais Vendido 🍫',
      trackId: 'track-brigadeiro',
    },
    {
      id: 'story-mms',
      title: 'Cookie Artesanal com M&M\'s Coloridos',
      tagline: 'O queridinho da casa: crocância e chocolate ao leite',
      author: `Irmã ${sister2}`,
      authorRole: 'Pâtisserie & Criações Gourmet',
      previewImage: '/src/assets/images/cookie_mms_candies_1794236669548.jpg',
      storyImage: '/src/assets/images/cookie_mms_candies_1794236669548.jpg',
      timeAgo: 'Há 25 min · Forno 02',
      storyText: 'O cookie que mais sai junto com o de brigadeiro! Dourado e amanteigado por fora, macio por dentro e repleto de confeitos coloridos M&M de chocolate que derretem levemente no forno.',
      ingredients: ['Confeitos M&M de chocolate ao leite', 'Açúcar mascavo orgânico', 'Manteiga pura fresca'],
      bakingDetails: '180°C por 14 minutos no lastro refratário',
      productId: 'prod-mms',
      badge: 'Top 2 Mais Vendido 🌈',
      trackId: 'track-mms',
    },
    {
      id: 'story-cacau',
      title: 'Cookie de Chocolate Double Cacau & Flor de Sal',
      tagline: 'Chocolate belga 54% com cacau intenso',
      author: `Irmão ${brother}`,
      authorRole: 'Mestre dos Fornos & Torra de Cacau',
      previewImage: '/src/assets/images/hero_cookie_factory_1793997928787.jpg',
      storyImage: '/src/assets/images/story_cookie_ovens_1794236519203.jpg',
      timeAgo: 'Há 40 min · Forno 02',
      storyText: 'Aqui o cacau puro encontra gotas generosas de chocolate belga meio amargo. A flor de sal adicionada no minuto exato da saída do forno quebra a doçura e desperta todas as nuances do chocolate.',
      ingredients: ['Chocolate belga 54%', 'Cacau puro 100%', 'Flor de sal artesanal'],
      bakingDetails: '180°C por 12 minutos (miolo denso e bordas crocantes)',
      productId: 'prod-3',
      badge: 'Chocolate Puro 🍫',
      trackId: 'track-cacau',
    },
    {
      id: 'story-casadinho',
      title: 'Casadinho Tradicional de Goiabada Cascão',
      tagline: 'Dois discos finos com goiabada mineira em tacho de cobre',
      author: `Irmã ${sister1}`,
      authorRole: 'Guardiã dos Recheios Tradicionais',
      previewImage: '/src/assets/images/cookie_stories_spread_1794236504800.jpg',
      storyImage: '/src/assets/images/cookie_stories_spread_1794236504800.jpg',
      timeAgo: 'Há 2h · Bancada de Mármore',
      storyText: 'A goiabada cascão mineira é cozida lentamente por quatro horas no tacho de cobre com fogo brando. Quando o recheio atinge o ponto de veludo, unimos cada par de biscoitos à mão com carinho artesanal.',
      ingredients: ['Goiabada cascão mineira', 'Fécula de mandioca fina', 'Manteiga sem sal pura'],
      bakingDetails: '170°C por 14 minutos com união manual pós-resfriamento',
      productId: 'prod-2',
      badge: 'Receita Tradicional',
      trackId: 'track-bossa',
    },
    {
      id: 'story-sable',
      title: 'Sablé Imperial da Vovó Cecília',
      tagline: 'Manteiga 82% batida com fava de baunilha',
      author: `Irmã ${sister3}`,
      authorRole: 'Controle de Qualidade & Nutrição',
      previewImage: '/src/assets/images/biscuit_combos_spread_1793997928456.jpg',
      storyImage: '/src/assets/images/story_cookie_ovens_1794236519203.jpg',
      timeAgo: 'Há 1h · Forno Lastro Ouro',
      storyText: 'A receita começou com o caderno amarelo da nossa avó Cecília. O segredo está em usar manteiga pura de primeira linha e não sovar demais a massa: o biscoito deve desmanchar suavemente assim que toca o paladar.',
      ingredients: ['Manteiga pura 82% lipídios', 'Favas naturais de baunilha', 'Amêndoas laminadas tostadas'],
      bakingDetails: '175°C no forno refratário a vapor durante 16 minutos',
      productId: 'prod-1',
      badge: 'Receita Secular',
      trackId: 'track-bossa',
    },
    {
      id: 'story-palmier',
      title: 'Palmier Caramelizado Folhado Lilás',
      tagline: 'Massa folhada artesanal com 72 camadas',
      author: `Irmã ${sister2}`,
      authorRole: 'Pâtisserie & Laminação de Massas',
      previewImage: '/src/assets/images/biscuit_combos_spread_1793997928456.jpg',
      storyImage: '/src/assets/images/cookie_stories_spread_1794236504800.jpg',
      timeAgo: 'Há 3h · Laminação Fria',
      storyText: 'A laminação folhada exige paciência e temperatura estrita de câmara fria. O açúcar cristal derrete no calor intenso do forno e forma uma película translúcida dourada que estala ao morder.',
      ingredients: ['Farinha especial de trigo', 'Manteiga noisette', 'Caramelo crocante natural'],
      bakingDetails: '190°C por 20 minutos com virada aos 10 minutos',
      productId: 'prod-4',
      badge: 'Pâtisserie Fina',
      trackId: 'track-fornada',
    },
    {
      id: 'story-pureza',
      title: 'Controle de Qualidade & Pureza Nutricional',
      tagline: 'Zero conservantes artificiais e zero gordura hidrogenada',
      author: `Irmã ${sister3}`,
      authorRole: 'Nutricionista & Controle de Qualidade (CRN 18.420)',
      previewImage: '/src/assets/images/product_cookie_box_1793997929366.jpg',
      storyImage: '/src/assets/images/factory_master_baking_1793997929768.jpg',
      timeAgo: 'Há 15 min · Bancada de Prova',
      storyText: 'Nossa confeitaria não utiliza conservantes sintéticos nem aromas artificiais. O segredo da preservação por até 90 dias é a baixa umidade residual pós-forno e a vedação hermética com atmosfera pura.',
      ingredients: ['Ingredientes 100% naturais', 'Ovos caipiras frescos', 'Zero conservantes químicos'],
      bakingDetails: 'Teste de umidade certificado < 2,4% em cada batelada',
      productId: 'prod-1',
      badge: 'Selo Qualidade',
      trackId: 'track-cacau',
    },
    {
      id: 'story-lata',
      title: 'O Segredo da Lata Lilás Colecionável',
      tagline: 'Design exclusivo com atmosfera protetora',
      author: 'Os 4 Irmãos',
      authorRole: 'Nicole, Neudyelle, Elizene e Adão',
      previewImage: '/src/assets/images/cookie_logistics_fleet_1794236503598.jpg',
      storyImage: '/src/assets/images/cookie_logistics_fleet_1794236503598.jpg',
      timeAgo: 'Há 45 min · Linha de Envase',
      storyText: 'Inspirada nas confeitarias clássicas e pintada nas cores roxo profundo e lilás da nossa casa, a lata hermética protege os biscoitos da luz e da umidade. Depois que os biscoitos acabam, vira xodó decorativo!',
      ingredients: ['Folha de flandres reciclável', 'Anel de silicone hermético', 'Verniz alimentar atóxico'],
      bakingDetails: 'Envase a 20°C imediatamente após a esteira de cobre',
      productId: 'combo-1',
      badge: 'Ícone da Marca',
      trackId: 'track-lata',
    },
  ];

  // DEFAULT INITIAL MESSAGES PER STORY
  const DEFAULT_STORY_MESSAGES: StoryMessage[] = [
    {
      id: 'msg-1',
      storyId: 'story-brigadeiro',
      storyTitle: 'Biscoito Vulcão de Brigadeiro Gourmet',
      authorName: 'Camila Rezende',
      city: 'São Paulo - SP',
      messageText: 'Gente, o que é esse recheio de brigadeiro?! É o melhor biscoito que já provei na vida, derrete na boca!',
      sentAt: 'Há 18 min',
      likesCount: 24,
      siblingReply: {
        author: `Irmã ${sister1}`,
        role: 'Confeitaria & Massas',
        replyText: 'Camila, que alegria imensa ler sua mensagem! Passamos horas apurando o brigadeiro na panela para ficar cremoso assim ❤️',
        replyTime: 'Há 12 min',
      },
    },
    {
      id: 'msg-2',
      storyId: 'story-brigadeiro',
      storyTitle: 'Biscoito Vulcão de Brigadeiro Gourmet',
      authorName: 'Lucas Moretti',
      city: 'Campinas - SP',
      messageText: 'Pedi duas caixas ontem e já acabaram todas com o café da tarde. Vocês precisam abrir uma loja aqui no interior urgente!',
      sentAt: 'Há 45 min',
      likesCount: 19,
      siblingReply: {
        author: `Irmão ${brother}`,
        role: 'Mestre dos Fornos',
        replyText: 'Fala Lucas! Logo logo nossa van isotérmica lilás chega com mais fornadas aí em Campinas. Obrigado pelo carinho! 🚐🍪',
        replyTime: 'Há 30 min',
      },
    },
    {
      id: 'msg-3',
      storyId: 'story-mms',
      storyTitle: 'Cookie Artesanal com M&M\'s Coloridos',
      authorName: 'Fernanda Albuquerque',
      city: 'São Paulo - SP',
      messageText: 'Meus filhos não deixaram sobrar nem as migalhas do cookie de M&M! Crocante por fora e super macio por dentro!',
      sentAt: 'Há 28 min',
      likesCount: 31,
      siblingReply: {
        author: `Irmã ${sister2}`,
        role: 'Pâtisserie & Criações',
        replyText: 'Fernanda, caprichamos nos confeitos coloridos para alegrar toda a família! Um beijo especial para os pequenos 🎉',
        replyTime: 'Há 20 min',
      },
    },
    {
      id: 'msg-4',
      storyId: 'story-mms',
      storyTitle: 'Cookie Artesanal com M&M\'s Coloridos',
      authorName: 'Thiago Silva',
      city: 'Santos - SP',
      messageText: 'O contraste da casquinha dourada com as gotas de chocolate e o confeito crocante é perfeito demais!',
      sentAt: 'Há 1h',
      likesCount: 15,
      siblingReply: {
        author: `Irmã ${sister3}`,
        role: 'Controle de Qualidade',
        replyText: 'Thiago, o segredo é a temperatura precisa de 180°C para manter o miolo macio!',
        replyTime: 'Há 50 min',
      },
    },
    {
      id: 'msg-5',
      storyId: 'story-cacau',
      storyTitle: 'Cookie de Chocolate Double Cacau & Flor de Sal',
      authorName: 'Rodrigo Antunes',
      city: 'Jardins - SP',
      messageText: 'A flor de sal quebra a doçura e realça o chocolate belga de um jeito espetacular. Parabéns ao Mestre Adão!',
      sentAt: 'Há 35 min',
      likesCount: 42,
      siblingReply: {
        author: `Irmão ${brother}`,
        role: 'Mestre dos Fornos',
        replyText: 'Obrigado Rodrigo! O lastro refratário a vapor dá esse toque especial no cacau nobre 🔥',
        replyTime: 'Há 25 min',
      },
    },
    {
      id: 'msg-6',
      storyId: 'story-casadinho',
      storyTitle: 'Casadinho Tradicional de Goiabada Cascão',
      authorName: 'Dona Heloísa Prado',
      city: 'Pinheiros - SP',
      messageText: 'Tem o sabor exato do casadinho da minha infância. A goiabada em tacho de cobre é incomparável!',
      sentAt: 'Há 2h',
      likesCount: 38,
      siblingReply: {
        author: `Irmã ${sister1}`,
        role: 'Guardiã dos Recheios',
        replyText: 'Dona Heloísa, que honra! A receita do caderno da nossa avó Cecília vive viva em cada tacho 💛',
        replyTime: 'Há 1h',
      },
    },
    {
      id: 'msg-7',
      storyId: 'story-lata',
      storyTitle: 'O Segredo da Lata Lilás Colecionável',
      authorName: 'Juliana Siqueira',
      city: 'Belo Horizonte - MG',
      messageText: 'Chegou aqui em Minas Gerais super crocante como se tivesse saído do forno agora! E a lata lilás é linda demais!',
      sentAt: 'Há 3h',
      likesCount: 56,
      siblingReply: {
        author: 'Os 4 Irmãos',
        role: 'Confeitaria Artesanal',
        replyText: 'A vedação a vácuo com atmosfera protetora preserva a crocância por 90 dias em qualquer canto do Brasil! 💜',
        replyTime: 'Há 2h',
      },
    },
  ];

  // Persistent Messages State
  const [messages, setMessages] = useState<StoryMessage[]>(() => {
    const saved = localStorage.getItem('cookie_story_messages');
    if (!saved) return DEFAULT_STORY_MESSAGES;
    try {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : DEFAULT_STORY_MESSAGES;
    } catch {
      return DEFAULT_STORY_MESSAGES;
    }
  });

  // Story Viewer Modal State
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMessagesDrawerOpen, setIsMessagesDrawerOpen] = useState(false);

  // Story Music State
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [customTrackIdx, setCustomTrackIdx] = useState<number | null>(null);
  const [isTrackPickerOpen, setIsTrackPickerOpen] = useState(false);

  // New Message Input State inside Story
  const [newMsgText, setNewMsgText] = useState('');
  const [newMsgAuthor, setNewMsgAuthor] = useState('');
  const [activeMuralFilter, setActiveMuralFilter] = useState<string>('todos');

  const [reactions, setReactions] = useState<{ [storyId: string]: { [emoji: string]: number } }>({
    'story-brigadeiro': { '🍪': 340, '🤤': 295, '💜': 420, '🔥': 210 },
    'story-mms': { '🍪': 290, '🤤': 240, '💜': 380, '🔥': 190 },
    'story-cacau': { '🍪': 230, '🤤': 190, '💜': 260, '🔥': 178 },
    'story-casadinho': { '🍪': 188, '🤤': 145, '💜': 320, '🔥': 112 },
    'story-sable': { '🍪': 142, '🤤': 98, '💜': 210, '🔥': 85 },
    'story-palmier': { '🍪': 115, '🤤': 88, '💜': 194, '🔥': 65 },
    'story-pureza': { '🍪': 95, '🤤': 72, '💜': 280, '🔥': 90 },
    'story-lata': { '🍪': 310, '🤤': 160, '💜': 440, '🔥': 195 },
  });
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; emoji: string }[]>([]);

  // Sync messages to localStorage
  useEffect(() => {
    localStorage.setItem('cookie_story_messages', JSON.stringify(messages));
  }, [messages]);

  const activeStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;
  const activeTrack =
    customTrackIdx !== null
      ? STORY_TRACKS[customTrackIdx % STORY_TRACKS.length]
      : activeStory
      ? STORY_TRACKS.find((t) => t.id === activeStory.trackId) || STORY_TRACKS[0]
      : STORY_TRACKS[0];

  // Control background story music playback
  useEffect(() => {
    if (activeStoryIndex !== null && !isPaused && !isMusicMuted) {
      storyAudio.start(activeTrack);
    } else {
      storyAudio.stop();
    }
    return () => {
      storyAudio.stop();
    };
  }, [activeStoryIndex, isPaused, isMusicMuted, activeTrack.id]);

  const storyDurationMs = 7000;
  const tickIntervalMs = 50;

  // Timer loop for active story (pauses automatically if messages drawer or track picker is open)
  useEffect(() => {
    if (activeStoryIndex === null || isPaused || isMessagesDrawerOpen || isTrackPickerOpen) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (tickIntervalMs / storyDurationMs) * 100;
        if (next >= 100) {
          if (activeStoryIndex < stories.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            setCustomTrackIdx(null);
            return 0;
          } else {
            setActiveStoryIndex(null);
            setCustomTrackIdx(null);
            return 0;
          }
        }
        return next;
      });
    }, tickIntervalMs);

    return () => clearInterval(interval);
  }, [activeStoryIndex, isPaused, isMessagesDrawerOpen, isTrackPickerOpen, stories.length]);

  const openStory = (index: number) => {
    setActiveStoryIndex(index);
    setProgress(0);
    setIsPaused(false);
    setIsMessagesDrawerOpen(false);
    setCustomTrackIdx(null);
    setIsTrackPickerOpen(false);
    if (!isMusicMuted) {
      const track = STORY_TRACKS.find((t) => t.id === stories[index].trackId) || STORY_TRACKS[0];
      storyAudio.start(track);
    }
  };

  const closeStory = () => {
    storyAudio.stop();
    setActiveStoryIndex(null);
    setProgress(0);
    setIsPaused(false);
    setIsMessagesDrawerOpen(false);
    setCustomTrackIdx(null);
    setIsTrackPickerOpen(false);
  };

  const closeStoryAndGoHome = () => {
    closeStory();
    setActiveSpace('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStory = () => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
      setIsMessagesDrawerOpen(false);
      setCustomTrackIdx(null);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (activeStoryIndex === null) return;
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
      setIsMessagesDrawerOpen(false);
      setCustomTrackIdx(null);
    } else {
      setProgress(0);
    }
  };

  const handleCycleTrack = () => {
    const currentIdx =
      customTrackIdx !== null
        ? customTrackIdx
        : STORY_TRACKS.findIndex((t) => t.id === activeTrack.id);
    const nextIdx = (currentIdx + 1) % STORY_TRACKS.length;
    setCustomTrackIdx(nextIdx);
    setIsMusicMuted(false);
    storyAudio.start(STORY_TRACKS[nextIdx]);
    showToast(`🎵 Tocando agora: ${STORY_TRACKS[nextIdx].title}`);
  };

  const handleToggleMusicMute = () => {
    setIsMusicMuted((prev) => {
      const nextMuted = !prev;
      if (!nextMuted && !isPaused) {
        storyAudio.start(activeTrack);
      } else {
        storyAudio.stop();
      }
      return nextMuted;
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeStoryIndex === null) return;
      // Do not trigger shortcuts if user is typing in message input
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        if (isMessagesDrawerOpen) {
          setIsMessagesDrawerOpen(false);
        } else {
          closeStory();
        }
      }
      if (e.key === 'ArrowRight') nextStory();
      if (e.key === 'ArrowLeft') prevStory();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStoryIndex, isMessagesDrawerOpen]);

  const handleReaction = (emoji: string) => {
    if (activeStoryIndex === null) return;
    const currentStory = stories[activeStoryIndex];
    setReactions((prev) => {
      const current = prev[currentStory.id] || { '🍪': 0, '🤤': 0, '💜': 0, '🔥': 0 };
      return {
        ...prev,
        [currentStory.id]: {
          ...current,
          [emoji]: (current[emoji] || 0) + 1,
        },
      };
    });

    // Particle effect
    const newParticle = { id: Date.now() + Math.random(), emoji };
    setFloatingParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  };

  const handleOrderStoryProduct = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      addToCart(prod);
      showToast(`✨ ${prod.name} adicionado ao seu carrinho!`);
    } else {
      showToast('Redirecionando para o cardápio de biscoitos...');
      const el = document.getElementById('cardapio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle submitting message in story
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim() || activeStoryIndex === null) return;
    const currentStory = stories[activeStoryIndex];

    const author = newMsgAuthor.trim() || 'Visitante Apaixonado(a)';

    // Dynamic Sibling automatic reply based on story
    let replyAuthor = `Irmã ${sister1}`;
    let replyRole = 'Confeitaria & Massas';
    let replyText = 'Muito obrigado(a) pela sua mensagem e carinho com nossa confeitaria! ❤️🍪';

    if (currentStory.id === 'story-cacau') {
      replyAuthor = `Irmão ${brother}`;
      replyRole = 'Mestre dos Fornos';
      replyText = 'Valeu demais pela mensagem! O ponto de forno a vapor doura esse chocolate perfeitamente! 🔥';
    } else if (currentStory.id === 'story-mms') {
      replyAuthor = `Irmã ${sister2}`;
      replyRole = 'Pâtisserie & Criações';
      replyText = 'Que alegria receber seu recado! O cookie com M&M\'s é pura festa aqui na cozinha! 🌈';
    } else if (currentStory.id === 'story-pureza' || currentStory.id === 'story-sable') {
      replyAuthor = `Irmã ${sister3}`;
      replyRole = 'Controle de Qualidade';
      replyText = 'Adoramos sua mensagem! Cuidamos de cada grama de manteiga e farinha pura com carinho ✨';
    }

    const newMessage: StoryMessage = {
      id: `msg-${Date.now()}`,
      storyId: currentStory.id,
      storyTitle: currentStory.title,
      authorName: author,
      city: 'São Paulo - SP',
      messageText: newMsgText.trim(),
      sentAt: 'Agora mesmo',
      likesCount: 1,
      isLikedByUser: true,
      siblingReply: {
        author: replyAuthor,
        role: replyRole,
        replyText: replyText,
        replyTime: 'Em instantes',
      },
    };

    setMessages((prev) => [newMessage, ...prev]);
    setNewMsgText('');
    showToast('💌 Sua mensagem foi enviada para os 4 Irmãos com sucesso!');
  };

  const handleToggleLike = (msgId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const isLiked = !msg.isLikedByUser;
          return {
            ...msg,
            isLikedByUser: isLiked,
            likesCount: isLiked ? msg.likesCount + 1 : Math.max(0, msg.likesCount - 1),
          };
        }
        return msg;
      })
    );
  };

  const currentStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  // Filter messages for current story
  const currentStoryMessages = currentStory
    ? messages.filter((m) => m.storyId === currentStory.id)
    : [];

  // Filter messages for Mural
  const filteredMuralMessages = activeMuralFilter === 'todos'
    ? messages
    : messages.filter((m) => m.storyId === activeMuralFilter);

  return (
    <div className="space-y-8">
      {/* HEADER DE STORIES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EDE9FE] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#DDD6FE] text-[#7C3AED] text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            <span>Stories & Mensagens Ao Vivo</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#200E2E]">
            Stories dos Biscoitos & Recados da Comunidade
          </h3>
          <p className="text-xs text-[#4C1D95]/80">
            Toque nos stories para ver os bastidores dos fornos e veja ou envie mensagens sobre os biscoitos!
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EDE9FE] text-[#200E2E] shadow-sm">
            <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
            <span className="font-bold">{messages.length}</span>
            <span className="text-[#7C3AED]">mensagens recebidas</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#6D28D9] font-semibold bg-[#FAF5FF] px-3 py-1.5 rounded-xl border border-[#DDD6FE]">
            <Music className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Piano & Violão</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Fornadas Ativas</span>
          </div>
        </div>
      </div>

      {/* STORY CIRCLES ROW (CARROSSEL HORIZONTAL) */}
      <div className="overflow-x-auto pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center gap-4 sm:gap-6 min-w-max">
          {stories.map((story, idx) => {
            const storyMsgCount = messages.filter((m) => m.storyId === story.id).length;
            return (
              <button
                key={story.id}
                onClick={() => openStory(idx)}
                className="group flex flex-col items-center text-center focus:outline-none cursor-pointer transition-transform active:scale-95"
              >
                {/* Gradient Ring with pulsing border */}
                <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#7C3AED] via-[#C084FC] to-amber-300 shadow-md group-hover:scale-105 transition-transform duration-200">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-white border-2 border-white relative">
                    <img
                      src={story.previewImage}
                      alt={story.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#7C3AED]/90 text-white flex items-center justify-center shadow-sm">
                      <Music className="w-2.5 h-2.5" />
                    </span>
                    <span className="absolute bottom-1 right-1 text-xs">🍪</span>
                  </div>

                  {/* Badge indicator */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#200E2E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-purple-300 shadow-sm whitespace-nowrap">
                    {story.badge}
                  </div>
                </div>

                {/* Story Title & Message Counter */}
                <div className="mt-2.5 max-w-[90px] sm:max-w-[110px]">
                  <p className="text-xs font-bold text-[#200E2E] truncate group-hover:text-[#7C3AED] transition-colors">
                    {story.title.split(' ')[0]} {story.title.split(' ')[1] || ''}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-[#7C3AED]">
                    <MessageCircle className="w-3 h-3" />
                    <span>{storyMsgCount} recados</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODAL STORY VIEWER (FULL INTERACTIVE EXPEREINCE COM PARTE ONDE VÊ A MENSAGEM) */}
      {currentStory && activeStoryIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
          onClick={closeStory}
        >
          {/* Main Story Phone Box */}
          <div
            className="relative w-full max-w-md h-[94vh] max-h-[840px] bg-[#1A0B26] text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Story Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentStory.storyImage}
                alt={currentStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/95" />
            </div>

            {/* TOP BAR: MULTI-STORY PROGRESS BARS */}
            <div className="relative z-20 p-4 space-y-3">
              <div className="flex gap-1.5 w-full">
                {stories.map((s, idx) => (
                  <div 
                    key={s.id} 
                    className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openStory(idx);
                    }}
                  >
                    <div
                      className="h-full bg-white transition-all duration-75"
                      style={{
                        width:
                          idx < activeStoryIndex
                            ? '100%'
                            : idx === activeStoryIndex
                            ? `${progress}%`
                            : '0%',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Author Header with Quick "Ver Mensagens" Button & X para Voltar ao Início */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#C084FC] bg-[#2E1045] shadow-sm shrink-0">
                    <img
                      src={currentStory.previewImage}
                      alt={currentStory.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white leading-tight truncate">
                        {currentStory.author}
                      </span>
                      <span className="hidden sm:inline text-[10px] bg-[#7C3AED] text-white font-semibold px-1.5 py-0.2 rounded-full shrink-0">
                        4 Irmãos
                      </span>
                    </div>
                    <p className="text-[11px] text-[#DDD6FE]/80 truncate">
                      {currentStory.timeAgo}
                    </p>
                  </div>
                </div>

                {/* Right controls: Ver Mensagens pill + music + pause + X Voltar ao Início */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setIsMessagesDrawerOpen((prev) => !prev)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold transition-all shadow-md cursor-pointer ${
                      isMessagesDrawerOpen
                        ? 'bg-amber-400 text-[#200E2E]'
                        : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20'
                    }`}
                    title="Ver ou enviar mensagens deste story"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{currentStoryMessages.length}</span>
                  </button>

                  <button
                    onClick={handleToggleMusicMute}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isMusicMuted
                        ? 'bg-rose-500/40 hover:bg-rose-500/60 text-white'
                        : 'bg-[#7C3AED]/80 hover:bg-[#7C3AED] text-white'
                    }`}
                    title={isMusicMuted ? 'Ativar Música do Story' : 'Silenciar Música do Story'}
                    aria-label={isMusicMuted ? 'Ativar Música do Story' : 'Silenciar Música do Story'}
                  >
                    {isMusicMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setIsPaused((p) => !p)}
                    className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                    title={isPaused ? 'Continuar Story' : 'Pausar Story'}
                    aria-label={isPaused ? 'Continuar Story' : 'Pausar Story'}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={closeStoryAndGoHome}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-500/90 hover:bg-rose-600 text-white text-[11px] font-bold shadow-md border border-white/20 transition-all active:scale-95 cursor-pointer"
                    title="Fechar Story e voltar para o início"
                    aria-label="Fechar Story e voltar para o início"
                  >
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Início</span>
                  </button>
                </div>
              </div>

              {/* BARRA DE MÚSICA DO STORY (ESTILO INSTAGRAM/TIKTOK STORIES) */}
              <div className="space-y-1.5 relative">
                <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 text-xs">
                  <button
                    type="button"
                    onClick={() => setIsTrackPickerOpen((prev) => !prev)}
                    className="flex items-center gap-2 min-w-0 text-left cursor-pointer hover:opacity-90"
                    title="Clique para escolher entre as 6 músicas"
                  >
                    <Disc3
                      className={`w-4 h-4 text-amber-300 shrink-0 ${
                        !isPaused && !isMusicMuted ? 'animate-spin' : ''
                      }`}
                      style={{ animationDuration: '3s' }}
                    />
                    <div className="min-w-0 flex items-center gap-1.5">
                      <span className="font-bold text-white truncate">
                        {activeTrack.title}
                      </span>
                      <span className="text-[10px] text-[#DDD6FE]/80 truncate hidden sm:inline">
                        · {activeTrack.artist}
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Animated equalizer bars when playing */}
                    {!isPaused && !isMusicMuted && (
                      <div className="flex items-end gap-0.5 h-3 px-1" aria-hidden="true">
                        <span className="w-0.5 h-2 bg-amber-300 rounded-full animate-pulse" />
                        <span className="w-0.5 h-3 bg-purple-300 rounded-full animate-bounce" />
                        <span className="w-0.5 h-1.5 bg-pink-300 rounded-full animate-pulse" />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsTrackPickerOpen((prev) => !prev)}
                      className="px-2 py-0.5 rounded-lg bg-[#7C3AED]/70 hover:bg-[#7C3AED] text-[10px] font-semibold text-white transition-colors cursor-pointer"
                      title="Abrir lista de músicas"
                    >
                      Lista
                    </button>

                    <button
                      type="button"
                      onClick={handleCycleTrack}
                      className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white/15 hover:bg-white/25 text-[10px] font-semibold text-white transition-colors cursor-pointer"
                      title="Trocar música do story"
                    >
                      <SkipForward className="w-3 h-3" />
                      <span>Trocar</span>
                    </button>
                  </div>
                </div>

                {/* Lista rápida para escolher qualquer uma das novas músicas */}
                {isTrackPickerOpen && (
                  <div className="bg-[#190924]/95 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-2 space-y-1 shadow-xl">
                    <div className="flex items-center justify-between px-2 py-1 text-[10px] uppercase font-bold tracking-wider text-[#DDD6FE]/80">
                      <span>Escolha a Música do Story</span>
                      <button
                        type="button"
                        onClick={() => setIsTrackPickerOpen(false)}
                        className="text-white/70 hover:text-white cursor-pointer"
                      >
                        Fechar
                      </button>
                    </div>
                    <div className="grid gap-1 max-h-44 overflow-y-auto no-scrollbar">
                      {STORY_TRACKS.map((track, idx) => {
                        const isSelected = track.id === activeTrack.id;
                        return (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => {
                              setCustomTrackIdx(idx);
                              setIsMusicMuted(false);
                              setIsTrackPickerOpen(false);
                              storyAudio.start(track);
                              showToast(`🎵 Tocando agora: ${track.title}`);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#7C3AED] text-white font-bold'
                                : 'bg-white/5 hover:bg-white/15 text-[#FAF8FD]'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="truncate">{track.title}</div>
                              <div className="text-[10px] text-[#DDD6FE]/80 truncate">{track.artist}</div>
                            </div>
                            {isSelected && <Music className="w-3.5 h-3.5 text-amber-300 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TAP ZONES: PREV / NEXT (Only active when messages drawer is closed) */}
            {!isMessagesDrawerOpen && (
              <div className="absolute inset-0 z-10 flex">
                <div 
                  className="w-1/3 h-full cursor-pointer" 
                  onClick={prevStory} 
                  title="Story anterior"
                />
                <div 
                  className="w-1/3 h-full cursor-pointer" 
                  onClick={() => setIsPaused((p) => !p)} 
                  title="Toque para pausar/reproduzir"
                />
                <div 
                  className="w-1/3 h-full cursor-pointer" 
                  onClick={nextStory} 
                  title="Próximo story"
                />
              </div>
            )}

            {/* FLOATING PARTICLES */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              {floatingParticles.map((pt) => (
                <div
                  key={pt.id}
                  className="absolute bottom-28 right-8 text-4xl animate-bounce"
                  style={{ animationDuration: '0.8s' }}
                >
                  {pt.emoji}
                </div>
              ))}
            </div>

            {/* GAVETA / PAINEL ONDE SE VÊ E ENVIA AS MENSAGENS (SLIDE UP DRAWER) */}
            {isMessagesDrawerOpen ? (
              <div className="relative z-30 flex-1 flex flex-col justify-between bg-[#190924]/95 backdrop-blur-xl border-t border-purple-500/30 p-5 rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom duration-200">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-300" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Mensagens & Recados do Story
                      </h4>
                      <p className="text-[10px] text-[#DDD6FE]">
                        {currentStory.title} ({currentStoryMessages.length} recados)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMessagesDrawerOpen(false)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    title="Voltar para o Story"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages List (Scrollable) */}
                <div className="flex-1 overflow-y-auto py-3 space-y-3.5 pr-1 no-scrollbar my-2">
                  {currentStoryMessages.length === 0 ? (
                    <div className="text-center py-8 text-xs text-[#DDD6FE]/70 space-y-2">
                      <MessageCircle className="w-8 h-8 mx-auto text-[#A78BFA]/50" />
                      <p>Seja o primeiro a enviar uma mensagem sobre este biscoito!</p>
                    </div>
                  ) : (
                    currentStoryMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="bg-white/10 rounded-2xl p-3.5 border border-white/10 space-y-2 text-xs"
                      >
                        {/* Author line & Likes */}
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5 font-bold text-amber-300">
                            <User className="w-3.5 h-3.5 text-purple-300" />
                            <span>{msg.authorName}</span>
                            {msg.city && <span className="text-[10px] text-white/60 font-normal">· {msg.city}</span>}
                          </div>

                          <button
                            onClick={() => handleToggleLike(msg.id)}
                            className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                              msg.isLikedByUser ? 'text-rose-400 font-bold' : 'text-white/60 hover:text-white'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${msg.isLikedByUser ? 'fill-rose-400 text-rose-400' : ''}`} />
                            <span>{msg.likesCount}</span>
                          </button>
                        </div>

                        {/* Customer Message Text */}
                        <p className="text-white text-xs leading-relaxed font-normal">
                          "{msg.messageText}"
                        </p>

                        {/* Official Sibling Reply (Se houver) */}
                        {msg.siblingReply && (
                          <div className="mt-2 pt-2 border-t border-white/10 bg-purple-950/50 p-2.5 rounded-xl border border-purple-500/20 space-y-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#DDD6FE]">
                              <CornerDownRight className="w-3 h-3 text-amber-300 shrink-0" />
                              <span>{msg.siblingReply.author}</span>
                              <span className="text-[9px] bg-[#7C3AED] text-white px-1.5 py-0.2 rounded-full">
                                {msg.siblingReply.role}
                              </span>
                            </div>
                            <p className="text-[11px] text-white/90 pl-4 italic">
                              {msg.siblingReply.replyText}
                            </p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Send New Message Box */}
                <form onSubmit={handleSendMessage} className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Seu nome (opcional)"
                      value={newMsgAuthor}
                      onChange={(e) => setNewMsgAuthor(e.target.value)}
                      className="w-1/3 text-xs px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                    <div className="flex-1 relative flex items-center">
                      <input
                        type="text"
                        required
                        placeholder="Escreva seu recado sobre o biscoito..."
                        value={newMsgText}
                        onChange={(e) => setNewMsgText(e.target.value)}
                        className="w-full text-xs px-3.5 py-2 pr-10 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-purple-400"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 p-1.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white transition-colors cursor-pointer"
                        title="Enviar mensagem"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] text-center text-[#DDD6FE]/70">
                    Sua mensagem será exibida no story e os 4 irmãos respondem com amor! 💜
                  </p>
                </form>
              </div>
            ) : (
              /* BOTTOM STORY CONTENT CARD (NORMAL VIEW) */
              <div className="relative z-20 p-5 sm:p-6 space-y-3.5 bg-gradient-to-t from-black/95 via-black/85 to-transparent">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#7C3AED]/70 border border-purple-400 text-xs text-white font-semibold">
                      <Flame className="w-3 h-3 text-amber-300" />
                      <span>{currentStory.tagline}</span>
                    </div>

                    {/* BOTÃO PARA ABRIR E VER A MENSAGEM */}
                    <button
                      onClick={() => setIsMessagesDrawerOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ver {currentStoryMessages.length} Mensagens &rarr;</span>
                    </button>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-white leading-tight">
                    {currentStory.title}
                  </h2>
                  <p className="text-xs text-[#FAF8FD]/90 leading-relaxed font-normal">
                    {currentStory.storyText}
                  </p>
                </div>

                {/* Ingredients and Baking specs */}
                <div className="p-3 bg-white/10 rounded-2xl border border-white/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-[#DDD6FE]">
                    <span className="font-semibold uppercase tracking-wider">Ingredientes-Chave:</span>
                    <span className="font-mono text-amber-300">{currentStory.bakingDetails}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStory.ingredients.map((ing, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-0.5 bg-purple-950/70 border border-purple-400/40 rounded-lg text-[10px] text-[#FAF8FD]"
                      >
                        ✓ {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BARRA DE MENSAGEM RÁPIDA NO RODAPÉ DO STORY */}
                <div className="flex items-center gap-2 pt-1">
                  <div 
                    onClick={() => setIsMessagesDrawerOpen(true)}
                    className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-white/15 hover:bg-white/20 rounded-2xl border border-white/20 text-xs text-white/80 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <MessageCircle className="w-4 h-4 text-amber-300 shrink-0" />
                      <span className="truncate">Ver mensagens ou mandar recado...</span>
                    </div>
                    <span className="text-[10px] font-bold bg-[#7C3AED] px-2 py-0.5 rounded-full text-white shrink-0">
                      {currentStoryMessages.length}
                    </span>
                  </div>

                  {/* Buy / Taste Button */}
                  <button
                    onClick={() => handleOrderStoryProduct(currentStory.productId)}
                    className="py-2.5 px-4 bg-gradient-to-r from-[#7C3AED] to-[#9333EA] hover:from-[#6D28D9] hover:to-[#7E22CE] text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Provar</span>
                  </button>
                </div>
              </div>
            )}

            {/* Desktop Left / Right Arrow Navigators */}
            <button
              onClick={prevStory}
              className="hidden sm:flex absolute -left-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
              title="Story anterior"
              aria-label="Story anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextStory}
              className="hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all"
              title="Próximo story"
              aria-label="Próximo story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* MURAL DE MENSAGENS & RECADOS DOS STORIES (DISPONÍVEL DIRETO NA PÁGINA) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE9FE] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EDE9FE] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#7C3AED] font-semibold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
              <span>Mural Aberto da Comunidade</span>
            </div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-[#200E2E]">
              O Que as Pessoas Estão Dizendo nos Stories
            </h4>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => setActiveMuralFilter('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeMuralFilter === 'todos'
                  ? 'bg-[#200E2E] text-white shadow-sm'
                  : 'bg-[#FAF8FD] text-[#4C1D95] border border-[#DDD6FE] hover:bg-[#EDE9FE]'
              }`}
            >
              Todas as Mensagens ({messages.length})
            </button>
            <button
              onClick={() => setActiveMuralFilter('story-brigadeiro')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeMuralFilter === 'story-brigadeiro'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'bg-[#FAF8FD] text-[#4C1D95] border border-[#DDD6FE] hover:bg-[#EDE9FE]'
              }`}
            >
              🍫 Brigadeiro
            </button>
            <button
              onClick={() => setActiveMuralFilter('story-mms')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeMuralFilter === 'story-mms'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'bg-[#FAF8FD] text-[#4C1D95] border border-[#DDD6FE] hover:bg-[#EDE9FE]'
              }`}
            >
              🌈 M&M's
            </button>
            <button
              onClick={() => setActiveMuralFilter('story-cacau')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeMuralFilter === 'story-cacau'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'bg-[#FAF8FD] text-[#4C1D95] border border-[#DDD6FE] hover:bg-[#EDE9FE]'
              }`}
            >
              🍪 Chocolate
            </button>
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMuralMessages.slice(0, 6).map((msg) => {
            const storyIdx = stories.findIndex((s) => s.id === msg.storyId);
            return (
              <div
                key={msg.id}
                className="p-4 bg-[#FAF8FD] rounded-2xl border border-[#EDE9FE] hover:border-[#DDD6FE] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#200E2E] flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#7C3AED]" />
                      {msg.authorName}
                    </span>
                    <span className="text-[#7C3AED] text-[10px]">{msg.sentAt}</span>
                  </div>

                  <p className="text-xs text-[#4C1D95] leading-relaxed italic">
                    "{msg.messageText}"
                  </p>

                  {/* Sibling Reply Tag */}
                  {msg.siblingReply && (
                    <div className="p-2.5 bg-white rounded-xl border border-[#DDD6FE] space-y-1 text-[11px]">
                      <div className="flex items-center gap-1 text-[#7C3AED] font-bold text-[10px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Resposta: {msg.siblingReply.author}</span>
                      </div>
                      <p className="text-[#200E2E]">{msg.siblingReply.replyText}</p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#EDE9FE] flex items-center justify-between text-xs">
                  <button
                    onClick={() => handleToggleLike(msg.id)}
                    className="flex items-center gap-1 text-[11px] text-[#7C3AED] hover:text-[#200E2E] cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${msg.isLikedByUser ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span>{msg.likesCount} curtidas</span>
                  </button>

                  {storyIdx !== -1 && (
                    <button
                      onClick={() => openStory(storyIdx)}
                      className="text-[11px] font-bold text-[#7C3AED] hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span>Ver no Story</span>
                      <span>&rarr;</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
