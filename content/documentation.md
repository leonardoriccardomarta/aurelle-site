# Mirel: theme documentation

Mirel is a clean, precise Online Store 2.0 theme for skincare brands that put clear product information first. It installs with a complete, neutral homepage and footer, styled in the Clinical Skincare look: white, cool grey and pastel blue, with a technical sans-serif and compact spacing.

## 1. Getting started

1. Add the theme to your store (upload the theme file, or install it from the Theme Store) and open **Customize**.
2. The theme installs with the Clinical Skincare style already applied. To adjust the colors, fonts, buttons, corners or spacing, open Theme settings (see "Theme settings" below). Changing the style never changes your content.
3. Add your logo, then replace the placeholder images in the homepage sections.
4. Check your navigation menus (see "Navigation") and the sections listed in "Before you launch" at the end of this page.

The homepage is a neutral base on purpose: its wording works for any skincare brand, so you can restyle the theme at any time without rewriting anything.

## 2. Style

| Style | Look | Best for |
|---|---|---|
| Clinical Skincare | White, cool grey and pastel blue, technical sans-serif, compact spacing | Dermatological and pharmacy-grade skincare |

**Technical note: alternate home layout.** `templates/index.clinical.json` is an alternative homepage template, with copy and section order suited to dermatological skincare. It is not a style or preset switcher, and it is not applied automatically: the default homepage stays the neutral one. To preview it, add `?view=clinical` to your homepage address. To use it, copy its sections into the default homepage.

## 3. Homepage and section library

Every section has an app block slot, a heading you can edit, and (where it makes sense) blocks you can add, remove and reorder.

| Section | What it does |
|---|---|
| Hero | Image and text split, with a button |
| Autoplay video | Muted looping background video with heading and button. Always has a pause button, and pauses for visitors who prefer reduced motion. Upload a short silent clip (under 10 MB) and set a fallback image |
| Featured collection | Product grid from a collection, with optional quick add |
| Featured product | One product shown in full: gallery with images, videos and 3D models, variants, price and buy buttons. Updates in place when a variant is chosen |
| Collection list | Category tiles from up to seven collections |
| Image with text | Image beside text, image on either side, three image shapes |
| Icon benefits | Short promises with a simple icon, one block each |
| Logo list | "As featured in" or partner logos, optional grayscale |
| Testimonials | Customer quotes with star rating and photo. Scrolls sideways on mobile, grid on larger screens |
| Image comparison | Drag or use the arrow keys to compare two images, such as before and after |
| Shoppable image | Lifestyle image with product pins. Each pin opens a card with Add to cart. Pins appear once you choose a product for each pin block |
| FAQ | Accordion of questions. Can open one at a time, and adds FAQ structured data for search engines |
| Journal | Latest blog posts (see "Blog") |
| Promo countdown | Offer banner with a timer. Use the date format `2026-12-31T23:59:00-05:00` |
| Newsletter | Email signup band |
| Rich text | Centered heading, text and button |
| Custom Liquid | A free-form section for app snippets and other Liquid code. Also available as a block in the product page and in most sections |

## 4. Navigation

- **Header:** logo, main menu, optional country and language selector, search, account and cart. The account button is Shopify's account component (sign-in, account menu); choose its menu with **Customer account menu** in the header settings. On phones, search and cart live in a bottom bar.
- **Mega menu:** a menu item whose children have children of their own (three levels) opens a full-width, multi-column panel. Second-level links are the column headings and third-level links are the lists. Add **Mega menu promo** blocks (image, heading, link) to the header section; type the exact name of the top-level item in the block's "Menu item" setting to attach it. Items with two levels open a simple dropdown.
- **Search:** the search icon opens an overlay with instant suggestions for products, collections, pages and articles. Choose a menu in the **Search overlay** section for "Popular searches" links. The search results page has the same filters and sorting as collections.
- **Country and language:** appears only if your store sells in more than one country or language (Shopify Markets). Show it in the header and footer from their section settings.
- **Footer:** a brand column, link columns, newsletter, social links, store policies, country and language selector and payment icons. Link columns are blocks: use **Links column** for manual links, or **Menu column** to show a store menu. The footer comes with Shop and Company columns ready to edit.

## 5. Collection pages

- **Filters** use Shopify's native filtering. Set up the filters you want (availability, price, product type, and a "skin type" filter from a product metafield or tag) in the **Shopify Search and Discovery** app. The theme shows whatever you configure.
- Sorting, active-filter chips and "Clear all" update the page without reloading.
- **Quick add** puts an Add to cart button on every product card. Products with several variants reveal a small variant selector. Switch it off per section.

## 6. Product pages

Product page blocks can be reordered or removed in the editor:

