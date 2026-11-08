# Jen — Android Developer

A phone-inspired portfolio for Jen / Jennnn06. Built with plain HTML, CSS, and JavaScript for GitHub Pages, with no build step or backend.

Open `index.html` in your browser or use your editor's static preview server.

## What's inside

- Interactive JenOS phone with Home, Work, Toolkit, and About screens.
- Light and dark themes, with the visitor's choice saved locally.
- Filterable projects and keyboard-accessible screenshot galleries.
- Sales Pro leads as the featured company project, with separate galleries for 12 Android screenshots and four web admin screenshots plus an illustrated reconstruction of the original login.
- Inventory & Member Management follows as an Android scanner and web admin system, with separate mobile and demo-data web galleries.
- Billiard Table Timer is presented as a custom client project, including a photograph of the app in use at the client's venue.
- Expenses Tracker is presented as a desktop tool built at the manager's request, with two screenshots using confirmed test data.
- The toolkit lists Android development with Java, React for web interfaces, PHP & Laravel, and MySQL.
- Responsive layouts and support for reduced motion.
- Direct contact through LinkedIn, GitHub, and Facebook.

## Editing

- **Content and links:** `index.html`
- **Colors and layout:** `css/style_index.css` (theme variables at the top)
- **Phone, filters, and galleries:** `js/switch_project.js`
- **Project screenshots:** `images/project_sales_pro/`, `images/project_web_inventory/`, `images/project_billiard_timer/`, `images/project_expenses/`, and `images/project_noli_me/`

Google Fonts is optional; system fonts are used when it is unavailable.

Sales Pro's web gallery starts with `web_login_reconstruction.png`, an AI-generated illustration of the original username/password modal based on Jen's description. It is labeled as a reconstruction rather than an original screenshot. The following four screenshots credit Jen's original functionality and note the interface was subsequently redesigned by another developer. The later login redesign is not included in the displayed galleries.

The image was created with the built-in image generation tool. Its full prompt and reference are recorded in `docs/image-prompts/sales-pro-login.md`.

The inventory showcase uses blank Android forms and the existing demo-data web screenshots. Unused images, including raw member records, QR receipts, the vote report, and live environment settings, have been deleted from the workspace. `.gitignore` retains exclusions for those raw inventory filenames to prevent accidental reintroduction.

## GitHub Pages

Publish from `main` and `/(root)` in the repository's **Settings → Pages**. Commit and push changes to update the live site; no build command is needed.

The CSS and JavaScript URLs in `index.html` include a `?v=` content version so browsers fetch the redesigned assets instead of cached copies. Change that version whenever you update the corresponding file. If the live page still shows an older design immediately after a successful deployment, hard-refresh with **Ctrl+Shift+R** or open it in a private window.
