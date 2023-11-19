let allWorks = []; // Variable pour stocker toutes les données de travaux
// elle recoit la liste les projets a afficher
function displayGallery (works){
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // reinitialisation de la gallerie
  for (let work of works) {
    gallery.innerHTML += `
                <figure>
                <img src="${work.imageUrl}" alt="${work.title}">
                <figcaption>${work.title}</figcaption>
                </figure>`;
  }
}
/* *********************************************************** */
// elle recupere la list de tous projets puis appelle la fonction qui les affiches 
function fetchGallery() {
  let url = "http://localhost:5678/api/works";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {

      allWorks = data//Sauvegarde les projets dans la variable allWorks
      displayGallery(data) // Applle à la fonction qui affiche les projets
    })
    .catch((error) => {
      console.error("Erreur : " + error);
    });
  }
 /* ********************************************************** */
//fonction handleFilter Fonction de gestion du filtre
  function handleFilter(filterId) {
    const filteredWorks = allWorks.filter((work) => {
      if (filterId === "Tous") {
        return true; // Afficher tous les travaux si "Tous" est sélectionné
      } else {
        return work.category.id === filterId; // Filtrer par catégorie
      }
      
    });
    // Mettre à jour la galerie d'affichage avec les travaux filtrés
    displayGallery(filteredWorks);
  }
  
/* ********************************************************** */

function displayFilters() {
  let url = "http://localhost:5678/api/categories";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // création et ajout de la classe "filters" dans l'élément div
      const filtersParent = document.getElementById("filters");
      //création d'un élément bouton par defaut,
      const defaultButton = document.createElement("button");
      // création et ajout de la classe "default_filter" dans l'élément bouton par defaut
      defaultButton.classList.add("default_filter");
      //Affichage des éléments dans le html
      defaultButton.textContent = "Tous";
      // Adding Mouse Click
      defaultButton.addEventListener("click", function () {
        handleFilter("Tous")
      
      });
      filtersParent.appendChild(defaultButton);

      for (let category of data) {
        console.log(data)
        console.log(category)
        //création de 4 éléments bouton
        const button = document.createElement("button");
        //création et ajout de la classe "category_filter" dans l'élément bouton
        button.classList.add("category_filter");
        //Affichage des éléments dans le html
        button.textContent = category.name;
        console.log(category.id)
        /* *************************************************** */
        // Adding Mouse Click
        button.addEventListener("click", function () {
          handleFilter(category.id)
          //(button.textContent);
          /* ************************************************* */
         
          /* ************************************************* */
          
        });
        filtersParent.appendChild(button);
      }
    })
    .catch((error) => {
      console.error("Erreur : " + error);
    });
} 
/* ********************************************************** */
//Appel des fonctions
fetchGallery();
displayFilters();
/* ********************************************************** */
/* ********************************************************** */
//Affichage de la gallerie
function displayModalGallery(works) {
  const gallery = document.querySelector(".modal-gallery");
  gallery.innerHTML = ""; // reinitialisation de la gallerie
  for (let work of works) {
    gallery.innerHTML += `
                <figure>
                <span class="button_delete "><i class="fa-solid fa-trash-can"></i></span>
                <img src="${work.imageUrl}" alt="${work.title}">
                </figure>`;
  }
}
/* ********************************************************** */
/* ********************************************************** */
// *************Window modal gallery****************
let modal = null;
const openModal = function (e) {
  e.preventDefault();
  // recuperation de l'attribut href
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  displayModalGallery(allWorks);
  displayImage(allWorks);
};
/* ********************************************************** */
/* ********************************************************** */
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};
/* ********************************************************** */
/* ********************************************************** */
/* ******* Window modal2 gallery ******** */
let modal2 = null;
const modalAddPicture = function () {
  const openModal2 = document.getElementById("modal2");
  openModal2.style.display = null;
  modal.style.display = "none";
  modal2 = openModal2;
  modal2.addEventListener("click", closeModal2);
  modal2.querySelector(".js-close-icon").addEventListener("click", closeModal2);
  modal2
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};
/* ********************************************************** */
/* ********************************************************** */
// Fermeture de la modale
const closeModal2 = function (e) {
  if (modal2 === null) return;
  e.preventDefault();
  modal2.style.display = "none";
  modal2.removeEventListener("click", closeModal2);
  modal2 = null;
};
/* ********************************************************** */
/* ********************************************************** */
//function rdirection sur le modal 1
const backModal = function () {
  modal2.style.display = "none";
  modal.style.display = null;
  modal2.addEventListener("click", closeModal2);
  modal2 = null;
};

/* ********************************************************** */
/* ********************************************************** */
//fonction pour empecher la propagation
const stopPropagation = function (e) {
  e.stopPropagation();
};
/* ********************************************************** */
/* ********************************************************** */
//**********************************************************
// Mes fonction click (addEventListener)
//**********************************************************
//appel a la fonction ouverture de la modal1
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//appel a la fonction ouverture de la modal2

const addPicture = document.getElementById("add-picture");
addPicture.addEventListener("click", function (e) {
  e.preventDefault();
  modalAddPicture();
});

