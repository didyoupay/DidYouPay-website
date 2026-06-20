# Did You Pay? Design System

This document is the practical design and implementation reference for the Did You Pay? website and app brand. Apply it to new work and use it when reviewing changes to existing pages.

## 1. Product Purpose

Did You Pay? is an iOS app that helps people avoid unnecessary parking and road charge penalties. It creates timely, location-based reminders so users remember to pay a charge after a relevant journey or visit.

The website supports the app by:

- Explaining what the app does in direct, understandable language.
- Showing how location-based reminders help without overstating what they guarantee.
- Answering common setup, usage, location and payment questions.
- Providing support, privacy, terms, availability and release information.
- Giving users a trustworthy route to the App Store when the app is available.

The website must never imply that Did You Pay? pays charges automatically or guarantees that a user will avoid every penalty.

## 2. Brand Personality

The brand should feel:

- **Trustworthy:** clear about what the product does, what data it uses and its limitations.
- **Helpful:** focused on useful guidance and the user's next step.
- **Reassuring:** calm and supportive, especially when discussing payments, reminders and penalties.
- **Modern:** clean, concise and designed for current devices without relying on short-lived visual trends.

Prefer quiet confidence over urgency. Avoid alarmist warnings, blame, jokes about penalties or language that creates anxiety.

## 3. Product Identity

The product identity is: **a trusted companion that quietly helps you remember something important.**

Translate that identity into the interface through:

- Clear hierarchy and predictable placement of controls.
- Short explanations at the moment they are useful.
- Calm status messages and reminders.
- Generous spacing and restrained visual emphasis.
- Honest descriptions of location services, notifications and user responsibilities.

The product should feel present when needed and unobtrusive at other times.

## 4. Brand Assets

The approved logo is a PNG and is the authoritative website logo asset. The iOS app icon is the browser identity and should be used for favicons and other browser or bookmark surfaces.

- Keep original approved files unchanged in a clearly named source asset location.
- Publish optimised derivatives from the approved originals; do not repeatedly re-export derivatives.
- Provide descriptive `alt` text when a logo communicates the product name. Use empty `alt=""` when adjacent text already provides the same name.
- Do not stretch, skew, recolour, crop or add effects to the approved logo or app icon.
- Preserve comfortable clear space around both assets.
- Use the wordmark or plain text product name when an image would add no value.

TODO: Add the approved logo master PNG and record its filename and intrinsic dimensions.

TODO: Add the approved app icon master PNG and export the required favicon sizes.

## 5. Colour System

Use semantic colour names in CSS so the visual palette can be refined without rewriting component styles. Until the palette is approved, do not introduce final HEX, RGB or HSL values.

```css
:root {
  --color-primary: TODO; /* Primary Blue */
  --color-background: TODO; /* Background */
  --color-surface: TODO; /* Surface */
  --color-border: TODO; /* Border */
  --color-text-primary: TODO; /* Primary Text */
  --color-text-secondary: TODO; /* Secondary Text */
  --color-success: TODO; /* Success */
  --color-attention: TODO; /* Attention */
  --color-error: TODO; /* Error */
}
```

Use the roles consistently:

- **Primary Blue:** primary actions, selected states and purposeful emphasis.
- **Background:** the main page canvas.
- **Surface:** cards, grouped content and elevated sections.
- **Border:** dividers, input boundaries and subtle component definition.
- **Primary Text:** headings and body copy requiring strongest contrast.
- **Secondary Text:** supporting copy and metadata; it must remain readable.
- **Success:** confirmed or completed outcomes.
- **Attention:** information that needs timely review but is not an error.
- **Error:** failed actions, invalid fields and critical problems.

Never use colour as the only way to communicate state. Pair it with text, an icon, a border treatment or another perceivable cue. Verify all final combinations against WCAG contrast requirements.

TODO: Approve and add the final colour values, including hover, active, focus and disabled state values where needed.

