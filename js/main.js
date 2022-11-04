const pedido = document.querySelector("#btn-pedido");
const carritoContainer = document.querySelector("#carrito-container");
const salir = document.querySelector("#salir");
const equis = document.querySelector("#x");
const divTarjetas = document.querySelector("#divTarjetas");

function crearTarjetas(){
    hamburguesas.forEach((hamburguesa) => {
        divTarjetas.innerHTML += `
        <div class="tarjetas">
            <img src="${hamburguesa.imgSrc}" alt="${hamburguesa.nombre}" class="imgTarjeta">
            <h5 class="tituloTarjeta">${hamburguesa.nombre}</h5>
            <p class="descripcion">${hamburguesa.desc}</p>
            <p class="precio">$${hamburguesa.precio}</p>
            <button class="botonTarjeta">Agregar a mi pedido</button>
        </div>
        `
    });
}


pedido.addEventListener("click", (event) => {
    event.preventDefault();
    carritoContainer.classList.add("container-active");
});

salir.addEventListener("click", () => {
    carritoContainer.classList.remove("container-active");
});

equis.addEventListener("click", () => {
    carritoContainer.classList.remove("container-active");
});

crearTarjetas();
