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
      if (login.token) {
        localStorage.setItem("token", login.token);
        window.location.href = "./index.html";
        alert("Vous êtes connecté.")
      } else {
        //messsage de erreur loging
        console.error("Le token n'a pas été trouvé");
        alert("Votre adresse e-mail ou mot de passe est incorrecte")
      }
    })
    .catch((error) => {
      console.error("Erreur : " + error);
      console.error( "Une erreur s'est produite lors de la connexion.");
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
    small.innerHTML = "Votre adresse e-mail est valide";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
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

