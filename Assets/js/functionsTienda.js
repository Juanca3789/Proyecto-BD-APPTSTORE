const baseUrl = "http://localhost/DBproyecto/Proyecto-BD-APPTSTORE/";

function carga(){
    let arr = ["8 Ball Pool", "Call Of Duty Mobile", "Cut The Rope GOLD", "EA SPORTS FC Mobile"];
    let i = 1;
    arr.forEach(element => {
        obtenerJuego(element, i);
        i = i + 1;
    });
}

function producto(){
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable) {
                return pair[1];
            }
        }
        return false;
    }
    let result = "";
    var n = getQueryVariable("Name");
    n = n.split("%20");
    for(var i = 0; i< n.length; i++){
        result += n[i] + " ";
    }
    obtenerJuego2(result);
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
        p.id = "parrafo";
        const button = document.createElement("button");
        button.textContent = "Comprar";
        button.addEventListener('click', () => {
            window.location.assign(baseUrl + "Views/producto.html?Name=" + h2.textContent);
        })
        tarjeta.appendChild(img);
        tarjeta.appendChild(h2);
        tarjeta.appendChild(p);
        tarjeta.appendChild(button);
    }
}

async function obtenerJuego2(nombre){
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
        p.textContent = "$" + json.PrecioLicencia;
        p.className = "price";
        const button = document.createElement("button");
        button.textContent = "Comprar";
        button.addEventListener("click", () =>{
            var i = 1;
            while(sessionStorage.getItem("producto" + i) != null){
                if(sessionStorage.getItem("producto" + i) == h2.textContent){
                    var n = Number(sessionStorage.getItem("cantidad" + i)) + Number(input.value);
                    sessionStorage.removeItem("cantidad"+ i);
                    sessionStorage.setItem("cantidad" + i, n);
                    break;
                }
                i = i + 1;
            }
            if(sessionStorage.getItem("producto" + i) == null){
                sessionStorage.setItem("producto" + i, h2.textContent);
                sessionStorage.setItem("cantidad" + i, input.value);
            }
        });
        const selector = document.createElement("div");
        selector.className = "quantity-selector"
        const label = document.createElement("label");
        label.textContent = "Cantidad: ";
        const input = document.createElement("input");
        input.type = "number";
        input.id = "quantity";
        input.name = "quantity";
        input.min = "1";
        input.value = "1";
        selector.appendChild(label);
        selector.appendChild(input);
        tarjeta.appendChild(img);
        tarjeta.appendChild(h2);
        tarjeta.appendChild(p);
        tarjeta.appendChild(selector);
        tarjeta.appendChild(button);
    }
}
