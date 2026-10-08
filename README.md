# What Would Llew Do?

The personal website of Llewellyn Craddock, offering friendly one-on-one tech help to individuals. It covers AI tools, automations, 3D modelling and printing, everyday tech, backups and online safety, Excel and data, game design and learning new tools.

The site funnels visitors to a free 30 minute first chat, with sessions after that at R300 per hour.

## Running locally

The site is plain static HTML and CSS with no framework or build step, so there are no build, lint or test commands. Open `index.html` in a browser to preview.

## Hosting

The site is published with GitHub Pages, in the same way as the LocalHugDealer Studios site. GitHub Pages serves a project site from a subpath (`<user>.github.io/<repo>/`) until a custom domain is configured, so every asset path is relative.

## Structure

- `index.html`: the whole site as a single page. Page-specific styles live in its `<style>` block. Sections, in order:
  - Hero (`header.hero`): headline, the two calls to action and the profile photo.
  - `#help`: cards for each kind of help, each with a typical question in the visitor's own words.
  - `#how`: the three-step process and the pricing panel.
  - `#about`: Llewellyn's background, a row of fact chips and a link to the CV page.
  - `#testimonials`: short snippets from workshop and masterclass feedback, Skill Forge clients, Nova Nexus users and LinkedIn recommendations, with a link to the fuller set on the CV page. The `.featured` quote spans both columns. Keep the number of other quotes even so the two-column grid has no gap.
  - `#book`: the single contact point. Every booking button on the page links to this section, so the contact link only lives in one place.
- `cv.html`: Llewellyn's full CV, written for employers and collaborators. Sections, in order: header with the Download PDF button, `#summary`, `#timeline`, `#experience`, `#projects`, `#skills`, `#certifications` (including courses), `#education`, `#awards` (awards and startup communities), `#recommendations` and `#beyond`.
  - **PDF export:** the Download PDF button calls `window.print()`, and the `@media print` block in the page's `<style>` is the PDF layout. It produces about 4 A4 pages:
    - Flowing text rather than boxed cards, because boxes can't split across pages and leave gaps. Projects print as plain entries with the title on the left and the date on the right, matching Experience.
    - Grids marked `.print-rows` (skills, certifications, awards) print as one row per group: the label on the left and the items as a single run separated by gold dots. Row labels deliberately skip the headings' "keep with next" rule, which would otherwise make the whole section unbreakable.
    - Header links carry a `data-print` attribute with a short readable address, which prints after the link label. A `@page` footer prints "Llewellyn Craddock, CV, page X of Y" on every page.
    - Elements with `.screen-only` (the timeline, Beyond work, nav, buttons, the `.pdf-hint` line and the footer) are left out, and `.print-only` elements appear only in the PDF. The PDF shows LinkedIn, GitHub and itch.io, with phone and email on request.
    - To check the layout without the print dialog, headless Edge can print it: `msedge --headless --no-pdf-header-footer --print-to-pdf=cv.pdf file:///.../cv.html`.
  - Responsive breakpoints use `@media screen`, so the narrow A4 print width never triggers the mobile layout.
- `assets/css/base.css`: shared site chrome. Palette custom properties, base resets, the skip link, the focus ring, `.actions`, the `.btn` styles (`.btn-gold` for booking actions, `.btn-ghost` for secondary actions on dark backgrounds) and the layout pieces both pages use: sections, `.lead`, `.band`, `.hero`, nav, `.card`, `.chips`, quotes (each shows five gold stars via `blockquote::before`) and `.site-footer`. On phones the nav shows only the brand and links with the `.nav-keep` class. Link it after the font stylesheet on every page.
- `assets/images/`: site images.
  - `profile.jpg`: 640x640 web copy of `Square profile.png`, used in the hero of both pages.
  - `young-llew.jpg`: web copy of `Baby photo.jpg`, used in the about section.
  - `favicon.svg`: green circle with a gold question mark.
  - `Square profile.png` and `Baby photo.jpg` are the full-size originals. Pages reference the web copies, which keeps the page light.

## Brand

- **Font:** Roboto, loaded from Google Fonts in the page `<head>` (weights 400, 500, 700, 900 and italic 400).
- **Colours:** muted greens and white, with gold as the accent. All colours are defined once as custom properties in `assets/css/base.css`. Use those rather than ad hoc hex values.
  - `--green` `#2F6B55` is the primary colour. `--green-dark` and `--green-deep` are for text on light backgrounds and dark sections.
  - `--mist` `#EEF3EF` tints alternating bands. `--sage` is for borders and soft text on dark green.
  - `--gold` `#C9A23F` is reserved for calls to action and small highlights. `--gold-light` is for gold text on dark green.
  - Avoid dark text on green backgrounds. Use white, mist or gold instead.
- **Tone:** open and friendly, plain English, no jargon. Copy is written in Llewellyn's voice and never uses em dashes or en dashes.

## Link previews

The page carries Open Graph title and description tags. Previewers need absolute URLs for `og:url` and `og:image`, so those tags are only meaningful once the site has a custom domain.

## Testimonial sources

Both pages quote short snippets rather than full testimonials. The full texts live outside this repo:

- Skill Forge client testimonials, with client names and businesses: the Skill Forge Portfolio PDF (Nova Mentis, 2025).
- Survey testimonials (Skill Forge scorecards, masterclasses, audits, workshops and Nova Nexus ratings): `C:\Users\lacra\OneDrive - Llewellyn Craddock\4 Archive\Odoo Export\Survey User Input Line (survey.user_input.line) (1).xlsx`. Survey answers are anonymous unless they match a named quote in the portfolio, so unmatched snippets are credited by role (for example "Masterclass attendee").
- LinkedIn recommendations on Llewellyn's profile.
