// -------------------------------
// IndexedDB Setup
// -------------------------------
let db;
const DB_NAME = "notesDB";
const DB_VERSION = 1;
const STORE_NAME = "notes";

const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = function (event) {
    db = event.target.result;

    if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
};

request.onerror = function () {
    alert("Error opening database");
};

// -------------------------------
// Save Note
// -------------------------------
function saveNote() {
    const title = document.getElementById("title").value.trim();
    const note = document.getElementById("note").value.trim();
    const color = document.getElementById("noteColor").value;

    if (!title || !note) {
        alert("Please enter both a title and a note");
        return;
    }

    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const newNote = {
        title: title,
        note: note,
        color: color,
        created: Date.now()
    };

    store.add(newNote);

    tx.oncomplete = function () {
        alert("Note saved!");
        document.getElementById("title").value = "";
        document.getElementById("note").value = "";
    };

    tx.onerror = function () {
        alert("Error saving note");
    };
}

// -------------------------------
// Show All Notes
// -------------------------------
function showNotes() {
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const request = store.openCursor();

    request.onsuccess = function (event) {
        const cursor = event.target.result;

        if (cursor) {
            const note = cursor.value;

            const card = document.createElement("div");
            card.className = "note-card";
            card.style.background = note.color;

            card.innerHTML = `
                <strong>${note.title}</strong><br>
                <p>${note.note}</p>
                <small>${new Date(note.created).toLocaleString()}</small>
            `;

            container.appendChild(card);
            cursor.continue();
        }
    };
}
