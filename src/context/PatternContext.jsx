import React, { createContext, useContext, useState, useEffect } from 'react';

export const PATTERNS = [
  {
    id: 'none',
    name: 'Plain',
    subtitle: 'Pure Dark Luxury Surface',
    icon: '⊘',
    svgUrl: null,
    scaleMobile: '0px',
    scaleDesktop: '0px',
    opacity: 0
  },
  {
    id: 'pattern-1',
    name: 'Girih Lattice',
    subtitle: 'Persian 6-Pointed Polygon Lattice',
    icon: '✦',
    svgUrl: '/patterns/pattern-1.svg',
    scaleMobile: '190px 300.6px',
    scaleDesktop: '237px 375px',
    opacity: 0.20
  },
  {
    id: 'pattern-2',
    name: 'Moroccan Jali',
    subtitle: 'Arched Trellis & 8-Star Cartouche',
    icon: '❖',
    svgUrl: '/patterns/pattern-2.svg',
    scaleMobile: '160px 160px',
    scaleDesktop: '220px 220px',
    opacity: 0.22
  },
  {
    id: 'pattern-3',
    name: 'Alhambra Stars',
    subtitle: '12-Pointed Girih Tessellation',
    icon: '✵',
    svgUrl: '/patterns/pattern-3.svg',
    scaleMobile: '200px 200px',
    scaleDesktop: '280px 280px',
    opacity: 0.20
  },
  {
    id: 'pattern-4',
    name: 'Royal Jali',
    subtitle: 'Mughal Star & Hexagram Screen',
    icon: '۞',
    svgUrl: '/patterns/pattern-4.svg',
    scaleMobile: '220px 126.9px',
    scaleDesktop: '280px 161.5px',
    opacity: 0.24
  },
  {
    id: 'pattern-5',
    name: 'Floral Mosaic',
    subtitle: 'Mughal Rosette & Floret Tile',
    icon: '✿',
    svgUrl: '/patterns/pattern-5.svg',
    scaleMobile: '207px 207px',
    scaleDesktop: '276px 276px',
    opacity: 0.32
  }
];

const PatternContext = createContext();

export function PatternProvider({ children }) {
  const [patternId, setPatternId] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedding_luxury_pattern_id');
      if (saved && PATTERNS.some(p => p.id === saved)) {
        return saved;
      }
    }
    return 'none'; // Default to clean plain background
  });

  const [patternOpacity, setPatternOpacity] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wedding_luxury_pattern_opacity');
      if (saved !== null) {
        const val = parseFloat(saved);
        if (!isNaN(val) && val >= 0 && val <= 1) {
          return val;
        }
      }
    }
    return 0.30; // Default to 30% level
  });

  const currentPattern = PATTERNS.find(p => p.id === patternId) || PATTERNS[0];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('wedding_luxury_pattern_id', patternId);
    document.documentElement.setAttribute('data-pattern', patternId);
  }, [patternId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('wedding_luxury_pattern_opacity', patternOpacity.toString());
  }, [patternOpacity]);

  return (
    <PatternContext.Provider value={{
      patternId,
      pattern: currentPattern,
      setPattern: setPatternId,
      patterns: PATTERNS,
      patternOpacity,
      setPatternOpacity
    }}>
      {children}
    </PatternContext.Provider>
  );
}

export function usePattern() {
  const context = useContext(PatternContext);
  if (!context) {
    throw new Error('usePattern must be used within a PatternProvider');
  }
  return context;
}
