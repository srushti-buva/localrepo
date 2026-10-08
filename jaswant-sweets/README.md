# Jaswant Sweets Ujaliwadi - Business Website

KIT PBL Competition Winner, 2024. A responsive business website for a traditional Indian sweets shop, built with plain HTML, CSS and JavaScript.

## 1. Project overview
Customers can browse products, view the gallery, read FAQs and blog posts, and send contact or bulk-order inquiries. It is a static frontend project: there is no backend and no database. Form data is validated in the browser and is **not** stored or sent anywhere.

## 2. Features
- Sticky navbar with a hamburger menu on mobile
- Home page with hero, featured products, "Why choose us" and call-to-action
- 12 product cards with category filtering (All, Milk, Dry Fruit, Traditional, Special)
- "Enquire Now" opens the bulk-order form with that product pre-selected
- Gallery with hover effects and a keyboard-accessible lightbox
- FAQ accordion (9 questions)
- Blog section with 6 sample cards
- Contact form and bulk-order form with JavaScript validation (email, 10-digit Indian phone, minimum lengths, date not in the past)
- Toast notifications, scroll-to-top button, smooth scrolling
- SEO basics: titles, meta descriptions, alt text, heading hierarchy, semantic HTML

## 3. Technologies used
HTML5, CSS3 (Flexbox, Grid, media queries, custom properties), vanilla JavaScript (ES5-style, no libraries).

## 4. Folder structure
```
jaswant-sweets/
├── index.html  about.html  products.html  gallery.html  faq.html  blog.html  contact.html
├── css/style.css
├── js/script.js
├── images/  (logo.png, hero.jpg, sweets/, gallery/)
└── README.md
```

## 5. How to run locally
Open `index.html` in any browser (double-click it). No server or installation is needed.

## 6. How to deploy
**GitHub Pages**
1. Create a GitHub repository and push this folder (`git init`, `git add .`, `git commit -m "Initial commit"`, `git remote add origin <url>`, `git push -u origin main`).
2. In the repo go to Settings > Pages, set Source to "Deploy from a branch", choose `main` and `/ (root)`, then Save.
3. Your site appears at `https://<username>.github.io/<repo-name>/` after a minute or two.

**Netlify**
1. Push the project to GitHub.
2. In Netlify choose Add new site > Import an existing project and select the repo.
3. Leave the build command empty and set the publish directory to `/`. Deploy.

## 7. Future improvements
- Replace placeholder images in `images/` with real photos (keep the same file names)
- Replace the sample phone, email and address with the shop's real details
- Connect the forms to a service such as Formspree or EmailJS, or to a backend
- Add full blog article pages and a WhatsApp order button
- Add a product search box and a minimum-quantity note per product
