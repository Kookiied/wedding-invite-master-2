import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  {
    id: 'rani',
    name: 'Imperial Rani',
    subtitle: 'Royal Magenta & Blush Silk',
    category: 'Regal Jewel & Rose Quartz',
    emoji: '👑',
    ganeshaIcon: '/ganesha-rani.png',
    vibe: 'Opulent, Romantic, Royal Palace',
    colors: {
      darkDeep: '#1A030D',
      darkRich: '#3D061A',
      darkAccent: '#5E0B2B',
      darkSurface: '#2A0412',
      lightBg: '#FFF0F5',
      lightSubtle: '#FFEBEF',
      lightCard: '#FFFFFF',
      lightAccent: '#F8C8DC',
      border: '#E6A4B4',
      borderLight: 'rgba(230, 164, 180, 0.4)',
      glow: '#F596AA',
      accentPop: '#E65C8A',
      gold: '#FFD700',
      goldSecondary: '#D4AF37',
      textTitle: '#5E0B2B',
      textBodyDark: '#3D061A',
      textLight: '#F8C8DC',
      textLightMuted: '#FFF0F5',
      swatchDark: '#3D061A',
      swatchLight: '#F8C8DC',
      glowShadow: 'rgba(230, 164, 180, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald Oasis',
    subtitle: 'Malachite Velvet & Frosted Sage',
    category: 'Royal Botanical & Jade Silk',
    emoji: '🌿',
    ganeshaIcon: '/ganesha-emerald.png',
    vibe: 'Fresh, Luxurious, Lake Palace Garden',
    colors: {
      darkDeep: '#02160F',
      darkRich: '#083526',
      darkAccent: '#0F4E3A',
      darkSurface: '#05271C',
      lightBg: '#F0F8F4',
      lightSubtle: '#E2F3EB',
      lightCard: '#FFFFFF',
      lightAccent: '#C2E5D4',
      border: '#82C4A4',
      borderLight: 'rgba(130, 196, 164, 0.4)',
      glow: '#4EC796',
      accentPop: '#17835E',
      gold: '#E8C550',
      goldSecondary: '#CBA234',
      textTitle: '#0B4232',
      textBodyDark: '#083526',
      textLight: '#C2E5D4',
      textLightMuted: '#F0F8F4',
      swatchDark: '#083526',
      swatchLight: '#C2E5D4',
      glowShadow: 'rgba(78, 199, 150, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    subtitle: 'Royal Lapis & Celestial Ice',
    category: 'Starlight Nocturne & Frost Silk',
    emoji: '🌌',
    ganeshaIcon: '/ganesha-sapphire.png',
    vibe: 'Ethereal, Majestic, Arabian Nights',
    colors: {
      darkDeep: '#040E20',
      darkRich: '#0B2044',
      darkAccent: '#153267',
      darkSurface: '#081938',
      lightBg: '#F1F6FE',
      lightSubtle: '#E3ECFC',
      lightCard: '#FFFFFF',
      lightAccent: '#CFE0FD',
      border: '#8FB2F4',
      borderLight: 'rgba(143, 178, 244, 0.4)',
      glow: '#5C90FA',
      accentPop: '#2A66DE',
      gold: '#F5D06A',
      goldSecondary: '#DAAF3B',
      textTitle: '#0E2B60',
      textBodyDark: '#0B2044',
      textLight: '#CFE0FD',
      textLightMuted: '#F1F6FE',
      swatchDark: '#0B2044',
      swatchLight: '#CFE0FD',
      glowShadow: 'rgba(92, 144, 250, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'amethyst',
    name: 'Amethyst Twilight',
    subtitle: 'Imperial Violet & Whipped Orchid',
    category: 'Haute Runway & Mystic Lavender',
    emoji: '🔮',
    ganeshaIcon: '/ganesha-amethyst.png',
    vibe: 'Poetic, Aristocratic, Dreamy Twilight',
    colors: {
      darkDeep: '#140622',
      darkRich: '#2A0E42',
      darkAccent: '#46176D',
      darkSurface: '#200B34',
      lightBg: '#FAF5FF',
      lightSubtle: '#F3E8FF',
      lightCard: '#FFFFFF',
      lightAccent: '#E4CCFB',
      border: '#BE95EF',
      borderLight: 'rgba(190, 149, 239, 0.4)',
      glow: '#AA5BF7',
      accentPop: '#8E32E2',
      gold: '#FFD700',
      goldSecondary: '#D4AF37',
      textTitle: '#3B135B',
      textBodyDark: '#2A0E42',
      textLight: '#E4CCFB',
      textLightMuted: '#FAF5FF',
      swatchDark: '#2A0E42',
      swatchLight: '#E4CCFB',
      glowShadow: 'rgba(170, 91, 247, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'terracotta',
    name: 'Sunset Terracotta',
    subtitle: 'Spiced Mahogany & Peach Bellini',
    category: 'Warm Tuscan & Sunlit Apricot',
    emoji: '🌅',
    ganeshaIcon: '/ganesha-terracotta.png',
    vibe: 'Warm, Passionate, Riviera Golden Hour',
    colors: {
      darkDeep: '#1E0904',
      darkRich: '#3E140A',
      darkAccent: '#642213',
      darkSurface: '#2F0F07',
      lightBg: '#FFF7F2',
      lightSubtle: '#FDEEE4',
      lightCard: '#FFFFFF',
      lightAccent: '#FCD7C2',
      border: '#E6A27E',
      borderLight: 'rgba(230, 162, 126, 0.4)',
      glow: '#FB923C',
      accentPop: '#C5430D',
      gold: '#FBBF24',
      goldSecondary: '#D97706',
      textTitle: '#551C10',
      textBodyDark: '#3E140A',
      textLight: '#FCD7C2',
      textLightMuted: '#FFF7F2',
      swatchDark: '#3E140A',
      swatchLight: '#FCD7C2',
      glowShadow: 'rgba(251, 146, 60, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'champagne',
    name: 'Champagne Pearl',
    subtitle: 'Truffle Noir & 24K Liquid Gold',
    category: 'Monochrome Couture & Bronzed Foil',
    emoji: '⚜️',
    ganeshaIcon: '/ganesha-champagne.png',
    vibe: 'Timeless, High Fashion, Pure Luxury',
    colors: {
      darkDeep: '#0F0D0B',
      darkRich: '#241E19',
      darkAccent: '#3E342B',
      darkSurface: '#1B1713',
      lightBg: '#FAF7F2',
      lightSubtle: '#F1E9DF',
      lightCard: '#FFFFFF',
      lightAccent: '#E6D9C6',
      border: '#CDB797',
      borderLight: 'rgba(205, 183, 151, 0.4)',
      glow: '#E7C378',
      accentPop: '#9D7D4B',
      gold: '#FFD700',
      goldSecondary: '#D4AF37',
      textTitle: '#342921',
      textBodyDark: '#241E19',
      textLight: '#E6D9C6',
      textLightMuted: '#FAF7F2',
      swatchDark: '#241E19',
      swatchLight: '#E6D9C6',
      glowShadow: 'rgba(231, 195, 120, 0.45)',
      ganeshaFilter: 'none'
    }
  }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedding_luxury_theme_id');
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    }
    return 'rani';
  });

  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('wedding_luxury_theme_id', themeId);
    document.documentElement.setAttribute('data-theme', themeId);

    const root = document.documentElement;
    const { colors } = currentTheme;

    root.style.setProperty('--theme-dark-deep', colors.darkDeep);
    root.style.setProperty('--theme-dark-rich', colors.darkRich);
    root.style.setProperty('--theme-dark-accent', colors.darkAccent);
    root.style.setProperty('--theme-dark-surface', colors.darkSurface);
    root.style.setProperty('--theme-light-bg', colors.lightBg);
    root.style.setProperty('--theme-light-subtle', colors.lightSubtle);
    root.style.setProperty('--theme-light-card', colors.lightCard);
    root.style.setProperty('--theme-light-accent', colors.lightAccent);
    root.style.setProperty('--theme-border', colors.border);
    root.style.setProperty('--theme-border-light', colors.borderLight);
    root.style.setProperty('--theme-glow', colors.glow);
    root.style.setProperty('--theme-accent-pop', colors.accentPop);
    root.style.setProperty('--theme-gold', colors.gold);
    root.style.setProperty('--theme-gold-secondary', colors.goldSecondary);
    root.style.setProperty('--theme-text-title', colors.textTitle);
    root.style.setProperty('--theme-text-body-dark', colors.textBodyDark);
    root.style.setProperty('--theme-text-light', colors.textLight);
    root.style.setProperty('--theme-text-light-muted', colors.textLightMuted);
    root.style.setProperty('--theme-glow-shadow', colors.glowShadow);
  }, [themeId, currentTheme]);

  const changeTheme = (newId) => {
    if (THEMES.some(t => t.id === newId)) {
      setThemeId(newId);
    }
  };

  return (
    <ThemeContext.Provider value={{
      theme: currentTheme,
      themeId,
      setTheme: changeTheme,
      themes: THEMES
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
