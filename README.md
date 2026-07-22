# YouTube AdBlock

Chrome ekstenzija (Manifest V3) koja blokira reklame na YouTube-u kombinacijom mrežnog blokiranja i uklanjanja/preskakanja reklama u playeru.

## Fajlovi

```
yt-adblock/
├── manifest.json   → konfiguracija ekstenzije
├── rules.json      → declarativeNetRequest pravila (blokira ad zahtjeve na mrežnom nivou)
├── content.js       → hvata i preskače/uklanja reklame koje se provuku u player i feed
└── style.css        → sakriva banner/overlay reklame odmah, bez "flash-a"
```

## Kako radi

1. **`rules.json`** – blokira poznate ad domene i endpointe (doubleclick.net, googlesyndication.com, `/pagead/`, `/get_midroll_info`...) prije nego što se zahtjev uopšte učita.
2. **`style.css`** – trenutno sakriva poznate ad elemente (banneri, promo kartice) čim se pojave u DOM-u.
3. **`content.js`** – provjerava svakih 50ms i na svaku DOM promjenu da li je trenutno prikazana video reklama; ako jeste, mutuje zvuk, ubrzava playback (`playbackRate = 16`) i pokušava premotati/kliknuti Skip da reklama što prije prođe. Također uklanja feed/banner reklame.

## Instalacija

1. Otvori `chrome://extensions`
2. Uključi **Developer mode** (gornji desni ugao)
3. Klikni **Load unpacked**
4. Izaberi folder `yt-adblock`
5. Refreshuj YouTube tab

## Ažuriranje nakon izmjene koda

Nakon svake izmjene fajlova, na `chrome://extensions` klikni ⟳ (reload) na ekstenziji, pa refreshuj YouTube tab da se promjene primjene.

## Poznata ograničenja

- YouTube često mijenja CSS klase i selektore u playeru/feed-u da oteža blokiranje — ako nešto prestane raditi, treba inspect-ovati element i ažurirati selektore u `content.js` / `style.css`.
- Video reklame se serviraju sa istog CDN domena (`googlevideo.com`) kao i pravi sadržaj, pa mrežno blokiranje (`rules.json`) ne može pouzdano razlikovati ad segment od pravog videa — zbog toga se oslanjamo na `content.js` da reklamu što brže "pregori" (ubrzanje, mute, skip) umjesto da je potpuno spriječi da se učita.
- Kratak "crni ekran" prije nego JS stigne da reaguje se ne može u potpunosti eliminisati bez dubljeg hook-a u YouTube-ov player API (pristup koji koriste ekstenzije poput uBlock Origin injectovanjem skripte u page context).

## Licenca

Za ličnu upotrebu / edukativne svrhe.
