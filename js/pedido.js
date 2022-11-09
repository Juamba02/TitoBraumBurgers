// Recibo del LS el contenido del carrito

const carritoJSON = localStorage.getItem("carrito");
const carrito = JSON.parse(carritoJSON);

// Declaro como variables los objetos del DOM que voy a usar

const paginaPedido = document.querySelector("#paginaPedido");
const botonPedido = document.querySelector("#botonFinalizarPedido");
const botonInicio = document.querySelector("#btnInicio");
const botonMenu = document.querySelector("#btnMenu");
const precioTotal = document.querySelector("#precioTotal");
const modalPedido = document.querySelector("#modalPedido");
const volverAlInicio = document.querySelector("#volverAlInicio");

// Funciones

const renderTotal = () => {
    let total = carrito.reduce((total, pedido) => total += pedido.precioAct, 0);
    precioTotal.innerText = total;
}

// Creo tarjetas para cada producto que tiene el usuario en el pedido

carrito.forEach(hamburguesa => {
    const li = document.createElement("li");
    li.classList = "tarjetaPedido";
    li.id = "li" + hamburguesa.id;

    li.innerHTML = `
        <img src="${hamburguesa.imgSrc}" alt="" srcset="" class="imgPedido">
        <p>${hamburguesa.nombre}</p>
    `

    // Creo un p para poner el precio y luego poder actualizarlo cuando se utilicen los botones

    const p = document.createElement("p");
    p.innerHTML = `$${hamburguesa.precioAct}`;

    // Creo un div para agrupar los botones de añadir y quitar con la cantidad

    const divCantidad = document.createElement("div");
    divCantidad.classList = "cantidad";
    divCantidad.id = "cant" + hamburguesa.id;

    // Creo el p para poner la cantidad del producto que tiene en el pedido el usuario

    const pCantidad = document.createElement("p");
    pCantidad.innerHTML = `x${hamburguesa.cantidad}`;

    // Creo el botón de restar

    const restar = document.createElement("button");
    restar.classList = "agregarORestar";
    restar.innerText = "-";
    restar.addEventListener("click", () => {
        if(hamburguesa.cantidad > 1){
            let index = carrito.indexOf(hamburguesa);
            carrito[index].cantidad = carrito[index].cantidad - 1;
            carrito[index].precioAct = carrito[index].precioAct - carrito[index].precio;
            p.innerText = `$${hamburguesa.precioAct}`;
            pCantidad.innerHTML = `x${hamburguesa.cantidad}`;
            renderTotal();
        }
        
    })

    // Creo el botón de agregar

    const sumar = document.createElement("button");
    sumar.classList = "agregarORestar";
    sumar.innerText = "+";
    sumar.addEventListener("click", () => {
        let index = carrito.indexOf(hamburguesa);
            carrito[index].cantidad = carrito[index].cantidad + 1;
            carrito[index].precioAct = carrito[index].precioAct + carrito[index].precio;
            p.innerText = `$${hamburguesa.precioAct}`;
            pCantidad.innerHTML = `x${hamburguesa.cantidad}`;
            renderTotal();
    })
    
    // Creo un boton para eliminar el producto entero y no unidad por unidad

    const eliminar = document.createElement("button");
    eliminar.classList = "eliminar";
    eliminar.innerHTML = `<img src="../img/trashCan.png" alt="">`;

    eliminar.addEventListener("click", () => {
        let index = carrito.indexOf(hamburguesa);
        carrito.splice(index, 1);

        paginaPedido.querySelector("#li" + hamburguesa.id).remove();
        renderTotal();
    })

    // Agrego todo al div contenedor y luego a la página

    divCantidad.append(restar);
    divCantidad.append(pCantidad);
    divCantidad.append(sumar);

    li.append(p);
    li.append(divCantidad);
    li.append(eliminar);
    
    renderTotal();

    paginaPedido.append(li);
});



botonInicio.addEventListener("click", () => {
    const carritoLS = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoLS);
});

botonMenu.addEventListener("click", () => {
    const carritoLS = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoLS);
});

botonPedido.addEventListener("click", () => {
    if(carrito.length > 0){
        modalPedido.classList.add("container-active");
    }
});

volverAlInicio.addEventListener("click", () => {
    localStorage.setItem("carrito", "[]");
});