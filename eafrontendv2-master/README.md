# MANUAL DE USO - PERSONALEMENTE-Luis Manrique (2018-2)

## VISTA DE APLICACION EN NAVEGADOR
* Descargar o clonar el repositorio **eafrontendv2**
* Ingresar a una terminal con la ruta de la ubicacion de descarga
* Realizar: **ionic serve**
* Aceptar instalar el **app-scripts**
* Con esto conseguimos ver la aplicacion en el navegador


## CONSTRUCCION DEL APK

#### REQUISITOS
* Android Studio
* SDK Android
* JDK Java

#### PASOS
* Entrar a el IDE de uso, realizar el comando: **$ ionic cordova build --release android**
* Luego esto generara una carpeta en **platforms** **llamada android**
* Usando Android Studio seleccionamos la opcion de abrir proyecto ya existente
* Seleccionamos la carpeta de **android** el cual Android Studio reconocera como proyecto compatible
* Se sincronizara el gradle, rechazar ofertas de actualizar gradle (puede generar errores)
* Ir a la opcion **Build>Apk**
* Una vez termine de hacer el apk, saldra en Android Studio una notificacion con la opcion **locate**
* Nos dirigira a una carpeta con el apk: **debug-apk**
* Este apk se podra instalar normalmente en un movil android