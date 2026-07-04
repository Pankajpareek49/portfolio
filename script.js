const words = ["Aspiring Data Science", "Python Explorer", "Data Analytics", "AI/ML Student"];

let wordIndex = 0;
let charIndex = 0;
const typingText = document.querySelector(".typing-text");

function typeEffect() {
    if (!typingText) return;

    if (charIndex < words[wordIndex].length) {
        typingText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (!typingText) return;

    if (charIndex > 0) {
        typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
    }
}

typeEffect();

const hiddenElements = document.querySelectorAll(".about, .skills, .projects, .education, .certificates, .contact");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
    if (progressBar) {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    }

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove("active"));

            let activeLink = document.querySelector(`header nav a[href="#${id}"]`);

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
});

const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    topBtn.onclick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}

const themeBtn = document.getElementById("theme-toggle");

if (themeBtn) {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        themeBtn.innerHTML = "☀️ Theme";
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeBtn.innerHTML = "☀️ Theme";
            localStorage.setItem("theme", "light");
        } else {
            themeBtn.innerHTML = "🌙 Theme";
            localStorage.setItem("theme", "dark");
        }
    });
}

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuBtn.innerHTML = navMenu.classList.contains("active") ? "✖" : "☰";
    });

    document.querySelectorAll("#nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuBtn.innerHTML = "☰";
        });
    });
}
