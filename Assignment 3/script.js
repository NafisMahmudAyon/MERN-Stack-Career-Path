const themeBtns = document.querySelectorAll('.theme-btn');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let currentTheme = savedTheme || systemTheme;

applyTheme(currentTheme);

themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });
});

function applyTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        themeBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        });
    } else {
        htmlElement.classList.remove('dark');
        themeBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        });
    }
}

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    } else {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

function handleSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    alert(`Thank you, ${name}! Your message has been sent successfully.`);

    event.target.reset();
}

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
});

revealElements.forEach(el => revealObserver.observe(el));

const progressRevealElements = document.querySelectorAll('.reveal-progress');

const progressRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.20,
});

progressRevealElements.forEach(el => progressRevealObserver.observe(el));

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});