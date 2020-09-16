class Autenticacion {

  constructor () {
    this.db = firebase.firestore()
}

  autEmailPass (email, password) {
    window.location.reload();
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(result => {
      if(result.user.emailVerified){
        //Materialize.toast(`Bienvenido ${result.user.displayName}`, 5000)
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }else{
        //firebase.auth().signOut()
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

        const configuracion = {
          url : 'https://plancoberturadentalapp.web.app/'
        }

        result.user.sendEmailVerification(configuracion).catch(error => {
          console.error(error)
          Materialize.toast(error.message, 4000
            )
            $('.modal').modal('close')
        })

        this.db.collection("usuarios").doc(result.user.uid).set({
          name: name,
          email: email,
          idConsultor: idConsultor
        })

        firebase.auth().signOut()

        Materialize.toast(
      `Bienvenido ${nombres}, debes realizar el proceso de verificación`,
      4000
    )
      })

      .catch(error => {
        console.error(error)
        Materialize.toast(error.message, 4000)
      })
  }
}
