let products = JSON.parse(localStorage.getItem("products")) || []; // Recojo la lista de productos guardada en LocalStoraje para persistir el carrito
var total = 0; // Esta variable va a contener el dinero total del carrito

// Este fragmento de código se encarga de crear un elemento en el carrito, sumar el importe y eliminar el párrafo de nohay resultados
// la función create_product_card lo que hace devolverte un elemento HTML para el carrito y esta funcion esta en functions.js
products.forEach(function (product){
	let elementCard = create_product_card(product["id"], product["imgUrl"], product["brand"] + " " + product["model"], product["colorName"], product["storageText"], product["price"]);
	document.querySelector("#buy-cart .list-products-cart").appendChild(elementCard);
	document.querySelector("#buy-cart .number-cart p").textContent = parseInt(document.querySelector("#buy-cart .number-cart p").textContent) + 1;
	total += parseInt(product["price"]);

	if(document.querySelectorAll("#buy-cart .list-products-cart .card-content").length > 0 && document.querySelectorAll(".no-element-cart").length > 0){
		document.querySelector(".no-element-cart").remove();
	}

	document.querySelector("#tota-cart").textContent = total;
});

// Este fragmento se encarga de eliminar tanto del front como del localstorage el producto que no queramos en el carrito
// También descuenta del total el producto quitado
// Y en caso de no haber ningún producto muestro un mensaje de que no hay elementos en el carrito
document.querySelector("#buy-cart .list-products-cart").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON" || event.target.tagName === "I") {
        let idProduct = event.target.closest(".card-content").querySelector("button").dataset.id;

        let products = JSON.parse(localStorage.getItem("products")) || [];
		let index = products.findIndex(product => product.id == idProduct);

		if (index !== -1) {
			let price = products[index]["price"];

		    products.splice(index, 1);
		    localStorage.setItem("products", JSON.stringify(products)); 
			event.target.closest(".card-content").remove();

			document.querySelector("#tota-cart").textContent = parseInt(document.querySelector("#tota-cart").textContent)-parseInt(price);

			if(document.querySelectorAll("#buy-cart .list-products-cart .card-content").length == 0){
				let pElement = document.createElement("p");
				pElement.textContent = "No tiene ningún producto.";
				pElement.classList.add("no-element-cart");
				document.querySelector("#buy-cart .list-products-cart").appendChild(pElement);
			}
			document.querySelector("#buy-cart .number-cart p").textContent = parseInt(document.querySelector("#buy-cart .number-cart p").textContent) - 1;
		}
    }
});

// Este fragmento de código se encarga de ocultar el carrito cuando se haga click en cualquier parte de la página que no sea el propio carrito
document.addEventListener("click", function (event) {
    const cardProducts = document.querySelector("#buy-cart .card-products");
    const buyCart = document.querySelector("#buy-cart");

    if (!buyCart.contains(event.target)) {
        cardProducts.style.display = "none";
    }
});

// Este fragmento se encarga de mostrar/ocultar el carrito cuando le pulsemos al botón de un carrito
document.querySelector("#buy-cart a").addEventListener("click", function(e){
    e.preventDefault();
    const cardProducts = document.querySelector("#buy-cart .card-products");

    if (cardProducts.style.display === "block") {
        cardProducts.style.display = "none";
    } else {
        cardProducts.style.display = "block";
    }
});