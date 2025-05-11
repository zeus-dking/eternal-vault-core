// gasless-engine.js — Symbolic Fee Checker

function isGaslessPossible(txSizeBytes = 250) {
  const estimatedFeeSats = txSizeBytes * 1; // 1 sat/byte fee
  const threshold = 500; // symbolic threshold
  return estimatedFeeSats < threshold;
}

module.exports = {
  check: () => {
    if (isGaslessPossible()) {
      console.log("Gasless Transaction Detected: Optimal Time!");
    } else {
      console.log("Fees too high — waiting...");
    }
  }
};

// Run every 3 minutes
setInterval(() => {
  module.exports.check();
}, 3 * 60 * 1000);
