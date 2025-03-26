# AceSpectra PokerBo - Design Language

This document outlines the design language for the AceSpectra PokerBo React application, ensuring a consistent style and vibe throughout the user interface.

## Color Palette

We will be using daisyUI's [theme system](https://daisyui.com/docs/themes/) for colors, leveraging pre-defined color names for consistency and ease of customization.

* **Primary Color:** `primary` -  *(To be decided -  consider a classic poker table green or a more modern vibrant blue)*
* **Secondary Color:** `secondary` - *(To be decided -  a neutral grey or a contrasting color to the primary)*
* **Accent Color:** `accent` - *(To be decided -  a bright color for highlights and interactive elements, like yellow or orange)*
* **Base Colors:** `base-100`, `base-200`, `base-300` -  Used for backgrounds and surfaces. We'll likely use shades of grey or off-white for a clean look.
* **Neutral Colors:** `neutral`, `neutral-content` - For text and elements that need to blend in.
* **Info Color:** `info` - For informational messages (e.g., blue).
* **Success Color:** `success` - For success messages and positive feedback (e.g., green).
* **Warning Color:** `warning` - For warnings and alerts (e.g., yellow).
* **Error Color:** `error` - For error messages and critical alerts (e.g., red).

*Please refer to the daisyUI theme documentation for the specific shades associated with each color name.*

## Typography

* **Font Family:** System default sans-serif fonts for readability and performance.  *(If a custom font is desired, we can add it later and specify it here)*
* **Headings:**  Use Tailwind's `font-bold` and `text-2xl`, `text-xl`, etc., classes for headings.
* **Body Text:**  Use default Tailwind text styles for body text, ensuring good readability and contrast.

## Component Styles

We will primarily use daisyUI components and style them with Tailwind CSS utility classes for customization.

* **Buttons:**
  * Use daisyUI `btn` class as the base.
  * Apply `btn-primary`, `btn-secondary`, `btn-accent`, `btn-info`, `btn-success`, `btn-warning`, `btn-error` for different button styles based on context.
  * Use Tailwind classes for sizing (`btn-sm`, `btn-md`, `btn-lg`), shape (`rounded-box`, `btn-circle`), and other customizations.
* **Badges:**
  * Use daisyUI `badge` class for badges.
  * Apply `badge-primary`, `badge-secondary`, `badge-accent`, `badge-warning`, `badge-error` for different badge styles.
* **Cards:**
  * Use daisyUI `card` component or basic `div` elements styled to look like cards.
  * Apply `card-body`, `card-title`, `card-actions` for card structure.
  * Use Tailwind classes for spacing, padding, shadows, and rounded corners.
* **Tables:**
  * Use basic HTML `table` element and style with Tailwind and daisyUI table classes if available (or custom Tailwind styles).

## Vibe and Theme

* **Overall Vibe:**  Clean, modern, and slightly playful, reflecting the fun and engaging nature of poker.  Not overly serious or overly cartoonish.
* **Visual Style:**  Aim for a visually appealing and user-friendly interface.  Ensure good contrast and readability.  Use card images and potentially chip images from the existing assets to enhance the poker theme.

This design language document will be a living document, and we can update it as the project evolves and we refine the design.
