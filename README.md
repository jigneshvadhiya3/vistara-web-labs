# Vistara Web Labs

One-page website for Vistara Web Labs, an independent web design and development studio. Built with React and Vite, plain CSS Modules and a few Lucide icons, with no animation library.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
npm run preview  # preview the build
```

## Before you go live: SEO setup

Open `vite.config.js` and set `SITE_URL` to your live address (e.g. `https://vistara.is-a.dev`), or build with `SITE_URL=https://… npm run build`. The build then:

- adds a canonical URL and `og:url`
- makes the social preview image an absolute URL (needed by WhatsApp and LinkedIn)
- writes `sitemap.xml` and adds it to `robots.txt`

Then submit `https://your-domain/sitemap.xml` in Google Search Console.

The site already ships with a descriptive title and meta description, Open Graph and Twitter tags, `ProfessionalService` structured data listing the three packages, alt text on every image, one H1 with a clean H2 outline, a `<noscript>` summary and a custom `404.html`.

## Edit content

Everything lives in **`src/data/site.js`**:

| What | Where |
| --- | --- |
| Mobile number | `contact.phone` (digits with country code, e.g. `919876543210`) and `contact.phoneDisplay` (e.g. `+91 98765 43210`). Empty hides the Mobile card. `whatsappOnPhone` adds a WhatsApp button. |
| LinkedIn profile | `contact.linkedin` and `contact.linkedinName` |
| Website address | `brand.website`: your live URL once deployed. |
| Projects | `projects`: add, remove or reorder. Screenshots go in `src/assets/work/`. |
| Packages, comparison table, add-ons, project notes | `packages`, `comparison`, `addOns`, `projectNotes` |
| SEO checklist | `seoChecks` |
| Services, process stages, constellation skills, studio focus | the matching arrays |

The site is fully static: no form and no backend. The contact section shows your mobile number (Call, WhatsApp, Copy), email (Write an email, Copy) and LinkedIn. When a visitor picks a package, the contact section mentions it, and the email subject and WhatsApp message include it.

## Command palette

Press **Ctrl K** or **⌘K**. Commands include `open work`, `show services`, `show seo`, `view packages`, `go to process`, `explore skills`, `about vistara`, `start a project`, `contact`, `go home`, `go back`, `copy email`, `clear history` and `help`. Short forms work too (`work`, `back`, `skills`…). Recent commands are remembered in the browser. There is also one hidden command.

## Deploy (GitHub Pages and is-a.dev)

1. Push this folder to a GitHub repository.
2. Under **Settings → Pages**, set the source to **GitHub Actions**. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.
3. To use a free subdomain, open a pull request on [is-a-dev/register](https://github.com/is-a-dev/register) adding `domains/<name>.json` with a CNAME to `<username>.github.io`. Follow their README, since the format changes from time to time.
4. Add the subdomain as the **Custom domain** under Settings → Pages.
5. In `index.html`, change `og:image` and `twitter:image` to full URLs so link previews work.

The build uses relative paths (`base: './'`), so it also deploys unchanged to Vercel, Netlify or Firebase Hosting.

## Accessibility and performance

- Keyboard support throughout: command palette, carousel (arrow keys), process stages (arrow keys), constellation (Tab to each star)
- `prefers-reduced-motion` turns off the starfield animation, the warp, the parallax and the entrance motion
- Cursor glow and magnetic buttons run only on devices with a fine pointer
- About 92 KB of JavaScript (gzipped); WebP screenshots are lazy-loaded
