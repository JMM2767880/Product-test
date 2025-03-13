from django.shortcuts import render
from django.views.generic import ListView, DetailView
import requests, json
from producttest.settings import API_URL
from product.models import Product
from django.utils.text import slugify
from django.http import Http404, JsonResponse

'''
	from producttest.settings import API_URL -> hace referencia a la url hasta /api/ para acceder a la API
'''
PRODUCT_URL_API = "product" 
productList = None

''' 
Este método, se le pasa un slug (marca + modelo cambiando todos los espacios por guiones) y nos 
devuelve el producto al cual corresponde ese slug 
 '''
def get_product_by_slug(slug):
	try:
		response = requests.get(API_URL + PRODUCT_URL_API) # Accedo a la API para recoger la lista de productos

		if response.status_code == 200: # Si la respuesta nos envia el código 200, significa que se ha hecho la petición correctamente
			productListAPI = response.json() # Transformo a JSON la respuesta de la API
			# Con compresión de listas creo cada JSON a una instancia de la clase Product (por tener mayor escalabilidad  organización)
			productList = [Product(product["id"], product["brand"], product["model"], product["price"], product["imgUrl"], slugify((product["brand"] + product["model"]).lower())) for product in productListAPI]
			
			try:
				productSearch = next((p for p in productList if p.slug == slug), None) # Realizo la búsqueda del Producto por el slug que le hemos pasado previamente a la aplicación
				
				responseProduct = requests.get(API_URL + PRODUCT_URL_API + "/" + productSearch.idt) # Una vez encontrado el producto, rellenamos los demás datos de la clase Product accediendo a la API

				if responseProduct.status_code == 200: # Si la respuesta ha sido satisfactoria
					productJSON = responseProduct.json() # Recojo los datos del producto y los asigno a su instancia
					productSearch.cpu = productJSON["cpu"]
					productSearch.ram = productJSON["ram"]
					productSearch.os = productJSON["os"]
					productSearch.displayResolution = productJSON["displayResolution"]
					productSearch.battery = productJSON["battery"]
					productSearch.cameras = {
												"primaryCamera": productJSON["primaryCamera"],
												"secondaryCmera": productJSON["secondaryCmera"],
											}
					productSearch.dimentions = productJSON["dimentions"]
					productSearch.weight = productJSON["weight"]
					productSearch.colors = productJSON["options"]["colors"]
					productSearch.storages = productJSON["options"]["storages"]

					return productSearch # Devuelvo el usuario
				else:
					return None # En caso de no encontrarlo, devuelvo None
			except Exception as e:
				return None # En caso de no error, devuelvo None

	except requests.exceptions.RequestException as e:
		return None # En caso de no error, devuelvo None

# Clase de tipo ListView que se va a encarga de mostrar los productos
class ProductListView(ListView):
	template_name = 'product/product_list.html' # Especifíco la plantilla HTML
	context_object_name = 'products' # Especifico el nombre de la variable que va a contener la lista de productos para recojerlo con Jinja2 en la plantilla

	# Función que va a devolvernos la lista de productos
	def get_queryset(self):
		try:
			response = requests.get(API_URL + PRODUCT_URL_API) # Hacemos una petición GET para recoger la lista de productos

			if response.status_code == 200: # Si la solicitud ha tenido éxito
				productListAPI = response.json() # Pasamos a JSON la respuesta

				# Con compresión de listas vamos creando instancias de productos de cada JSON
				productList = [Product(product["id"], product["brand"], product["model"], product["price"], product["imgUrl"], slugify((product["brand"] + product["model"]).lower())) for product in productListAPI]

				return productList # Devuelvo la lista con los productos
			else:
				return []  # Si la solicitud falla, devuelve una lista vacía
		except requests.exceptions.RequestException as e:
			print(f"Error al conectar con la API: {e}")
			return []  # Devuelve una lista vacía en caso de error

# Plantilla que va a mostrar la información de un producto 
class ProductDetailView(DetailView):
	model = Product # Especifico el modelo
	template_name = 'product/product_detail.html' # Especifíco la plantilla HTML
	context_object_name = 'product' # Especifico el nombre de la variable que va a contener el producto para recojerlo con Jinja2 en la plantilla

	# Función que va a buscar el producto y lo va a devolver a la plantilla
	def get_object(self):
		slug = self.kwargs['slug'] # Recogemos el slug de la URL
		productSearch = get_product_by_slug(slug) # Realizamos la busqueda del producto

		if productSearch is None: # Si la busqueda ha sido nula mostramos la página 404
			raise Http404("Página no encontrada")
		else: # Si la búsqueda encontró el producto, lo devolvemos
			return productSearch

''' Función que va a realizar la llamada a la API para añadir un producto al carrito (POST),
 en este caso se utiliza ajax para hacer la llamada'''
def add_product_card_request(request):
	if request.method == "POST":
		codeColor = request.POST.get('codeColor', None) # Recojo el código del color
		codeStorage = request.POST.get('codeStorage', None) # Recojo el código del almacenamiento
		colorName = request.POST.get('colorName', None) # Recojo el nombre del color
		storageText = request.POST.get('storageText', None) # Recojo el texto del almacenamiento
		slug = request.POST.get('slug', None) # Recojo el slug
		product = get_product_by_slug(slug) # Realizo la búsqueda del producto por el slug

		data = { # Creo el cuerpo de la petición POST
		    "id": product.idt,  
		    "colorCode": codeColor,  
		    "storageCode": codeStorage 
		}

		headers = { # Creo la cabecerade la solicitud
		    'Content-Type': 'application/json',  # El cuerpo será en formato JSON
		}

		# Realizo la solicitud
		response = requests.post(API_URL + "cart", headers=headers, data=json.dumps(data))

		if response.status_code == 200: # Si la solicitud ha tenido éxito, devuelvo los datos recibidos
			response_data = response.json() 
			return JsonResponse({
				"data": response_data, 
				"product": {
					"id": product.idt,
					"imgUrl": product.imgUrl,
					"brand": product.brand,
					"model": product.model,
					"price": product.price,
					"codeColor": codeColor,
					"colorName": colorName,
					"codeStorage": codeStorage,
					"storageText": storageText
				}})

		return JsonResponse({"count": 0}) # En el caso de que no haya funcionado devolvemos el código 0 de que no se ha añadido el producto