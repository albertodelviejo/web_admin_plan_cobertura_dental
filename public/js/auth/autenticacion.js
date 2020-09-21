class Autenticacion {

  constructor () {
    this.db = firebase.firestore()
}

  autEmailPass (email, password) {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(result => {
      if(result.user.emailVerified){
        Materialize.toast(`Bienvenido`, 5000)
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }else{
        firebase.auth().signOut()
        Materialize.toast(`Por favor, realize la verificación de la cuenta`, 5000)
      }
    })
    $('.modal').modal('close')
  }

  crearCuentaEmailPass (email, password, name, idConsultor) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        result.user.updateProfile({
          displayname : name
        })

        this.db.collection("usuarios").add({
          uid: result.user.uid,
          name: name,
          email: email,
          idConsultor: idConsultor
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
