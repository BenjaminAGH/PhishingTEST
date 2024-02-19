##Descripción

El siguiente software está enfocado en pruebas de Pishing de forma interna, para corroborar que los funcionarios de Asmar poseen una cultura pro-si adecuada. Para esto se realizan dos verificaciones: la primera, si el usuario entra al link sospechoso. La segunda, si este ingresa datos, lo que desplegará una pestaña de aviso.

##Información Técnica

Para el desarrollo se utilizó como lenguaje principal Javascript, con sus herramientas node, express, react y vite.

##IMPORTANTE

Para correr el servicio de manera local se deben seguir los siguientes pasos:

**Backend**
Ingrese a la carpeta backend por consola
```bash
  cd .\backend\ 
```

Inicie el servidor de manera local
```bash
  npm start
```

**Frontend**
Ingrese a la carpeta frontend por consola
```bash
  cd .\frontend\ 
```

Inicie el servidor de manera local
```bash
  npm run dev
```

##Mejoras a Realizar

- Implementar el código en un servidor, para realizar de manera efectiva las pruebas internas.

- Implementar "Pixel de Seguimiento", para comprobar si el funcionario vio el correo enviado (No tan efectivo pero unica manera).

- Implementar comprobación usuarios que avisaron a snoc.