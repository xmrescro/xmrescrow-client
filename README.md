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
