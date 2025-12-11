// ✅ CLIENT FORM
const clientForm = document.querySelector("#clientForm");
const clientSuccess = document.querySelector("#clientSuccess");
const clientSuccessMessage = document.querySelector("#clientSuccessMessage");
const closeClientSuccess = document.querySelector("#closeClientSuccess");

clientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(clientForm);

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");
  const newsletter = data.get("newsletter") ? "Yes" : "No";

  const confirmation = `
Name: ${name}
Email: ${email}
Message: ${message}
Newsletter Subscription: ${newsletter}
  `;

  clientForm.reset();
  clientSuccessMessage.textContent = confirmation;
  clientSuccess.showModal();
});

closeClientSuccess.addEventListener("click", () => clientSuccess.close());


// ✅ BUSINESS FORM
const businessForm = document.querySelector("#businessForm");
const businessSuccess = document.querySelector("#businessSuccess");
const businessSuccessMessage = document.querySelector("#businessSuccessMessage");
const closeBusinessSuccess = document.querySelector("#closeBusinessSuccess");

businessForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(businessForm);

  const company = data.get("company");
  const contact = data.get("contact");
  const email = data.get("email");
  const type = data.get("type");
  const message = data.get("message");

  const confirmation = `
Company: ${company}
Contact Person: ${contact}
Email: ${email}
Business Type: ${type}
Message: ${message}
  `;

  businessForm.reset();
  businessSuccessMessage.textContent = confirmation;
  businessSuccess.showModal();
});

closeBusinessSuccess.addEventListener("click", () => businessSuccess.close());
