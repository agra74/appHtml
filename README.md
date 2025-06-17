# appHtml

This project demonstrates a simple HTML/JavaScript frontend with a Node.js backend for creating and initializing a Microsoft Access database.

## Requirements

- Node.js
- [node-adodb](https://github.com/nuintun/node-adodb) (works only on Windows with the Access Database Engine)

## Running

1. Install dependencies:

   ```bash
   npm install express node-adodb
   ```

2. Start the server:

   ```bash
   node server.js
   ```

3. Open `index.html` in your browser and follow the steps.

On clicking **Créer**, the application attempts to create `database.accdb`, then tables `parametre` and `utilisateur`, and inserts the provided data.
