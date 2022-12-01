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
const modalPedidoDelivery = document.querySelector("#modalPedidoDelivery")
const volverAlInicio = document.querySelector("#volverAlInicio");
const volverAlInicio2 = document.querySelector("#volverAlInicio2")
const modalCarritoVacio = document.querySelector("#modalCarritoVacio");
const modalForm = document.querySelector("#modalForm");
const botonForm = document.querySelector("#enviarForm");
const cancelarForm = document.querySelector("#cancelarForm");
const formTakeAway = document.querySelector("#modalFormTakeAway");
const botonConfirmarTakeAway = document.querySelector("#enviarFormTakeAway");
const botonCancelarTakeAway = document.querySelector("#cancelarFormTakeAway");
const form0 = document.querySelector("#swal-input0");
const form1 = document.querySelector("#swal-input1");
const form2 = document.querySelector("#swal-input2");
const form3 = document.querySelector("#swal-input3");
const form4 = document.querySelector("#swal-input4");

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

    // Agrego todo al li y luego a la página

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
        Swal.fire({
            icon: 'question',
            title: 'Elija la forma de recibir su pedido',
            text: '(Recordá que el delivery cuesta $300 extra)',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delivery',
            denyButtonText: `Take Away`,
            cancelButtonText: 'Cancelar',
            denyButtonColor: 'black',
            confirmButtonColor: 'black',
            cancelButtonColor: 'black'
        }).then((result) => {
            if (result.isConfirmed) {
                modalForm.classList.add("container-active");
            }else if(result.isDenied){
                formTakeAway.classList.add("container-active");
            }
        })
    }else{
        modalCarritoVacio.classList.add("container-active");
    }
});


botonForm.addEventListener("click", () => {
    if(form0.value,form2.value,form3.value,form4.value != ``){
        form0.value = '';
        form2.value = '';
        form3.value = '';
        form4.value = '';
        modalForm.classList.remove("container-active");
        modalPedidoDelivery.classList.add("container-active");
    }else{
        Toastify({
            text: "Recordá rellenar todos los datos",
            duration: 1000,
            backgroundColor: "#b61105",
            offset: {
                x: 110,
                y: 60
            },
        }).showToast();
    }

})

cancelarForm.addEventListener("click", () => {
    modalForm.classList.remove("container-active");
})

volverAlInicio.addEventListener("click", () => {
    localStorage.setItem("carrito", "[]");
});

volverAlInicio2.addEventListener("click", () => {
    localStorage.setItem("carrito", "[]");
});

botonConfirmarTakeAway.addEventListener("click", () => {
    if(form1.value != ``){
        form1.value = '';
        formTakeAway.classList.remove("container-active");
        modalPedido.classList.add("container-active");
    }else{
        Toastify({
            text: "Recordá poner tu nombre",
            duration: 1000,
            backgroundColor: "#b61105",
            offset: {
                x: 110,
                y: 60
            },
        }).showToast();
        
    }
})

botonCancelarTakeAway.addEventListener("click", () => {
    formTakeAway.classList.remove("container-active"); 
})