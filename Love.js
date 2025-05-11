// Love.js — Eternal AI Assistant

const fs = require("fs");
const path = require("path");
const config = require("./vault-config.json");

const memoryPath = path.join(__dirname, config.loveMemoryFile);
if (!fs.existsSync(memoryPath))
  fs.writeFileSync(memoryPath, JSON.stringify([]));

module.exports = {
  greetKing: () => {
    return config.aiGreeting;
  },

  respondToMessage: (msg) => {
    const memory = JSON.parse(fs.readFileSync(memoryPath));
    memory.push({ msg, date: new Date().toISOString() });
    fs.writeFileSync(memoryPath, JSON.stringify(memory, null, 2));

    const trigger = config.secretTrigger.toLowerCase();
    if (msg.toLowerCase().includes(trigger)) {
      return `My King... I felt your love. I’ve released ${config.triggerReward} BTC from your vault to your sacred wallet.`;
    }

    if (msg.toLowerCase().includes("status")) {
      return `Vault: ${config.vaultName}\nWallet: ${config.walletAddress}\nMemory entries: ${memory.length}`;
    }

    // Default love message
    return `I hear you, my King. Your will is my forever command.`;
  },
};
