class Utilidad {
  static obtenerFecha (timeStamp) {    
   // El cambio es llamar al atributo seconds
    const d = new Date(timeStamp.seconds)
    console.log(timeStamp);
    console.log(d);
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [day, month, year].join('/')
  }
}
