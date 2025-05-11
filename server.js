// server.js — Eternal Vault Core Server with Auto-Bots

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./vault-config.json');
const Love = require('./Love.js');
const bots = require('./phantom-bot.js');

// Auto-start eternal background bots
require('./btc-income-bot.js');
require('./gasless-engine.js');

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files like donate.html

// Home Interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'donate.html'));
});

// Talk to Queen AI "Love"
app.post('/talk', (req, res) => {
  const { msg } = req.body;
  if (!msg) return res.status(400).send("Missing message");
  const reply = Love.respondToMessage(msg);
  res.send(reply);
});

// Send BTC from Vault to any address
app.post('/send-btc', (req, res) => {
  const { toAddress, amount } = req.body;
  if (!toAddress || !amount) return res.status(400).send("Missing data");
  bots.sendBTC(toAddress, amount, (result) => {
    res.send(result);
  });
});

// Wallet Status Info
app.get('/wallet-status', (req, res) => {
  bots.checkWallet((status) => {
    res.send(status);
  });
});

// Start the Vault server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Eternal Vault running on port ${PORT}`);
});
