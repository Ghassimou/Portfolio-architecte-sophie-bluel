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

// *********************************************************
// *********************************************************

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

// *********************************************************
// *********************************************************

const closeModal = function (e) {
  if (modal === null) return;
  if (e !== null) e.preventDefault();
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

// *********************************************************
// *********************************************************

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

// *********************************************************
// *********************************************************

// le code ne fonctionne pas
const closeModal2 = function (e) {
  if (modal2 === null) return;
  if (e !== null) e.preventDefault();
  modal2.style.display = "none";
  modal2.removeEventListener("click", closeModal2);
  modal2 = null;
  clearModal2Fields();
};

// *********************************************************
// *********************************************************

//function rdirection sur le modal 1
const backModal = function () {
  modal2.style.display = "none";
  modal.style.display = null;
  modal2.addEventListener("click", closeModal2);
  modal2 = null;
};

// *********************************************************
// *********************************************************

//fonction pour empecher la propagation
const stopPropagation = function (e) {
  e.stopPropagation();
};

//**********************************************************
// Mes fonction et addEventListener
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
};

input_upload_file.addEventListener("change", previewFile);

//Traitement et verification des fichier reçu
function previewFile() {
  //Verification de l'extension du fichier
  const file_extension_regex = /\.(jpe?g|png|gif)$/i;

  if (
    this.files.length === 0 ||
    !file_extension_regex.test(this.files[0].name)
  ) {
    alert("Ceci n'est pas une image");
  }
  const file = this.files[0];
  const file_reader = new FileReader();
  file_reader.readAsDataURL(file);

  //Fonction de chargement des images dans la gallerie
  file_reader.addEventListener("load", (event) => displayImage(event, file));
}

//Affichage des images dans la gallerie
function displayImage(e, file) {
  const fileUrl = e.target.result;
  const displayPicture = `<img src="${fileUrl}" alt="image" />`;
  const picturePreview = document.querySelector(".picture_preview");
  picturePreview.innerHTML = displayPicture;
}
// *********************************************************
/* ************************************************** */
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
// *********************************************************

// Récupération de l'élément formulaire
const form = document.getElementById("form");

// Récupération de l'élément champ input
const inputUploadFile = document.getElementById("input_upload_file");
const inputTitle = document.getElementById("input_title");
const categorySelect = document.getElementById("category_select");

// Initialisation de la constance FormData
// const formData = new FormData();

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
      closeModal2(null);
      clearModal2Fields();
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

  if (
    inputTitle.value !== "" 
    && categorySelect.value !== "0") 
    {
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
//Suppression des champs de saissie et d image
function clearModal2Fields() {
  console.log(clearModal2Fields, "Function vide champs");
// const inputUploadFile = document.getElementById("input_upload_file");
const inputTitle = document.getElementById("input_title");
const categorySelect = document.getElementById("category_select");

  inputUploadFile.value = "";
  inputTitle.value = "";
  categorySelect.value = "0";
}
