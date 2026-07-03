const words = [
    "Aspiring Data Science",
    "Python Explorer",
    "Data Analytics",
    "AI/ML Student"
];

let wordIndex = 0;
let charIndex = 0;
const typingText = document.querySelector(".typing-text");

function typeEffect() {
    if (charIndex < words[wordIndex].length) {
        typingText.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
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
const hiddenElements = document.querySelectorAll(
    ".about, .skills, .projects, .education, .certificates, .contact"
);

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

hiddenElements.forEach((el)=>{
    el.classList.add("hidden");
    observer.observe(el);
});
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercent = (scrollTop / scrollHeight) * 100;

    document.getElementById("progress-bar").style.width = scrollPercent + "%";

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        }
    });
};
const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{
    if(window.scrollY>300){
        topBtn.style.display="block";
    }else{
        topBtn.style.display="none";
    }
});

topBtn.onclick=()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
};
const themeBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeBtn.innerHTML = "☀️";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeBtn.innerHTML = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.innerHTML = "🌙";
        localStorage.setItem("theme", "dark");
    }
});