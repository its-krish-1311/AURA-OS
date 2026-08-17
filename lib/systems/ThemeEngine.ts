/**
 * ThemeEngine.ts
 * 
 * Core Design System Engine.
 * Analyzes and provides the global Vibe Coding design standards (purple/cyan gradients,
 * krish-glass properties, and framer-motion physics) to ensure 100% uniformity
 * across any dynamically generated module.
 */

export const ThemeEngine = {
  getCoreGradients: () => ({
    primary: "bg-gradient-to-r from-[#7E22CE] to-[#A855F7]",
    secondary: "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]",
    ambient: "bg-gradient-to-br from-[rgba(168,85,247,0.05)] to-[rgba(0,0,0,0.4)]",
  }),
  
  getGlassmorphism: () => ({
    base: "krish-glass backdrop-blur-3xl bg-[rgba(10,10,10,0.6)] border border-[rgba(255,255,255,0.05)]",
    premium: "krish-glass border border-[rgba(168,85,247,0.3)] bg-[rgba(10,10,10,0.8)] backdrop-blur-3xl shadow-[0_4px_30px_rgba(168,85,247,0.1)]",
  }),
  
  getPhysics: () => ({
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 },
  }),

  // Analyzes a component context to return appropriate theme tokens
  analyzeContextTheme: (contextType: 'dashboard' | 'modal' | 'widget') => {
    switch (contextType) {
      case 'modal':
        return ThemeEngine.getGlassmorphism().premium;
      case 'widget':
        return ThemeEngine.getGlassmorphism().base;
      default:
        return ThemeEngine.getGlassmorphism().base;
    }
  }
};
