class Consultor {
    constructor () {
        this.db = firebase.firestore()
    }

    createConsultor (name, surname1, surname2, dni, phone, mail, address) {
        return this.db.collection("consultores").add({
            name: name,
            surname1: surname1,
            surname2: surname2,
            id: dni,
            phone: phone,
            mail: mail,
            address: address,
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
                post.data().status
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showConsultorById(idConsultor){
        this.db.collection('consultores')
        .where('id', '==', idConsultor)
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
                    post.data().status
                   )
                   $('#clinicas').append(postHtml) 
               })
            }
        })
    }

    showConsultorByIdClinica(idClinica){
        this.db.collection('consultores')
        .where('idClinica','==', idClinica)
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
                    post.data().status
                   )
                   $('#clinicas').append(postHtml) 
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
      ) {
          return `
          <article class="post">
                <div class="post-titulo">
                    <h5>${title}</h5>
                </div>
                <div class="row">
                    <div class="col m6">
                        <p>${field1title}: ${field1}</p>
                    </div>
                    <div class="col m6">
                        <p>${field2title}: ${field2}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col m6">
                        <p>${field3title}: ${field3}</p>
                    </div>
                    <div class="col m6">
                        <p>${field4title}: ${field4}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col m6">
                        <p>${field5title}: ${field5}</p>
                    </div>
                </div>
            </article>`
      }
}