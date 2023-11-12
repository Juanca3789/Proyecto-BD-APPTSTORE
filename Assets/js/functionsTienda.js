const baseUrl = "http://localhost/DBproyecto/Proyecto-BD-APPTSTORE/";

async function obtenerJuego(nombre){
    const tarjeta = document.getElementById("Juego 1");
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
