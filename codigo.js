
function llamarApi(){

    //Crea un nuevo objeto XMLHttpRequest
var xhr = new XMLHttpRequest();
var fecha = new Date();
var dia = fecha.getDate()
var mes = fecha.getMonth() + 1
var anio = fecha.getFullYear()
console.log(dia,mes,anio)

var url = 'https://api.esios.ree.es/archives/70/download_json?locale=es&date='+anio+'-'+mes+'-'+dia; 
//var url = 'https://api.esios.ree.es/archives';
var infoLuz = {};


/*HEADERS
Accept: application/json; application/vnd.esios-api-v1+json
Content-Type: application/json
Host: api.esios.ree.es
Authorization: Token token="6753856a894a0a3b27bb41cb7843db6f2d2eb77ab8cf3d49b7e39f7980cef700"
Cookie: 
*/
    

//Esto se llamará después de que la respuesta se reciba

xhr.onload = function() { //para no detectar estados intermedios uso onload
 
    if (xhr.status != 200) { // analiza el estado HTTP de la respuesta 200 = respuesta OK; != no ha ido bien la peticion
    
        alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado

    }else { //muestra el resultado
    
       infoLuz = JSON.parse(xhr.responseText)
        procesarInfo(infoLuz) 
    }
};


xhr.onerror = function() {
  alert("Solicitud fallida");
};


 //compongo la peticion GET para la URL establecida
 xhr.open('GET', url, true);

 //xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
 xhr.setRequestHeader('Accept','application/json; application/vnd.esios-api-v1+json')
 xhr.setRequestHeader('Content-Type','application/json')
xhr.setRequestHeader('Host','api.esios.ree.es')
 xhr.setRequestHeader('Authorization','Token token="16388be3b19d1f03112ab963f5b0660f07abfe1d616859d5e8f032074b25093d"')
xhr.setRequestHeader('Cookie','')

 //Envía la solicitud a la red
 xhr.send();

}

function procesarInfo(infoLuz){
    var pmwh = 0
    var pkwh = 0

        /*Cuidado porque en fechas antiguas cambian los campos del json como lei en el github*/
       
    fecha = new Date();
    //transformo el formato a formato local
    fecha = fecha.toLocaleString();


    document.getElementById("FechaHoy").innerHTML = "Hoy : " + fecha

    for (i = 0; i < infoLuz.PVPC.length; i++) {
        
        
        document.getElementById("hora"+i).innerHTML = ("Tramo Horario " + infoLuz.PVPC[i].Hora).bold()
        document.getElementById("pmwh"+i).innerHTML = ("Precio del MWH : " + infoLuz.PVPC[i].PCB + "€")
        pmwh = parseFloat(infoLuz.PVPC[i].PCB)
        pkwh = pmwh/1000
        document.getElementById("pkwh"+i).innerHTML = ("Precio del KWH : " + pkwh + "€")


    }





}