The website uses a dark theme to remain visually consistent with the current iOS app. Its semantic colour roles are implemented with temporary system-derived values until the final palette is approved.

## 6. Typography

Manrope is the main typeface for headings, body text, navigation, buttons, labels and supporting copy.

```css
:root {
  --font-family-sans: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-body: 1rem;
  --line-height-body: 1.6;
  --line-height-heading: 1.15;
}
```

- Use a system-font fallback stack so content remains usable while Manrope loads or if it fails.
- Limit loaded font weights to those actually used.
- Prefer `woff2` for web delivery and define fonts with `@font-face` when files are hosted locally.
- Use `font-display: swap`.
- Keep body text at least `1rem` under default browser settings.
- Use responsive type sizing with `clamp()` where it improves hierarchy without extreme jumps.
- Keep paragraphs to roughly 60–75 characters per line.
- Do not encode hierarchy using font size alone; use semantic heading levels in document order.

TODO: Confirm the licensed or approved Manrope source, hosted font files and required weights.

## 7. Layout

Build mobile-first. Start with the smallest layout and add space or columns only when content benefits from them.

- Use a centred page container with fluid side padding.
- Keep long-form text in a narrower reading column inside the page container.
- Use CSS Grid or Flexbox for layout; do not use fixed positioning for normal page structure.
- Prefer spacing tokens over one-off values.
- Allow sections to breathe, but keep related headings, text and actions visually grouped.
- Avoid horizontal scrolling at a viewport width of 320 CSS pixels.
- Let content determine component height. Avoid fixed-height text containers.

Suggested starting tokens:

```css
:root {
  --layout-page-max: 72rem;
  --layout-content-max: 46rem;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --radius-small: 0.75rem;
  --radius-medium: 1rem;
  --radius-large: 1.5rem;
}
```

These corner-radius values are based on the proportions in the current iOS app screenshots. Use the small radius for buttons and fields, the medium radius for cards and the large radius only for larger grouped surfaces.

## 8. Responsive Breakpoints

Breakpoints should respond to content pressure, not specific device models. Use a small set consistently:

```css
/* Base: mobile, below 36rem */
@media (min-width: 36rem) { /* larger phones and small tablets */ }
@media (min-width: 48rem) { /* tablets and compact layouts */ }
@media (min-width: 64rem) { /* desktop layouts */ }
@media (min-width: 80rem) { /* wide screens, only when useful */ }
```

Test at widths between breakpoints as well as at the breakpoints themselves. Components may introduce a local breakpoint when their content demonstrably needs one, but reusable components should not accumulate arbitrary values.

## 9. Components

All pages must share consistent header, navigation, footer, button and card styles. Reuse class-based components instead of recreating similar patterns per page.

Each component should include:

- Default, hover, focus-visible, active and disabled states where applicable.
- Behaviour at narrow and wide widths.
- Semantic HTML before added JavaScript behaviour.
- Text that can wrap or grow without breaking the layout.
- A visible keyboard focus treatment.

Prefer native HTML controls and elements. Add ARIA only when native semantics do not express the required behaviour.

## 10. Buttons

Use links for navigation and buttons for actions that change state or submit data.

- **Primary button:** the main action in a section, such as viewing the app in the App Store.
- **Secondary button:** a lower-emphasis alternative action.
- **Text link:** navigation or contextual supporting action.
- Keep labels specific: “View supported locations” is better than “Learn more”.
- Provide a comfortable target size of at least 44 by 44 CSS pixels where practical.
- Do not disable a button without making the reason understandable.
- Show progress for actions that are not immediate and prevent accidental duplicate submission.
- Do not use colour alone to distinguish variants or states.

Suggested classes are `.button`, `.button--primary`, `.button--secondary` and `.button--text`.

## 11. Cards

Cards are suitable for app features, supported location summaries, release entries and related support links.

- Use a card only when its content forms a distinct, reusable group.
- Give cards consistent padding, border, radius and heading treatment.
- Avoid excessive elevation and decorative shadows.
- Do not make an entire card interactive unless there is one unambiguous destination.
- If a whole card is linked, preserve meaningful link text and a clear focus state.
- Let card grids collapse to a single column on narrow screens.

