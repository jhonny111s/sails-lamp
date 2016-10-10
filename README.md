# serversails

Aplicación para construir una api rest sencilla y lista para desplegarse en Heroku

# .env

El archivo .env es necesario para que la aplicación funcione ya que aqui se definen las variables de entorno.

```
NODE_ENV         = development
MONGOLAB_URI     = 'mongodb://user:password@urldatabase:port/database'
APPROVED_API_KEY = '123456'
```

# Iniciar con sail

Para comenzar a trabajar con sails es necesario tener apunto nuestro sistema operativo con paquetes necesarios, en esta documento nos concentraremos en ubuntu 15.04 de 64 bits. 
Los requerimientos básicos que debemos tener en cuenta son los siguientes y entre paréntesis se encuentra mi eleccion: 

una base de datos (postgresql,mongo) 
un gestor de base de datos (valentina studio) 
un editor de texto (sublimeText) 
cuenta en heroku 
instalación de heroku toolbet 
 
Debemos comenzar instalando el paquete npm  `sudo apt-get install npm`, el cual es un administrador de paquetes el cual nos será de mucha utilidad con nodejs. El siguiente paso es installar nodejs `sudo apt-get nodejs-legacy` y así obtendremos la ultima versión estable y con muchas de las correcciones de la comunidad, a continuación instalamos sails `sudo npm -g install sails` 
 
Ahora podemos hacer un `sudo apt-get update` para refrescar y actualizar nuestros paquetes y comprobar que no surja ningún error. 
 
por ahora para comprobar que sails este funcionando, vamos a crear un proyecto nuevo desde la terminal por ejemplo en Documentos `sails new nombre-proyecto`, ingresamos al directorio creado `cd nombre-proyecto` y ejecutamos el comando `sails lift`, si todo estuvo bien nos debe aparecer en la consola un barquito sin ningún warning o error y además podremos visualizar una pagina en la siguiente Url  http://localhost:1337 
 
Ahora vamos hacer algunas configuraciones para que funcione en Heroku: 

1. definir en el package.json la versión de node (versión estable existente) con que estamos trabajando, así heroku sabrá cual utilizar ` "engines": { "node": "0.12.4" }, ` 
2. se crea un archivo llamado Procfile con "touch Procfile" desde la consola, este se encarga de decirle a heroku que vamos a correr una aplicación node, para eso abrimos el archivo y agregamos la siguiente linea : `web: node app.js`  
3. ahora creamos nuestro Git con `git init` y agregamos los archivos que se crearon con la instalación de sails con `git add .` y finalmente creamos un comentario descriptivo por ejemplo git commit -m "subiendo archivos iniciales" 
4. ahora vamos a subir los archivos a heroku, para eso debemos primero loguearnos con "heroku login", para crear la app `heroku create nombre-proyecto`  una vez estemos aquí y si todo ha ido bien debemos crear la variable desde consola que indica que estamos en un entorno de producción `heroku config:set NODE_ENV=production` 
5. finalmente subimos nuestra aplicación con `git push heroku master` y al finalizar se proporcionará un enlace donde se ha desplegado el proyecto. 
 
 
# Pruebas de configuración y funcionamiento 
 
Para hacer algunas pruebas con el ORM no es necesario trabajar con ninguna base de datos ya que sails provee una base de datos local, sin embargo vamos a hacer algunas pruebas con los adaptadores de postgres y  mongo por lo tanto lo primero que hay que hacer es agregar al archivo package.json la línea : "sails-postgresql": "0.10.0-rc4" (o npm install sails-postgresql --save, para instalar la ultima versión) y en concreto se eligió esta versión porque hasta la fecha ninguna otra parece manejar bien los schemas de base de datos. En el caso de mongo se instalaría desde consola con npm install sails-mongo.

Todo lo que se encuentre en el package.js será instalado si ejecutamos el comando "npm install", luego debemos crear las conexiones a base de datos, tantas como el proyecto se lo exija, para el ejemplo basta con crear una conexión local a postgresql y/o una a mongo en config/connections.js así: 
```
posgrestLocal: { 
    adapter: 'sails-postgresql', 
    host: 'localhost', 
    user: 'postgres', 
    port: 5432, 
    password: 'mypass', 
    database: 'mydb' 
  },
```
Según las pruebas que se han hecho con este adapter y el ORM se crean las tablas y sus campos muy bien en el esquema publico (por defecto) pero si se desea trabajar con otros esquema parece que no lo permite y aun no he encontrado una solución, sin embargo si ya tenemos creada nuestra base de datos con sus diferentes esquemas este adaptador en concreto nos permite hacer las consultas 
``` 
MongoLocal: { 
    adapter: 'sails-mongo', 
    url : 'mongodb://myuser:mypass@localhost:27017/mydb', 
    schema : true 
  },
```
Con mongo es muy importante tenerlo bien instalado y ponerlo a correr con el comando mongod  para que no nos resulten problemas. La conexión se hace por medio de la url y esto también puede ser aplicado en postgres donde los dos primeros argumentos pueden ser omitidos si estamos en un ordenador personal y no se ha configurado el usuario de acceso ('mongodb://localhost:27017/mydb').

