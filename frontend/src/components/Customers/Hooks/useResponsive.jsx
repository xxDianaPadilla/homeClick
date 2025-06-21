import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para manejo responsive optimizado
 * Proporciona información detallada sobre el viewport y orientación
 * @returns {Object} Objeto con información responsive y utilidades
 */
const useResponsive = () => {
  // Estados para información del viewport
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLandscape: false,
    isPortrait: false,
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
  });

  // Estados para detección de capacidades del dispositivo
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    hasTouch: false,
    hasHover: false,
    canHover: false,
    prefersReducedMotion: false,
    supportsBackdropFilter: false
  });

  // Breakpoints personalizados (siguiendo el patrón del proyecto)
  const breakpoints = {
    xs: 375,
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1200,
    xxl: 1440
  };

  /**
   * Calcula el tipo de dispositivo basado en el ancho de pantalla
   * @param {number} width - Ancho actual del viewport
   * @returns {Object} Información sobre el tipo de dispositivo
   */
  const getDeviceType = useCallback((width) => {
    return {
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg,
      isSmallMobile: width < breakpoints.xs,
      isMediumMobile: width >= breakpoints.xs && width < breakpoints.sm,
      isLargeMobile: width >= breakpoints.sm && width < breakpoints.md,
      isSmallTablet: width >= breakpoints.md && width < breakpoints.lg,
      isSmallDesktop: width >= breakpoints.lg && width < breakpoints.xl,
      isLargeDesktop: width >= breakpoints.xl
    };
  }, []);

  /**
   * Detecta las capacidades del dispositivo usando media queries
   */
  const detectDeviceCapabilities = useCallback(() => {
    if (typeof window === 'undefined') return;

    const capabilities = {
      hasTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      hasHover: window.matchMedia('(hover: hover)').matches,
      canHover: window.matchMedia('(any-hover: hover)').matches,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      supportsBackdropFilter: CSS.supports('backdrop-filter', 'blur(10px)') || 
                              CSS.supports('-webkit-backdrop-filter', 'blur(10px)')
    };

    setDeviceCapabilities(capabilities);
  }, []);

  /**
   * Actualiza la información del viewport
   */
  const updateViewportInfo = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;
    const isPortrait = height > width;
    const deviceType = getDeviceType(width);

    setViewport({
      width,
      height,
      isLandscape,
      isPortrait,
      devicePixelRatio: window.devicePixelRatio || 1,
      ...deviceType
    });
  }, [getDeviceType]);

  /**
   * Handler de resize con debounce para mejor rendimiento
   */
  const handleResize = useCallback(() => {
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateViewportInfo();
      }, 150); // Debounce de 150ms
    };
  }, [updateViewportInfo]);

  /**
   * Verifica si el ancho actual coincide con un breakpoint específico
   * @param {string} breakpoint - Nombre del breakpoint (xs, sm, md, lg, xl, xxl)
   * @returns {boolean} True si coincide con el breakpoint
   */
  const isBreakpoint = useCallback((breakpoint) => {
    const width = viewport.width;
    switch (breakpoint) {
      case 'xs':
        return width < breakpoints.sm;
      case 'sm':
        return width >= breakpoints.sm && width < breakpoints.md;
      case 'md':
        return width >= breakpoints.md && width < breakpoints.lg;
      case 'lg':
        return width >= breakpoints.lg && width < breakpoints.xl;
      case 'xl':
        return width >= breakpoints.xl && width < breakpoints.xxl;
      case 'xxl':
        return width >= breakpoints.xxl;
      default:
        return false;
    }
  }, [viewport.width]);

  /**
   * Verifica si el ancho actual es mayor o igual a un breakpoint
   * @param {string} breakpoint - Nombre del breakpoint
   * @returns {boolean} True si es mayor o igual al breakpoint
   */
  const isBreakpointUp = useCallback((breakpoint) => {
    return viewport.width >= breakpoints[breakpoint];
  }, [viewport.width]);

  /**
   * Verifica si el ancho actual es menor a un breakpoint
   * @param {string} breakpoint - Nombre del breakpoint
   * @returns {boolean} True si es menor al breakpoint
   */
  const isBreakpointDown = useCallback((breakpoint) => {
    return viewport.width < breakpoints[breakpoint];
  }, [viewport.width]);

  /**
   * Obtiene el nombre del breakpoint actual
   * @returns {string} Nombre del breakpoint actual
   */
  const getCurrentBreakpoint = useCallback(() => {
    const width = viewport.width;
    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    if (width < breakpoints.xxl) return 'xl';
    return 'xxl';
  }, [viewport.width]);

  /**
   * Calcula valores responsivos basados en el viewport actual
   * @param {Object} values - Objeto con valores para diferentes breakpoints
   * @returns {*} Valor correspondiente al breakpoint actual
   */
  const getResponsiveValue = useCallback((values) => {
    const currentBreakpoint = getCurrentBreakpoint();
    const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
    
    // Busca el valor más específico disponible
    for (let i = breakpointOrder.indexOf(currentBreakpoint); i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (values[bp] !== undefined) {
        return values[bp];
      }
    }
    
    // Fallback al primer valor disponible
    return values[breakpointOrder.find(bp => values[bp] !== undefined)] || values.default;
  }, [getCurrentBreakpoint]);

  /**
   * Genera clases CSS dinámicas basadas en el estado responsive
   * @param {Object} classMap - Mapa de clases CSS por breakpoint
   * @returns {string} String con clases CSS aplicables
   */
  const getResponsiveClasses = useCallback((classMap) => {
    const classes = [];
    const currentBreakpoint = getCurrentBreakpoint();
    
    // Agrega clases generales
    classes.push(
      viewport.isMobile ? 'is-mobile' : '',
      viewport.isTablet ? 'is-tablet' : '',
      viewport.isDesktop ? 'is-desktop' : '',
      viewport.isLandscape ? 'is-landscape' : 'is-portrait',
      deviceCapabilities.hasTouch ? 'has-touch' : 'no-touch',
      deviceCapabilities.hasHover ? 'has-hover' : 'no-hover',
      deviceCapabilities.prefersReducedMotion ? 'reduced-motion' : '',
      `breakpoint-${currentBreakpoint}`
    );
    
    // Agrega clases específicas del mapa
    if (classMap) {
      Object.entries(classMap).forEach(([breakpoint, className]) => {
        if (isBreakpoint(breakpoint) && className) {
          classes.push(className);
        }
      });
    }
    
    return classes.filter(Boolean).join(' ');
  }, [getCurrentBreakpoint, viewport, deviceCapabilities, isBreakpoint]);

  /**
   * Calcula valores de espaciado responsivos
   * @param {number} baseValue - Valor base en px
   * @param {number} minValue - Valor mínimo en px
   * @param {number} maxValue - Valor máximo en px
   * @returns {string} Valor CSS con clamp()
   */
  const getResponsiveSpacing = useCallback((baseValue, minValue = baseValue * 0.5, maxValue = baseValue * 1.5) => {
    const vwValue = (baseValue / 1200) * 100; // Asume viewport base de 1200px
    return `clamp(${minValue}px, ${vwValue}vw, ${maxValue}px)`;
  }, []);

  /**
   * Detecta si es un dispositivo con pantalla de alta densidad
   * @returns {boolean} True si es alta densidad
   */
  const isHighDensityDisplay = useCallback(() => {
    return viewport.devicePixelRatio > 1.5;
  }, [viewport.devicePixelRatio]);

  /**
   * Detecta si es probable que sea un dispositivo iOS
   * @returns {boolean} True si es iOS
   */
  const isIOS = useCallback(() => {
    if (typeof navigator === 'undefined') return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }, []);

  /**
   * Detecta si es probable que sea un dispositivo Android
   * @returns {boolean} True si es Android
   */
  const isAndroid = useCallback(() => {
    if (typeof navigator === 'undefined') return false;
    return /Android/.test(navigator.userAgent);
  }, []);

  // Effect para configurar listeners y detectar capacidades
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const debouncedResize = handleResize();
    
    // Inicialización
    updateViewportInfo();
    detectDeviceCapabilities();
    
    // Event listeners
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', updateViewportInfo);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', updateViewportInfo);
    };
  }, [handleResize, updateViewportInfo, detectDeviceCapabilities]);

  // Retorna todas las utilidades y estados
  return {
    // Información del viewport
    viewport,
    
    // Capacidades del dispositivo
    deviceCapabilities,
    
    // Breakpoints
    breakpoints,
    
    // Funciones de utilidad
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
    getCurrentBreakpoint,
    getResponsiveValue,
    getResponsiveClasses,
    getResponsiveSpacing,
    
    // Detección de dispositivos
    isHighDensityDisplay,
    isIOS,
    isAndroid,
    
    // Aliases útiles para compatibilidad
    isMobile: viewport.isMobile,
    isTablet: viewport.isTablet,
    isDesktop: viewport.isDesktop,
    isLandscape: viewport.isLandscape,
    isPortrait: viewport.isPortrait,
    hasTouch: deviceCapabilities.hasTouch,
    hasHover: deviceCapabilities.hasHover,
    prefersReducedMotion: deviceCapabilities.prefersReducedMotion
  };
};

export default useResponsive;
