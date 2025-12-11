import { tours } from "../data/tours.mjs";

const showHere = document.querySelector("#alltours");
const categoryFilter = document.querySelector("#categoryFilter");
const reviewFilter = document.querySelector("#reviewFilter");
const searchInput = document.querySelector("#searchInput");

const modal = document.querySelector("#bookingModal");
const closeBtn = document.querySelector("#closeModal");
const form = document.querySelector("#bookingForm");

const successModal = document.querySelector("#successModal");
const successMessage = document.querySelector("#successMessage");
const closeSuccess = document.querySelector("#closeSuccess");

// ✅ Variable to store selected tour name
let selectedTourName = "";

// Convert numeric review → stars
function getStars(num) {
  return "⭐".repeat(num);
}

// Render cards
function displayPlaces(places) {
  showHere.innerHTML = "";

  places.forEach(x => {
    const thecard = document.createElement("div");

    const thetitle = document.createElement("h2");
    thetitle.innerText = x.name;
    thecard.appendChild(thetitle);

    const thephoto = document.createElement("img");
    thephoto.src = `images/${x.photo_url}`;
    thephoto.alt = x.name;
    thecard.appendChild(thephoto);

    const thedesc = document.createElement("p");
    thedesc.innerText = x.description;
    thecard.appendChild(thedesc);

    const review = document.createElement("r");
    review.innerText = getStars(x.review);
    thecard.appendChild(review);

    const theaddress = document.createElement("address");
    theaddress.innerText = x.address;
    thecard.appendChild(theaddress);

    // ✅ Add booking button
    const btn = document.createElement("button");
    btn.innerText = "Book Tour";
    btn.classList.add("book-btn");

    // ✅ Store tour name when opening modal
    btn.onclick = () => openBookingModal(x.name);

    thecard.appendChild(btn);

    showHere.appendChild(thecard);
  });
}

// ✅ Open booking modal and store tour name
function openBookingModal(tourName) {
  selectedTourName = tourName;
  modal.showModal();
}

// Close booking modal
closeBtn.addEventListener("click", () => modal.close());

// ✅ Handle form submit (with tour name)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const name = data.get("name");
  const email = data.get("email");
  const date = data.get("date");
  const people = data.get("people");

  // ✅ Build confirmation message including tour name
  const message = `
Tour:  ${selectedTourName}
Name:  ${name}
Email:  ${email}
Date:  ${date}
People:  ${people}
  `;

  modal.close();
  form.reset();

  successMessage.textContent = message;
  successModal.showModal();
});

// Close success modal
closeSuccess.addEventListener("click", () => successModal.close());

// Apply filters + search
function applyFilters() {
  let filtered = [...tours];

  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter(t => t.category === selectedCategory);
  }

  const selectedReview = reviewFilter.value;
  if (selectedReview !== "all") {
    filtered = filtered.filter(t => t.review === Number(selectedReview));
  }

  const searchText = searchInput.value.toLowerCase().trim();
  if (searchText !== "") {
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(searchText) ||
      t.description.toLowerCase().includes(searchText)
    );
  }

  if (filtered.length === 0) {
    showHere.innerHTML = '<p class="no-results">No tours match your filters.</p>';
  } else {
    displayPlaces(filtered);
  }
}

// Event listeners
categoryFilter.addEventListener("change", applyFilters);
reviewFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);

// Initial load
displayPlaces(tours);
