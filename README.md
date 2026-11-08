# Jen — Android Developer

A phone-inspired portfolio for Jen / Jennnn06. Built with plain HTML, CSS, and JavaScript for GitHub Pages, with no build step or backend.

Open `index.html` in your browser or use your editor's static preview server.

## What's inside

- Interactive JenOS phone with Home, Work, Toolkit, and About screens.
- Light and dark themes, with the visitor's choice saved locally.
- Filterable projects and keyboard-accessible screenshot galleries.
- Responsive layouts and support for reduced motion.
- Direct contact through LinkedIn, GitHub, and Facebook.

## Editing

- **Content and links:** `index.html`
- **Colors and layout:** `css/style_index.css` (theme variables at the top)
- **Phone, filters, and galleries:** `js/switch_project.js`
- **Project screenshots:** `images/project_web_inventory/` and `images/project_noli_me/`

The legacy `index_test.html` redirects to the main portfolio. Google Fonts is optional; system fonts are used when it is unavailable.

## GitHub Pages

Publish from `main` and `/(root)` in the repository's **Settings → Pages**. Commit and push changes to update the live site; no build command is needed.

The CSS and JavaScript URLs in `index.html` include a `?v=` content version so browsers fetch the redesigned assets instead of cached copies. Change that version whenever you update the corresponding file. If the live page still shows an older design immediately after a successful deployment, hard-refresh with **Ctrl+Shift+R** or open it in a private window.
