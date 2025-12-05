const messageArea = document.querySelector("#message");
const lastVisit = localStorage.getItem("lastVisit");

/* current timestamp */
const now = Date.now();

if (!lastVisit) {
    /*FIRST VISIT*/
    messageArea.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const difference = now - Number(lastVisit);
    
    /* Convert to full days */
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days < 1) {
        messageArea.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        messageArea.textContent = "You last visited 1 day ago.";
    } else {
        messageArea.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);
