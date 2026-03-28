# Bone & Ochre Design System

## 1. Overview & Creative North Star
**Creative North Star: The Tactile Archive**
Bone & Ochre is a high-end editorial design system that bridges the gap between organic warmth and architectural precision. It rejects the sterility of modern SaaS interfaces in favor of a "Tactile Archive" aesthetic—reminiscent of premium stationary, stone-carved typography, and boutique museum curation.

The system utilizes intentional asymmetry and tonal depth to create a focused, meditative user experience. By prioritizing whitespace (Spacing: 3) and soft neomorphic elevation, Bone & Ochre turns functional interfaces into objects of digital craft.

## 2. Colors
The palette is rooted in earth tones: Ochre (Primary), Slate (Secondary), and Terracotta (Tertiary), set against a sophisticated range of "Bone" off-whites.

- **The "No-Line" Rule:** Visual separation must never use 1px solid borders. High-contrast lines are replaced by background shifts (e.g., `surface` to `surface_container_low`) or the `soft-neomorph` shadow system.
- **Surface Hierarchy & Nesting:** Depth is achieved through the "Nested Well" technique. For instance, a game board (`surface_container_low`) sits within a `background` page, while active tiles (`tertiary_container`) sit within that well.
- **The Glass & Gradient Rule:** Utilize `backdrop-blur-md` (80% opacity) for fixed navigation elements to maintain a sense of environmental continuity.
- **Signature Textures:** Interactive elements should use subtle tonal shifts rather than harsh color changes. Use `primary_container` (#ffdaba) as a highlight glow for active states.

## 3. Typography
Bone & Ochre uses a dual-font strategy to balance character with readability.

- **Display & Headlines (Plus Jakarta Sans):** Used for brand identity and high-impact numbers. The scale emphasizes extreme weight (Extrabold) and tight tracking (`tracking-tighter`) to create a monumental feel.
- **Body & Captions (Be Vietnam Pro):** A clean, modern sans-serif that provides high legibility for instructional text.
- **Labels (Plus Jakarta Sans):** Set in 10px Uppercase with `tracking-widest` (0.1em+) to create a sophisticated, architectural labeling system.

**Typography Scale (Ground Truth):**
- **Display/Game Stats:** 2.25rem (36px) - Extrabold, Tighter tracking.
- **Headlines/Icons:** 1.5rem (24px) - Bold.
- **Body Text:** 0.875rem (14px) - Regular, 60% Opacity.
- **Micro-Labels:** 10px - Uppercase, Bold, Widest tracking.

## 4. Elevation & Depth
Depth is not a measurement of height, but a measure of "softness" and "sink."

- **The Layering Principle:** Avoid shadows on every element. Only the primary interaction container (e.g., the Game Board) and floating navbars should carry elevation.
- **Ambient Shadows (Soft Neomorph):** Use a compound shadow: `0 4px 12px rgba(27, 28, 28, 0.04)` combined with `0 2px 4px rgba(27, 28, 28, 0.02)`. This creates a "lifted paper" effect rather than a "floating plastic" effect.
- **The "Active Sink":** Buttons should not just change color; they should physically "press" into the surface using `transform: translateY(1px)` and an internal shadow: `inset 0 2px 4px rgba(0, 0, 0, 0.05)`.
- **Glassmorphism:** Bottom navigation utilizes a `backdrop-blur-md` with an 80% opacity background of the `surface` color.

## 5. Components
- **Buttons (Tiles):** Large, `rounded-xl` containers using `tertiary_container`. They must feel chunky and tactile.
- **Action Icons:** Encapsulated in `rounded-full` containers with subtle 20% opacity primary color hover states.
- **Bottom Navigation:** A "floating dock" style using `rounded-t-[2rem]` to break the sharp corners of the screen.
- **Empty States/Slots:** Use `surface_variant` at 30% opacity with a `dashed` 20% opacity border to indicate "absence" without creating visual noise.

## 6. Do's and Don'ts
### Do:
- Use `uppercase` and `tracking-widest` for all labels to maintain the editorial look.
- Use `opacity-60` for long-form body text to keep the primary focus on interaction elements.
- Apply `rounded-[2.5rem]` to large containers to emphasize the "Soft Brutalism" feel.

### Don't:
- Never use a pure black (#000000) for text; use `on_surface` (#1b1c1c).
- Avoid "standard" Material Design 36px buttons; prioritize either oversized tiles or minimalist text+icon combos.
- Do not use solid outlines for input fields or containers; stick to tonal shifts or dashed variants for empty states.