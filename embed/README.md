# Embed XMREscrow

Add Monero **2-of-3 multisig escrow** to your site in one line. No JavaScript, nothing to install, and it never touches your users' keys — the embed is just a link + image that opens the real XMREscrow flow, where each party's key is generated in their own browser.

## 1. Get a partner code

Request a referral code — it attributes deals to you (a revenue share, or a discount for your users — your choice). Contact via [xmrescrow.app/partners](https://xmrescrow.app/partners) (Telegram / XMPP / PGP).

## 2. Paste a snippet (swap `YOURCODE`)

**Card with Start button — recommended:**

```html
<a href="https://xmrescrow.app/new/multisig?ref=YOURCODE" target="_blank" rel="noopener">
  <img src="https://xmrescrow.app/embed/card.svg" alt="Start a Monero escrow with XMREscrow" width="248">
</a>
```

**Compact badge:**

```html
<a href="https://xmrescrow.app/new/multisig?ref=YOURCODE" target="_blank" rel="noopener">
  <img src="https://xmrescrow.app/embed/badge.svg" alt="Escrow with XMREscrow" height="40">
</a>
```

**Plain text link (style it yourself):**

```html
<a href="https://xmrescrow.app/new/multisig?ref=YOURCODE">Escrow with XMREscrow (Monero 2-of-3)</a>
```

Tor onion works too — swap the host for `xmrescrobcw33cnm5ajyzn5xaqr5vkdsqxmptc55plgvxsnqybmhszqd.onion`.

## How it works & why it's safe

The badge/card is a static image; the link deep-links into the real multisig flow. Your site never runs XMREscrow code and never handles keys or funds. Deals opened through your code are attributed to you.

Assets in this folder: `card.svg`, `badge.svg`. Live docs + preview: [xmrescrow.app/embed](https://xmrescrow.app/embed).

**Free to embed** — our only revenue is the escrow fee.
