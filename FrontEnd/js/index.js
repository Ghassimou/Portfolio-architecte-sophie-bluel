let allWorks = []; // Variable pour stocker toutes les données de travaux
// Elle recoit la liste des projets à afficher
function displayGallery(works) {
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
// Elle recupere la list de tous projets puis appelle la fonction qui les affiches
function fetchGallery() {
  let url = "http://localhost:5678/api/works";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allWorks = data; // Sauvegarde les projets dans la variable allWorks
      displayGallery(data); // Applle à la fonction qui affiche les projets
    })
    .catch((error) => {
      console.error("Erreur : " + error);
    });
}
/* ********************************************************** */
// Fonction handleFilter, gére les filtres
function handleFilter(filterId) {
  const filteredWorks = allWorks.filter((work) => {
    if (filterId === "Tous") {
      return true; // Afficher tous les travaux si "Tous" est sélectionné
    } else {
      return work.category.id === filterId; // Filtrer par catégorie
    }
  });

  // Met à jour la galerie d'affichage avec les travaux filtrés
  displayGallery(filteredWorks);

  /* ********************************************************** */

  // Capture des éléments boutons category_filter
  const categoryButtons = document.querySelectorAll("#filters button");

  // Enlever les classes "active" de tous les boutons category_filter
  categoryButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Capture de l'élément bouton default_filter
  const defaultButton = document.querySelector(".default_filter");

  // Si l'élément default_filter est Tous et que filtreId est Tous ajoute la classe "active"
  if (defaultButton.textContent === "Tous" && filterId === "Tous") {
    defaultButton.classList.add("active");
  } else {
    defaultButton.classList.remove("active");
  }
}
/* ***************************************************** */
/* ***************************************************** */

function displayFilters() {
  let url = "http://localhost:5678/api/categories";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // Capture de l'élément classe "filters"
      const filtersParent = document.getElementById("filters");
      // Création de l'élément bouton
      const defaultButton = document.createElement("button");
      // Ajout de la classe "default_filter" dans l'élément bouton
      defaultButton.classList.add("default_filter");
      defaultButton.classList.add("active");
      // Affichage des éléments créés dans le html
      defaultButton.textContent = "Tous";
      // Adding Mouse Click
      defaultButton.addEventListener("click", function () {
        handleFilter("Tous");
      });
      filtersParent.appendChild(defaultButton);

      for (let category of data) {
        // Création de 3 éléments bouton
        const button = document.createElement("button");
        // Ajout de la classe "category_filter" dans les 3 éléments boutons
        button.classList.add("category_filter");
        // Affichage des 3 éléments dans le html
        button.textContent = category.name;
        // Adding Mouse Click
        button.addEventListener("click", function () {
          handleFilter(category.id);
          // Ajout de la classe "active" dans les 3 éléments boutons
          button.classList.add("active");
        });

        filtersParent.appendChild(button);
      }
    })
    .catch((error) => {
      console.error("Erreur : " + error);
    });
}

/* ********************************************************** */
/* ********************************************************** */
//Appel des fonctions
fetchGallery();
displayFilters();
/* ********************************************************** */
/* ********************************************************** */

function loginStatus() {
  const userAdmin = localStorage.getItem("token");
  if (userAdmin) {
    const logOut = document.getElementById("logOut");
    logOut.style.display = "flex";

    const logIn = document.getElementById("logIn");
    logIn.style.display = "none";
  } else {
    const logOut = document.getElementById("logOut");
    logOut.style.display = "none";

    const logIn = document.getElementById("logIn");
    logIn.style.display = "flex";

    const handleEdit = document.querySelector(".handle_edit");
  
    handleEdit.style.display = "none";

    const adminDashbord = document.querySelector(".adminDashbord");
    adminDashbord.style.display = "none";
  }
}

logOut.addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Vous êtes déconnecté.");
  loginStatus();
});

loginStatus();

/* ********************************************************** */
/* ********************************************************** */
//Affichage de la gallerie
function displayModalGallery(works) {
  const gallery = document.querySelector(".modal-gallery");
  gallery.innerHTML = ""; // reinitialisation de la gallerie
  for (let work of works) {
    const figure = document.createElement("figure");
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.className = "button_delete";
    figure.appendChild(deleteButton);
    const projectImage = document.createElement("img");
    projectImage.src = work.imageUrl;
    projectImage.alt = work.title;
    figure.appendChild(projectImage);
    gallery.appendChild(figure);
    deleteButton.addEventListener("click", () => deleteImage(work.id));
  }
}
/* ********************************************************** */
/* ********************************************************** */
// Window modal gallery
let modal = null;
const openModal = function (e) {
  e.preventDefault();
  document.body.style.overflow = 'hidden';
  // Capture de l'attribut href
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
  // displayImage(allWorks);
};

