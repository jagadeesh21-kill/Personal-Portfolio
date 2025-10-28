
/* Helpers */
const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

/* set current year   email */
document.getElementById('year').textContent = new Date().getFullYear();
(function initEmailJS(){
  const EMAILJS_USER_ID = 'ux2DI1S8pan4gr2QR'; // e.g. user_xxx or publicKey_xxx
  if (EMAILJS_USER_ID && EMAILJS_USER_ID !== 'ux2DI1S8pan4gr2QR') {
    emailjs.init(EMAILJS_USER_ID);
  } else {
    console.warn('EmailJS user ID not configured. Replace YOUR_EMAILJS_USER_ID in script.js.');
  }
})();

/* Popup logic email  */
const popup = $('#popup');
function openPopup(){ popup.style.display = 'grid'; popup.setAttribute('aria-hidden','false'); $('#from_name').focus(); }
function closePopup(){ popup.style.display = 'none'; popup.setAttribute('aria-hidden','true'); }

/* Form submit */
const hireForm = $('#hireForm') || document.getElementById('hireForm'); // safe get
const formStatus = $('#formStatus');

 // HANDLE FORM SUBMIT email
 (function() {
  emailjs.init('ux2DI1S8pan4gr2QR'); // your public key
})();
  hireForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formStatus.textContent = 'Sending...';

    const SERVICE_ID = 'service_5wdzy96';
    const TEMPLATE_ID = 'template_fwtlnm7';

    // send via EmailJS
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, '#hireForm')
      .then(() => {
        formStatus.textContent = 'Message sent — I will reply soon!';
        hireForm.reset();
        setTimeout(() => { formStatus.textContent = ''; closePopup(); }, 1400);
      }, (err) => {
        console.error('EmailJS error:', err);
        formStatus.textContent = 'Failed to send. Try again later.';
      });
  });


/* Theme toggle: light/dark*/
 
// THEME TOGGLE
// const themeToggle = document.getElementById("themeToggle");
// themeToggle.addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
//   const icon = themeToggle.querySelector("i");
//   if (document.body.classList.contains("dark-mode")) icon.className = "fas fa-moon";
//   else icon.className = "fas fa-sun";
//   localStorage.setItem("prefersDark", document.body.classList.contains("dark-mode") ? "1" : "0");
// });

// load saved theme
if (localStorage.getItem("prefersDark") === "1") {
  document.body.classList.add("dark-mode");
  document.querySelector("#themeToggle i").className = "fas fa-moon";
}

/* preserve theme across reloads */
if (localStorage.getItem('prefersDark') === '1') {
  document.body.classList.add('dark-mode');
  $('#themeToggle i').className = 'fas fa-moon';
}

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

/* small accessibility: close popup on ESC */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});
