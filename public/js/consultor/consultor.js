class Consultor {
    constructor () {
        this.db = firebase.firestore()
    }

    createConsultor (name, surname1, surname2, idConsultor, dni, phone, email, birthday, address) {
        var docRef = this.db.collection("consultores").doc(idConsultor);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                Materialize.toast(`El consultor ya existe`, 4000)
            } else {
         docRef.set({
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
            Materialize.toast(`El consultor se ha añadido correctamente`, 4000)
        }).catch(error => {
          console.log(`Error de alta => ${error}`)
        })
    }
})
    }

    updateClinica(name, surname1, surname2, idConsultor, dni, phone, email, birthday, address){
        var docRef = this.db.collection("consultores").doc(idConsultor);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                docRef.update({
                    name: name,
                    surname1: surname1,
                    surname2: surname2,
                    id: dni,
                    idConsultor: idConsultor,
                    phone_number: phone,
                    email: email,
                    address: address,
                    birthday: birthday,
                    status: "active",
                }).then(refDoc => {
                    // console.log(`Id de clinica => ${refDoc.cif}`)
                     Materialize.toast(`Consultor actualizado correctamente`, 4000)
                     $('.modal').modal('close')
                 }).catch(error => {
                   console.log(`Error de alta => ${error}`)
                   Materialize.toast(`Error de alta`, 4000)
                     $('.modal').modal('close')
                 })
            } else {
                Materialize.toast(`El consultor no existe`, 4000)
            }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
    }

    showConsultorAll(){
        this.db.collection('consultores')
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
                "Id Consultor",
                post.data().idConsultor
               )
               $("#section-title").text("Consultores")
               $("#menu").show()
               $("#clinicas").attr('class', 'posts');
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
        switch(post.data().status){
            case "active":
                $('#statusActivePaciente').prop("checked",true)
            break
            case "inactive":
                $('#statusInactivePaciente').prop("checked",true)
            break
            case "standby":
                $('#statusStandbyPaciente').prop("checked",true)
            break
        }
        $('.determinate').attr('style', `width: 0%`)

        $('typeFormConsultor').val('update')
              
            $('#modalAltaConsultor').modal('open')
           })
        }
    })
    }

    getConsultorforModal(idConsultor){
        this.db.collection('consultores')
        .where('idConsultor', '==', idConsultor)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>Error<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            $('#modaltitleconsultor').text(post.data().name)
            $('#idConsultor').val(idConsultor)
            
            $('.determinate').attr('style', `width: 0%`)
              
            $('#modalItemConsultor').modal('open')
           })
        }
    })
    }

    showAllPacientesFromConsultor(idConsultor){
        this.db.collection('pacientes')
        .where('idConsultor', '==', idConsultor)
        .onSnapshot(querySnapshot => {
            $('#modalresultsconsultor').empty()
            if(querySnapshot.empty){
                $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
            if (post.data().is_credit_plan){
                creditPlan = "Sí"
            }else{
                creditPlan = "No"
            }
                
                    let postHtml = this.obtenerPostTemplate(
                        title,
                        "Dirección",
                        post.data().address,
                        "Email",
                        post.data().email,
                        "Teléfono",
                        post.data().phone_number,
                        "Puntos",
                        post.data().points,
                        "Credit Plan",
                        creditPlan,
                        "Saldo Pagado",
                        post.data().payed_balance + "€",
                        "ID",
                        post.data().id
                    )
                   
                   $('#modalresultsconsultor').append(postHtml) 
               })
            }
        })
    }

    showAllPacientesByConsultorById(idConsultor,idPaciente){
        this.db.collection('pacientes')
        .where('id', '==', idPaciente)
        .where('idConsultor', '==', idConsultor)
        .onSnapshot(querySnapshot => {
            $('#modalresultsconsultor').empty()
            if(querySnapshot.empty){
                $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
            if (post.data().is_credit_plan){
                creditPlan = "Sí"
            }else{
                creditPlan = "No"
            }
                
                    let postHtml = this.obtenerPostTemplate(
                        title,
                        "Dirección",
                        post.data().address,
                        "Email",
                        post.data().email,
                        "Teléfono",
                        post.data().phone_number,
                        "Puntos",
                        post.data().points,
                        "Credit Plan",
                        creditPlan,
                        "Saldo Pagado",
                        post.data().payed_balance + "€",
                        "ID",
                        post.data().id
                    )
                   
                   $('#modalresultsconsultor').append(postHtml) 
               })
            }
        })
    }

    showAllPacientesByConsultorByClinica(idConsultor,idClinica){
        this.db.collection('pacientes')
        .where('idClinica', '==', idClinica)
        .where('idConsultor', '==', idConsultor)
        .onSnapshot(querySnapshot => {
            $('#modalresultsconsultor').empty()
            if(querySnapshot.empty){
                $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
            }else{
               querySnapshot.forEach(post => {
                const title = post.data().name + post.data().surname1 + post.data().surname2
            var creditPlan = "";
            if (post.data().is_credit_plan){
                creditPlan = "Sí"
            }else{
                creditPlan = "No"
            }
                
                    let postHtml = this.obtenerPostTemplate(
                        title,
                        "Dirección",
                        post.data().address,
                        "Email",
                        post.data().email,
                        "Teléfono",
                        post.data().phone_number,
                        "Puntos",
                        post.data().points,
                        "Credit Plan",
                        creditPlan,
                        "Saldo Pagado",
                        post.data().payed_balance + "€",
                        "ID",
                        post.data().id
                    )
                   
                   $('#modalresultsconsultor').append(postHtml) 
               })
            }
        })
    }


