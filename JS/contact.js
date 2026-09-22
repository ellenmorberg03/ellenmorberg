// Initialize EmailJS with your API key
    emailjs.init("YQd4V3SLs5dA-014VziHn");

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  try {
    // Hämtar värden från formuläret
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const subject = document.querySelector("#subject").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Kontrollerar att alla fält är ifyllda
    if (!name || !email || !subject || !message) {
      formMessage.textContent = "Vänligen fyll i alla fält.";
      return;
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    if (!validateEmail(email)) {
      formMessage.textContent = "Vänligen ange en giltig e-postadress.";
      return;
    }

    // Visar bekräftelse
    formMessage.textContent =
      "Tack för ditt meddelande! Jag återkommer så snart som möjligt.";


    // Skickar e-post via EmailJS
    emailjs.send("service_rytcrmc", "template_sm03g3o", {
      name: name,
      email: email,
      subject: subject,
      message: message
    }).then(function() {
      console.log("E-post skickad!");
    }, function(error) {
      console.log("Fel vid skickning av e-post:", error);
      formMessage.innerHTML =
        "<p class='error'>Något gick fel vid sändningen. Försök igen senare.</p>";
    });

    // Tömmer formuläret
    contactForm.reset();

  } catch (error) {
    // Om ett fel uppstår visas ett felmeddelande
    formMessage.innerHTML =
      "<p class='error'>Något gick fel. Försök igen senare.</p>";
  }

});