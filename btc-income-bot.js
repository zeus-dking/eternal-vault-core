// btc-income-bot.js — Passive Income Trigger Bot

const config = require('./vault-config.json');
const fs = require('fs');

function generateIncome() {
  const microAmount = 0.000027; // Simulated micro BTC earning
  const log = `+ Earned ${microAmount} BTC into ${config.walletAddress}`;
  const incomeLogPath = './vault-income-log.txt';

  fs.appendFileSync(incomeLogPath, `${new Date().toISOString()} - ${log}\n`);
  console.log(log);
}

// Loop every 5 minutes
setInterval(generateIncome, 5 * 60 * 1000);
