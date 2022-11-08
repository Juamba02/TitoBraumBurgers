// Recibo del LS el contenido del carrito

const carritoJSON = localStorage.getItem("carrito");
const carrito = JSON.parse(carritoJSON);

// Declaro como variables los objetos del DOM que voy a usar

const paginaPedido = document.querySelector("#paginaPedido");
const botonPedido = document.querySelector("#botonFinalizarPedido");
const botonInicio = document.querySelector("#btnInicio");
const botonMenu = document.querySelector("#btnMenu");
const precioTotal = document.querySelector("#precioTotal");

// Funciones

const renderTotal = () => {
    let total = carrito.reduce((total, pedido) => total += pedido.precio, 0);
    precioTotal.innerText = total;
}

// Creo tarjetas para cada producto que tiene el usuario en el pedido

carrito.forEach(hamburguesa => {
    const div = document.createElement("div");
    div.classList = "tarjetaPedido";
    div.id = "div" + hamburguesa.id;

    div.innerHTML = `
        <img src="${hamburguesa.imgSrc}" alt="" srcset="" class="imgPedido">
        <p>${hamburguesa.nombre}</p>
        <div class="cantidad">
            <p class="agregarORestar">-</p>
            <p>X${hamburguesa.cantidad}</p>
            <p class="agregarORestar">+</p>
        </div>
        <p>$${hamburguesa.precio}</p>
    `

    const eliminar = document.createElement("button");
    eliminar.classList = "eliminar";
    eliminar.innerText = "X";

    eliminar.addEventListener("click", () => {
        let index = carrito.indexOf(hamburguesa);
        carrito.splice(index, 1);

        paginaPedido.querySelector("#div" + hamburguesa.id).remove();
        renderTotal();
    })

    div.append(eliminar);
    
    renderTotal();

    paginaPedido.append(div);
});

botonInicio.addEventListener("click", () => {
    const carritoLS = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoLS);
})

botonMenu.addEventListener("click", () => {
    const carritoLS = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoLS);
})