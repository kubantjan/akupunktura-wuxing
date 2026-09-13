# Akupunktura Wu Xing — wuxing.cz

Website of the acupuncture practice of MUDr. Terezie Kubantová, Česká Lípa.
A plain static site (HTML + CSS, no build step) served by GitHub Pages from
the root of `main`, on the custom domain `wuxing.cz` (see `CNAME`).

## Layout

| Path | What |
|---|---|
| `index.html` | The whole site (single page, Czech) |
| `assets/style.css` | All styles; fonts are self-hosted in `assets/fonts/` (SIL OFL) — no Google requests, no cookies |
| `404.html`, `robots.txt`, `sitemap.xml`, `favicon*`, `apple-touch-icon.png` | Pages plumbing |
| `assets/og-image.png` | Link-preview image (Facebook, WhatsApp…) — generated, see below |
| `old-site-redirect/` | Files to upload over FTP to the old **wuxing.wz.cz** (replaces its pages with instant redirects to wuxing.cz) |
| `tools/` | `og-image.html` + `render.cjs` to regenerate the OG image, PNG favicons and screenshots |

## Editing content

Edit `index.html` directly (GitHub web editor is fine) — changes are live in ~1 minute.

- **Photo:** add `assets/terezie-kubantova.jpg` (portrait, ~800×1000) and
  uncomment the `<img>` in the `#o-mne` section (remove the `TK` monogram).
- **Prices:** fill in the table in the `#cenik` section and delete its `hidden`
  attribute; add `<a href="#cenik">Ceník</a>` to the nav.
- **Changing phone/address:** also update the JSON-LD block in `<head>`, `404.html`
  and `tools/og-image.html`, then regenerate the OG image.

## Regenerating images

```bash
python3 -m http.server 8765 &            # from the repo root
npm i --prefix /tmp/pw playwright && npx --prefix /tmp/pw playwright install chromium
NODE_PATH=/tmp/pw/node_modules node tools/render.cjs [--shots /tmp/shots]
```

## Domain (Gigaserver DNS for wuxing.cz)

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | kubantjan.github.io. |
| TXT | _github-pages-challenge-kubantjan | *(value from GitHub → Settings → Pages → Verified domains)* |

MX records stay untouched (e-mail is on seznam.cz). In the repo: Settings →
Pages → Deploy from branch `main` / `(root)`, custom domain `wuxing.cz`,
then tick **Enforce HTTPS** once the certificate is issued.

## Old site redirect (wuxing.wz.cz)

The free wz.cz hosting doesn't allow server-side 301s, so every old page is
replaced by a page with `<meta http-equiv="refresh" content="0">` +
`location.replace()` + `rel=canonical`, which Google treats as a permanent
redirect. Upload the contents of `old-site-redirect/` over FTP, keeping the
folder structure, and overwrite the old files:

| Old URL | → New |
|---|---|
| `/`, `/index.htm`, `/index.html` | `https://wuxing.cz/` |
| `/about_me/oakupunkture.htm` | `https://wuxing.cz/#o-mne` |
| `/resume/sluzby.htm` | `https://wuxing.cz/#sluzby` |
| `/contact/kontakt.htm` | `https://wuxing.cz/#kontakt` |

## Listings to update to wuxing.cz

The practice moved to **Mariánská 540/25, 470 01 Česká Lípa** — every listing
below still shows the old address (Mariánská 216/2, or even the Prague one),
so update the address together with the web link.

- [ ] Firmy.cz / Mapy.com (feeds Seznam search) — https://www.firmy.cz/detail/737700
- [ ] Facebook page — https://www.facebook.com/akupunktura.wuxing/
- [ ] Živéfirmy.cz — **still shows the old Prague address and 602 939 316** — https://www.zivefirmy.cz/akupunktura-wu-xing_f1168822
- [ ] ZlatéStránky.cz (no web yet) — https://www.zlatestranky.cz/profil/N33418
- [ ] Google Business Profile — check / create
- [ ] Optional: AC-TIVE ENF® registry of trained doctors (ac-tive.cz), ČLAS directory (akupunktura.cz)
