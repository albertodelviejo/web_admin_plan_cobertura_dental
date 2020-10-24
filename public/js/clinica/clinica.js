class Clinica {
    constructor() {
        this.db = firebase.firestore()
    }

    createClinica(name, razon_social, CIF, phone, mail, address, manager, status) {

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
                    tickets: [""],
                    offers: [""],
                    fecha_alta: firebase.firestore.FieldValue.serverTimestamp(),
                    status: status
                }).then(refDoc => {
                    // console.log(`Id de clinica => ${refDoc.cif}`)
                    Materialize.toast(`Clinica añadida correctamente`, 4000);
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

    updateClinica(name, razon_social, CIF, phone, mail, address, manager, status) {
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
                    Materialize.toast(`Clínica actualizada con éxito`, 4000);
                    return true;
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

    showClinicaByName(name) {
        this.db.collection('clinicas')
            .where('name', '==', name)
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
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
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    getClinicaByCIF(cif) {
        this.db.collection('clinicas')
            .where('cif', '==', cif)
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h2>No se ha encontrado ninguna clinica<h3>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        $('#nameAltaClinica').val(post.data().name)
                        $('#razonAltaClinica').val(post.data().razon_social)
                        $('#cifAltaClinica').val(post.data().cif, )
                        $('#phoneAltaClinica').val(post.data().phone, )
                        $('#mailAltaClinica').val(post.data().mail, )
                        $('#addressAltaClinica').val(post.data().address, )
                        $('#managerAltaClinica').val(post.data().manager, )
                        switch (post.data().status) {
                            case "active":
                                $('#statusActive').prop("checked", true)
                                break
                            case "inactive":
                                $('#statusInactive').prop("checked", true)
                                break
                            case "standby":
                                $('#statusStandby').prop("checked", true)
                                break
                        }
                        $('.determinate').attr('style', `width: 0%`)

                        $('#modalAltaClinica').modal('open')
                    })
                }
            })
    }


    getClinicaforModal(cif) {
        this.db.collection('clinicas')
            .where('cif', '==', cif)
            .onSnapshot(querySnapshot => {
                if (querySnapshot.empty) {} else {
                    querySnapshot.forEach(post => {
                        $('#modaltitle').text(post.data().name)
                        $('#cifClinica').val(cif)

                        $('.determinate').attr('style', `width: 0%`)

                        $('#modalItem').modal('open')
                    })
                }
            })
    }

    showActiveClinica() {
        this.db.collection('clinicas')
            .where('status', '==', "active")
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
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
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showInactiveClinica() {
        this.db.collection('clinicas')
            .where('status', '==', "inactive")
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
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
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    showStandbyClinica() {
        this.db.collection('clinicas')
            .where('status', '==', "standby")
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty()
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().razon_social
                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );
                        $('#clinicas').append(postHtml)
                    });
                    paginate_view("#clinicas");
                }
            })
    }

    addPacienteToClinica(idClinica, id) {
        return this.db.collection("clinicas")
            .doc(idClinica)
            .update({
                pacientes: firebase.firestore.FieldValue.arrayUnion(id)
            }).then(refDoc => {
                console.log(`Paciente añadido a clinica => ${refDoc.id}`)
            }).catch(error => {
                console.log(`Error de alta => ${error}`)
            })
    }

    showPacientesByIdClinica(idClinica) {
        this.db.collection('pacientes')
            .where('idClinica', '==', idClinica)
            .onSnapshot(querySnapshot => {
                $('#modalresults').empty()
                if (querySnapshot.empty) {
                    $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        var creditPlan = "";
                        if (post.data().is_credit_plan) {
                            creditPlan = "Sí"
                        } else {
                            creditPlan = "No"
                        }
                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );
                        $('#modalresults').append(postHtml)
                    })
                }
            })
    }

    showPacientesByIdByClinica(idClinica, id) {
        this.db.collection('pacientes')
            .where('idClinica', '==', idClinica)
            .where('id', '==', id)
            .onSnapshot(querySnapshot => {
                $('#modalresults').empty()
                if (querySnapshot.empty) {
                    $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        var creditPlan = "";
                        if (post.data().is_credit_plan) {
                            creditPlan = "Sí"
                        } else {
                            creditPlan = "No"
                        }
                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );
                        $('#modalresults').append(postHtml)
                    })
                }
            })
    }

    showPacientesByIdByClinica(idClinica, id) {
        this.db.collection('pacientes')
            .where('idClinica', '==', idClinica)
            .where('id', '==', id)
            .onSnapshot(querySnapshot => {
                $('#modalresults').empty()
                if (querySnapshot.empty) {
                    $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        var creditPlan = "";
                        if (post.data().is_credit_plan) {
                            creditPlan = "Sí"
                        } else {
                            creditPlan = "No"
                        }
                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );
                        $('#modalresults').append(postHtml)
                    })
                }
            })

    }

    showPacientesActivosByClinica(idClinica) {
        this.db.collection('pacientes')
            .where('idClinica', '==', idClinica)
            .where('status', '==', "active")
            .onSnapshot(querySnapshot => {
                $('#modalresults').empty()
                if (querySnapshot.empty) {
                    $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        var creditPlan = "";
                        if (post.data().is_credit_plan) {
                            creditPlan = "Sí"
                        } else {
                            creditPlan = "No"
                        }
                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );
                        $('#modalresults').append(postHtml)
                    })
                }
            })
    }

    showPacientesInactivosByClinica(idClinica) {
        this.db.collection('pacientes')
            .where('idClinica', '==', idClinica)
            .where('status', '==', "inactive")
            .onSnapshot(querySnapshot => {
                $('#modalresults').empty()
                if (querySnapshot.empty) {
                    $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2
                        var creditPlan = "";
                        if (post.data().is_credit_plan) {
                            creditPlan = "Sí"
                        } else {
                            creditPlan = "No"
                        }
                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );
                        $('#modalresults').append(postHtml)
                    })
                }
            })
    }

    showPacientesEsperaByClinica(idClinica) {
        this.db.collection('pacientes')
            .where('idClinica', '==', idClinica)
            .where('status', '==', "standby")
            .onSnapshot(querySnapshot => {
                $('#modalresults').empty()
                if (querySnapshot.empty) {
                    $('#modalresults').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().surname1 + post.data().surname2;
                        var creditPlan = "";
                        if (post.data().is_credit_plan) {
                            creditPlan = "Sí"
                        } else {
                            creditPlan = "No"
                        }
                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );
                        $('#modalresults').append(postHtml)
                    })
                }
            })
    }


    showClinicaAll() {
        this.db.collection('clinicas')
            .onSnapshot(querySnapshot => {
                $('#clinicas').empty();
                if (querySnapshot.empty) {
                    $('#clinicas').append(`<h4>No se han encontrado resultados</h4>`) //this.obtenerTemplatePostVacio())
                } else {
                    querySnapshot.forEach(post => {
                        const title = post.data().name + post.data().razon_social;

                        let postHtml = this.obtenerPostTemplate(
                            title, post.data().cif,
                            post.data().phone,
                            post.data().mail,
                            post.data().address,
                            post.data().manager,
                            post.data().status,
                            post.data().razon_social,
                            post.data().name
                        );

                        $("#section-title").text("Clínicas");
                        $("#menuClinica").show();
                        $("#clinicas").attr('class', 'posts');
                        $('#clinicas').append(postHtml);

                    });
                    paginate_view("#clinicas");

                }
            })
    }




    obtenerPostTemplate(
        title,
        cif_code,
        phone,
        mail,
        address,
        manager,
        status,
        razon_social,
        name
    ) {
        return `
          <article class="post" onclick="test('${cif_code}')">
           <div class="card">
          <div class="card-header">
         
                    <div class="post-titulo">
                        <h5>${title}<a class="pull-right collapsed card-link btn-floating btn waves-effect waves-light blue" data-toggle="collapse" href="#collapse_${cif_code}">
                         <i class="material-icons">add</i>
                          </a></h5>
                          
                    </div>
                <p>Dirección: ${address} Teléfono: ${phone} Email: ${mail}</p>
                
             </div>
             <div id="collapse_${cif_code}" class="collapse" data-parent="#accordion">
            <div class="card-body">
            
                <div class="row">
                    <div class="col-sm-12 col-md-3 registro-bienvenida">

                    </div>
                   <div class="col-sm-12 col-md-9 registro-formulario">
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input id="nameAltaClinica_${cif_code}" type="text" value="${name}" maxlength="30" data-length="30" required/>
                            <label for="nameAltaClinica_${cif_code}">Nombre Clínica:</label>
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input id="razonAltaClinica_${cif_code}" value="${razon_social}" type="text" maxlength="30" data-length="30" required/>
                            <label for="razonAltaClinica_${cif_code}">Razón social:</label>
                        </div>
                    </div>
                
                    <div class="col s12 m12">
                        <div class="input-field">
                            <input id="addressAltaClinica_${cif_code}" value="${address}" type="text" required />
                            <label for="addressAltaClinica_${cif_code}">Direccion:</label>
                        </div>
                    </div>
                
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input id="phoneAltaClinica_${cif_code}" value="${phone}" type="tel" required />
                            <label for="phoneAltaClinica_${cif_code}">Teléfono:</label>
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input id="mailAltaClinica_${cif_code}" value="${mail}" type="text" required />
                            <label for="mailAltaClinica_${cif_code}">E-mail:</label>
                        </div>
                    </div>
                
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input id="cifAltaClinica_${cif_code}" value="${cif_code}" type="text" required />
                            <label for="cifAltaClinica_${cif_code}">CIF:</label>
                        </div>
                    </div>
                    <div class="col s12 m6">
                        <div class="input-field">
                            <input id="managerAltaClinica_${cif_code}" value="${manager}" type="text" required />
                            <label for="managerAltaClinica_${cif_code}">gerente:</label>
                        </div>
                    </div>
                
                    <div class="col s12 m6">
                        <label for="status_${cif_code}">Estatus:</label>
                        <form>
                                <input id="statusActive_${cif_code}" type="radio"  name="status_${cif_code}" value="active" ${(status == "active")?'checked':''} >
                                <label for="statusActive_${cif_code}" >Activa</label>                        
                                <input id="statusInActive_${cif_code}" type="radio"  name="status_${cif_code}" value="inactive" ${(status == "inactive")?'checked':''}>
                                <label for="statusInActive_${cif_code}">Inactiva</label>
                                <input id="statusStandBy_${cif_code}" type="radio"  name="status_${cif_code}" value="standby" ${(status == "standby")?'checked':''}>
                                <label  for="statusStandBy_${cif_code}">En espera</label>    
                        </form>
                    </div>
                    <div class="div-btnInicioSesion">
                        <a  onclick="updateClinic('${cif_code}')" class="btn waves-effect waves-light">Guardar Clínica<i class="material-icons left">create</i></a>
                    </div>
                </div>
                    </div>
               
            </div>
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

function paginate_view(view_id) {
    $(view_id).append('<ul id="pagin"></ul>');
    //Pagination
    pageSize = 4;
    incremSlide = 5;
    startPage = 0;
    numberPage = 0;

    var pageCount = $(".post").length / pageSize;
    var totalSlidepPage = Math.floor(pageCount / incremSlide);

    for (var i = 0; i < pageCount; i++) {
        $("#pagin").append('<li><a href="#">' + (i + 1) + '</a></li> ');
        if (i > pageSize) {
            $("#pagin li").eq(i).hide();
        }
    }

    var prev = $("<li/>").addClass("prev").html("Prev").click(function() {
        startPage -= 5;
        incremSlide -= 5;
        numberPage--;
        slide();
    });

    prev.hide();

    var next = $("<li/>").addClass("next").html("Next").click(function() {
        startPage += 5;
        incremSlide += 5;
        numberPage++;
        slide();
    });

    $("#pagin").prepend(prev).append(next);

    $("#pagin li").first().find("a").addClass("current");

    slide = function(sens) {
        $("#pagin li").hide();

        for (t = startPage; t < incremSlide; t++) {
            $("#pagin li").eq(t + 1).show();
        }
        if (startPage == 0) {
            next.show();
            prev.hide();
        } else if (numberPage == totalSlidepPage) {
            next.hide();
            prev.show();
        } else {
            next.show();
            prev.show();
        }


    }

    showPage = function(page) {
        $(".post").hide();
        $(".post").each(function(n) {
            if (n >= pageSize * (page - 1) && n < pageSize * page)
                $(this).show();
        });
    }

    showPage(1);
    $("#pagin li a").eq(0).addClass("current");

    $("#pagin li a").click(function() {
        $("#pagin li a").removeClass("current");
        $(this).addClass("current");
        showPage(parseInt($(this).text()));
    });

    Materialize.updateTextFields();
}

function updateClinic(cif_code) {

    var name = $('#nameAltaClinica_' + cif_code).val();
    var razon_social = $('#razonAltaClinica_' + cif_code).val();
    var CIF = $('#cifAltaClinica_' + cif_code).val();
    var mail = $('#mailAltaClinica_' + cif_code).val();
    var phone = $('#phoneAltaClinica_' + cif_code).val();
    var address = $('#addressAltaClinica_' + cif_code).val();
    var manager = $('#managerAltaClinica_' + cif_code).val();
    var status = $("input[name='status_" + cif_code + "']:checked").val();
    var clinic = new Clinica();
    var result = clinic.updateClinica(name, razon_social, CIF, phone, mail, address, manager, status);
    if (result) {
        clinic.showClinicaAll();
    }
}