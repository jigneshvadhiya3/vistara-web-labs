// Vistara Web Labs: all site content and settings.
// Edit this file to update text, links and contact details.

import rrkuche from '../assets/work/rrkuche.webp';
import solvexiq from '../assets/work/solvexiq.webp';
import cutkraft from '../assets/work/cutkraft.webp';
import sharpcnc from '../assets/work/sharpcnc.webp';

export const brand = {
  name: 'Vistara Web Labs',
  descriptor: 'Independent Web Design & Development Studio',
  founder: 'Jignesh Vadhiya',
  // Your public site address once it's live, e.g. 'https://vistara.is-a.dev'.
  // Leave empty to show the studio name without a link.
  website: '',
};

export const contact = {
  email: 'jigneshvadhiya3@gmail.com',
  // Mobile number: digits only with country code, e.g. '919876543210'. Empty hides the Mobile card.
  phone: '919662042467',
  // How the number is shown on the page, e.g. '+91 98765 43210'.
  phoneDisplay: '+91 96620 42467',
  // Show a WhatsApp button on the same number.
  whatsappOnPhone: true,
  linkedin: 'https://www.linkedin.com/in/jignesh-vadhiya/',
  linkedinName: 'Jignesh Vadhiya',
};

export const nav = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'packages', label: 'Packages' },
  { id: 'about', label: 'About' },
];

// Every section, in page order (used by the command palette and active-state tracking).
export const sections = ['home', 'work', 'services', 'seo', 'process', 'packages', 'skills', 'about', 'contact'];

export const sectionNames = {
  home: 'Home',
  work: 'Selected Work',
  services: 'Services',
  seo: 'SEO',
  process: 'Process',
  packages: 'Packages',
  skills: 'Skills',
  about: 'About',
  contact: 'Start a Project',
};

// Technology tags are verified from each live site's build (React app bundled with Vite).
export const projects = [
  {
    name: 'RR Küche Interio',
    url: 'https://rrkuche.com',
    domain: 'rrkuche.com',
    image: rrkuche,
    industry: 'Interior design',
    description:
      'A refined website for a premium interior design studio in Rajkot, presenting modular kitchens, wardrobes, custom furniture, glasswork and décor.',
    services: ['Website design', 'Development', 'Responsive build'],
    tags: ['React', 'Vite'],
    tint: '#5d8f7f',
  },
  {
    name: 'SolvexIQ Solutions',
    url: 'https://solvexiq.com',
    domain: 'solvexiq.com',
    image: solvexiq,
    industry: 'Technology consulting',
    description:
      'A clean, confident website for a consulting firm, explaining what it does, how it works and the industries it serves.',
    services: ['Website design', 'Development', 'Responsive build'],
    tags: ['React', 'Vite'],
    tint: '#c9767c',
  },
  {
    name: 'CutKraft',
    url: 'https://cutkraft.vercel.app',
    domain: 'cutkraft.vercel.app',
    image: cutkraft,
    industry: 'Laser cutting & engraving',
    description:
      'An elegant website for a CO₂ laser cutting and engraving studio working across wood, acrylic and MDF, with services and a portfolio of work.',
    services: ['Website design', 'Development', 'Deployment'],
    tags: ['React', 'Vite', 'Vercel'],
    tint: '#a68b6d',
  },
  {
    name: 'Sharp CNC',
    url: 'https://sharpcnc.in',
    domain: 'sharpcnc.in',
    image: sharpcnc,
    industry: 'Industrial manufacturing',
    description:
      'A website for a pulp moulding machinery manufacturer, presenting its machines, packaging applications and custom engineering capabilities.',
    services: ['Website design', 'Development', 'Responsive build'],
    tags: ['React', 'Vite'],
    tint: '#d4ae6a',
  },
];

