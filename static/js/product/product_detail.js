const colors = document.querySelectorAll("#info-product .options .colors .color-div"); // Variable que va a contener los elementos de colores que muestran el color de disponibilidad del producto
const btnBuy = document.querySelector("#buy-product"); // Variable que va a contener los elementos del carrito

// Para hacer solicitudes POST en Django, se necesita recoger el csrf_token, eso hace está función
function getCSRFToken() {
	let name = 'csrftoken';
	let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	return value ? value[2] : '';
}

// Este fragmento de código permite seleccionar el color que queramos aladir al carrito
colors.forEach(color => color.addEventListener("click", function(){
	document.querySelectorAll("#info-product .options .colors .color-div.active").forEach(div => {
        div.classList.remove("active");
    });
	this.classList.add("active");
}));

// Este fragmento se encarga de añadir al carrito un producto, recopilando los datos necesarios, además
// agregué el slug, el nombre del color y el nombre del almacenamiento, siguiendo los parámetros del POST de la API
btnBuy.addEventListener("click", function(){
	let activeColor = document.querySelector("#info-product .options .colors .color-div.active");
	let storageSelect = document.querySelector("#storage-select");
	let codeColor = activeColor.getAttribute("data-color");
	let colorName = activeColor.getAttribute("title");
	let codeStorage = storageSelect.value;
	let storageText = storageSelect.options[storageSelect.selectedIndex].text; 
	const currentUrl = window.location.pathname;
	const slug = currentUrl.split("/")[2];

	const data = { // Para no trabajar todo el rato en JS he realizado las llamas a la API desde python
        "codeColor": codeColor,
        "codeStorage": codeStorage,
        "colorName": colorName,
        "storageText": storageText,
        "slug": slug 
    };

    fetch('/add-product-card/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCSRFToken()
        },
        body: new URLSearchParams(data).toString()
    })
    .then(response => response.json())
    .then(data => {
    	console.log(data);
        if(data["data"]["count"] == 1){
        	let product = data["product"];
        	let elementCard = create_product_card(product["id"], product["imgUrl"], product["brand"] + " " + product["model"], product["colorName"], product["storageText"], product["price"]);
        	document.querySelector("#buy-cart .list-products-cart").appendChild(elementCard);
        	document.querySelector("#buy-cart .number-cart p").textContent = parseInt(document.querySelector("#buy-cart .number-cart p").textContent) + 1;
        	
        	if(document.querySelectorAll("#buy-cart .list-products-cart .card-content").length > 0 && document.querySelectorAll(".no-element-cart").length > 0){
        		document.querySelector(".no-element-cart").remove();
    		}


        	let products = JSON.parse(localStorage.getItem("products")) || [];
        	products.push(product);
        	localStorage.setItem("products", JSON.stringify(products));

        	document.querySelector("#tota-cart").textContent = parseInt(document.querySelector("#tota-cart").textContent)+parseInt(product["price"]);
        } 
    })
    .catch(error => {
        console.error('Error al hacer la solicitud AJAX:', error);
    });
});