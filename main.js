
// Conectando con firebase
const firebaseConfig = {
    apiKey: "AIzaSyAV-BHio7PaCMDpXgpX0rvNCu__aJ54TGs",
    authDomain: "registro-web-6cc63.firebaseapp.com",
    projectId: "registro-web-6cc63",
    storageBucket: "registro-web-6cc63.appspot.com",
    messagingSenderId: "122476844215",
    appId: "1:122476844215:web:3127002abcf4fb62c3a932"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();
const db = firebase.firestore();

// llamando elementos de html o del DOM
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');
let btnpublicar = document.getElementById('btnpublicar');
let btnFacebook = document.getElementById('btnFacebook');


//Función Registrar
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log("Inicio de sesión correcto");
            cargarJSON();
            contenidoDeLaWeb.classList.replace('ocultar','mostrar');
            formulario.classList.replace('mostrar','ocultar');
            var user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
})


// Función Iniciar Sesión
btnIngresar.addEventListener('click', () => { 
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    console.log("tu email es" + email + " y tu password es " + password);

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("Inició sesión correctamente");
    cargarJSON();
    contenidoDeLaWeb.classList.replace('ocultar','mostrar');
    formulario.classList.replace('mostrar','ocultar');

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
})


// Función Cerrar Sesión
btnCerrarSesion.addEventListener('click', ()=> {
    firebase.auth().signOut().then(() => {
        console.log("Cierre de sesión correcto");
        contenidoDeLaWeb.classList.replace('mostrar','ocultar');
        formulario.classList.replace('mostrar','ocultar'); 

      }).catch((error) => {
        console.log("Error con el cierre de Sesión");
      });
})


// Función estado del usuario: activo o inactivo
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar','mostrar');
      formulario.classList.replace('mostrar','ocultar')
    } else {
      contenidoDeLaWeb.classList.replace('mostrar','ocultar');
      formulario.classList.replace('ocultar','mostrar');
    }
  });


// Función Login con 
btnGoogle.addEventListener('click',()=>{ 
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    console.log("Inició sesión con google");
    cargarJSON();

  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Error de login con google");
  });

})


function cargarJSON () {
  fetch("data1.json")
  .then(function(res){
    return res.json();
  })
  .then((data) => {
    console.log(data);
    let html = '';
    data.forEach((productos) =>{
      html += `
        <div class="producto">
          <p>  ${productos.marca} </p>
          <img src="${productos.img}" width="200px" height="200px">
          <br> 
          <strong> s/${productos.precio} </strong>
        </div>
      `;
    })
    document.getElementById('resultado').innerHTML= html; 
  })
}

//Funcion agregar datos
btnpublicar.addEventListener('click', () => {
  db.collection("comentario").add({
    titulo: txttitulo = document.getElementById('txttitulo').value,
    descripcion: txtdescripcion = document.getElementById('txtdescripcion').value,
  })
    .then((docRef) => {
      console.log("se guardo tu comentario correctamente: ", docRef.id);
      imprimirComentariosEnPantalla();
    })
    .catch((error) => {
      console.error("Error al enviar tu comentario: ", error);
    });
})
//funcion leer datos o imprimir comentarios en pantalla
function imprimirComentariosEnPantalla() {
  db.collection("comentario").get().then((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.data().titulo}`);
      console.log(`${doc.data().descripcion}`);
      var listarDatos = `
      <div style = "border: outset";>
      <br>
      <li class = "listarDatos">
      <h5 class ="listarDatosH5"> ${doc.data().titulo} </h5>
      <p> ${doc.data().descripcion} </p>
      </li>
      <br>
      </div>
      `;
      html += listarDatos;
    }); document.getElementById('imprimirComentariosEnPantalla').innerHTML = html;
  });
}

//Función de ingresar con Facebook
btnFacebook.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
      var credential = result.credential;
      console.log("Incio de sesión con facebook correctamente.");
      cargarJSON();
      var user = result.user;
      var accessToken = credential.accessToken;
      // ...
  })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log("Error de sesión con facebook correctamente.");
          // ...
      });

})
