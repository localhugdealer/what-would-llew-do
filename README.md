# What Would Llew Do?

The personal website of Llewellyn Craddock, offering friendly one-on-one tech help to individuals. It covers everyday tech, Excel and data, learning new tools, AI tools, automations, 3D modelling and printing, backups and online safety, and game design.

The site funnels visitors to a WhatsApp chat with Llewellyn. It does not mention prices.

## Running locally

The site is plain static HTML and CSS with no framework or build step, so there are no build, lint or test commands. Open `index.html` in a browser to preview.

## Hosting

The site is published with GitHub Pages from the root of the `main` branch of [localhugdealer/what-would-llew-do](https://github.com/localhugdealer/what-would-llew-do), in the same way as the LocalHugDealer Studios site. Every asset path is relative, so the site also works from the project subpath https://localhugdealer.github.io/what-would-llew-do/, which redirects to the custom domain.

The site's domain is `whatwouldllewdo.com`, registered with GoDaddy. The `CNAME` file at the repo root tells GitHub Pages to serve the site on that domain. The GoDaddy DNS records that point the domain at GitHub are:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `localhugdealer.github.io` |

GitHub redirects `www.whatwouldllewdo.com` to the bare domain. "Enforce HTTPS" in the repo's Pages settings becomes available once GitHub has issued the certificate for the domain.

## Structure

- `index.html`: the whole site as a single page. Page-specific styles live in its `<style>` block. Sections, in order:
  - Hero (`header.hero`): headline, the two calls to action (the main one opens WhatsApp) and the profile photo.
  - `#help`: cards for each kind of help, each with a typical question in the visitor's own words.
  - `#how`: the three-step process, starting with a WhatsApp message.
  - `#about`: Llewellyn's background, a row of fact chips and a link to the CV page.
  - `#testimonials`: short snippets from workshop and masterclass feedback, Skill Forge clients, Nova Nexus users and LinkedIn recommendations, with a link to the fuller set on the CV page. The `.featured` quote spans both columns. Keep the number of other quotes even so the two-column grid has no gap.
  - `#book`: the closing call to action, a WhatsApp button with the number shown as text below it for visitors on a computer, then a share row inviting visitors to pass the page on.
- **WhatsApp links:** every call to action opens a chat with the WhatsApp Business number +27 64 521 0967 through `https://wa.me/27645210967`, with an opening message already typed in the `text` parameter. The link appears in the hero button, the `#book` button and the "WhatsApp me" nav link on both pages, all with the same address and message, so a change to one goes in all of them. The buttons use `.btn-whatsapp`, which adds an inline WhatsApp icon (from Simple Icons). The number also appears as `telephone` in the home page JSON-LD.
- `cv.html`: Llewellyn's full CV, written for employers and collaborators. Sections, in order: header with the Download PDF button, `#summary`, `#timeline`, `#experience`, `#projects`, `#skills`, `#certifications` (including courses), `#education`, `#awards` (awards and startup communities), `#recommendations` and `#beyond`.
  - **PDF export:** the Download PDF button calls `window.print()`, and the `@media print` block in the page's `<style>` is the PDF layout. It produces about 4 A4 pages:
    - Flowing text rather than boxed cards, because boxes can't split across pages and leave gaps. Projects print as plain entries with the title on the left and the date on the right, matching Experience.
    - Grids marked `.print-rows` (skills, certifications, awards) print as one row per group: the label on the left and the items as a single run separated by gold dots. Row labels deliberately skip the headings' "keep with next" rule, which would otherwise make the whole section unbreakable.
    - Header links carry a `data-print` attribute with a short readable address, which prints after the link label. A `@page` footer prints "Llewellyn Craddock, CV, page X of Y" on every page.
    - Elements with `.screen-only` (the timeline, Beyond work, nav, buttons, the `.pdf-hint` line and the footer) are left out, and `.print-only` elements appear only in the PDF. The PDF shows LinkedIn, GitHub and itch.io, with phone and email on request.
    - To check the layout without the print dialog, headless Edge can print it: `msedge --headless --no-pdf-header-footer --print-to-pdf=cv.pdf file:///.../cv.html`.
  - Responsive breakpoints use `@media screen`, so the narrow A4 print width never triggers the mobile layout.
- `assets/css/base.css`: shared site chrome. Palette custom properties, base resets, the skip link, the focus ring, `.actions`, the `.btn` styles (`.btn-gold` for booking actions, `.btn-ghost` for secondary actions on dark backgrounds) and the layout pieces both pages use: sections, `.lead`, `.band`, `.hero`, nav, `.card`, `.chips`, quotes (each shows five gold stars via `blockquote::before`), `.site-footer`, `.socials` and the `.share` row. On phones the nav shows only the brand and links with the `.nav-keep` class. Link it after the font stylesheet on every page.
- **Footer socials:** both pages open their footer with a `.socials` row of icon links to LinkedIn, YouTube, X and Reddit. Each icon is an inline SVG (from Simple Icons) filled with `currentColor`, so it follows the footer's sage link colour and turns gold on hover. Inline SVG keeps the icons working when a page is opened straight from disk, where external SVG references are blocked. The row is the same on both pages, so a change to one goes in the other too, along with the `sameAs` lists in both pages' JSON-LD.
- **Share rows:** a `.share` row lets visitors pass a page on. The home page has one in `#book` and one in the footer, below the socials. The CV page has one in the footer. Each row shares the page's canonical address and has:
  - Links to the share pages of WhatsApp, Facebook, X and LinkedIn (opening in a new tab) and an email link, with the address and the page's title already filled in. These work without a script.
  - A Share button that opens the device's own share menu. Instagram has no share link for websites, so this is how visitors reach it, along with any other app on their device.
  - A Copy link button, with a short "Link copied" message in the row's `.share-status` line.
  - The icons come from an SVG sprite of `<symbol>` elements at the top of each page's `<body>`, which every row draws through `<use>`. The rows are the same on every page apart from the shared address and title, so a change to one goes in all of them.
- `assets/js/share.js`: reveals the Share and Copy link buttons when the browser supports them and handles their clicks. Every page with a share row loads it with `defer`.
- `assets/images/`: site images.
  - `profile.jpg`: 640x640 web copy of `Square profile.png`, used in the hero of both pages.
  - `young-llew.jpg`: web copy of `Baby photo.jpg`, used in the about section.
  - `link-preview.jpg`: 1200x630 link preview image for both pages, carrying the hero headline "Tech support that speaks your language", a one-line summary, the web address and the gold-ringed profile photo. The source is the "What Would Llew Do - Link Preview" design in Canva (1600x900, built on the "What Would Llew Do" brand kit), exported as PNG and centre-cropped to 1.91:1, so keep its text and photo clear of the top and bottom 30px.
  - `favicon.svg`: green circle with a gold question mark.
  - `Square profile.png` and `Baby photo.jpg` are the full-size originals. Pages reference the web copies, which keeps the page light.
- `robots.txt`: lets every crawler index the whole site and points to the sitemap.
- `sitemap.xml`: lists both pages for search engines. Add any new page here, and bump its `lastmod` date when a page changes meaningfully.

## Brand

- **Font:** Roboto, loaded from Google Fonts in the page `<head>` (weights 400, 500, 700, 900 and italic 400).
- **Colours:** muted greens and white, with gold as the accent. All colours are defined once as custom properties in `assets/css/base.css`. Use those rather than ad hoc hex values.
  - `--green` `#2F6B55` is the primary colour. `--green-dark` and `--green-deep` are for text on light backgrounds and dark sections.
  - `--mist` `#EEF3EF` tints alternating bands. `--sage` is for borders and soft text on dark green.
  - `--gold` `#C9A23F` is reserved for calls to action and small highlights. It is also the colour for gold text on dark green.
  - Avoid dark text on green backgrounds. Use white, mist or gold instead.
- **Tone:** open and friendly, plain English, no jargon. Copy is written in Llewellyn's voice and never uses em dashes or en dashes.

## Search and link previews

Both pages set `lang="en-ZA"` and carry the same set of tags in their `<head>`:

- A `<title>` and meta description, written for search results. The home page title names Cape Town for local searches.
- A canonical link, so search engines treat `https://whatwouldllewdo.com/` as the one true address even when the page is also reachable on the github.io subpath or as `index.html`.
- Open Graph tags (`og:url`, `og:image` and the rest) and a `twitter:card` of type `summary_large_image`, for link previews in WhatsApp, LinkedIn and other apps. Both pages use `link-preview.jpg`, sized 1200x630 (the 1.91:1 ratio these apps show as a large card), with its width, height and alt text set alongside it. The home page `og:title` leads with the hero headline, so a shared link reads the same as the page it opens.
- JSON-LD structured data. The home page describes the site (`WebSite`), Llewellyn (`Person`) and the tech help service (`ProfessionalService`), including the WhatsApp number as its `telephone`. It lists no prices or offers, in line with the page copy. The CV page is a `ProfilePage` about the same `Person`, who shares the `@id` `https://whatwouldllewdo.com/#llew` across both pages. Keep contact details, profile links and job titles in step with the visible page copy.

Every URL in these tags is absolute and uses `https://whatwouldllewdo.com/`, because previewers and crawlers ignore relative URLs there. Google's Rich Results Test (https://search.google.com/test/rich-results) checks the structured data once the domain is live.

## Testimonial sources

Both pages quote short snippets rather than full testimonials. The full texts live outside this repo:

- Skill Forge client testimonials, with client names and businesses: the Skill Forge Portfolio PDF (Nova Mentis, 2025).
- Survey testimonials (Skill Forge scorecards, masterclasses, audits, workshops and Nova Nexus ratings): `C:\Users\lacra\OneDrive - Llewellyn Craddock\4 Archive\Odoo Export\Survey User Input Line (survey.user_input.line) (1).xlsx`. Survey answers are anonymous unless they match a named quote in the portfolio, so unmatched snippets are credited by role (for example "Masterclass attendee").
- LinkedIn recommendations on Llewellyn's profile.