export const services = [
  {
    key: 'strategy',
    title: 'Website Strategy & Discovery',
    short: 'Understand the business before designing anything.',
    body: 'We start by learning what your business does, who it serves and what the website needs to achieve, then plan the site around that.',
    items: [
      'Requirement gathering',
      'Business and audience understanding',
      'Competitor research',
      'Website planning',
      'Content and feature identification',
      'Sitemap and information architecture',
    ],
    icon: 'Compass',
  },
  {
    key: 'design',
    title: 'UI/UX & Wireframe Design',
    short: 'Shape the structure, then the look.',
    body: 'Wireframes come first so the structure works, then a visual direction with type, colour and layouts designed for every screen size.',
    items: [
      'Website structure',
      'Wireframe creation',
      'User journey planning',
      'Visual direction',
      'Typography and colour selection',
      'Responsive design planning',
      'UI/UX design',
    ],
    icon: 'PenTool',
  },
  {
    key: 'build',
    title: 'Website Design & Development',
    short: 'Turn approved designs into a fast, working website.',
    body: 'Custom design built into clean, responsive code: business websites, landing pages and interactive features, connected to the tools you use.',
    items: [
      'Custom website design',
      'Frontend development',
      'Responsive website development',
      'Landing pages',
      'Business websites',
      'Interactive components',
      'API and third-party integrations',
      'Content management where required',
      'On-page SEO foundations',
    ],
    icon: 'CodeXml',
  },
  {
    key: 'qa',
    title: 'Testing & Quality Assurance',
    short: 'Check everything before your visitors do.',
    body: 'Every page, link and form is tested across browsers and devices, with performance and technical SEO checked before launch.',
    items: [
      'Cross-browser testing',
      'Mobile responsiveness testing',
      'Performance checks',
      'Navigation and functionality testing',
      'Form and integration testing',
      'SEO and technical checks',
    ],
    icon: 'ShieldCheck',
  },
  {
    key: 'launch',
    title: 'Deployment & Launch',
    short: 'Go live on your domain, securely.',
    body: 'Domain, hosting and SSL configured, the site deployed and checked one final time, and search engines told it exists.',
    items: [
      'Domain and hosting configuration',
      'Website deployment',
      'SSL configuration',
      'Final quality checks',
      'Search engine indexing setup',
      'Google Search Console & Analytics',
      'Launch support',
    ],
    icon: 'Rocket',
  },
  {
    key: 'care',
    title: 'Website Maintenance & Support',
    short: 'Keep the website current after launch.',
    body: 'Updates, content changes, fixes and improvements, so the website keeps working well as your business changes.',
    items: [
      'Website updates',
      'Content changes',
      'Bug fixes',
      'Performance improvements',
      'Technical support',
      'Basic SEO improvements',
    ],
    icon: 'LifeBuoy',
  },
];

export const process = [
  {
    name: 'Discover',
    text: 'Understand the business, objectives, target audience, requirements and expectations.',
    deliverables: ['Requirement discussion', 'Project scope', 'Initial research', 'Feature planning'],
  },
  {
    name: 'Strategize',
    text: 'Define the website structure, user journeys, content requirements and overall direction.',
    deliverables: ['Sitemap', 'Information architecture', 'Content structure', 'Technical planning'],
  },
  {
    name: 'Wireframe & Design',
    text: 'Transform the concept into wireframes and visually polished designs.',
    deliverables: ['Wireframes', 'UI/UX design', 'Colour and typography system', 'Responsive layouts', 'Design approval'],
  },
  {
    name: 'Develop',
    text: 'Bring the approved design to life through clean, responsive, functional development.',
    deliverables: ['Frontend development', 'Interactive components', 'Integrations', 'Responsive implementation', 'Content integration'],
  },
  {
    name: 'Test & Refine',
    text: 'Test the website across devices and browsers, identify issues and refine the experience.',
    deliverables: ['Functional testing', 'Responsive testing', 'Performance checks', 'Bug fixing', 'Final refinements'],
  },
  {
    name: 'Deploy & Launch',
    text: 'Prepare the website for production and make it publicly accessible.',
    deliverables: ['Hosting setup', 'Domain configuration', 'Deployment', 'SSL', 'Final launch checks'],
  },
  {
    name: 'Support & Grow',
    text: 'Continue improving the website after launch.',
    deliverables: ['Maintenance', 'Content updates', 'SEO improvements', 'Performance monitoring', 'Ongoing support'],
  },
];

