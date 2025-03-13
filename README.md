# Test deProductos

Este es un proyecto de ejemplo que utiliza varias tecnologías modernas para la creación de una aplicación web.

## Tecnologías Usadas

- **Python**
- **Django**
- **JavaScript**
- **CSS**
- **HTML**
- **Jinja2**
- **Bootstrap**

## Instalación (Windows)

### Prerrequisitos
- **Git**
- **Python**

Para instalar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. **Crea una carpeta en la ubicación que quieras trabajar**.

2. **Accede a la carpeta**:
```bash
    cd carpeta-proyecto
```

3. **Crea un entorno virtual**:
```bash
    python -m venv mi-proyecto-venv
```

4. **Activa el entorno virtual**:
```bash
    cd mi-proyecto-venv
    cd Script
    activate
```

5. **Volvemos a la carpeta principal (carpeta-proyecto)**

6. **Descargamos el repositorio:**
```bash
    git clone https://github.com/JMM2767880/Product-test.git
```

7. **Instalamos las librerías pip necesarias:**
   Desde nuestra carpeta raíz ejecutamos los siguientes comandos
```bash
    cd producttest
    python manage.py runserver
```

8. **En el navegador accedemos:** (Normalmente es localhost)
- http://localhost:8000/
- http://127.0.0.1:8000/

## Guía de usuario

1. **Al acceder a la aplicación la primera pantalla que vamos a ver va a ser la que muestra todos los productos:**

### Lista de productos

![image](https://github.com/user-attachments/assets/4b179a64-a029-4235-9b38-3ff93b5a16f8)

#### Header
- Podemos Observar que en el header tenemos un logotipo, el cual si le hacemos click nos dirigirá a la pantalla principal, es decir, en la que estamos actualmente.
![image](https://github.com/user-attachments/assets/bd3cd541-12bf-48d2-b3cd-261150fb3d9e)

- A la derecha nos encontramos con el carrito de compra el cual si le hacemos click nos va a abrir un mini menú en el cual se van a mostrar los productos que hay en el carrito de compra. También cabe destacar que conforme vallamos añadiendo productos, el saldo total se irá actualizando.
  ![image](https://github.com/user-attachments/assets/e97329fd-817c-4849-bed8-33283a9f130f)

#### Buscador de productos
- El buscador se actualiza a tiempo real, filtra por modelo y marca. En el caso de no obtener resultados aparecerá un mensaje que nos informa que no hay resultados con los criterios empleados. Si vaciamos el buscador, volverán a aparecer todos los productos y al realizar una búsqueda, aquellos productos que coincidan con los criterios introducidos.

![image](https://github.com/user-attachments/assets/6e32abae-d7ec-45c9-bb20-30df16fb3b60)
![image](https://github.com/user-attachments/assets/778b0152-0856-4d08-8738-7c20b6de32ee)

#### Carta de producto
En la carta del producto aparecen los siguientes datos:
- Imagen.
- Marca y modelo.
- Precio.
- Botón para poder acceder a la información del producto.

![image](https://github.com/user-attachments/assets/fb12c2a4-8076-47cb-8e79-98cb53febb88)

### Información de un producto
Al pulsar en el botón que dice "Ver producto" podremos acceder a la pantalla que nos muestra la información del producto, en esta pantalla se muestran los siguientes datos:
- Sistema Operativo.
- CPU.
- RAM.
- Resolución de Pantalla.
- Batería.
- Dimensiones.
- Peso.
- Cámaras


  






