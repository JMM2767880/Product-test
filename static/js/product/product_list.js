let pNoElements = document.createElement("p"); // Elemento que aparece cuando no hay resultados en  la búsqueda en el buscador
pNoElements.textContent = "No hay productos que coincidan con su búsqueda.";
pNoElements.classList.add("no-elements");
const productsConstainer = document.querySelector("#products-list .all-products"); 

// Este fragmento lo que hace es que cuando se escribe en el buscador, se empieza a filtrar los productos para encontrar el que buscamos
document.querySelector("#form-search input").addEventListener("keyup", function() {
    const searchValue = document.querySelector("#form-search input").value.toLowerCase();
    const products = document.querySelectorAll("#products-list .product-item");
    var auxDnone = 0;

    (document.querySelectorAll("#products-list p.no-elements").length > 0) && document.querySelector("#products-list p.no-elements").remove();


    for(let product of products){
    	product.style.display = "none";
    }
    
    products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
		if(productName.includes(searchValue)){
			product.style.display = "block";
			auxDnone++;
		}
    });

    (auxDnone == 0) && productsConstainer.appendChild(pNoElements);
});