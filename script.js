// =========================================================
// DARK / LIGHT MODE
// =========================================================

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
} else {
    themeToggle.textContent = "🌙";
}


// Toggle theme when button is clicked

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const darkModeEnabled =
        document.body.classList.contains("dark-mode");

    if (darkModeEnabled) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light mode");

        localStorage.setItem("theme", "dark");

    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");

        localStorage.setItem("theme", "light");
    }

});


// =========================================================
// CONTACT FORM
// =========================================================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Message Sent Successfully!");

        contactForm.reset();

    });

}