// Constellation nodes. x / y are percentages of the map (mx / my on phones). `links` connect related skills.
export const skills = [
  { id: 'ux', name: 'UI/UX Design', x: 22, y: 20, mx: 18, my: 8, text: 'Interfaces that are clear, attractive and easy to use, designed around how visitors actually move through a site.', links: ['wire', 'resp'] },
  { id: 'wire', name: 'Wireframing', x: 44, y: 9, mx: 50, my: 5, text: 'Low-fidelity layouts that settle structure and content before any visual design begins.', links: ['ux', 'front'] },
  { id: 'html', name: 'HTML', x: 70, y: 13, mx: 82, my: 8, text: 'Semantic, accessible markup: the foundation search engines and screen readers rely on.', links: ['css', 'js'] },
  { id: 'css', name: 'CSS', x: 87, y: 32, mx: 88, my: 24, text: 'Layouts, typography, motion and glass effects, written to stay fast and maintainable.', links: ['html', 'resp'] },
  { id: 'js', name: 'JavaScript', x: 84, y: 62, mx: 87, my: 41, text: 'Interactivity that feels natural, from menus and sliders to forms and live data.', links: ['html', 'react', 'api'] },
  { id: 'resp', name: 'Responsive Design', x: 10, y: 47, mx: 13, my: 41, text: 'Every layout rethought for phones, tablets and large screens, not just shrunk.', links: ['ux', 'css'] },
  { id: 'react', name: 'React', x: 66, y: 86, mx: 87, my: 60, text: 'Component-based development for websites with rich, reusable interface parts.', links: ['js', 'front'] },
  { id: 'front', name: 'Frontend Development', x: 30, y: 82, mx: 22, my: 78, text: 'Turning designs into pixel-accurate, working pages that behave well everywhere.', links: ['react', 'wire', 'perf'] },
  { id: 'api', name: 'API Integrations', x: 92, y: 85, mx: 78, my: 78, text: 'Connecting websites to forms, maps, payment, booking and other third-party services.', links: ['js'] },
  { id: 'seo', name: 'SEO', x: 8, y: 78, mx: 13, my: 60, text: 'Clean structure, metadata and indexing setup that help people find the website.', links: ['perf', 'deploy'] },
  { id: 'perf', name: 'Performance Optimization', x: 47, y: 96, mx: 50, my: 91, text: 'Optimised images, lean code and fast loading, because slow sites lose visitors.', links: ['seo', 'front', 'deploy'] },
  { id: 'deploy', name: 'Deployment', x: 6, y: 16, mx: 12, my: 24, text: 'Domains, hosting, SSL and going live, handled carefully so launch day is calm.', links: ['seo', 'ux'] },
];

export const focus = [
  'Thoughtful website design',
  'Modern digital experiences',
  'Clean development',
  'Responsive layouts',
  'Business-focused solutions',
  'Attention to detail',
  'Long-term website usability',
];


/* ---------- Packages (from "Website Packages – Vistara Web Labs") ---------- */

export const packages = [
  {
    key: 'essential',
    name: 'Essential',
    regular: 12999,
    price: 10999,
    title: 'A confident first step online.',
    audience: 'For small businesses and professionals.',
    features: [
      'Up to 4 core pages',
      'Brand-aligned responsive design',
      '1 enquiry form',
      'Basic on-page SEO',
      '1 revision round',
      '7 days post-launch support',
    ],
  },
  {
    key: 'growth',
    name: 'Growth',
    regular: 24999,
    price: 21999,
    title: 'Built for your next stage.',
    audience: 'For growing companies and service brands.',
    features: [
      'Up to 7 pages',
      'Custom premium UI direction',
      'Service & portfolio sections',
      'Analytics + Search Console',
      '2 revision rounds',
      '15 days post-launch support',
    ],
  },
  {
    key: 'signature',
    name: 'Signature',
    regular: 34999,
    price: 30999,
    title: 'A distinctive digital presence.',
    audience: 'For established brands seeking greater polish.',
    features: [
      'Up to 10 pages',
      'High-end custom visual direction',
      'Advanced motion & interactions',
      'Case studies & richer enquiries',
      '3 revision rounds',
      '30 days post-launch support',
    ],
  },
];

export const everyPlan = ['Responsive layouts', 'WhatsApp, call & social links', 'Google Maps', 'Deployment assistance'];

