if(document.getElementById("sesión")){
    const formulario = document.getElementById("sesión");
    formulario.onsubmit = function (e) {
        e.preventDefault();
        iniciarSesion();
    };
    async function iniciarSesion(){
        let form = new FormData(formulario);
        let resp = await fetch(
        baseUrl + "Controllers/iniciarSesion.php",
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            body: form,
        }
        );
        json = await resp.json();
        if(json.Nombre){
            sessionStorage.setItem("Id", json.Id);
            sessionStorage.setItem("Nombre", json.Nombre);
            window.alert("Sesión iniciada correctamente");
            window.location.reload();
        }
        else{
            window.alert("Usuario no encontrado");
        }
    }
}
else{
    console.log("Error formulario");
}

function controlForm(){
    if(sessionStorage.getItem("Id")){
        const form = document.getElementById("Contenido");
        form.innerHTML = "";
        const h4 = document.createElement("h4");
        h4.textContent = "Bienvenido " + sessionStorage.getItem("Nombre");
        const button = document.createElement("button");
        button.textContent = "Mis Licencias";
        form.appendChild(h4);
        form.appendChild(button);
    }
}

async function Registro(){
    const formulario = document.getElementById("sesión");
    let form = new FormData(formulario);
        let resp = await fetch(
        baseUrl + "Controllers/crearUsuario.php",
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            body: form,
        }
        );
        json = await resp.json();
        if(json.result = "Usuario creado correctamente"){
            window.alert(json.result);
            window.location.reload();
        }
        else{
            window.alert(json.result);
        }
}