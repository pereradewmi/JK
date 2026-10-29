# Janiru Kavinda — Artist Website

A cinematic, responsive artist website built with semantic HTML, SCSS, and vanilla JavaScript. The project is static and needs no framework, backend, or build step to run.

## Run locally

Open `index.html` in a browser, or serve the project directory with any static web server. The site uses Google Fonts and temporary Unsplash photography, so those resources need an internet connection.

## Project structure

```text
index.html       Page content and semantic sections
assets/images/   Approved portraits, photography, and release artwork
assets/video/    Official video posters and approved clips
scss/style.scss  Source styles and responsive design
css/style.css    Compiled stylesheet loaded by the page
js/main.js       Navigation, motion, gallery, and page interactions
```

After editing SCSS, compile the stylesheet with Dart Sass:

```bash
npm install -g sass
sass scss/style.scss css/style.css
```

## Replace the placeholders

The artist bio, release titles and dates, official video thumbnail, press photos, public dates, and booking contact are deliberately identified as placeholders. Publish only details and media approved by the artist; the page does not claim unverified awards, milestones, or performances.

- Replace the marked Unsplash images with approved artist photography, artwork, and video stills. Update their alt text when replacing them.
- Store approved local media in `assets/images/` or `assets/video/` and update the corresponding image sources in `index.html`.
- Add confirmed releases and credits to the sound archive. The streaming links currently open searches for Janiru Kavinda, not artist-owned release pages.
- Add official public events only after dates, venues, and ticket links are confirmed.
- Replace the booking-contact placeholder with a verified management email. The button is intentionally disabled until that information is available.
- Update the artist biography and milestones with approved, accurate information.

## Motion and accessibility

Scroll reveals use the browser's IntersectionObserver API and CSS, with no animation-library CDN required. The responsive navigation supports keyboard dismissal; the visual gallery opens images in a native dialog. Reduced-motion preferences disable animations, and the custom cursor is decorative only: the native pointer remains available.

## Deployment

Deploy `index.html`, `css/`, `js/`, and `scss/` to any static host. No compilation is required at deployment time when the compiled `css/style.css` is up to date.
