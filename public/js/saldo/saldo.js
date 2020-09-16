class Saldo {
    constructor () {
        this.db = firebase.firestore()
    }

    showSaldoTotal(){
        this.db.collection('pacientes')
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#clinicas').append(postHtml)
        }
    })
    }

    showSaldoByIdClinica(idClinica){
        this.db.collection('pacientes')
        .where('idClinica', '==', idClinica)
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#clinicas').append(postHtml)
        }
    })
    }

    showSaldoByIdConsultor(idConsultor){
        this.db.collection('pacientes')
        .where('idConsultor', '==', idConsultor)
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#clinicas').append(postHtml)
        }
    })
    }

    showSaldoByIdPaciente(idPaciente){
        this.db.collection('pacientes')
        .where('idPaciente', '==', idPaciente)
        .onSnapshot(querySnapshot => {
        $('#clinicas').empty()
        if(querySnapshot.empty){
            $('#clinicas').append()
        }else{
            var total_paid_balance = 0
            var total_balance = 0
           querySnapshot.forEach(post => {
            total_paid_balance = total_paid_balance + parseInt(post.data().paid_balance)
            total_balance = total_balance + parseInt(post.data().total_balance)
           })
           const left_balance = total_balance - total_paid_balance
           let postHtml = this.obtenerPostTemplate(
            "Saldo concedido: " + total_balance,
            "Saldo pagado: " + total_paid_balance,
            "Saldo a deber: " + left_balance,
           )
           $('#clinicas').append(postHtml)
        }
    })
    }



    obtenerPostTemplate (
        title,
        title2,
        title3
      ) {
          return `
          <article class="post">
                <div class="post-titulo">
                    <h5 align="center">${title}</h5>
                </div>
                <div class="post-titulo">
                    <h5 align="center">${title2}</h5>
                </div>
                <div class="post-titulo">
                    <h5 align="center">${title3}</h5>
                </div>
            </article>`
      }
}