Suggested classes are `.card`, `.card__heading`, `.card__content` and `.card__action`.

## 12. Navigation

The header should contain the product identity, primary navigation and a mobile menu control when required. The footer should repeat essential support and legal destinations.

- Keep primary destinations consistent across every page.
- Mark the current page with `aria-current="page"`.
- Ensure navigation works with a keyboard, screen reader and zoomed text.
- Keep core links available when JavaScript is unavailable.
- When a mobile menu is collapsed, expose its state through `aria-expanded` and connect the control using `aria-controls`.
- Return focus sensibly when dismissing an overlay menu, if an overlay pattern is introduced.
- Do not rely on hover-only submenus.

## 13. Forms

Use forms only when the website has a real submission destination. GitHub Pages is static, so a contact form requires a deliberately selected external service or backend.

- Give every field a visible `<label>`.
- Use the correct input type and appropriate `autocomplete` values.
- Mark required fields in text and code.
- Place instructions before the field they describe.
- Show validation near the relevant field and provide an error summary for longer forms.
- Preserve user-entered data after validation errors.
- Use `aria-describedby` to associate help or error text when needed.
- Do not use placeholder text as a replacement for labels.
- Provide a clear confirmation after successful submission.

TODO: Select and document the contact/support channel before implementing a contact form.

## 14. FAQ / Accordions

Use native `<details>` and `<summary>` elements for straightforward FAQ accordions. This provides useful keyboard and no-JavaScript behaviour by default.

- Write each summary as the complete user question.
- Keep the answer concise and link to deeper guidance where necessary.
- Preserve a visible focus state on the summary.
- Do not hide essential legal, safety or payment information inside a closed accordion.
- Allow more than one answer to remain open unless research shows that single-open behaviour is necessary.
- Use minimal vanilla JavaScript only if native behaviour cannot meet an identified requirement.

## 15. Images and PNG Usage

PNG is the current master image format; SVG is not being used for now.

- Start from a high-quality master PNG.
- Export responsive sizes appropriate to their rendered use and high-resolution displays.
- Provide `srcset` and `sizes` where a screenshot or image appears at meaningfully different sizes.
- Never upscale a PNG beyond its intrinsic dimensions.
- Use transparent backgrounds where appropriate, especially for the approved logo and app icon.
- Optimise every published image without visible quality loss.
- Keep source masters separate from web-optimised derivatives.
- Set intrinsic `width` and `height` attributes to reduce layout shift.
- Use concise, useful `alt` text for informative images and empty alt text for decorative images.
- Lazy-load below-the-fold images with `loading="lazy"`; do not lazy-load the principal above-the-fold image.

Avoid stock photography. The visual system should rely mainly on product screenshots, the approved logo, the app icon, typography, cards and spacing.

TODO: Define the exported logo, app icon and screenshot sizes after the approved masters and first production screenshots are available.

## 16. Accessibility

The website must be accessible and should target WCAG 2.2 AA.

- Use semantic landmarks: `header`, `nav`, `main`, `section` where appropriate and `footer`.
- Include a skip link and one clear `h1` per page.
- Maintain logical heading order.
- Support keyboard-only use without traps.
- Keep visible focus styles with sufficient contrast.
- Meet text and non-text contrast requirements after colours are approved.
- Support browser zoom to 200% and reflow at 400% without losing content or functionality.
- Respect user font-size preferences and avoid blocking text resizing.
- Provide alternatives for meaningful images and transcripts or captions for future media.
- Associate validation errors and status messages with the relevant controls.
- Use `prefers-reduced-motion` to reduce non-essential animation.
- Test with automated checks and manual keyboard and screen-reader review.

## 17. Performance

The GitHub Pages site should remain small and fast without a build system.

