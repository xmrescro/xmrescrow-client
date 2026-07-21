# XMREscrow — Multisig Client

Client-side code for the **2-of-3 multisig escrow** at [xmrescrow.app](https://xmrescrow.app) (and its Tor onion service). It runs entirely in your browser.

## Why this is public

For a multisig escrow, **you should not have to trust our server** — and with this code, you don't have to. Your Monero key is generated in your browser and is never sent to us. This repository lets you verify that for yourself.

## What the server can and cannot see

| | |
|---|---|
| **Never leaves your browser** | your private key · your one-time restore key |
| **Sent to the server (opaque)** | multisig `prepare` / `make` / `exchange` / `sync` / signed-tx **hex** — coordination data passed between the three parties. Not keys. Cannot spend on their own. |
| **The server's role** | holds the **operator's single key**, used only to co-sign a *disputed* deal. It can never move funds alone — every spend needs **2 of the 3** keys, and you hold one. |

## Files

- **`escrow_multisig.html`** — the page you load. Read the `<script>` block: it calls `XMR.createWalletFull(...)` / `openWalletFull(...)` **locally**, shows your restore key **once**, and only POSTs multisig hex to `/e/<id>/msig/*`.
- **`static/monero.js`, `static/monero.worker.js`** — the [monero-ts](https://github.com/woodser/monero-ts) v0.11.10 WebAssembly Monero wallet, **official and unmodified** (verifiable against npm — see VERIFY.md).
- **`static/xmrescrow-msig.bundle.js`** — a webpack bundle of `build/src/index.js` (8 lines) plus monero-ts.
- **`build/`** — the exact recipe to reproduce the bundle.
- **`HASHES.txt`** — SHA-256 of the served static files.

## Verify it yourself

See **[VERIFY.md](VERIFY.md)** — verify the wallet library against upstream monero-ts, rebuild the bundle, and read the page's script to confirm no key ever leaves your browser.

## Scope

This is the multisig **client only**. The server, operator tooling, and admin panel are intentionally not included — they hold no user keys and are not needed to verify non-custody. The operator-mediated (custodial) flow is a separate, trust-the-operator product and is not covered here.

## License

MIT — see [LICENSE](LICENSE).

## Authenticity

Commits in this repository are PGP-signed by the XMREscrow operator key:

    CD37 A312 8254 2C2A CE91 FED3 A345 CD6C 2674 D00A

The same fingerprint is published at https://xmrescrow.app/pgp, in the signed
warrant canary at https://xmrescrow.app/canary (verify with `gpg --verify`),
and on the @xmrescrow profile. Cross-check them. A commit without a green
"Verified" badge carrying this key is not from the operator. Do not trust, verify.


## Build & Verify

**What is ours vs upstream.** The auditable source in this repo is the client
application code (templates, ceremony glue). The cryptography is not our code:
`static/monero.js` and `static/monero.worker.js` are the **unmodified build
artifacts** of [monero-ts](https://github.com/woodser/monero-ts). We redistribute
that build under its MIT license (see `static/LICENSE.monero-ts`, (c) woodser and
contributors); we do not claim it as our source.

**Pinned upstream**
- Package: `monero-ts@0.11.10`
- Upstream tag commit: `3e9a1df2db5ee4772f8507bd2aac2d290e4f0b94`
  (verify: `git ls-remote https://github.com/woodser/monero-ts.git refs/tags/v0.11.10`)
- npm tarball SHA-256: `b4e1abcc193e83f07a4ca0ced04ebd26e55ea570b6ce51bf11ebe2cd2490d17b`

**Bundle hashes (SHA-256)**

```
a3830e5ffba43b0e34cff714b75c82ff8af52af8f04cdc6a9ff4433219c5f5d6  static/monero.js
979a1975d03f50c09cc1992111bce554ac6a465b2057a4092ef29c701ea6dd8c  static/monero.worker.js
```

**Verify yourself — our bundle is byte-identical to npm's**

```
npm pack monero-ts@0.11.10
sha256sum monero-ts-0.11.10.tgz     # b4e1abcc...
tar -xf monero-ts-0.11.10.tgz
sha256sum package/dist/monero.js package/dist/monero.worker.js
cmp package/dist/monero.js static/monero.js && echo IDENTICAL
cmp package/dist/monero.worker.js static/monero.worker.js && echo IDENTICAL
```

The same files are served live:
`curl -s https://xmrescrow.app/static/msig/monero.js | sha256sum`
