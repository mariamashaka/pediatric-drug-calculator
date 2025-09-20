// MODULE: CALCULATOR LOGIC
// Kazi: Kuhesabu dosage kwa kutumia drug data

/**
 * Calculate drug dosage based on patient data
 * @param {Object} drugData - Drug information from JSON
 * @param {number} weight - Patient weight in kg
 * @param {string} age - Patient age category (e.g., "1-5y")
 * @returns {Object} - Calculation results
 */
function calculateDosage(drugData, weight, age) {
    // Validation: Check kama data ziko
    if (!drugData || !weight || !age) {
        return {
            success: false,
            error: "Missing required data"
        };
    }
    
    // Validation: Check kama weight ni valid
    if (weight <= 0 || weight > 150) {
        return {
            success: false,
            error: "Invalid weight. Must be between 0 and 150 kg"
        };
    }
    
    // STEP 1: Calculate base dose
    const dosePerKg = drugData.dosing.maxDosePerKg || 15; // Default 15 if not specified
    let calculatedDose = weight * dosePerKg;
    
    // STEP 2: Apply maximum single dose limit
    if (calculatedDose > drugData.dosing.maxSingleDose) {
        calculatedDose = drugData.dosing.maxSingleDose;
    }
    
    // STEP 3: Calculate maximum daily dose
    const maxDailyDose = weight * drugData.dosing.maxDailyDosePerKg;
    
    // STEP 4: Check age restrictions
    const ageRestriction = drugData.ageRestrictions[age];
    let warnings = [];
    
    if (ageRestriction && !ageRestriction.allowed) {
        return {
            success: false,
            error: `Not recommended for age group: ${age}`
        };
    }
    
    if (ageRestriction && ageRestriction.warning) {
        warnings.push(ageRestriction.warning);
    }
    
    // STEP 5: Calculate volume for syrup formulation
    const syrupFormulation = drugData.formulations.find(f => f.type === "Syrup");
    let volumeInMl = null;
    
    if (syrupFormulation) {
        // Example: 120mg/5ml means 24mg per ml
        const mgPerMl = 120 / 5; // From concentration "120 mg/5ml"
        volumeInMl = calculatedDose / mgPerMl;
    }
    
    // STEP 6: Return results
    return {
        success: true,
        results: {
            singleDose: Math.round(calculatedDose), // Round to nearest mg
            maxDailyDose: Math.round(maxDailyDose),
            frequency: drugData.dosing.frequency,
            maxFrequency: drugData.dosing.maxFrequencyPerDay,
            volumeInMl: volumeInMl ? volumeInMl.toFixed(1) : null,
            calculation: `${weight} kg × ${dosePerKg} mg/kg = ${Math.round(calculatedDose)} mg`,
            warnings: warnings,
            ageNotes: ageRestriction ? ageRestriction.notes : null
        }
    };
}

/**
 * Validate patient input before calculation
 * @param {number} weight - Patient weight
 * @param {string} age - Patient age category
 * @returns {Object} - Validation result
 */
function validateInput(weight, age) {
    const errors = [];
    
    if (!weight) {
        errors.push("Weight is required");
    }
    
    if (!age) {
        errors.push("Age category is required");
    }
    
    if (weight && (weight <= 0 || weight > 150)) {
        errors.push("Weight must be between 0 and 150 kg");
    }
    
    return {
        valid: errors.length === 0,
        errors: errors
    };
}

// Export functions (for use in other files)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateDosage, validateInput };
}
