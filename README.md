# pediatric-drug-calculator
Simple drug dosage calculator for pediatric patients
# 💊 Pediatric Drug Calculator - Tanzania

Hesabu dawa kwa watoto kulingana na STG Tanzania na WHO guidelines.

## 📋 Maelezo

Application hii inasaidia madaktari, manesi, na mafamasia kuhesabu dosage sahihi ya dawa kwa watoto. Inatumia data kutoka:
- STG Tanzania (Standard Treatment Guidelines)
- WHO Essential Medicines List
- Trusted medical sources

## 🏗️ Muundo wa Project

```
pediatric-drug-calculator/
├── index.html              # Main page - User Interface
├── styles.css              # Styling - Rangi na design
├── data/                   # Drug data (JSON files)
│   └── paracetamol.json   # Paracetamol drug data
├── modules/                # JavaScript modules
│   ├── calculator.js       # Calculation logic
│   └── ui.js              # Display functions
└── README.md              # Documentation (file hii)
```

## 📁 Kila File Inafanya Nini?

### 1. **index.html**
- Main page ambayo user anaona
- Form ya kuingiza taarifa (uzito, umri)
- Inaconnect modules zote pamoja

### 2. **styles.css**
- Rangi na design
- Mobile-friendly layout
- Print styles

### 3. **data/paracetamol.json**
- Taarifa kamili za dawa
- Dosing guidelines
- Age restrictions
- Sources

### 4. **modules/calculator.js**
- Logic ya kuhesabu dosage
- Validation ya input
- Safety checks

### 5. **modules/ui.js**
- Kuonyesha matokeo
- Print functionality
- Error messages

## 🚀 Jinsi ya Kutumia

1. **Fungua** `index.html` kwenye browser
2. **Chagua** dawa (kwa sasa: Paracetamol)
3. **Ingiza** uzito wa mtoto
4. **Chagua** umri
5. **Click** "Hesabu Dozi"
6. **Soma** matokeo
7. **Print** kama unahitaji

## 🔧 Jinsi ya Kuongeza Dawa Mpya

### Hatua za Kuongeza Dawa:

1. **Tengeneza JSON file** kwenye folder `data/`
   - Mfano: `data/amoxicillin.json`

2. **Copy structure** kutoka `paracetamol.json`:
   ```json
   {
     "drugName": "Amoxicillin",
     "calculationType": "weight-based",
     "dosing": { ... },
     "sources": [ ... ]
   }
   ```

3. **Update** `index.html` - ongeza option kwenye dropdown:
   ```html
   <option value="amoxicillin">Amoxicillin</option>
   ```

4. **Test** - fungua page na ujaribu!

## 💡 Modules - Kwa Beginners

### Calculator Module (`calculator.js`)
**Kazi:** Kuhesabu dosage

```javascript
// Input: Drug data, weight, age
// Output: Calculated dose + warnings

function calculateDosage(drugData, weight, age) {
    // 1. Validate input
    // 2. Calculate dose
    // 3. Check limits
    // 4. Return results
}
```

### UI Module (`ui.js`)
**Kazi:** Kuonyesha results

```javascript
// Input: Calculation results
// Output: Display on screen

function displayResults(results, drugData) {
    // 1. Format results
    // 2. Show warnings
    // 3. Display sources
}
```

## 🔍 Testing

### Manual Testing Checklist:
- [ ] Chagua dawa
- [ ] Ingiza uzito valid (e.g., 10 kg)
- [ ] Chagua umri
- [ ] Check kama results zinakuja
- [ ] Jaribu invalid input (uzito -5)
- [ ] Test print function

## 📱 Mobile Support

Application inafanya kazi vizuri kwenye:
- ✅ Phone
- ✅ Tablet
- ✅ Computer
- ✅ Offline (baada ya load mara ya kwanza)

## 🛠️ Teknolojia

- **HTML** - Structure
- **CSS** - Styling
- **JavaScript** - Logic
- **JSON** - Data storage

**Hakuna frameworks ngumu!** - Pure JavaScript, rahisi kuelewa.

## 👥 Wachangiaji

- **Maria** - Pediatrician (Russia)
- **Juma** - Nurse (Tanzania)

## 📚 Marejeo (Sources)

1. STG Tanzania 2023
2. WHO Essential Medicines List
3. Drugs.com
4. UpToDate Pediatrics

## 🔄 Updates

**Version 1.0** - January 2025
- ✅ Paracetamol calculator
- ✅ Weight-based dosing
- ✅ Age restrictions
- ✅ Print function

**Coming Soon:**
- [ ] Azithromycin (diagnosis-based)
- [ ] Amoxiclav (severity-based)
- [ ] Metoclopramide (range-based)
- [ ] Offline mode
- [ ] Multiple languages

## ⚠️ Disclaimer

Application hii ni **calculation aid** tu. Daima verify dosing na:
- Current guidelines
- Senior clinician
- Drug formulary

## 📞 Msaada

Kama una maswali:
1. Check README hii
2. Angalia comments kwenye code
3. Uliza kwenye GitHub Issues

---

**Tutafanya pamoja! Step by step, module by module.** 🚀