Ahora para hacer pruebas podemos hacer dos cosas, la primera es instanciar la conexión en config/models.js y agregar la linea: ` connection: 'MongoLocal' `(la que se creo en connections) esto es para que cualquier modelo que creemos utilice esta conexión por defecto. Otras configuraciones que podemos hacer en este archivo son:

migrate : 'alter',    => aquí le estamos diciendo a nuestro adaptador que puede hacer con la base de datos, usamos “alter” para agregar o borrar en el esquema; lo usamos para hacer pruebas en modo desarrollador, “drop” para borrar las tablas y volver a crearlas eliminando toda la información y usamos “safe” para manipular información sin afectar nada, este es el que se usa cuando el aplicativo este en producción.

autoCreatedAt   : false, 
autoUpdatedAt   : false,  => por defecto el ORM cuando crea una tabla le agrega estos campos, sino los queremos utilizar usamos estas lineas. 

Lo siguiente para hacer pruebas locales es configurar conf/local.js donde le vamos a decir porque puerto correr y en que modo, estas lineas ya se encuentran y solo hay que descomentarlas: 

port: process.env.PORT || 1337,
environment: process.env.NODE_ENV || 'development',

nota: como pueden notar hay un process.env seguido de algo en mayúsculas, estas son nuestras variables de ambiente, muy importantes a la hora de trabajar en producción, mas adelante se explicaran para usarlas con heroku. Por ahora debemos saber que en config/env tenemos dos archivos que sails usa para manejar estas variables según el entorno de prueba que se desee: development.js y production.js donde debemos decirle que conexión vamos a usar, asi

models: {
     connection: 'mongoLocal'
   }, 

Ahora si vamos a comenzar a desarrollar y para eso vamos a crear un modelo y un controlador con un nombre representativo, como ejemplo vamos a crear Usuario. Existen dos maneras de crear esto la primera es crear el modelo y el controller por aparte con los siguientes comandos: `sails model generate nombremodelo` y `sails controller generate nombrecontroller`  o simplemente usando el `sails api generate nombre`.

Para probar el funcionamiento desde la consola y dentro de la carpeta del proyecto
escribimos sails lift –prod  o sails lift –dev para probar nuestras distintas configuraciones



En blue prints para la seguridad usamos la siguiente linea:
```
 rest: false,

 shortcuts: false,

 prefix: &#39;&#39;,
```


Http status
```
500  error en el servidor para dar respuesta

400 parametro invalido o recurso existente

401 autenticacion fallida

200 transaccion exitosa ctualizacion, eliminacion obtencion de datos

201 creacion exitosa
```

# Recursos


Como medida de seguridad todo recurso debe hacer uso del parámetro &quot;token&quot; el cual es una llave privada que permitirá su ejecución.


USER 
| Recurso | POST | PUT | GET | DELETE |
|---------|------|------|-----|-------|
| /users/ | Nada | Nada | Obtiene los datos de todos los usuarios | nada |
| /users/myusername | Crea un nuevo usuario | nada | Obtiene los datos del usuario unespecifico | Elimina el usuario |





Petición get para obtener un usuario por su username

`server\_urlt:server\_port/users/username/?token=123456`

petición get para obtener todos los datos del usuarios

`server\_urlt:server\_port/users/?token=123456`

petición post para crear un usuarios, admin y active por defecto son falsos

`server\_urlt:server\_port/users/username/?token=123456&amp;admin=true&amp;active=true`

petición delete para eliminar un usuario por su nombre

`server\_urlt:server\_port/users/username/?token=123456`



LAMP 
| Recurso | POST | PUT | GET | DELETE |
|---------|------|------|-----|-------|
| /lamps/ | Crea una lampara, se esperan los parámetros a guardar | Nada | Obtiene los datos de todas las lamparas | nada |
| /lamps/identificador | nada | Actualiza una lampara, se esperan los parámetros a actualizar | Obtiene los datos de una lampara especifica. | Elimina una lampara |

Petición get para obtener una lampara por su identifier

`server\_urlt:server\_port/lamps/identifier/?token=123456`

petición get para obtener todos los datos de las lamparas

`server\_urlt:server\_port/lamps/?token=123456`

petición post para crear unalampara admin y active por defecto son falsos

`server\_urlt:server\_port/lamps/username/?token=123456&amp;identifier=012&amp;name=lamparita1&amp;location=LatLong&amp;user\_name=yulian`

petición delete para eliminar un usuario por su nombre

`server\_urlt:server\_port/users/username/?token=123456`

