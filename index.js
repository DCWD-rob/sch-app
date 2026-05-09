function getTimestamp() {
    return new Date().toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

function saveNote() {
    const title = document.getElementById("title").value.trim();
    const note = document.getElementById("note").value.trim();
    const color = document.getElementById("noteColor").value;

    if (!title && !note) return;

    const timestamp = getTimestamp();
    const notesContainer = document.getElementById("notesContainer");

    const card = document.createElement("div");
    card.className = "note-card";
    card.style.background = color;

    card.innerHTML = `
        <strong>${title || "Untitled"}</strong><br>
        <small>${timestamp}</small><br><br>
        ${note}<br><br>
        <button class="delete-btn">Delete</button>
    `;

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.onclick = () => card.remove();

    notesContainer.appendChild(card);

    document.getElementById("title").value = "";
    document.getElementById("note").value = "";
}
