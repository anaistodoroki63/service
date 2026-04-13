const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('Client connecté:', socket.id);
  
  // Envoyer confirmation
  socket.emit('connected', { message: 'Connecté au serveur Module OPS' });
  
  // Écouter les alertes
  socket.on('alerte', (data) => {
    console.log('Alerte reçue:', data);
    // Diffuser à tous les clients
    io.emit('nouvelle-alerte', data);
  });
  
  // Écouter les bips
  socket.on('bip', (data) => {
    console.log('BIP:', data);
    // Diffuser à tous les clients
    io.emit('jouer-bip', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client déconnecté:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log('╔═══════════════════════════════════╗');
  console.log('║   MODULE OPS - Serveur started        ║');
  console.log('║   http://localhost:' + PORT + '            ║');
  console.log('╚═══════════════════════════════════╝');
  console.log('');
  console.log('Pour acceder sur otro poste:');
  console.log('  Trouvez votre IP locale (ipconfig)');
  console.log('  Puis: http://VOTRE-IP:' + PORT);
});