showTicketByIdConsultor(idConsultor){
    this.db.collection('tickets')
    .where('idConsultor', '==', idConsultor)
    .onSnapshot(querySnapshot => {
        $('#modalresultsconsultor').empty()
        if(querySnapshot.empty){
            $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#modalresultsconsultor').append(postHtml) 
           })
        }
    })
}

showTicketByIdConsultorByTopic(idConsultor, topic){
    this.db.collection('tickets')
    .where('idConsultor', '==', idConsultor)
    .where('topic','==', topic)
    .onSnapshot(querySnapshot => {
        $('#modalresultsconsultor').empty()
        if(querySnapshot.empty){
            $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#modalresultsconsultor').append(postHtml) 
           })
        }
    })
}

showTicketByIdConsultorByPaciente(idConsultor, idPaciente){
    this.db.collection('tickets')
    .where('idConsultor', '==', idConsultor)
    .where('idPaciente','==', idPaciente)
    .onSnapshot(querySnapshot => {
        $('#modalresultsconsultor').empty()
        if(querySnapshot.empty){
            $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#modalresultsconsultor').append(postHtml) 
           })
        }
    })
}

showTicketByIdConsultorByClinica(idConsultor, idClinica){
    this.db.collection('tickets')
    .where('idConsultor', '==', idConsultor)
    .where('idClinica','==', idClinica)
    .onSnapshot(querySnapshot => {
        $('#modalresultsconsultor').empty()
        if(querySnapshot.empty){
            $('#modalresultsconsultor').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            let postHtml = this.obtenerPostTemplate(
                post.data().topic,
                "Precio",
                post.data().price,
                "CIF Clínica",
                post.data().idClinica,
                "Id Consultor",
                post.data().idConsultor,
                "DNI Paciente",
                post.data().idPaciente,
                "Puntos ganados",
                post.data().points,
                "Fecha",
                post.data().date,
               )
               $('#modalresultsconsultor').append(postHtml) 
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
        field7title,
        field7
      ) {
        return `
        <article onclick=test("${field6}") class="post">
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
              <script>
                function test(id){
                 const consultor = new Consultor();
                 consultor.getConsultorforModal(id);
                }
                </script>
          </article>`
      }
}