/* ********************************************************** */
/* ********************************************************** */
const closeModal = function (e) {
  if (modal === null) return;
  if (e !== null) e.preventDefault();
  document.body.style.overflow = 'scroll'; 
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
// Window modalAdd gallery
let modalAdd = null;
const modalAddPicture = function () {
  const openModalAdd = document.getElementById("modal-add");
  openModalAdd.style.display = null;
  modal.style.display = "none";
  modalAdd = openModalAdd;
  modalAdd.addEventListener("click", closeModalAdd);
  modalAdd.querySelector(".js-close-icon").addEventListener("click", closeModalAdd);
  modalAdd
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

/* ********************************************************** */
/* ********************************************************** */

// Fermeture de la modal
const closeModalAdd = function (e) {
  if (modalAdd === null) return;
  if (e !== null) e.preventDefault();
  modalAdd.style.display = "none";
  modalAdd.removeEventListener("click", closeModalAdd);
  modalAdd = null;

  clearModalAddFields();
};

/* ********************************************************** */
/* ********************************************************** */
// Function redirection sur le modalAdd
const backModal = function () {
  modalAdd.style.display = "none";
  modal.style.display = null;
  modalAdd.addEventListener("click", closeModalAdd);
  modalAdd = null;
};

/* ********************************************************** */
/* ********************************************************** */

// Fonction pour empecher la propagation
const stopPropagation = function (e) {
  e.stopPropagation();
};

//**********************************************************
// Mes fonction click (addEventListener)
//**********************************************************

// Appel à la fonction clique ouverture de la modalPreview
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

// Appel à la fonction clique ouverture de la modalAdd
const addPicture = document.getElementById("add-picture");
addPicture.addEventListener("click", function (e) {
  e.preventDefault();
  modalAddPicture();
});

// Appel à la fonction fermeture de la modalAdd
const backModalAdd = document.querySelector(".js-back-icon");
backModalAdd.addEventListener("click", (e) => {
  e.preventDefault();
  backModal();
});

//**********************************************************
//**********************************************************

//Téléchargment et traitement de l'image
const inputUploadFile = document.getElementById("input_upload_file");
const btnUploadFile = document.getElementById("btn_upload_file");

// On simule le click sur le boutton l'abel
btnUploadFile.onclick = () => {
  inputUploadFile.click();
};

// Ajout d' un événement change sur la fonction preview file
inputUploadFile.addEventListener("change", previewFile);

function previewFile() {
  // Verification de l'extension du fichier
  const file_extension_regex = /\.(jpe?g|png|gif)$/i;

  // Traitement de l'extension du fichier
  if (
    this.files.length === 0 ||
    !file_extension_regex.test(this.files[0].name)
  ) {
    alert("ceci n'est pas une image");
  }
  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);

  // Fonction de chargement des images dans la gallerie
  file_reader.addEventListener("load", (event) => displayImage(event, file));
}

// Affichage des images dans la gallerie
function displayImage(event, file) {
  const fileUrl = event.target.result;
  const displayPicture = document.createElement("img")
  displayPicture.src = fileUrl;
  displayPicture.id = "display-picture"
  const picturePreview = document.querySelector(".picture_preview");
  picturePreview.appendChild(displayPicture);
  const fileUploder = document.querySelector(".file_uploder");
  fileUploder.style.display = "none"
}

function resetForm() {
 const displayPicture = document.getElementById("display-picture")
 displayPicture.remove()
  const fileUploder = document.querySelector(".file_uploder");
  fileUploder.style.display = "block"
}

//**********************************************************
//**********************************************************

//Supression de l'image dans la gallerie
const deleteImage = function (workId) {
  const token = localStorage.getItem("token");
  if (confirm("Êtes vpous sur de vouloir supprimer cette image?")) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      body: null,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          alert("L'image a bien été supprimée.");
          fetchGallery();
          closeModal(null);
        } else {
          alert("Une erreur s'est produite lors de la suppression de l'image.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête de suppression :", error);
      });
  }
};

// *********************************************************
// *********************************************************

// Récupération de l'élément formulaire
const form = document.getElementById("form");

// Récupération de l'élément champ input

const inputTitle = document.getElementById("input_title");
const categorySelect = document.getElementById("category_select");

// Fonction pour envoyer l'image
const sendImage = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("image", inputUploadFile.files[0]);
  formData.append("title", inputTitle.value);
  formData.append("category", categorySelect.value);

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      alert("L'image a bien été envoyée.");
      fetchGallery();
      closeModalAdd(null);
      clearModalAddFields();
      resetForm();
    } else {
      alert("Veillez remplir tous les champs du formulaire.");
    }
  } catch (error) {
    console.error("Erreur lors de la requête à l'API :", error);
  }
};

// *********************************************************
function background() {
  const inputTitle = document.getElementById("input_title");
  const categorySelect = document.getElementById("category_select");
  const submitBtn = document.querySelector(".submit_btn");

  if (inputTitle.value !== "" && categorySelect.value !== "0") {
    submitBtn.style.background = "#1D6154";
  } else {
    submitBtn.style.background = "#A7A7A7";
  }
}

// *********************************************************

// Ajout d'un écouteur d'événements sur le formulaire pour le click sur le bouton submit
form.addEventListener("submit", sendImage);
form.addEventListener("change", background);

//**********************************************************
// *********************************************************

// Suppression des champs de saissie et d image
function clearModalAddFields() {
  const inputTitle = document.getElementById("input_title");
  const categorySelect = document.getElementById("category_select");

  inputTitle.value = "";
  categorySelect.value = "0";
}

//**********************************************************
// *********************************************************
