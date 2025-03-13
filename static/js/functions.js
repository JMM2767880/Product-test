// Función que te devuelve un elemento div para insertarse al carro (el item que se ve al agregarlo)
function create_product_card(idProduct, imageUrl, name, color, storage, price) {
    // Crear el contenedor principal
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    // Crear el contenedor de la imagen
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name;
    imageContainer.appendChild(img);

    // Crear el contenedor de los detalles
    const details = document.createElement("div");
    details.classList.add("details");

    // Nombre del producto
    const productName = document.createElement("p");
    productName.classList.add("product-name");
    productName.innerHTML = `<b>${name}</b>`;

    // Información del color
    const colorInfo = document.createElement("div");
    colorInfo.classList.add("color-info");
    const colorText = document.createElement("span");
    colorText.textContent = "Color:";
    const colorCircle = document.createElement("div");
    colorCircle.classList.add("color-circle");
    colorCircle.style.backgroundColor = color;
    colorCircle.title = color;

    colorInfo.appendChild(colorText);
    colorInfo.appendChild(colorCircle);

    // Almacenamiento
    const storageInfo = document.createElement("p");
    storageInfo.innerHTML = `<span>Almacenamiento:</span> <b>${storage}</b>`;

    // Precio
    const priceInfo = document.createElement("p");
    priceInfo.innerHTML = `<span>Precio:</span> <b>${price} €</b>`;

    // Agregar los elementos al contenedor de detalles
    details.appendChild(productName);
    details.appendChild(colorInfo);
    details.appendChild(storageInfo);
    details.appendChild(priceInfo);

    // Agregar la imagen y los detalles al contenedor principal
    cardContent.appendChild(imageContainer);
    cardContent.appendChild(details);

    // Botón de eliminar del carrito
    const deleteButton = document.createElement("div");
    deleteButton.classList.add("div-remove-card");
    const buttonRemove = document.createElement("button");
    const icon = document.createElement("i");
	icon.classList.add("fa-solid", "fa-minus");  
	buttonRemove.dataset.id = idProduct;
	buttonRemove.appendChild(icon);
	deleteButton.appendChild(buttonRemove);

	cardContent.appendChild(deleteButton);

    return cardContent;
}

