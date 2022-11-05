// Declaro el array del carrito y declaro como variables los objetos del DOM que voy a usar

const carrito = [];

const pedido = document.querySelector("#btn-pedido");
const carritoContainer = document.querySelector("#carrito-container");
const salir = document.querySelector("#salir");
const equis = document.querySelector("#x");
const divTarjetas = document.querySelector("#divTarjetas");
const carritoProductos = document.querySelector("#productoEnCarrito");
const numCarrito = document.querySelector("#numCarrito");
const precioTotal = document.querySelector("#precioTotal");

// Funciones

const renderPedido = () => {
    carritoProductos.innerHTML = "";

    carrito.forEach((hamburguesa) => {
        const div = document.createElement("div");
        div.className = "productoEnCarrito"
        div.innerHTML =`
        <img src="${hamburguesa.imgSrc}" alt="">
            <p>${hamburguesa.nombre}</p>
            <p>Precio: $${hamburguesa.precio}</p>
            <p>x${hamburguesa.cantidad}</p>
            <button class="eliminar">Eliminar</button>
            `
    carritoProductos.append(div);
    });
}

const renderNumCarrito = () => {
    numCarrito.innerText = carrito.length;
}

const renderTotal = () => {
    let total = carrito.reduce((total, pedido) => total += pedido.precio, 0);
    precioTotal.innerText = total;
}

const agregarAlCarrito = (id) => {
    const producto = hamburguesas.find((item) => item.id === id);
    carrito.push(producto);

    renderCarrito();
}

const renderCarrito = () => {
    renderPedido();
    renderNumCarrito();
    renderTotal();
}

// Creo las tarjetas en base a los productos que tengo en stock

hamburguesas.forEach((hamburguesa) => {
    if (hamburguesa.stock == 0){
        return
    }

    const div = document.createElement("div");
    div.className = "tarjetas";

    div.innerHTML += `
            <img src="${hamburguesa.imgSrc}" alt="${hamburguesa.nombre}" class="imgTarjeta">
            <h5 class="tituloTarjeta">${hamburguesa.nombre}</h5>
            <p class="descripcion">${hamburguesa.desc}</p>
            <p class="precio">$${hamburguesa.precio}</p>
        `

    const button = document.createElement("button");
    button.className = "botonTarjeta";
    button.innerHTML = "Agregar a mi pedido";

    button.addEventListener("click", () => {
        agregarAlCarrito(hamburguesa.id);
    });

    div.append(button);

    divTarjetas.append(div);
});

// Creo el evento para abrir el modal del carrito

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