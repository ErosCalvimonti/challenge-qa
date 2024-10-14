
# Cypress Calendar Challenge

Este repositorio contiene pruebas automatizadas creadas con Cypress para verificar el comportamiento de una aplicación de calendario, **CalendarApp**. Las pruebas navegan a través de la aplicación, aseguran la existencia del evento "Groundhog Day" el 2 de febrero, y eliminan el evento si es necesario. Las pruebas están configuradas para ejecutarse automáticamente en GitHub Actions y enviar una notificación por correo electrónico en caso de fallo.

## Requisitos Previos

- **Node.js** (versión 12 o superior).
- **NPM** (instalado con Node.js).
- Cuenta de **Gmail** para el envío de notificaciones (con verificación en dos pasos activada y contraseña de aplicación generada).
- **Cypress** instalado como dependencia de desarrollo.

## Instalación

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/ErosCalvimonti/challenge-qa.git
   cd challenge-qa
   ```

2. **Instalar las Dependencias:**

   ```bash
   npm install
   ```

3. **Configurar Cypress:**

   Cypress se configura automáticamente a través del archivo `cypress.config.js`. Asegúrate de que la base URL de la aplicación de calendario esté definida en este archivo:

   ```javascript
   // cypress.config.js
   module.exports = {
     e2e: {
       baseUrl: "https://calendar-challenge-six.vercel.app/",
     },
   };
   ```

## Configuración de GitHub Actions

Crea un archivo `CypressTest.yml` en la carpeta `.github/workflows/` para ejecutar las pruebas en cada push a la rama `master`.

## Configurar Notificaciones por Correo Electrónico

En GitHub, ve a **Settings > Secrets and variables > Actions**, y agrega los siguientes secretos:

- `SMTP_USERNAME`: Tu dirección de Gmail.
- `SMTP_PASSWORD`: La contraseña de aplicación de Gmail generada (App Password).

## Estructura del Repositorio

```plaintext
qa-challenge-01/
├── cypress/
│   ├── e2e/
│   │   └── test/
│   │       └── calendarTests.cy.js
│   ├── pages/
│   │   ├── basePage.js
│   │   └── calendarPage.js
│   └── support/
│       └── commands.js
├── .github/
│   └── workflows/
│       └── CypressTest.yml
├── cypress.config.js
├── package.json
└── README.md
```

## Uso

### 1. Ejecutar las Pruebas en Local

Para abrir la interfaz de Cypress y ejecutar las pruebas manualmente:

```bash
npm run cypress:open
```

Para ejecutar las pruebas en modo headless:

```bash
npm run cypress:run
```

### Comandos Personalizados

- Ejecutar todas las pruebas excepto la última:

  ```bash
  npm run cypress:run:exclude-last
  ```

- Ejecutar únicamente la última prueba:

  ```bash
  npm run cypress:run:last
  ```

### 2. Automatización con GitHub Actions

El workflow de GitHub Actions (`CypressTest.yml`) está configurado para ejecutarse automáticamente en los siguientes eventos:

- Push a la rama `master`.
- Pull Request hacia la rama `master`.

#### Notificación de Resultados por Correo

Si alguna prueba falla, el workflow enviará un correo electrónico a la dirección configurada con el asunto "Cypress Test Results" y un mensaje indicando que los tests han fallado.

### 3. Configuración del Correo de Notificación

Para recibir notificaciones de fallos en tu correo de Gmail:

1. Habilita la verificación en dos pasos en tu cuenta de Gmail.
2. Genera una contraseña de aplicación en la sección de **App Passwords** de tu cuenta de Google.
3. Añade `SMTP_USERNAME` y `SMTP_PASSWORD` como secretos en tu repositorio de GitHub.

## Detalles Técnicos de las Pruebas

`calendarTests.cy.js`: Contiene cuatro test cases:

1. **Should navigate to the calendar page correctly**: Verifica que la página se carga correctamente.
2. **Should navigate to February**: Itera por los meses hasta llegar a febrero.
3. **Should navigate to February and ensure Groundhog Day event is present if not added**: Asegura que el 2 de febrero contenga el evento "Groundhog Day", y lo añade si no está.
4. **Should delete Groundhog Day event if present**: Elimina el evento "Groundhog Day" si está presente.

## Configuración Adicional

Este proyecto utiliza `@cypress/grep` para filtrar los tests. Las etiquetas `@all` y `@last` permiten seleccionar qué pruebas ejecutar mediante comandos personalizados.

---

Para más detalles y el código fuente, visita el [repositorio en GitHub](https://github.com/ErosCalvimonti/challenge-qa).

## Instrucciones para los Casos de Prueba

Para asegurar que la aplicación cumple con los requisitos, sigue estos pasos para crear y ejecutar los casos de prueba necesarios:

1. **Crear un caso de prueba que abra la página:**

   - Verifica que la página de la aplicación se abre correctamente en Cypress.
   - Para esto, el archivo `calendarTests.cy.js` debe contener un caso de prueba como este:

   ```javascript
   it('Should navigate to the calendar page correctly', () => {
     cy.visit('/');
     cy.get('.calendar').should('be.visible');
   });
   ```

2. **Crear un caso de prueba para navegar al mes de febrero:**

   - La página abre siempre en el mes actual. Crea un caso de prueba que recorra los meses hasta llegar a febrero, independientemente del mes de inicio.

   ```javascript
   it('Should navigate to February', () => {
     while (!cy.get('.month-display').contains('February')) {
       cy.get('.next-month-button').click();
     }
     cy.get('.month-display').should('contain', 'February');
   });
   ```

3. **Crear un caso de prueba para verificar y añadir el evento "Groundhog Day":**

   - Crea un caso que verifique si el evento "Groundhog Day" existe el 2 de febrero. Si no existe, créalo.

   ```javascript
   it('Should ensure Groundhog Day event is present if not added', () => {
     cy.get('.day-2-feb').click();
     cy.get('.event-list').then($list => {
       if (!$list.text().includes('Groundhog Day')) {
         cy.get('.add-event').click();
         cy.get('.event-name-input').type('Groundhog Day');
         cy.get('.save-event').click();
       }
     });
     cy.get('.event-list').should('contain', 'Groundhog Day');
   });
   ```

4. **Crear un caso de prueba para eliminar el evento "Groundhog Day":**

   - Crea un caso que borre el evento "Groundhog Day" si está presente en el calendario.

   ```javascript
   it('Should delete Groundhog Day event if present', () => {
     cy.get('.day-2-feb').click();
     cy.get('.event-list').then($list => {
       if ($list.text().includes('Groundhog Day')) {
         cy.get('.delete-event').click();
       }
     });
     cy.get('.event-list').should('not.contain', 'Groundhog Day');
   });
   ```

## Comandos Personalizados

Para facilitar la ejecución de los tests, puedes añadir los siguientes comandos en el archivo `package.json`:

- **Correr todos los tests:**

  ```json
  "scripts": {
    "cypress:run": "cypress run"
  }
  ```

  ## Configuración Adicional

Este proyecto utiliza `@cypress/grep` para filtrar los tests. Las etiquetas `@all` y `@last` permiten seleccionar qué pruebas ejecutar mediante comandos personalizados.

- **Correr todos los tests menos el último:**

  ```json
  "scripts": {
    "cypress:run:exclude-last": "cypress run --grep '@all'"
  }
  ```

- **Correr únicamente el último test (el que borra el evento "Groundhog Day"):**

  ```json
  "scripts": {
    "cypress:run:last": "cypress run --grep '@last'"
  }
  ```
  

## Notificación de Resultados por Correo Electrónico

Configura las notificaciones para recibir un correo con el resultado de los tests si alguno falla. Puedes usar la configuración de GitHub Actions para enviar correos:

1. Añade los secretos `SMTP_USERNAME` y `SMTP_PASSWORD` en GitHub.
2. Configura el workflow `CypressTest.yml` para que envíe un correo en caso de fallo utilizando un action de envío de emails.

Con esta configuración, recibirás una notificación cada vez que se ejecute el workflow y ocurra un fallo en las pruebas.