- Use semantic HTML5, CSS3 and minimal vanilla JavaScript only.
- Use no frameworks, UI libraries or framework-derived utility systems.
- Load scripts with `defer` unless an earlier execution point is necessary.
- Keep shared CSS and JavaScript in cacheable external files.
- Load only required Manrope weights and subsets.
- Optimise PNG files before publishing and use responsive image sources.
- Avoid third-party scripts unless their value, privacy impact and performance cost are understood.
- Prevent layout shift by reserving image and component space.
- Check page weight and Core Web Vitals before significant releases.

## 18. Motion

Motion should clarify a change, not decorate the page.

- Use short, subtle transitions for menu state, disclosure and focus-related feedback.
- Avoid continuous animation, parallax and attention-seeking movement.
- Do not delay access to content for an entrance animation.
- Animate transform and opacity when possible rather than layout properties.
- Provide a reduced-motion alternative through `prefers-reduced-motion: reduce`.
- Never rely on animation alone to communicate success, attention or error states.

## 19. Voice and Tone

Write in plain, direct English. Explain the useful fact first and the supporting detail second.

- Address the user as “you”.
- Use “Did You Pay?” for the product name, including the question mark.
- Prefer short sentences and familiar payment, parking and travel language.
- Be reassuring without making guarantees.
- State limitations and user responsibilities clearly.
- Describe permissions such as location and notifications in terms of why they help the user.
- Use calm, actionable error messages: explain what happened and what the user can do next.
- Avoid blame, legal jargon where plain language is possible, exaggerated claims and artificial urgency.

Example: “Turn on notifications so Did You Pay? can remind you at the right time.”

Avoid: “Enable notifications immediately or you may receive a costly fine.”

## 20. Website Structure

The static site is hosted on GitHub Pages and uses root-relative project files without a framework or build step.

```text
/
├── index.html
├── faq.html
├── supported-locations.html
├── privacy.html
├── terms.html
├── contact.html
├── release-notes.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
├── assets/
├── DESIGN_SYSTEM.md
└── README.md
```

- `index.html`: product overview, key benefit and primary action.
- `faq.html`: common questions about reminders, setup, permissions and payments.
- `supported-locations.html`: supported parking and road charge locations or schemes.
- `privacy.html`: privacy policy and clear explanation of data use.
- `terms.html`: terms of use and product limitations.
- `contact.html`: support options and contact information.
- `release-notes.html`: meaningful website and app changes.
- `404.html`: useful recovery route when a page is not found.

Use the shared stylesheet and script on every page. Keep repeated header, navigation and footer markup aligned across all HTML files while the site remains build-free.

## 21. Implementation Notes for Codex

Every future Codex change to this repository must follow `DESIGN_SYSTEM.md`.

- Read this document before changing content, styling, components, assets or interactions.
- Use HTML5, CSS3 and vanilla JavaScript only. Do not introduce React, Next.js, Vue, Angular, Bootstrap, Tailwind or any other framework.
- Keep JavaScript minimal and preserve useful no-JavaScript behaviour.
- Build mobile-first, then test responsive behaviour across and between the documented breakpoints.
- Reuse the shared header, navigation, footer, buttons and card styles on all pages.
- Use semantic HTML and native browser controls before adding ARIA or custom interactions.
- Do not invent final colours. Leave semantic values as TODO until the palette is approved.
- Use Manrope with the documented fallback and loading strategy once approved font files are available.
- Use optimised PNG assets from approved master files; do not introduce SVG unless this document is intentionally revised.
- Check accessibility, keyboard behaviour, local links, responsive layout and image sizing before completing a change.
- Update this document when an approved design decision supersedes a TODO or changes a shared pattern.

### Open TODOs

- Add and document the approved logo master PNG.
- Add and document the approved app icon master PNG, then export favicon sizes.
- Approve semantic colour values and interaction-state colours.
- Confirm approved Manrope font files, source and required weights.
- Select and document the contact/support channel before building a form.
- Define production export sizes for logos, icons and app screenshots.
