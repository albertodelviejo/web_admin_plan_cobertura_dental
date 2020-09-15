class Clinica {
    constructor () {
        this.db = firebase.firestore()
    }
  
    createClinica (name, razon_social, CIF, phone, mail, address, manager, status) {
        return this.db.collection("clinicas").doc().set({
            name: name,
            razon_social: razon_social,
            cif: CIF,
            phone: phone,
            mail: mail,
            address: address,
            manager: manager,
            fecha_alta: firebase.firestore.FieldValue.serverTimestamp(),
            status: status
        }).then(refDoc => {
            console.log(`Id de clinica => ${refDoc.id}`)
        }).catch(error => {
          console.log(`Error de alta => ${error}`)
        })
    }

    showClinicaAll(){
        this.db.collection('clinicas')
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            const title = post.data().name + post.data().razon_social
               let postHtml = this.obtenerPostTemplate(
                title,
                "CIF",
                post.data().cif,
                "Teléfono",
                post.data().phone,
                "Email",
                post.data().mail,
                "Dirección",
                post.data().address,
                "Gerente",
                post.data().manager,
                "Status",
                post.data().status
               )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showClinicaByName(name){
        this.db.collection('clinicas')
        .where('name', '==', name)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
               const title = post.data().name + post.data().razon_social
               let postHtml = this.obtenerPostTemplate(
                   title,
                   "CIF",
                   post.data().cif,
                   "Teléfono",
                   post.data().phone,
                   "Email",
                   post.data().mail,
                   "Dirección",
                   post.data().address,
                   "Gerente",
                   post.data().manager,
                   "Status",
                   post.data().status
                   )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    getClinicaByCIF(cif){
        this.db.collection('clinicas')
        .where('cif', '==', cif)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>No se ha encontrado ninguna clinica<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            $('#nameAltaClinica').val(post.data().name)
            $('#razonAltaClinica').val(post.data().razon_social)
            $('#cifAltaClinica').val(post.data().cif,)
            $('#phoneAltaClinica').val(post.data().phone,)
            $('#mailAltaClinica').val(post.data().mail,)
            $('#addressAltaClinica').val(post.data().address,)
            $('#managerAltaClinica').val(post.data().manager,)
            $('#idAltaClinica').val()
            $('.determinate').attr('style', `width: 0%`)
              
            $('#modalAltaClinica').modal('open')
           })
        }
    })
    }

    showActiveClinica(){
        this.db.collection('clinicas')
        .where('status', '==', "active")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
               const title = post.data().name + post.data().razon_social
               let postHtml = this.obtenerPostTemplate(
                   title,
                   "CIF",
                   post.data().cif,
                   "Teléfono",
                   post.data().phone,
                   "Email",
                   post.data().mail,
                   "Dirección",
                   post.data().address,
                   "Gerente",
                   post.data().manager,
                   "Status",
                   post.data().status
                   )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showInactiveClinica(){
        this.db.collection('clinicas')
        .where('status', '==', "inactive")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
               const title = post.data().name + post.data().razon_social
               let postHtml = this.obtenerPostTemplate(
                   title,
                   "CIF",
                   post.data().cif,
                   "Teléfono",
                   post.data().phone,
                   "Email",
                   post.data().mail,
                   "Dirección",
                   post.data().address,
                   "Gerente",
                   post.data().manager,
                   "Status",
                   post.data().status
                   )
               $('#clinicas').append(postHtml) 
           })
        }
    })
    }

    showStandbyClinica(){
        this.db.collection('clinicas')
        .where('status', '==', "standby")
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
               const title = post.data().name + post.data().razon_social
               let postHtml = this.obtenerPostTemplate(
                   title,
                   "CIF",
                   post.data().cif,
                   "Teléfono",
                   post.data().phone,
                   "Email",
                   post.data().mail,
                   "Dirección",
                   post.data().address,
                   "Gerente",
                   post.data().manager,
                   "Status",
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
                    ${field5title}: ${field5}
                    </div>
                    <div class="col m6">
                    ${field6title}: ${field6}
                    </div>        
                </div>
            </article>`
      }       
}