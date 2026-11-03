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
      timelineLine: '#FFD700',
      timelineLineLight: 'rgba(255, 215, 0, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'emerald',
    name: 'Sage Oasis',
    subtitle: 'Olive Sage & Sandstone Gold',
    category: 'Royal Botanical & Sage Silk',
    emoji: '🌿',
    ganeshaIcon: '/ganesha-sage.png',
    vibe: 'Fresh, Organic, Regal Palace Garden',
    colors: {
      darkDeep: '#161F10',
      darkRich: '#2A3620',
      darkAccent: '#546B41',
      darkSurface: '#1F2916',
      lightBg: '#FFF8EC',
      lightSubtle: '#F5EFE0',
      lightCard: '#FFFFFF',
      lightAccent: '#99AD7A',
      border: '#DCCCAC',
      borderLight: 'rgba(153, 173, 122, 0.45)',
      glow: '#99AD7A',
      accentPop: '#546B41',
      gold: '#DCCCAC',
      goldSecondary: '#C5B288',
      textTitle: '#2A3620',
      textBodyDark: '#36452B',
      textLight: '#FFF8EC',
      textLightMuted: '#DCCCAC',
      swatchDark: '#546B41',
      swatchLight: '#99AD7A',
      glowShadow: 'rgba(153, 173, 122, 0.45)',
      timelineLine: '#DCCCAC',
      timelineLineLight: 'rgba(220, 204, 172, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    subtitle: 'Cobalt Azure & Marigold Gold',
    category: 'Royal Cobalt & Sun Gold Silk',
    emoji: '💎',
    ganeshaIcon: '/ganesha-sapphire.png',
    vibe: 'Vibrant Cobalt & Festive Sunlight Gold',
    colors: {
      darkDeep: '#011524',
      darkRich: '#002B45',
      darkAccent: '#006199',
      darkSurface: '#011E30',
      lightBg: '#FCFDF5',
      lightSubtle: '#F4EB6C',
      lightCard: '#FFFFFF',
      lightAccent: '#8ACFF8',
      border: '#006199',
      borderLight: 'rgba(138, 207, 248, 0.45)',
      glow: '#FFD444',
      accentPop: '#006199',
      gold: '#FFD444',
      goldSecondary: '#E0B020',
      textTitle: '#002B45',
      textBodyDark: '#003C60',
      textLight: '#FFD444',
      textLightMuted: '#8ACFF8',
      swatchDark: '#006199',
      swatchLight: '#FFD444',
      glowShadow: 'rgba(0, 97, 153, 0.45)',
      timelineLine: '#FFEFC4',
      timelineLineLight: 'rgba(255, 239, 196, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'amethyst',
    name: 'Amethyst Twilight',
    subtitle: 'Royal Heather & Sunlight Chiffon',
    category: 'Royal Velvet & Mystic Silk',
    emoji: '🔮',
    ganeshaIcon: '/ganesha-amethyst.png',
    vibe: 'Poetic, Aristocratic, Dreamy Heather & Orchid',
    colors: {
      darkDeep: '#12081C',
      darkRich: '#261536',
      darkAccent: '#7F669D',
      darkSurface: '#1A0C29',
      lightBg: '#FDFCF7',
      lightSubtle: '#FBFACD',
      lightCard: '#FFFFFF',
      lightAccent: '#BA94D1',
      border: '#7F669D',
      borderLight: 'rgba(186, 148, 209, 0.45)',
      glow: '#BA94D1',
      accentPop: '#7F669D',
      gold: '#FBFACD',
      goldSecondary: '#D4C778',
      textTitle: '#261536',
      textBodyDark: '#3D2456',
      textLight: '#FBFACD',
      textLightMuted: '#DEBACE',
      swatchDark: '#7F669D',
      swatchLight: '#DEBACE',
      glowShadow: 'rgba(127, 102, 157, 0.45)',
      timelineLine: '#FBFACD',
      timelineLineLight: 'rgba(251, 250, 205, 0.45)',
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
      timelineLine: '#FBBF24',
      timelineLineLight: 'rgba(251, 191, 36, 0.45)',
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
      timelineLine: '#D4AF37',
      timelineLineLight: 'rgba(212, 175, 55, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'blush',
    name: 'Blush Champagne',
    subtitle: 'Pastel Rose & Champagne Silk',
    category: 'Royal Pastel & Rose Quartz',
    emoji: '🌸',
    ganeshaIcon: '/ganesha-blush.png',
    vibe: 'Soft, Romantic, Sunlit Pastel Silk',
    colors: {
      darkDeep: '#1D0B12',
      darkRich: '#3B1724',
      darkAccent: '#542033',
      darkSurface: '#280E18',
      lightBg: '#FFF4DE',
      lightSubtle: '#FFDDDD',
      lightCard: '#FFFFFF',
      lightAccent: '#FFCED8',
      border: '#FFCED8',
      borderLight: 'rgba(255, 206, 216, 0.5)',
      glow: '#FFCED8',
      accentPop: '#E8637F',
      gold: '#FFE8C4',
      goldSecondary: '#D8B37C',
      textTitle: '#542033',
      textBodyDark: '#3B1724',
      textLight: '#FFF4DE',
      textLightMuted: '#FFE8C4',
      swatchDark: '#542033',
      swatchLight: '#FFCED8',
      glowShadow: 'rgba(255, 206, 216, 0.5)',
      timelineLine: '#FFE8C4',
      timelineLineLight: 'rgba(255, 232, 196, 0.45)',
      ganeshaFilter: 'none'
    }
  },
  {
    id: 'coral-bloom',
    name: 'Jaipur Bloom',
    subtitle: 'Coral Rose & Marigold Mint',
    category: 'Royal Carnival & Festive Silk',
    emoji: '🌺',
    ganeshaIcon: '/ganesha-coral.png',
    vibe: 'Vibrant, Festive, Palace Carnival',
    colors: {
      darkDeep: '#1A0707',
      darkRich: '#341212',
      darkAccent: '#521C1C',
      darkSurface: '#240C0C',
      lightBg: '#FFFDF0',
      lightSubtle: '#FFF6A9',
      lightCard: '#FFFFFF',
      lightAccent: '#FFCA88',
      border: '#DE7272',
      borderLight: 'rgba(180, 228, 214, 0.55)',
      glow: '#DE7272',
      accentPop: '#DE7272',
      gold: '#FFCA88',
      goldSecondary: '#D89A4E',
      textTitle: '#4A1515',
      textBodyDark: '#341212',
      textLight: '#FFF6A9',
      textLightMuted: '#B4E4D6',
      swatchDark: '#DE7272',
      swatchLight: '#B4E4D6',
      glowShadow: 'rgba(222, 114, 114, 0.45)',
      timelineLine: '#FFCA88',
      timelineLineLight: 'rgba(255, 202, 136, 0.45)',
      ganeshaFilter: 'none'
    }
  }
];

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    if (typeof window !== 'undefined') {
      const purpleApplied = localStorage.getItem('wedding_purple_theme_applied');
      if (purpleApplied !== 'v1') {
        localStorage.setItem('wedding_purple_theme_applied', 'v1');
        localStorage.setItem('wedding_luxury_theme_id', 'amethyst');
        return 'amethyst';
      }
      const saved = localStorage.getItem('wedding_luxury_theme_id');
      if (saved && THEMES.some(t => t.id === saved)) {
        return saved;
      }
    }
    return 'amethyst';
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
    root.style.setProperty('--theme-timeline-line', colors.timelineLine || colors.border);
    root.style.setProperty('--theme-timeline-line-light', colors.timelineLineLight || colors.borderLight);
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
