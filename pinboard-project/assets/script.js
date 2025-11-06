document.addEventListener("DOMContentLoaded", () => {
  const sizePicker = document.getElementById("sizePicker");
  const colorPicker = document.getElementById("colorPicker");
  const input = document.getElementById("userInput");
  const board = document.getElementById("board");
  const listViewBtn = document.getElementById("listViewBtn");
  const cardViewBtn = document.getElementById("cardViewBtn");


  function isColorDark(hexColor) {
    if (!hexColor) return false;
    hexColor = hexColor.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128; 
  }


  listViewBtn.addEventListener("click", () => {
    document.body.classList.remove("card-view");
    document.body.classList.add("list-view");
    listViewBtn.classList.add("active");
    cardViewBtn.classList.remove("active");
  });


  cardViewBtn.addEventListener("click", () => {
    document.body.classList.remove("list-view");
    document.body.classList.add("card-view");
    cardViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  });


  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && input.value.trim() !== "") {
      addNote(input.value, sizePicker.value, colorPicker.value);
      input.value = "";
    }
  });


  function addNote(text, sizeClass, color) {
    const note = document.createElement("li");
    note.textContent = text;
    note.classList.add(sizeClass);
    note.style.backgroundColor = color;

  
    if (isColorDark(color)) {
      note.style.color = "#ffffff"; 
    } else {
      note.style.color = "#0d0d0d"; 
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => note.remove());
    note.appendChild(deleteBtn);

    board.prepend(note);
  }
});

