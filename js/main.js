// ======================================================
// MOBILE MENU
// ======================================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {
        menuBtn.innerHTML = '<i class="ri-close-line"></i>';
    } else {
        menuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
    }

});


// Close mobile menu when clicking a link

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        menuBtn.innerHTML =
            '<i class="ri-menu-4-line"></i>';

    });

});


// ======================================================
// ACTIVE NAVIGATION
// ======================================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {
            link.classList.add("active");
        }

    });

});


// ======================================================
// SIMPLE MUSIC PLAY BUTTON
// ======================================================

const playButtons =
    document.querySelectorAll(".play-btn");

playButtons.forEach(button => {

    button.addEventListener("click", () => {

        const icon =
            button.querySelector("i");

        if (icon.classList.contains("ri-play-fill")) {

            icon.classList.remove("ri-play-fill");
            icon.classList.add("ri-pause-fill");

        } else {

            icon.classList.remove("ri-pause-fill");
            icon.classList.add("ri-play-fill");

        }

    });

});


// ======================================================
// SCROLL REVEAL
// ======================================================

const revealElements =
    document.querySelectorAll(
        ".music-card, .event, .gallery-item, .achievement-item"
    );

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity .7s ease, transform .7s ease";

    revealObserver.observe(element);

});