/* URL params */
const params = new URLSearchParams(window.location.search);

function populate(fieldId, paramName) {
    const el = document.getElementById(fieldId);
    if (el) el.textContent = params.get(paramName) || "";
}

populate("firstName", "first-name");
populate("lastName", "last-name");
populate("email", "email");
populate("mobile", "mobile");
populate("organization", "organization");

/* Timestamp */
window.addEventListener("DOMContentLoaded", () => {
    const timestampEl = document.getElementById("timestamp");
    if (timestampEl) {
        const now = new Date().toLocaleString(); 
        timestampEl.textContent = now;
    }
});

/* dialog> modals */
document.addEventListener("click", (event) => {
    if (event.target.matches("[data-dialog]")) {
        const id = event.target.getAttribute("data-dialog");
        const dialog = document.getElementById(id);
        if (dialog) dialog.showModal();
    }

    if (event.target.matches(".close-dialog")) {
        const dialog = event.target.closest("dialog");
        dialog.close();
    }
});
