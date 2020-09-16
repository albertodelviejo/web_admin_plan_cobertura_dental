class Consultor {
    constructor () {
        this.db = firebase.firestore()
    }

    createConsultor (name, surname1, surname2, idConsultor, dni, phone, email, birthday, address) {
        return this.db.collection("consultores").doc(idConsultor).set({
            name: name,
            surname1: surname1,
            surname2: surname2,
            id: dni,
            idConsultor: idConsultor,
            phone_number: phone,
            email: email,
            address: address,
            birthday: birthday,
            tickets: [""],
            pacientes: [""],
            status: "active",
            fecha_alta: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(refDoc => {
            console.log(`Id de consultor => ${refDoc.id}`)
        }).catch(error => {
          console.log(`Error de alta => ${error}`)
        })
    }

    showConsultorAll(){
        this.db.collection('consultores')
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
               let postHtml = this.obtenerPostTemplate(
                title,
                "DNI",
                post.data().id,
                "Teléfono",
                post.data().phone,
                "Email",
                post.data().mail,
                "Dirección",
                post.data().address,
                "Estatus",
                post.data().status,
                "Id Consultor",
                post.data().idConsultor
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showConsultorById(idConsultor){
        this.db.collection('consultores')
        .where('idConsultor', '==', idConsultor)
        .onSnapshot(querySnapshot => {
            $('#clinicas').empty()
            if(querySnapshot.empty){
                $('#clinicas').append()//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
                let postHtml = this.obtenerPostTemplate(
                    title,
                    "DNI",
                    post.data().id,
                    "Teléfono",
                    post.data().phone,
                    "Email",
                    post.data().mail,
                    "Dirección",
                    post.data().address,
                    "Estatus",
                    post.data().status,
                    "Id consultor",
                    post.data().idConsultor
                   )
                   $('#clinicas').append(postHtml) 
               })
            }
        })
    }

    showActiveConsultor(){
        this.db.collection('consultores')
        .where('status', '==', "active")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            let postHtml = this.obtenerPostTemplate(
                title,
                "DNI",
                post.data().id,
                "Teléfono",
                post.data().phone,
                "Email",
                post.data().mail,
                "Dirección",
                post.data().address,
                "Estatus",
                post.data().status,
                "Id consultor",
                post.data().idConsultor
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showInactiveConsultor(){
        this.db.collection('consultores')
        .where('status', '==', "inactive")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            let postHtml = this.obtenerPostTemplate(
                title,
                "DNI",
                post.data().id,
                "Teléfono",
                post.data().phone,
                "Email",
                post.data().mail,
                "Dirección",
                post.data().address,
                "Estatus",
                post.data().status,
                "Id consultor",
                post.data().idConsultor
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showStandbyConsultor(){
        this.db.collection('consultores')
        .where('status', '==', "standby")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().surname1 + post.data().surname2
            let postHtml = this.obtenerPostTemplate(
                title,
                "DNI",
                post.data().id,
                "Teléfono",
                post.data().phone,
                "Email",
                post.data().mail,
                "Dirección",
                post.data().address,
                "Estatus",
                post.data().status,
                "Id consultor",
                post.data().idConsultor
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    getConsultorById(idConsultor){
        this.db.collection('consultores')
        .where('idConsultor', '==', idConsultor)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>No se ha encontrado ningun consultor<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
        $('#nameAltaConsultor').val(post.data().name)
        $('#surname1AltaConsultor').val(post.data().surname1) 
        $('#surname2AltaConsultor').val(post.data().surname2)
        $('#mailAltaConsultor').val(post.data().email)
        $('#birthdayAltaConsultor').val(post.data().birthday)
        $('#addressAltaConsultor').val(post.data().address)
        $('#phoneAltaConsultor').val(post.data().phone_number)
        $('#dniAltaConsultor').val(post.data().id)
        $('#idConsultorAltaConsultor').val(post.data().idConsultor)
        $('#statusAltaConsultor').val(post.data().status)
        $('.determinate').attr('style', `width: 0%`)
              
            $('#modalAltaConsultor').modal('open')
           })
        }
    })
    }



    obtenerPostTemplate (
        title,
        field1title,
        field1,
        field2title,
        field2,
        field3title,
        field3,
        field4title,
        field4,
        field5title,
        field5,
        field6title,
        field6,
      ) {
        return `
        <article class="post">
              <div class="post-titulo">
                  <h5>${title}</h5>
              </div>
              <div class="row">
                  <div class="col m6">
                      ${field1title}: ${field1}
                  </div>
                  <div class="col m6">
                      ${field2title}: ${field2}
                  </div>
              </div>
              <div class="row">
                  <div class="col m6">
                      ${field3title}: ${field3}
                  </div>
                  <div class="col m6">
                      ${field4title}: ${field4}
                  </div>
              </div>
              <div class="row">
                  <div class="col m6">
                  ${field5title}: ${field5}
                  </div>
                  <div class="col m6">
                  ${field6title}: ${field6}
                  </div>        
              </div>
          </article>`
      }
}