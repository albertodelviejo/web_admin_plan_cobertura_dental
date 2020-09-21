class Clinica {
    constructor () {
        this.db = firebase.firestore()
    }
  
    createClinica (name, razon_social, CIF, phone, mail, address, manager, status) {

        var docRef = this.db.collection("clinicas").doc(CIF);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                Materialize.toast(`La clinica ya existe`, 4000)
            } else {
                console.log("No such document!");
                docRef.set({
                    name: name,
                    razon_social: razon_social,
                    cif: CIF,
                    phone: phone,
                    mail: mail,
                    address: address,
                    manager: manager,
                    pacientes: [""],
                    tikets: [""],
                    offers: [""],
                    fecha_alta: firebase.firestore.FieldValue.serverTimestamp(),
                    status: status
                }).then(refDoc => {
                   // console.log(`Id de clinica => ${refDoc.cif}`)
                    Materialize.toast(`Clinica añadida correctamente`, 4000)
                    $('.modal').modal('close')
                }).catch(error => {
                  console.log(`Error de alta => ${error}`)
                  Materialize.toast(`Error de alta`, 4000)
                    $('.modal').modal('close')
                })
            }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
    }

    updateClinica(name, razon_social, CIF, phone, mail, address, manager, status){
        var docRef = this.db.collection("clinicas").doc(CIF);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                docRef.update({
                    name: name,
                    razon_social: razon_social,
                    cif: CIF,
                    phone: phone,
                    mail: mail,
                    address: address,
                    manager: manager,
                    status: status
                }).then(refDoc => {
                    // console.log(`Id de clinica => ${refDoc.cif}`)
                     Materialize.toast(`Clinica actualizada correctamente`, 4000)
                     $('.modal').modal('close')
                 }).catch(error => {
                   console.log(`Error de alta => ${error}`)
                   Materialize.toast(`Error de alta`, 4000)
                     $('.modal').modal('close')
                 })
            } else {
                Materialize.toast(`La clinica no existe`, 4000)
            }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
    }

    showClinicaAll(){
        this.db.collection('clinicas')
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

    showClinicaByName(name){
        this.db.collection('clinicas')
        .where('name', '==', name)
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
            switch(post.data().status){
                case "active":
                    $('#statusActive').prop("checked",true)
                break
                case "inactive":
                    $('#statusInactive').prop("checked",true)
                break
                case "standby":
                    $('#statusStandby').prop("checked",true)
                break
            }
            $('.determinate').attr('style', `width: 0%`)
              
            $('#modalAltaClinica').modal('open')
           })
        }
    })
    }


    getClinicaforModal(cif){
        this.db.collection('clinicas')
        .where('cif', '==', cif)
    .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append(`<h2>No se ha encontrado ninguna clinica<h3>`)//this.obtenerTemplatePostVacio())
        }else{
           querySnapshot.forEach(post => {
            $('#modaltitle').text(post.data().name)
            $('#cifClinica').val(cif)
            
            $('.determinate').attr('style', `width: 0%`)
              
            $('#modalItem').modal('open')
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

    addPacienteToClinica(idClinica, id){
        return this.db.collection("clinicas")
        .doc(idClinica)
        .update({
            pacientes : firebase.firestore.FieldValue.arrayUnion(id)
        }).then(refDoc => {
            console.log(`Paciente añadido a clinica => ${refDoc.id}`)
        }).catch(error => {
          console.log(`Error de alta => ${error}`)
        })
    }

    showPacientesByIdClinica(idClinica){
        this.db.collection('pacientes')
        .where('idClinica','==', idClinica)
        .onSnapshot(querySnapshot => {
            $('#modalresults').empty()
            if(querySnapshot.empty){
                $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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
                       "ID",
                       post.data().id,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
                   )
                   $('#modalresults').append(postHtml) 
               })
            }
        })
    }

        showPacientesByIdByClinica(idClinica, id){
            this.db.collection('pacientes')
            .where('idClinica','==', idClinica)
            .where('id','==', id)
            .onSnapshot(querySnapshot => {
                $('#modalresults').empty()
                if(querySnapshot.empty){
                    $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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
                           "ID",
                           post.data().id,
                           "Credit Plan",
                           creditPlan,
                           "Saldo Pagado",
                           post.data().payed_balance + "€",
                       )
                       $('#modalresults').append(postHtml) 
                   })
                }
            })
        }
            showPacientesByIdByClinica(idClinica, id){
                this.db.collection('pacientes')
                .where('idClinica','==', idClinica)
                .where('id','==', id)
                .onSnapshot(querySnapshot => {
                    $('#modalresults').empty()
                    if(querySnapshot.empty){
                        $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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
                               "ID",
                               post.data().id,
                               "Credit Plan",
                               creditPlan,
                               "Saldo Pagado",
                               post.data().payed_balance + "€",
                           )
                           $('#modalresults').append(postHtml) 
                       })
                    }
                })

            }

                showPacientesActivosByClinica(idClinica){
                    this.db.collection('pacientes')
                    .where('idClinica','==', idClinica)
                    .where('status','==', "active")
                    .onSnapshot(querySnapshot => {
                        $('#modalresults').empty()
                        if(querySnapshot.empty){
                            $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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
                                   "ID",
                                   post.data().id,
                                   "Credit Plan",
                                   creditPlan,
                                   "Saldo Pagado",
                                   post.data().payed_balance + "€",
                               )
                               $('#modalresults').append(postHtml) 
                           })
                        }
                    })
    }

    showPacientesInactivosByClinica(idClinica){
        this.db.collection('pacientes')
        .where('idClinica','==', idClinica)
        .where('status','==', "inactive")
        .onSnapshot(querySnapshot => {
            $('#modalresults').empty()
            if(querySnapshot.empty){
                $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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
                       "ID",
                       post.data().id,
                       "Credit Plan",
                       creditPlan,
                       "Saldo Pagado",
                       post.data().payed_balance + "€",
                   )
                   $('#modalresults').append(postHtml) 
               })
            }
        })
}

showPacientesEsperaByClinica(idClinica){
    this.db.collection('pacientes')
    .where('idClinica','==', idClinica)
    .where('status','==', "standby")
    .onSnapshot(querySnapshot => {
        $('#modalresults').empty()
        if(querySnapshot.empty){
            $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`)//this.obtenerTemplatePostVacio())
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
                   "ID",
                   post.data().id,
                   "Credit Plan",
                   creditPlan,
                   "Saldo Pagado",
                   post.data().payed_balance + "€",
               )
               $('#modalresults').append(postHtml) 
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
          <article onclick=test("${field1}") class="post">
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
                function test(cif){
                 const clinica = new Clinica();
                 clinica.getClinicaforModal(cif);
                }
                </script>
            </article>`
      }  
}