//appel a la fonction fermeture de la modal
const backModal1 = document.querySelector(".js-back-icon");
backModal1.addEventListener("click", (e) => {
  e.preventDefault();
  backModal();
});
//**********************************************************
//**********************************************************
//Téléchargment et traitement de l'image
const input_upload_file = document.getElementById("input_upload_file");
const btn_upload_file = document.getElementById("btn_upload_file");

// On simule le click sur le boutton l'abel
btn_upload_file.onclick = () => {
  input_upload_file.click();
  console.log(btn_upload_file);
};

input_upload_file.addEventListener("change", previewFile);

function previewFile() {
  console.log(input_upload_file, "toto btn input");

  //Traitement et verification des fichier reçu
  const file_extension_regex = /\.(jpe?g|png|gif)$/i;

  //Verification de l'extension du fichier
  if (
    this.files.length === 0 ||
    !file_extension_regex.test(this.files[0].name)
  ) {
    alert("ceci n'est pas une image");
  }
  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);

  file_reader.addEventListener("load", (event) => displayImage(event, file));
  console.log(file, "toto function load");
}

function displayImage(event, file) {
  console.log(event, "toto function click");
  const fileUrl = event.target.result;
  const displayPicture = `<img src="${fileUrl}" alt="image" />`;
  const picture_preview = document.querySelector(".picture_preview");
  console.log(picture_preview, "toto champs affichage image");
  picture_preview.innerHTML = displayPicture;
}

//**********************************************************
//**********************************************************
//**********************************************************
//**********************************************************

//Affichage de la gallerie
function displayModalGallery(works) {
  const gallery = document.querySelector(".modal-gallery");
  gallery.innerHTML = ""; // reinitialisation de la gallerie
  for (let work of works) {
    gallery.innerHTML += `
                <figure>
                <span class="button_delete "><i class="fa-solid fa-trash-can"></i></span>
                <img src="${work.imageUrl}" alt="${work.title}">
                </figure>`;
  }
}
// *************Window modal gallery****************
let modal = null;
const openModal = function (e) {
  e.preventDefault();
  // recuperation de l'attribut href
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  displayModalGallery(allWorks);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

/* ******* Window modal2 gallery ******** */
let modal2 = null;
const modalAddPicture = function () {
  const openModal2 = document.getElementById("modal2");
  openModal2.style.display = null;
  modal.style.display = "none";
  modal2 = openModal2;
  modal2.addEventListener("click", closeModal2);
  modal2.querySelector(".js-close-icon").addEventListener("click", closeModal2);
  modal2
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

// le code ne fonctionne pas
const closeModal2 = function (e) {
  if (modal2 === null) return;
  e.preventDefault();
  modal2.style.display = "none";
  modal2.removeEventListener("click", closeModal2);
  modal2 = null;
};

//function rdirection sur le modal 1
const backModal = function () {
  modal2.style.display = "none";
  modal.style.display = null;
  modal2.addEventListener("click", closeModal2);
  modal2 = null;
};

//fonction pour empecher la propagation
const stopPropagation = function (e) {
  e.stopPropagation();
};

//**********************************************************
// Mes fonction click (addEventListener)
//**********************************************************
//appel a la fonction ouverture de la modal1
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//appel a la fonction ouverture de la modal2

const addPicture = document.getElementById("add-picture");
addPicture.addEventListener("click", function (e) {
  e.preventDefault();
  modalAddPicture();
});

//appel a la fonction fermeture de la modal
const backModal1 = document.querySelector(".js-back-icon");

backModal1.addEventListener("click", (e) => {
  e.preventDefault();
  backModal();
});

//Appel à la fonction suppression de l'image au clique
const delete_button = document.querySelectorAll(".fa-trash-can");
console.log(delete_button, "btn deleted");

// delete_button.addEventListener("click", (e) => {
//   e.preventDefault();
//   deleteImage();
//   displayModalGallery(allWorks);
// });
document.querySelectorAll(".fa-trash-can").forEach((delete_button) =>{
  addEventListener("click", deleteImage);
});
//**********************************************************
//**********************************************************
/* ************************************** */
//Téléchargment et traitement de l'image
const input_upload_file = document.getElementById("input_upload_file");
const btn_upload_file = document.getElementById("btn_upload_file");

// On simule le click sur le boutton l'abel
btn_upload_file.onclick = () => {
  input_upload_file.click();
  console.log(btn_upload_file);
};

input_upload_file.addEventListener("change", previewFile);

function previewFile() {
  console.log(input_upload_file, "toto btn input");

  //Traitement et verification des fichier reçu
  const file_extension_regex = /\.(jpe?g|png|gif)$/i;

  //Verification de l'extension du fichier
  if (
    this.files.length === 0 ||
    !file_extension_regex.test(this.files[0].name)
  ) {
    alert("ceci n'est pas une image");
  }
  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);

  file_reader.addEventListener("load", (event) => displayImage(event, file));
  console.log(file, "toto function load");
}

function displayImage(event, file) {
  console.log(event, "toto function click");
  const fileUrl = event.target.result;
  const displayPicture = `<img src="${fileUrl}" alt="image" />`;
  const picture_preview = document.querySelector(".picture_preview");
  console.log(picture_preview, "toto champs affichage image");
  picture_preview.innerHTML = displayPicture;
}
/* ************************************************** */
//**********************************************************
//**********************************************************
//**********************************************************