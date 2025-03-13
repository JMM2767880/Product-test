from django.db import models

'''
	En vez de utilizar la estructura de modelos de Django, me he decantado por crear una clase Producto
	para ir recorriendo la API, ya que no necesitamos guardar en el servidor los datos.
'''
class Product:
	def __init__(self, idt, brand, model, price, imgUrl, slug, 
		cpu=None, ram=None, os=None, displayResolution=None, battery=None, cameras=None, 
		dimentions=None, weight=None, colors=None, storages=None):
		self.idt = idt # Id del producto
		self.brand = brand # Marca del producto
		self.model = model # Modelo del producto
		self.price = price # Precio del producto
		self.imgUrl = imgUrl # Imagen del producto
		self.slug = slug # slug de la url para que no aparezca el id del producto
		self.cpu = cpu # CPU del producto
		self.ram = ram # RAM del producto
		self.os = os # Sistema Operativo del producto
		self.displayResolution = displayResolution # Resolución de pantalla del producto
		self.battery = battery # Batería del producto
		self.cameras = cameras # Cámaras de producto
		self.dimentions = dimentions # Dimensiones del producto
		self.weight = weight # Peso del producto
		self.colors = colors # Colores del producto
		self.storages = storages # Almacenamiento del producto

	# Método que muestra el objeto con sus atributos
	def __str__(self):
		return (f"Product: id={self.idt}, brand={self.brand}, model={self.model}, price={self.price}, "
		f"imgUrl={self.imgUrl}, slug={self.slug}, cpu={self.cpu}, ram={self.ram}, os={self.os}, "
		f"displayResolution={self.displayResolution}, battery={self.battery}, cameras={self.cameras}, "
		f"dimentions={self.dimentions}, weight={self.weight}, colors={self.colors}, storages={self.storages}")

