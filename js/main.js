// Recibo del LS el contenido del carrito y si es null lo declaro como array vacío

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Declaro como variables los objetos del DOM que voy a usar

const pedido = document.querySelector("#btn-pedido");
const divTarjetas = document.querySelector("#divTarjetas");
const numCarrito = document.querySelector("#numCarrito");
const precioTotal = document.querySelector("#precioTotal");
const modalRandom = document.querySelector("#burgaRandom");
const botonRandom = document.querySelector("#botonRandom");

// Funciones

const renderNumCarrito = () => {
    numCarrito.innerText = carrito.reduce((total, pedido) => total += pedido.cantidad, 0);
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
}

const agregarAlCarrito = async (id) => {
    const resp = await fetch("../data.json");
    const data = await resp.json();
    const producto = data.find((item) => item.id === id);
    
    Toastify({
        text: "Producto agregado!",
        duration: 1000,
        backgroundColor: "#319535",
        offset: {
            x: 110,
            y: 60
        }
    }).showToast();

    for (const i in carrito){
        if(carrito[i].nombre === producto.nombre){
            carrito[i].cantidad++;
            carrito[i].precioAct = carrito[i].precioAct + carrito[i].precio;
            renderNumCarrito();
            return;
        }
    } 

    carrito.push(producto);

    renderNumCarrito();
}

const burgaRandom = async () => {
    const resp = await fetch("../data.json");
    const data = await resp.json();
    const numeroHamburguesas = data.length - 1;
    modalRandom.innerHTML = "";
    const hamburguesaRandom = data[Math.round(Math.random() * numeroHamburguesas )];
    console.log(hamburguesaRandom);
        
    const div = document.createElement("div");
    div.classList = "tarjetasRandom"
    div.innerHTML = `
        <img src="${hamburguesaRandom.imgSrc}" alt="${hamburguesaRandom.nombre}" class="imgTarjeta">
        <h5 class="tituloTarjeta">${hamburguesaRandom.nombre}</h5>
        <p class="descripcion">${hamburguesaRandom.desc}</p>
        <p class="precio">$${hamburguesaRandom.precio}</p>
        `
    const boton = document.createElement("button");
    const botonNoGracias = document.createElement("button");
    boton.classList = "botonTarjeta";
    botonNoGracias.classList = "botonNoGracias";

    boton.innerHTML = "Agregar a mi pedido";

    botonNoGracias.innerHTML = "No, gracias";

    boton.addEventListener("click", () => {
        agregarAlCarrito(hamburguesaRandom.id);
        modalRandom.classList.remove("container-active");
    });

    botonNoGracias.addEventListener("click", () => {
        modalRandom.classList.remove("container-active");
    });

    div.append(boton);
    div.append(botonNoGracias);

    modalRandom.append(div);
}


// Creo las tarjetas en base a los productos que tengo en stock
fetch("../data.json")
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach(hamburguesa => {
            if (hamburguesa.stock === 0){
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
        
        // Renderizo el número del carrito por si habia algo en el LS
        
        renderNumCarrito();
        
        // Creo el evento para mandar el arry del carrito al LS
        
        pedido.addEventListener("click", () => {
            const carritoJSON = JSON.stringify(carrito);
            localStorage.setItem("carrito", carritoJSON);
        });
    })


// Creo el evento para abrir la tarjeta con la hamburguesa aleatoria

botonRandom.addEventListener("click", () => {
    modalRandom.classList.add("container-active");
    burgaRandom();
});