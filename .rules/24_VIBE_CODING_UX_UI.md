# 24 VIBE CODING UX/UI & AVOIDING AI SLOP

## 1. Core Philosophy
- **Reject "AI Slop"**: Never produce generic, flat, or unstructured UIs. Every component must look intentional, premium, and human-designed.
- **The "Vibe"**: Aura OS is a futuristic, glassmorphism-heavy, dark-mode ecosystem. It should invoke a sense of advanced technology, elegance, and high performance.

## 2. The 4 Moves Framework
Every new feature or page must pass through the 4 Moves:
1. **Context**: Understand the exact goal of the user for this specific component. What is the primary action?
2. **Structure**: Define the hierarchy (e.g., Hero -> Main Content -> Secondary info -> CTA). Use proper grid and flexbox layouts.
3. **Style**: Apply Aura OS design tokens. 
   - Use generous whitespace and padding (e.g., `p-6` or `p-8` for panels).
   - Use specific, curated colors (e.g., `#A855F7`, `#10B981`) instead of basic red/blue.
   - Employ `krish-glass` heavily with subtle border highlights (`rgba(255,255,255,0.05)`).
4. **Interaction**: No static elements.
   - Every button/card must have hover states (scale up slightly, change border/background opacity).
   - Use Framer Motion for smooth entrances (`initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}}`).

## 3. Typography & Hierarchy
- Use modern sans-serif fonts (e.g., Inter, Outfit).
- Differentiate heavily between titles, subtitles, and body text using weight, color, and tracking.
- Example: Section headers should use `text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500`.

## 4. Polished Elements
- **CTAs**: Must stand out with glow effects (`drop-shadow-[0_0_8px_rgba(...)]`) or gradients.
- **Icons**: Use Lucide-react icons with consistent sizing and subtle colors.
- **Empty States**: Never leave a blank screen. Always have a beautiful empty state illustration or formatted text.

Follow these rules rigorously for all UI/UX implementations in Aura OS.