- **Variant picker with swatches:** option values that have a swatch in Shopify (a color or an image) are drawn with it. For the others, options named in the block setting (Color, Shade, Texture and similar) are drawn as swatches, with colors from the "Swatch colors" setting, one per line as `Rose: #C48B7B`. Values without a color use the variant's photo, otherwise a normal button.
- **Low stock warning:** shows "Only N left in stock" at or below a threshold you set, with an optional bar. It needs inventory tracking turned on for the variant.
- **Trust badges:** four short claims, each with an icon.
- **Ingredients and How to use accordions:** fill the product metafields `custom.ingredients` and `custom.how_to_use`, or type the content into the block.
- **Frequently bought together and You may also like:** the **Product recommendations** sections use Shopify's recommendations. Set complementary products in Search and Discovery. If there are none, the section stays empty and invisible.
- **Sticky add to cart** on phones, and dynamic checkout buttons (shown if enabled in your payment settings). Shopify draws these buttons and the theme never changes their colors.
- **Selling plans:** products sold with subscriptions or prepaid plans show a **Purchase options** choice: one-time purchase (unless the product can only be bought with a plan) or one of the available plans, with its price, saving and price per delivery. The options follow the selected variant, and the plan chosen shows on the cart line. Plans are created in Shopify, with a selling plan app.
- **Shop Pay Installments:** the banner appears under the buy buttons wherever Shopify offers installments for the product.
- **Pickup availability:** shows whether the selected variant can be picked up at your locations, and updates when the variant changes. It appears once local pickup is set up in your store.
- **Gift cards:** a gift card product offers "send as a gift" with the recipient email and name, a message and an optional send date.
- **Tax note:** stores with tax-inclusive prices show "Tax included" under the price.
- **Custom Liquid:** add a **Custom Liquid** block to place app snippets or your own Liquid code anywhere in the product details.

## 7. Cart

The cart opens as a drawer without leaving the page. The cart page has the same details, and also shows accelerated checkout buttons (Shop Pay, Apple Pay and others, as set up in your payment settings).

- **Free shipping progress bar:** set the threshold in Theme settings, Cart.
- **Product suggestions:** up to two complementary products (from Search and Discovery) or, if there are none, the collection chosen in the Cart drawer section.
- **Discounts:** automatic discounts and codes already applied to the cart are listed with the amount taken off and the total saved. Customers enter codes at checkout.
- **Order note:** can be switched off in Theme settings, Cart.
- **Tax note:** under the subtotal, it says whether tax is included or calculated at checkout.
- **Unit prices and subscriptions:** unit prices are shown on cards, product pages and cart lines, and subscription plans appear on the cart lines.

## 8. Blog

The Blog page and the Journal section show **neutral sample posts** until your blog has its first article, then switch to your real articles automatically. Edit, add or remove the samples in the section, or switch them off.

## 9. Privacy and compliance

- **Cookie consent:** the theme does not add its own banner. Use Shopify's built-in cookie banner from Customer privacy settings.
- **Structured data (JSON-LD):** Organization and WebSite on the homepage; breadcrumbs on product, collection, article, blog and page templates; CollectionPage, BlogPosting, ContactPage; Product (from Shopify) and FAQPage. Add your logo and social links in Theme settings to complete the Organization data.
- **Accessibility:** built toward WCAG 2.1 AA: keyboard operable menus, drawers and dialogs, visible focus, labelled forms, and respect for reduced motion. Check your own content (image descriptions, color choices) too.

## 10. Theme settings

| Group | What you control |
|---|---|
| Colors | Background, surface, accent, text, muted text, borders, button, sale price, badge, announcement bar and footer colors |
| Typography | Heading and body fonts, base size, heading size scale, capitalization and letter spacing, line height |
| Layout | Page width, corner radius, bottom navigation on phones, section spacing, product card image shape, vendor on cards |
| Buttons | Solid or outline, corner radius, capitalization, letter spacing |
| Cart | Free shipping threshold, suggestions, order note |
| Social media | Profile links, shown in the footer and in structured data |
| SEO and structured data | Organization logo and a fallback meta description |
| Favicon | Browser tab icon |

## 11. Account, password and gift card pages

All customer account pages are included (login, register, account, orders, addresses, password reset, account activation), plus a password page, a gift card page with a QR code, a contact page with a form, an About page template and a FAQ page template. Assign the page templates to your own pages from the page editor in Shopify admin.

## 12. Before you launch

- Replace placeholder images and logos, and add your video.
- Write your Terms, Privacy, Refund and Shipping policies in Settings, Policies. They appear in the footer.
- Check the footer links and your navigation menus.
- Create at least three blog articles, or keep the samples until you do.
- Set the free shipping threshold in your store's currency.
- Add a Contact page and a FAQ page, and assign the templates.

## 13. Customization

All colors, fonts and spacing come from CSS variables set in Theme settings. Prefer the settings over editing code. If you edit code, keep changes in your own copy of the theme and re-apply them after updates.

## 14. Troubleshooting

- **A filter I need is missing:** add it in the Shopify Search and Discovery app.
- **The country selector is missing:** your store sells in one country and one language.
- **Suggested products do not appear in the cart:** set complementary products in Search and Discovery, or choose a collection in the Cart drawer section.
- **Pickup availability does not show:** the selected variant has no pickup locations. Turn on local pickup for a location that stocks it.
- **The Shop Pay Installments banner does not show:** Shopify shows it only where installments are available for your store and the product price.
- **Low stock never shows:** turn on inventory tracking for the variant.
