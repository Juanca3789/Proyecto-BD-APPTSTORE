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

function carrito(){
    sessionStorage.setItem("Total", 0);
    var arr = sessionStorage;
    var n = arr.length;
    for(var i = 0; i <= n/2; i++){
        if(arr["producto" + i] != null){
            var nombre = arr["producto" + i];
            var cantidad = arr["cantidad" + i];
            obtenerJuego3(nombre, cantidad);
        }
    }
    setTimeout(() => {
        const carrito = document.getElementById("cart");
        const total = document.createElement("div");
        total.className = "cart-total";
        const parrafo = document.createElement("p");
        parrafo.textContent = "Total: " + sessionStorage.getItem("Total");
        const button = document.createElement("button");
        button.textContent = "Finalizar compra";
        button.addEventListener("click", () => {
            if(sessionStorage.getItem("Id")){
                var arr2 = sessionStorage;
                var n2 = arr2.length;
                for(var i = 0; i <= n2/2; i++){
                    if(arr2["producto" + i] != null){
                        var nombre = arr["producto" + i];
                        var cantidad = arr["cantidad" + i];
                        Comprar(sessionStorage.getItem("Id"), nombre, cantidad, 0);
                    }
                }
            }
            else{
                window.alert("No has iniciado sesión");
            }
        });
        total.appendChild(parrafo);
        carrito.appendChild(total);
        carrito.appendChild(button);
    }, 50);
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

async function obtenerJuego3(nombre, cantidad){
    const tarjeta = document.getElementById("cart");
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
        const div = document.createElement("div");
        div.className = "cart-item";
        const img = document.createElement("img");
        img.src = "data:/image/png;base64," + json.Imagen;
        img.alt = json.Nombre;
        img.width = 75;
        img.height = 75;
        const div2 = document.createElement("div");
        div2.className = "cart-item-details";
        const h3 = document.createElement("h3");
        h3.textContent = json.Nombre;
        const p = document.createElement("p");
        p.textContent = "Precio: $" + json.PrecioLicencia;
        const p2 = document.createElement("p");
        p2.textContent = "Total: $" + (json.PrecioLicencia * cantidad);
        const selector = document.createElement("div");
        selector.className = "quantity-selector"
        const label = document.createElement("label");
        label.textContent = "Cantidad: ";
        const input = document.createElement("input");
        input.type = "number";
        input.name = "quantity";
        input.min = "1";
        input.value = cantidad;
        selector.appendChild(label);
        selector.appendChild(input);
        div2.appendChild(h3);
        div2.appendChild(p);
        div2.appendChild(p2);
        div2.appendChild(selector);
        div.appendChild(img);
        div.appendChild(div2);
        tarjeta.appendChild(div);
        var num = Number(sessionStorage.getItem("Total"));
        sessionStorage.removeItem("Total");
        num = num + (json.PrecioLicencia * cantidad);
        sessionStorage.setItem("Total", num);
    }
}

async function Comprar(Id, NJuego, Cantidad, Descuento){
    let form = new FormData();
    form.append("Id", Id);
    form.append("NJuego", NJuego);
    form.append("Cantidad", Cantidad);
    form.append("Descuento", Descuento);
        let resp = await fetch(
            baseUrl + "Controllers/comprarLicencias.php",
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                body: form,
            }
        );
        json = await resp.json();
        if(json.result == "Compra realizada correctamente"){
            sessionStorage.clear();
            window.alert("Compra finalizada, redirigiendo a pagina principal");
            window.location.assign(baseUrl + "Views/index.html");
        }
}