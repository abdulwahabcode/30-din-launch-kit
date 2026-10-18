# 30-Din Business Launch Kit — Owner Guide (Roman Urdu)

## Ye kya hai
Aapka paid digital product. Customer landing page dekhta hai → WhatsApp par order karta hai →
Easypaisa/JazzCash par Rs 4,997 bhejta hai → aap access code dete ho → wo members area kholta hai
(30-din roadmap, 22+ WhatsApp templates, Google Business Profile guide, AI copy generator).

## Pehle ye 3 kaam karo (sirf ek dafa)

### 1. Apna WhatsApp number dalo
File: `js/buy.js` — sab se upar ye line hai:
```js
var WHATSAPP_NUMBER = "WHATSAPP_NUMBER_TO_FILL";
```
Isko apne number se badlo — country code ke saath, bina `+` ke. Masalan:
```js
var WHATSAPP_NUMBER = "923001234567";
```
**Number ke baghair "Order" button kaam nahi karega.** File badalne ke baad dobara push karo (neeche deploy dekho).

### 2. Access codes ki list sambhalo
Pehle 100 codes ban gaye hain. Asal codes ki list yahan hai (YE FILE KABHI KISI KO NA BHEJO, GitHub par NA DALO):
`~/workspace/goals/digital-products-side-hustle/hidden_files/ldk-codes-plain-2026-10-17.txt`

Har customer ko **ek alag code** WhatsApp par bhejo. Jis code ko bhej do, us par list me nishan laga lo (taake dobara na bhej do).

### 3. GitHub Pages on karo (ek dafa)
Repo: `abdulwahabcode/30-din-launch-kit` → Settings → Pages → Branch: `main`, folder: `/ (root)` → Save.
Uske baad site is link par live hogi: `https://abdulwahabcode.github.io/30-din-launch-kit/`

## Roz ka kaam: order fulfill (2 minute)
1. Customer ka WhatsApp message aayega ("Mujhe 30-Din Business Launch Kit khareedna hai").
2. Use apna Easypaisa/JazzCash number bhejo.
3. Wo Rs 4,997 bhej kar **screenshot** bhejega — apne Easypaisa/JazzCash app me payment check karo.
4. Payment sahi ho to codes wali list se **agla code** copy karke WhatsApp par bhej do:
   "Mubarak ho! Aapka access code: LDK-XXXX-XXXX. Is link par ja kar code enter karein: https://abdulwahabcode.github.io/30-din-launch-kit/buy.html"
5. List me us code par ✓ nishan lagao.

## Naye codes banana
100 khatam hone par terminal me:
```
cd ~/workspace/goals/digital-products-side-hustle/build/30-din-launch-kit
python3 tools/generate-codes.py --append 100
```
Ye `data/codes.json` me 100 naye codes ADD karega (purane kaam karte rahenge) aur naye asal codes
`codes-plain.txt` me likhega (build folder me — ise GitHub par NA push karo, private rakho).
Phir sirf `data/codes.json` dobara push karo.

## Imaandar note (gate ki limit)
Members area ka lock **simple** hai — code ka SHA-256 hash site par hai, asal code nahi.
Ye aam customer ko rokta hai, lekin koi technical banda codes.json dekh kar code guess kar sakta hai
(iss liye codes lambe rakhe hain). Code share hone se rokne ka koi tareeqa static site par nahi —
ye industry-standard "honest gate" hai, bank jaisi security nahi. Agar kabhi sharing barhe to
codes.json regenerate karke purane codes band kiye ja sakte hain.

## Website Launch Kit se farq (dono aapas me nahi takrate)
- **Website Launch Kit** (product 2, Excel file): un logon ke liye jo **khud apni website banana** chahte hain —
  site map, homepage copy formulas, launch checklist. DIY website-builder, English me.
- **30-Din Business Launch Kit** (ye product): un dukandaaron ke liye jo **poora business online lana** chahte hain —
  Google par aana, WhatsApp se customer, reviews, pehla ad. 30 din ka day-by-day system, Roman Urdu me.
  Website iska sirf ek hissa hai (hafta 3), poora product nahi.
- Dono alag customer, alag problem — ek dusre ka customer nahi khayenge.

## Deploy (dobara push karna ho to)
```bash
cd ~/workspace/goals/digital-products-side-hustle/build/30-din-launch-kit
find . -type f | tr '\n' '\0' > /tmp/ldk-paths.txt
github push-files --owner abdulwahabcode --repo 30-din-launch-kit --branch main \
  --message "update" --source-dir . --paths-file /tmp/ldk-paths.txt
```
