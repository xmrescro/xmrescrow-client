// XMREscrow multisig client entry — webpack-bundled, served from /static/msig/
const moneroTs = require("monero-ts");
// monero-ts defaults the worker to "/monero.worker.js"; point it at our self-hosted copy
try {
  moneroTs.LibraryUtils.setWorkerDistPath("/static/msig/monero.worker.js");
} catch (e) { console.error("[xmrescrow-msig] setWorkerDistPath failed:", e); }
window.XMR = moneroTs;
console.log("[xmrescrow-msig] loaded. createWalletFull =", typeof moneroTs.createWalletFull,
            "| LibraryUtils =", typeof moneroTs.LibraryUtils);
