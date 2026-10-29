const menuButton = document.querySelector("#menuBtn");
const navigation = document.querySelector("#navMenu");
const header = document.querySelector(".header");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const pageLoader = document.querySelector("#pageLoader");
if (pageLoader) {
    const loaderStartedAt = performance.now();
    let loaderTimeout;

    const dismissPageLoader = () => {
        if (pageLoader.hidden || pageLoader.classList.contains("is-hiding")) return;

        window.clearTimeout(loaderTimeout);
        pageLoader.setAttribute("aria-hidden", "true");
        pageLoader.classList.add("is-hiding");
        document.documentElement.classList.remove("is-loading");

        window.setTimeout(() => {
            pageLoader.hidden = true;
        }, 450);
    };

    pageLoader.hidden = false;
    document.documentElement.classList.add("is-loading");
    loaderTimeout = window.setTimeout(dismissPageLoader, 4000);
    window.addEventListener("load", () => {
        const minimumDisplayTime = 600;
        const elapsed = performance.now() - loaderStartedAt;
        window.setTimeout(dismissPageLoader, Math.max(0, minimumDisplayTime - elapsed));
    }, { once: true });
}

function setMenuOpen(isOpen) {
    if (!menuButton || !navigation) return;

    navigation.classList.toggle("show", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
    document.body.classList.toggle("menu-open", isOpen);
}

menuButton?.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation?.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
    }
});

const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const navigationLinks = [...document.querySelectorAll(".nav-link")];
const navigationSections = navigationLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

if ("IntersectionObserver" in window) {
    const navigationObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                navigationLinks.forEach(link => {
                    const isCurrent = link.hash === `#${entry.target.id}`;
                    link.classList.toggle("active", isCurrent);
                    if (isCurrent) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        },
        { rootMargin: "-30% 0px -60% 0px" }
    );

    navigationSections.forEach(section => navigationObserver.observe(section));
}

const revealElements = document.querySelectorAll(".reveal");
const canAnimate = !reduceMotion.matches;

if (canAnimate && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(element => revealObserver.observe(element));
}

const year = document.querySelector("#currentYear");
if (year) year.textContent = String(new Date().getFullYear());

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
let lastFocusedElement;

document.querySelectorAll("[data-lightbox]").forEach(item => {
    item.addEventListener("click", () => {
        const image = item.querySelector("img");
        if (!image || !lightbox || !lightboxImage || !lightboxCaption) return;

        lastFocusedElement = item;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = item.dataset.caption || image.alt;
        lightbox.showModal();
    });
});

document.querySelector(".lightbox-close")?.addEventListener("click", () => {
    lightbox?.close();
});

lightbox?.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        event.preventDefault();
        lightbox.close();
    }
});

lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.close();
});

lightbox?.addEventListener("close", () => {
    if (lightboxImage) lightboxImage.removeAttribute("src");
    lastFocusedElement?.focus();
});

const cursor = document.querySelector(".custom-cursor");
const finePointer = window.matchMedia("(pointer: fine)");

if (cursor && finePointer.matches && canAnimate) {
    document.body.classList.add("cursor-active");
    let pointerX = -100;
    let pointerY = -100;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let frameRequested = false;

    const drawCursor = () => {
        cursorX += (pointerX - cursorX) * 0.18;
        cursorY += (pointerY - cursorY) * 0.18;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        frameRequested = false;

        if (Math.abs(pointerX - cursorX) > 0.5 || Math.abs(pointerY - cursorY) > 0.5) {
            frameRequested = true;
            requestAnimationFrame(drawCursor);
        }
    };

    window.addEventListener("pointermove", event => {
        pointerX = event.clientX;
        pointerY = event.clientY;

        if (!frameRequested) {
            frameRequested = true;
            requestAnimationFrame(drawCursor);
        }
    }, { passive: true });

    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("pointerenter", () => cursor.classList.add("is-hovering"));
        element.addEventListener("pointerleave", () => cursor.classList.remove("is-hovering"));
    });
}
