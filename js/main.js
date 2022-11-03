const pedido = document.querySelector("#btn-pedido");
const carritoContainer = document.querySelector("#carrito-container");
const salir = document.querySelector("#salir");
const equis = document.querySelector("#x");

const hamburguesas = [
    {
        id: 1,
        nombre: "PoroBurger",
        precio: 1250,
        cantidad: 0
    },
    {
        id: 2,
        nombre: "Classic Bigote",
        precio: 1250,
        cantidad: 0
    },
    {
        id: 3,
        nombre: "Avocado Zac",
        precio: 1250,
        cantidad: 0
    },
    {
        id: 4,
        nombre: "Butter Blitz",
        precio: 1250,
        cantidad: 0
    },
    {
        id: 5,
        nombre: "Super Teemo",
        precio: 1350,
        cantidad: 0
    },
    {
        id: 6,
        nombre: "Tito Braum",
        precio: 1490,
        cantidad: 0
    }
];

pedido.addEventListener("click", (event) => {
    event.preventDefault();
    carritoContainer.classList.add("container-active");
});

salir.addEventListener("click", () => {
    carritoContainer.classList.remove("container-active");
});

equis.addEventListener("click", () => {
    carritoContainer.classList.remove("container-active");
})