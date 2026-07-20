# Verifying the XMREscrow multisig client

Four checks, in order of importance.

## 1. The wallet library is official monero-ts, unmodified

`static/monero.js` and `static/monero.worker.js` are the WebAssembly Monero wallet that does the actual cryptography. They are copied unmodified from **monero-ts v0.11.10**. Verify byte-for-byte:

    npm pack monero-ts@0.11.10
    tar xf monero-ts-0.11.10.tgz
    sha256sum package/dist/monero.js package/dist/monero.worker.js
    sha256sum static/monero.js static/monero.worker.js

The corresponding hashes must match. monero-ts is itself open source and audited by the Monero community: https://github.com/woodser/monero-ts

## 2. The app bundle is a trivial wrapper

`build/src/index.js` is the **entire** custom entry point — 8 lines. It requires monero-ts, points the worker path at our self-hosted copy, and exposes `window.XMR`. It performs **no network calls and touches no key material.** Read it.

Rebuild the bundle yourself:

    cd build
    npm install
    npx webpack --config webpack.config.js
    sha256sum web/dist/xmrescrow-msig.bundle.js

Note: webpack output is not always byte-reproducible across toolchain versions, so this hash may differ slightly from the served one. What matters is that the **input is fully published and trivial** (`src/index.js` + upstream monero-ts) — the bundle adds no logic beyond those 8 lines. The served hash is recorded in `HASHES.txt`.

## 3. The page never transmits your keys

Open `escrow_multisig.html` and read the `<script>`:

- `XMR.createWalletFull({...})` and `XMR.openWalletFull({...})` run **in your browser**.
- Your **restore key** is `getData()[0]` (base64) — shown to you and downloaded **locally**; never POSTed.
- The only data POSTed to `/e/<id>/msig/*` is multisig **hex** (`prepareMultisig`, `makeMultisig`, `exchangeMultisigKeys`, `exportMultisigHex`, signed tx hex) — standard multisig coordination messages, not keys, cannot spend by themselves.
- `/node/*` and root daemon requests are ordinary Monero **blockchain sync**, proxied same-origin so the wallet works over Tor.

## 4. Confirm the escrow is really 2-of-3 on-chain

The deposit address shown to the buyer is a real Monero **2-of-3 multisig address**. You generated one of the three keys in your own browser. Moving funds requires **any two** of the three signatures — no single party, including the operator, can spend alone.
