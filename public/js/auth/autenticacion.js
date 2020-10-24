class Autenticacion {

  constructor () {
    this.db = firebase.firestore()
}

  autEmailPass (email, password) {

    this.db.collection("usuarios")
    .where('email','==',email)
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(element => {
        if(element.data().admin){
          firebase.auth().signInWithEmailAndPassword(email,password)
          .then(result => {
            if(result.user.emailVerified){
              Materialize.toast(`Bienvenido`, 5000)
              $('#avatar').attr('src', 'imagenes/usuario_auth.png')
              $('#userlabel').text(result.user.email)
              $('#typeuserlabel').text("Usuario Administración")
      
            }else{
              firebase.auth().signOut()
              Materialize.toast(`Por favor, realize la verificación de la cuenta`, 5000)
            }
          })
        }else{
          Materialize.toast(`El usuario no tiene permisos`, 4000)
        }
      });
    })

    
    $('.modal').modal('close')
  }

  crearCuentaEmailPass (email, password, name, dni, isAdmin) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayname : name
        })

        this.db.collection("usuarios").doc(id).set({
          uid: result.user.uid,
          name: name,
          email: email,
          id: dni, 
          admin: isAdmin
        })

        const configuracion = {
          url : 'https://plancoberturadentalapp.web.app/'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          Materialize.toast(error.message, 4000
            )
            $('.modal').modal('close')
        })

        

        firebase.auth().signOut()

        Materialize.toast(
      `Bienvenido ${name}, debes realizar el proceso de verificación`,
      4000
    )
      })

      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
  }
}
