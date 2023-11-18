function login(email, password) {
  let url = "http://localhost:5678/api/users/login";
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((login) => {
      console.log(login);
      if (login.token) {
        localStorage.setItem("token", login.token);
        alert("Vous êtes connecté.")
        window.location.href = "./index.html";
       
        // logOut.textContent = "logout";
      } else {
        //messsage de erreur loging
        console.error("Le token n'a pas été trouvé");
        span.innerHTML = "Votre adresse e-mail ou mot de passe est incorrecte";
        //créer une span dans le html
        span.classList.add("text-danger");
        span.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Erreur : " + error);
    });
}

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputSubmit = document.getElementById("submit");

let form = document.getElementById("logIn");

//Ecoute du changement état du champs email
form.email.addEventListener("change", function () {
  emailCheck(this);
});

//Ecoute du changement état du champs password
form.password.addEventListener("change", function () {
  passwordCheck(this);
});

// Ecoute du click sur le bouton submit
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (emailCheck(inputEmail) && passwordCheck(inputPassword)) {
    login(inputEmail.value, inputPassword.value);
  }
});

//Fonction et RegExp pour la validation de l'adresse mail
const emailCheck = function (inputEmail) {

  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );

  //Affichage des messages d'erreurs saisie dans champs email
  let small = inputEmail.nextElementSibling;

  //Test de l'expression regulière
  if (emailRegExp.test(inputEmail.value)) {
    // small.innerHTML = "Votre adresse e-mail est validé";
    // small.classList.remove("text-danger");
    // small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Votre adresse e-mail n'est pas valide";
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// fonction pour verfier la validation du mot de passe
const passwordCheck = function (inputPassword) {
  let msg;
  let check = false;

  if (inputPassword.value.length < 4) {
    msg = "Votre mot de passe doit contenir au mois quatres caractères";
  } else if (!/[A-Z]/.test(inputPassword.value)) {
    msg = "Votre mot de passe doit contenir au mois une majuscule ";
  } else if (!/[a-z]/.test(inputPassword.value)) {
    msg = "Votre mot de passe doit contenir au mois une minuscule";
  } else if (!/[0-9]/.test(inputPassword.value)) {
    msg = "Votre de passe doit contenir au mois un chiffre";
  } else {
    msg = "Votre mot de passe est validé";
    check = true;
  }

  //Affichage des messages d'erreurs saisie dans champs password
  let small = inputPassword.nextElementSibling;

  //Test de l'expression regulière
  if (check) {
    small.innerHTML = msg;
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = msg;
    small.classList.remove("text-success");
    small.classList.add("text-danger");
    return false;
  }
};

// *********************************************************
//Gestion administration

// function loginStatus (e) {
  
//   const logOut = document.getElementById("logOut");
//   console.log(logOut, "bouton de connection");
//   const userAdmin = localStorage.getItem("token");
//   console.log(userAdmin, "le token");
//   const adminDashbord = document.querySelector(".js-modal");
//   console.log(adminDashbord, "le modal ajout photo");
//   const filtersParent = document.getElementById("filters");
//   console.log(filtersParent, "les boutons de filtres");
//   const handleEdit = document.querySelector(".handle_edit");
//   console.log(handleEdit, "la barre noir");

//   if (userAdmin) {
//     logOut.textContent = "logout";
//     console.log(logOut, "bouton de deconnection");
//     adminDashbord.style.display = null;
//     handleEdit.style.display = null;
//     filtersParent.style.display = "none"
    
//   } else {
//     logOut.textContent = "login";
//     adminDashbord.style.display = "none";
//   }
// }

// logOut.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(logOut, "click sur bouton de connection");
//   loginStatus();
//   localStorage.removeItem("token");
//   alert("Vous êtes déconnecté.");
// });


