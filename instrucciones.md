# Instrucciones para creación de proyecto

## Backend

**Inicializando el proyecto**

Dentro de la carpeta `backend`.
Inicia el proyecto con `npm init -y` y luego instala typescript con `npm install typescript -D`.
Añadir `"tsc": "tsc"` dentro de `package.json`, lo cual será el script para ejecutar código typescript.
Ejecutar `npm run tsc -- --init` para crear el archivo `tsconfig.json`.

Modificar `tsconfig.json`, para descomentar ciertos parámetros.
Crear carpeta `build` vacía, y fuera crear `index.ts`.

---

**Instalando express**

Instalar express con `npm install express -E`, que servirá para crear la API.
Añadirlo también a devDependencies con `npm i --save-dev @types/express`.

Usar el script `tsc` para transpilar `index.ts` a `index.js` y después usar `node build/index.js` para iniciar el servidor.

> En caso de que `tsc` no funcione, usar `npm install -g typescript`, o como último recurso prueba con `npx tsc`.

---

**Instalando node**

Instalar node-ts para desarrollo con `npm install ts-node-dev -D`.
Definir el script `"dev": "ts-node-dev src/index.ts"` dentro de `package.json` para dev environment, de manera que se pueda usar typescript en node libremente.

> De preferencia se debe mantener TypeScript como una dev dependency ya que tiene algo de peso (MBs). Si se quiere saber el tamaño de las dependencias se puede usar packagephobia.

Usar el comando `npm run dev` para ejecutar el servidor web en typescript (dev env).

---

**Instalando mysql**

Instalar el paquete mysql2 usando `npm install mysql2 --save`, ya que ese es compatible con typescript y se usará para conectarse a una base de datos.
Usar `npm install --save-dev @types/node` si se está haciendo uso de typescript, como mencionado anteriormente.

---

**Instalando zod**

Instalar el paquete zod usando `npm install zod --save` para hacer validaciones de esquemas usando typescript.

## Frontend

test