// Comparison table. `true` renders as "Included".
export const comparison = [
  {
    group: 'Pricing & scope',
    rows: [
      ['Regular price', '₹12,999', '₹24,999', '₹34,999'],
      ['Introductory price', '₹10,999', '₹21,999', '₹30,999'],
      ['Your savings', '₹2,000', '₹3,000', '₹4,000'],
      ['Core website pages', 'Up to 4', 'Up to 7', 'Up to 10'],
    ],
  },
  {
    group: 'Design & experience',
    rows: [
      ['Visual direction', 'Brand-aligned', 'Custom premium', 'High-end custom'],
      ['Desktop, tablet & mobile layouts', true, true, true],
      ['Animations & interactions', 'Basic transitions', 'Enhanced motion', 'Advanced motion'],
      ['Portfolio / project presentation', 'Simple section', 'Dedicated sections', 'Premium portfolio'],
      ['Case study presentation', 'Add-on', 'Add-on', 'Within page limit'],
    ],
  },
  {
    group: 'Enquiries & connections',
    rows: [
      ['Contact / enquiry forms', '1 standard form', 'Tailored forms*', 'Multiple forms*'],
      ['WhatsApp, call & social links', true, true, true],
      ['Google Maps integration', true, true, true],
      ['Multiple enquiry paths', 'Basic contact', 'Service enquiries', 'Tailored paths'],
    ],
  },
  {
    group: 'SEO, measurement & launch',
    rows: [
      ['Page titles, descriptions & headings', true, true, true],
      ['Image alt text', true, true, true],
      ['Sitemap & robots.txt setup', 'Basic setup', true, true],
      ['Google Analytics setup', 'Add-on', true, true],
      ['Google Search Console setup', 'Add-on', true, true],
      ['Performance optimisation', 'Basic checks', 'Enhanced', 'Enhanced'],
      ['Technical SEO checks', 'Basic', 'Standard', 'Enhanced'],
      ['Custom 404 page', 'Add-on', 'Add-on', true],
      ['Deployment assistance', true, true, true],
    ],
  },
  {
    group: 'Revisions & support',
    rows: [
      ['Consolidated revision rounds', '1 round', '2 rounds', '3 rounds'],
      ['Post-launch bug-fix support', '7 days', '15 days', '30 days'],
    ],
  },
];

export const comparisonNotes = [
  '*Form count, fields and routing are agreed in the project scope. Each product, service or case study detail page counts toward the total page allowance.',
  'All plans use client-provided content and brand assets. Ongoing SEO, ecommerce, CMS/admin panels and integrations are optional services.',
];

export const addOns = [
  { name: 'Additional standard page', price: '₹1,500 – ₹2,500' },
  { name: 'Complex / custom page', price: '₹3,000 – ₹5,000+' },
  { name: 'Blog / insights setup', price: '₹3,000 – ₹5,000+' },
  { name: 'Product catalogue', price: 'From ₹5,000' },
  { name: 'Multilingual website', price: 'From ₹5,000' },
  { name: 'Advanced animation pack', price: 'From ₹3,000' },
  { name: 'API / CRM integration or admin features', price: 'Custom quote' },
  { name: 'Logo, graphics, photography & creative support', price: 'Custom quote' },
];

export const projectNotes = [
  'A 50% advance starts the project. Larger projects may use 50% / 30% / 20% milestone billing, agreed in the quotation. Handover follows full payment.',
  'You provide text, product data and brand assets. Detail pages count toward the page limit. Form complexity, page list and timeline are agreed before work begins.',
  'Revisions cover consolidated feedback within the approved scope. Support covers delivered functionality; new features and ongoing SEO are quoted separately.',
  'Domain, hosting, paid tools, licences and applicable taxes are additional unless stated. Translation and creative work are separately scoped. SEO does not guarantee rankings.',
];


/* ---------- SEO ---------- */

// What every website is built with, matching the package inclusions.
export const seoChecks = [
  { name: 'Page titles & meta descriptions', note: 'Every page gets a clear title and summary for search results.', plans: 'All plans' },
  { name: 'Heading structure', note: 'One H1 per page and a logical H2–H3 outline search engines can follow.', plans: 'All plans' },
  { name: 'Image alt text', note: 'Descriptive alt text for accessibility and image search.', plans: 'All plans' },
  { name: 'Sitemap & robots.txt', note: 'Tells search engines which pages exist and can be crawled.', plans: 'Basic on Essential' },
  { name: 'Google Search Console', note: 'Submit the sitemap and watch how Google indexes the site.', plans: 'Growth & Signature' },
  { name: 'Google Analytics', note: 'See where visitors come from and what they do.', plans: 'Growth & Signature' },
  { name: 'Performance optimisation', note: 'Compressed images and lean code so pages load fast.', plans: 'All plans' },
  { name: 'Technical SEO checks', note: 'Mobile-friendliness, broken links, indexability and metadata reviewed before launch.', plans: 'All plans' },
];
