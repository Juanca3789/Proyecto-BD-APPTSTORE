const baseUrl = "http://localhost/DBproyecto/Proyecto-BD-APPTSTORE/";

function carga(){
    let arr = ["8 Ball Pool", "Call Of Duty Mobile", "Cut The Rope GOLD", "EA SPORTS FC Mobile"];
    let i = 1;
    arr.forEach(element => {
        obtenerJuego(element, i);
        i = i + 1;
    });
}

async function obtenerJuego(nombre, numero){
    const tarjeta = document.getElementById("Juego " + numero);
    let form = new FormData();
    form.append("nombreJuego", nombre);
    let resp = await fetch(
    baseUrl + "Controllers/obtenerInfo.php",
    {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        body: form,
    }
    );
    json = await resp.json();

    if(json != null){
        const img = document.createElement("img");
        img.src = "data:/image/png;base64," + json.Imagen;
        img.alt = json.Nombre;
        const h2 = document.createElement("h2");
        h2.textContent = json.Nombre;
        const p = document.createElement("p");
        p.textContent = "Precio: $" + json.PrecioLicencia;
        const button = document.createElement("button");
        button.textContent = "Comprar";
        tarjeta.appendChild(img);
        tarjeta.appendChild(h2);
        tarjeta.appendChild(p);
        tarjeta.appendChild(button);
    }
}
