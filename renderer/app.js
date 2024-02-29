//Modules
const { ipcRenderer } = require("electron");
let showModal = document.getElementById("show-modal");
let closeModal = document.getElementById("close-modal");
let modal = document.getElementById("modal");
let addItem = document.getElementById("add-item");
let itemUrl = document.getElementById("url");

//Disable & Enable modal button
const toggleModalButton = () => {
  //Check state of buttons
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = "Add Item";
    closeModal.style.display = "inline";
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = "Adding...";
    closeModal.style.display = "none";
  }
};

//Show modal
showModal.addEventListener("click", (e) => {
  modal.style.display = "flex";
  itemUrl.focus();
});

//Hide modal
closeModal.addEventListener("click", (e) => {
  modal.style.display = "none";
});

//Handle new item
addItem.addEventListener("click", (e) => {
  //Check a url exist
  if (itemUrl.value) {
    //Send new item url to main
    ipcRenderer.send("new-item", itemUrl.value);

    //Disable button
    toggleModalButton();
  }
});

//Listen for item from main process
ipcRenderer.on("new-item-success", (e, newItem) => {
  //Enable button
  toggleModalButton();

  //Hide modal and clear value
  modal.style.display = "none";
  itemUrl.value = "";
});
//Listen for keyboard submit
itemUrl.addEventListener("keyup", (e) => {
  if (e.key === "enter") {
    addItem.click();
  }
});
