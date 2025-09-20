// MODULE: USER INTERFACE
// Kazi: Kuonyesha matokeo kwa user

/**
 * Display calculation results on the page
 * @param {Object} results - Results from calculator
 * @param {Object} drugData - Drug information
 */
function displayResults(results, drugData) {
    // Get result container
    const resultsDiv = document.getElementById('results');
    const doseResultDiv = document.getElementById('doseResult');
    const warningsDiv = document.getElementById('warnings');
    
    // Clear previous results
    doseResultDiv.innerHTML = '';
    warningsDiv.innerHTML = '';
    
    // Build result HTML
    let resultHTML = `
        <div class="dose-main">
            <p><strong>💊 Dozi kwa Mara Moja:</strong> ${results.singleDose} mg</p>
            ${results.volumeInMl ? `<p><strong>📏 Volume (Syrup):</strong> ${results.volumeInMl} ml</p>` : ''}
        </div>
        <div class="dose-details">
            <p><strong>🔄 Mzunguko:</strong> ${results.frequency}</p>
            <p><strong>📊 Maximum kwa Siku:</strong> ${results.maxDailyDose} mg (max ${results.maxFrequency}× kwa siku)</p>
            <p><strong>🧮 Hesabu:</strong> ${results.calculation}</p>
        </div>
    `;
    
    // Add age notes if available
    if (results.ageNotes) {
        resultHTML += `
            <div class="age-notes">
                <p><strong>ℹ️ Maelezo:</strong> ${results.ageNotes}</p>
            </div>
        `;
    }
    
    doseResultDiv.innerHTML = resultHTML;
    
    // Display warnings
    if (results.warnings && results.warnings.length > 0) {
        let warningHTML = '<strong>⚠️ Tahadhari:</strong><br>';
        results.warnings.forEach(warning => {
            warningHTML += `• ${warning}<br>`;
        });
        warningsDiv.innerHTML = warningHTML;
        warningsDiv.style.display = 'block';
    } else {
        warningsDiv.style.display = 'none';
    }
    
    // Show results container
    resultsDiv.classList.add('show');
    
    // Scroll to results
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display error message
 * @param {string} errorMessage - Error to display
 */
function displayError(errorMessage) {
    const resultsDiv = document.getElementById('results');
    const doseResultDiv = document.getElementById('doseResult');
    const warningsDiv = document.getElementById('warnings');
    
    doseResultDiv.innerHTML = `
        <div class="error-message">
            <p><strong>❌ Kosa:</strong> ${errorMessage}</p>
        </div>
    `;
    
    warningsDiv.style.display = 'none';
    resultsDiv.classList.add('show');
}

/**
 * Show loading state
 */
function showLoading() {
    const button = document.querySelector('.btn-calculate');
    if (button) {
        button.disabled = true;
        button.textContent = 'Inahesabu...';
    }
}

/**
 * Hide loading state
 */
function hideLoading() {
    const button = document.querySelector('.btn-calculate');
    if (button) {
        button.disabled = false;
        button.textContent = 'Hesabu Dozi';
    }
}

/**
 * Print prescription
 * @param {Object} results - Calculation results
 * @param {Object} drugData - Drug information
 * @param {number} weight - Patient weight
 * @param {string} age - Patient age
 */
function printPrescription(results, drugData, weight, age) {
    const printWindow = window.open('', '_blank');
    
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Prescription - ${drugData.drugName}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                h1 {
                    color: #333;
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 10px;
                }
                .header {
                    margin-bottom: 30px;
                }
                .patient-info {
                    background: #f5f5f5;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .prescription {
                    background: #fff;
                    border: 2px solid #667eea;
                    padding: 20px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                .prescription h2 {
                    color: #667eea;
                    margin-top: 0;
                }
                .warning-box {
                    background: #fff3e0;
                    border-left: 4px solid #ff9800;
                    padding: 10px;
                    margin: 15px 0;
                }
                .footer {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    font-size: 12px;
                    color: #666;
                }
                @media print {
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📋 Pediatric Drug Calculator - Prescription</h1>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString('sw-TZ')}</p>
            </div>
            
            <div class="patient-info">
                <h3>Patient Information</h3>
                <p><strong>Weight:</strong> ${weight} kg</p>
                <p><strong>Age Category:</strong> ${age}</p>
            </div>
            
            <div class="prescription">
                <h2>Rx: ${drugData.drugName}</h2>
                <p><strong>Single Dose:</strong> ${results.singleDose} mg</p>
                ${results.volumeInMl ? `<p><strong>Volume (Syrup):</strong> ${results.volumeInMl} ml</p>` : ''}
                <p><strong>Frequency:</strong> ${results.frequency}</p>
                <p><strong>Maximum Daily:</strong> ${results.maxDailyDose} mg (${results.maxFrequency}× per day)</p>
                <p><strong>Calculation:</strong> ${results.calculation}</p>
            </div>
            
            ${results.warnings && results.warnings.length > 0 ? `
                <div class="warning-box">
                    <strong>⚠️ Warnings:</strong><br>
                    ${results.warnings.map(w => `• ${w}`).join('<br>')}
                </div>
            ` : ''}
            
            <div class="footer">
                <p><strong>Sources:</strong></p>
                ${drugData.sources.map(s => `<p>• ${s.name} (${s.year})${s.page ? ', page ' + s.page : ''}</p>`).join('')}
                <p style="margin-top: 15px;">
                    <em>Generated by Pediatric Drug Calculator</em><br>
                    <em>This is a calculation aid. Always verify dosing with current guidelines.</em>
                </p>
            </div>
            
            <button onclick="window.print()" style="
                background: #667eea;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 20px;
            ">🖨️ Print</button>
        </body>
        </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
}
