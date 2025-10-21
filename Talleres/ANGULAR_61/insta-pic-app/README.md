# InstaPicApp

Completar el código conectando los servicios disponibles, anteriormente expuestos:
 - Registrar usuario
 - Subir foto
 - Consultar gallería de un usuario
 - Buscar usuarios
 - Editar el perfil del usuario

## Registro de usuario

- Modificar la lógica del servicio [Auth](https://github.com/jjzapata81/udemed_202502/blob/main/Talleres/ANGULAR_61/insta-pic-app/src/app/shared/services/auth.ts), para que el método `onSignUp` no persista la información en el `localStorage`, sino que consuma el api de creación de usuarios
- Realizar control de errores y redireccionamiento en caso de éxito
- Guardar el `token` en el `sessionStorage`
- Generar las interfaces que considere necesarias

## Subir foto

- Modificar la lógica del servicio [UserService](https://github.com/jjzapata81/udemed_202502/blob/main/Talleres/ANGULAR_61/insta-pic-app/src/app/shared/services/user-service.ts), para que el método `saveImage` guarde la imagen consumiendo el api de subir foto
- Realizar control de errores y redireccionamiento en caso de éxito
- Generar las interfaces que considere necesarias

**Nota**: Para consumir este servicio es necesario enviar el token en los headers de la petición. A continuación un ejemplo de cómo se hace:
```js
//Se debe recuperar el token del sessionStorage
saveImage(userId:string, url:string){
  const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
  this.http.post(`${url}`, { userId, url }, {headers})...
  ...
}
```
## Consultar galería de un usuario

- Modificar la lógica del servicio [UserService](https://github.com/jjzapata81/udemed_202502/blob/main/Talleres/ANGULAR_61/insta-pic-app/src/app/shared/services/user-service.ts), para que el método `getGallery` consuma el api de consultar galería
- Presentar las imágenes del usuario en el `home`
- Realizar control de errores
- Generar las interfaces que considere necesarias

## Buscar usuarios

- Agregar en el servicio [UserService](https://github.com/jjzapata81/udemed_202502/blob/main/Talleres/ANGULAR_61/insta-pic-app/src/app/shared/services/user-service.ts), un método que consuma el api de consulta de usuarios
- Presentar los usuarios en el `find`
- Realizar control de errores
- Generar las interfaces que considere necesarias

## Editar el perfil del usuario

- Agregar en el servicio [UserService](https://github.com/jjzapata81/udemed_202502/blob/main/Talleres/ANGULAR_61/insta-pic-app/src/app/shared/services/user-service.ts), un método que consuma el api de actualización de usuarios
- Agregar en el servicio [UserService](https://github.com/jjzapata81/udemed_202502/blob/main/Talleres/ANGULAR_61/insta-pic-app/src/app/shared/services/user-service.ts), un método que consuma el servicio de carga de imagenes para el perfil del usuario
- Redireccionar al home y visualizar los cambios realizados
- Realizar control de errores
- Generar las interfaces que considere necesarias

