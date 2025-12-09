const HTML = `<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WelMac Beleggingscalculator</title>

    <!-- Google Fonts - WelMac Brand -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Kreon:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        /* ========================================
           CSS Custom Properties
           ======================================== */
        :root {
            /* WelMac Brand Colors - From welmac.nl */
            --wm-primary: #422c07;        /* Deep brown */
            --wm-primary-light: #5a3d0a;  /* Lighter brown */
            --wm-secondary: #8b7355;      /* Earthy brown (macadamia) */
            --wm-accent: #c8b7a8;         /* Warm taupe */
            --wm-gold: #c9a227;           /* Gold/harvest - logo color */
            --wm-success: #5a7c3d;        /* Muted green */

            /* Neutrals */
            --wm-dark: #422c07;
            --wm-text: #422c07;
            --wm-text-light: #6b5a4a;
            --wm-white: #ffffff;
            --wm-gray-50: #faf9f7;
            --wm-gray-100: #f5f3f0;
            --wm-gray-200: #e8e4df;
            --wm-gray-300: #d4cfc8;
            --wm-gray-500: #8b8178;

            /* Typography */
            --wm-font-heading: 'Kreon', Georgia, serif;
            --wm-font: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

            /* Spacing & Sizing */
            --wm-radius-sm: 6px;
            --wm-radius-md: 10px;
            --wm-radius-lg: 14px;

            /* Shadows */
            --wm-shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
            --wm-shadow-md: 0 4px 12px rgba(0,0,0,0.1);
            --wm-shadow-lg: 0 8px 24px rgba(0,0,0,0.12);

            /* Transitions */
            --wm-transition: all 0.2s ease;
        }

        /* ========================================
           Reset & Base
           ======================================== */
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: var(--wm-font);
            color: var(--wm-text);
            background: var(--wm-gray-50);
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }

        /* ========================================
           Main Container
           ======================================== */
        .wm-calculator {
            max-width: 920px;
            margin: 0 auto;
            padding: 24px;
            background: var(--wm-white);
            min-height: 100vh;
        }

        /* ========================================
           Header
           ======================================== */
        .wm-header {
            text-align: center;
            margin-bottom: 32px;
            padding: 24px;
            background: var(--wm-primary);
            border-radius: var(--wm-radius-lg);
            color: var(--wm-white);
        }

        .wm-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            margin-bottom: 16px;
        }

        .wm-logo-icon {
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .wm-css-logo {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 5px solid var(--wm-gold);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .wm-css-logo-inner1 {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 5px solid var(--wm-gold);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .wm-css-logo-inner2 {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 5px solid var(--wm-gold);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .wm-css-logo-center {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--wm-gold);
        }

        .wm-logo-text {
            font-family: var(--wm-font-heading);
            font-size: 2rem;
            font-weight: 600;
            color: var(--wm-white);
            letter-spacing: 0.5px;
        }

        .wm-header h1 {
            font-family: var(--wm-font-heading);
            font-size: 1.35rem;
            font-weight: 500;
            color: var(--wm-accent);
            margin-bottom: 8px;
        }

        .wm-subtitle {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.75);
        }

        /* ========================================
           Cards
           ======================================== */
        .wm-card {
            background: var(--wm-white);
            border: 1px solid var(--wm-gray-200);
            border-radius: var(--wm-radius-lg);
            padding: 20px;
            box-shadow: var(--wm-shadow-sm);
        }

        .wm-card-title {
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--wm-text-light);
            margin-bottom: 16px;
        }

        /* ========================================
           Input Section - Grid Layout
           ======================================== */
        .wm-input-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
        }

        @media (max-width: 768px) {
            .wm-input-section {
                grid-template-columns: 1fr;
            }
        }

        /* ========================================
           Form Controls
           ======================================== */
        .wm-form-group {
            margin-bottom: 20px;
        }

        .wm-form-group:last-child {
            margin-bottom: 0;
        }

        .wm-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--wm-text);
            margin-bottom: 8px;
        }

        .wm-input {
            width: 100%;
            padding: 12px 16px;
            font-size: 1rem;
            font-family: var(--wm-font);
            border: 1px solid var(--wm-gray-300);
            border-radius: var(--wm-radius-md);
            transition: var(--wm-transition);
            background: var(--wm-white);
        }

        .wm-input:focus {
            outline: none;
            border-color: var(--wm-primary);
            box-shadow: 0 0 0 3px rgba(66, 44, 7, 0.15);
        }

        .wm-input-prefix {
            position: relative;
        }

        .wm-input-prefix .wm-input {
            padding-left: 32px;
        }

        .wm-input-prefix::before {
            content: '€';
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--wm-text-light);
            font-weight: 500;
        }

        .wm-helper {
            display: block;
            font-size: 0.75rem;
            color: var(--wm-gray-500);
            margin-top: 6px;
        }

        /* ========================================
           Range Slider
           ======================================== */
        .wm-slider-container {
            padding: 8px 0;
        }

        .wm-slider {
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            height: 6px;
            border-radius: 3px;
            background: var(--wm-gray-200);
            outline: none;
            cursor: pointer;
        }

        .wm-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: var(--wm-primary);
            cursor: pointer;
            box-shadow: var(--wm-shadow-md);
            transition: var(--wm-transition);
        }

        .wm-slider::-webkit-slider-thumb:hover {
            transform: scale(1.1);
        }

        .wm-slider::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: var(--wm-primary);
            cursor: pointer;
            border: none;
            box-shadow: var(--wm-shadow-md);
        }

        .wm-slider-labels {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            font-size: 0.75rem;
            color: var(--wm-gray-500);
        }

        .wm-slider-value {
            font-weight: 600;
            color: var(--wm-primary);
            font-size: 0.875rem;
        }

        /* ========================================
           Toggle Switch
           ======================================== */
        .wm-toggle {
            display: flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
        }

        .wm-toggle input {
            position: absolute;
            opacity: 0;
            pointer-events: none;
        }

        .wm-toggle-track {
            width: 44px;
            height: 24px;
            background: var(--wm-gray-300);
            border-radius: 12px;
            margin-right: 12px;
            position: relative;
            transition: var(--wm-transition);
        }

        .wm-toggle input:checked + .wm-toggle-track {
            background: var(--wm-success);
        }

        .wm-toggle-thumb {
            position: absolute;
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 50%;
            top: 2px;
            left: 2px;
            transition: var(--wm-transition);
            box-shadow: var(--wm-shadow-sm);
        }

        .wm-toggle input:checked + .wm-toggle-track .wm-toggle-thumb {
            transform: translateX(20px);
        }

        .wm-toggle-label {
            font-weight: 500;
            font-size: 0.9rem;
        }

        /* ========================================
           Summary Stats
           ======================================== */
        .wm-summary-card {
            background: linear-gradient(135deg, var(--wm-primary) 0%, var(--wm-primary-light) 100%);
            color: white;
            border: none;
        }

        .wm-summary-card .wm-card-title {
            color: rgba(255,255,255,0.8);
        }

        .wm-summary {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .wm-stat {
            text-align: center;
            padding: 16px 12px;
            background: rgba(255,255,255,0.1);
            border-radius: var(--wm-radius-md);
        }

        .wm-stat-value {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 4px;
        }

        .wm-stat-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            opacity: 0.85;
        }

        .wm-stat-highlight {
            background: rgba(255,255,255,0.2);
        }

        /* ========================================
           Charts
           ======================================== */
        .wm-chart-section {
            margin-bottom: 24px;
        }

        .wm-chart-wrapper {
            position: relative;
            height: 300px;
        }

        .wm-chart-legend {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-top: 12px;
            flex-wrap: wrap;
        }

        .wm-legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            color: var(--wm-text-light);
        }

        .wm-legend-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .wm-legend-line {
            width: 24px;
            height: 3px;
            border-radius: 2px;
        }

        /* ========================================
           Email Capture
           ======================================== */
        .wm-email-section {
            margin-top: 32px;
            padding-top: 32px;
            border-top: 1px solid var(--wm-gray-200);
        }

        .wm-email-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .wm-email-header h3 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--wm-text);
            margin-bottom: 6px;
        }

        .wm-email-header p {
            font-size: 0.875rem;
            color: var(--wm-text-light);
        }

        .wm-email-form {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr auto;
            gap: 12px;
            align-items: end;
        }

        @media (max-width: 768px) {
            .wm-email-form {
                grid-template-columns: 1fr;
            }
        }

        .wm-email-form .wm-form-group {
            margin-bottom: 0;
        }

        .wm-btn {
            padding: 12px 24px;
            font-size: 0.9rem;
            font-weight: 600;
            font-family: var(--wm-font);
            border: none;
            border-radius: var(--wm-radius-md);
            cursor: pointer;
            transition: var(--wm-transition);
        }

        .wm-btn-primary {
            background: var(--wm-primary);
            color: white;
        }

        .wm-btn-primary:hover {
            background: var(--wm-primary-light);
        }

        .wm-email-success {
            display: none;
            text-align: center;
            padding: 20px;
            background: rgba(66, 44, 7, 0.08);
            border-radius: var(--wm-radius-md);
            color: var(--wm-primary);
        }

        .wm-email-success.show {
            display: block;
        }

        /* ========================================
           Disclaimer
           ======================================== */
        .wm-disclaimer {
            margin-top: 32px;
            padding: 20px;
            background: var(--wm-gray-50);
            border-radius: var(--wm-radius-md);
            font-size: 0.75rem;
            color: var(--wm-gray-500);
            line-height: 1.6;
        }

        .wm-disclaimer strong {
            color: var(--wm-text-light);
        }

        /* ========================================
           Utilities
           ======================================== */
        .text-center { text-align: center; }
        .mb-0 { margin-bottom: 0; }
    </style>
</head>
<body>
    <div class="wm-calculator">
        <!-- Header -->
        <header class="wm-header">
            <div class="wm-logo">
                <div class="wm-logo-icon">
                    <div class="wm-css-logo">
                        <div class="wm-css-logo-inner1">
                            <div class="wm-css-logo-inner2">
                                <div class="wm-css-logo-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="wm-logo-text">WelMac BV</span>
            </div>
            <h1>Beleggingscalculator</h1>
            <p class="wm-subtitle">Ontdek potentiële rendementen van duurzame macadamia-plantage investeringen</p>
        </header>

        <!-- Input Section -->
        <div class="wm-input-section">
            <!-- Controls Card -->
            <div class="wm-card">
                <h2 class="wm-card-title">Investeringsparameters</h2>

                <!-- Investment Amount -->
                <div class="wm-form-group">
                    <label class="wm-label" for="investment-input">Investeringsbedrag</label>
                    <div class="wm-input-prefix">
                        <input type="number"
                               id="investment-input"
                               class="wm-input"
                               value="4900"
                               min="490"
                               step="490">
                    </div>
                    <small class="wm-helper">Minimum €490 (1 certificaat) | €490 per certificaat</small>
                </div>

                <!-- Timeframe Slider -->
                <div class="wm-form-group">
                    <label class="wm-label">Investeringstermijn</label>
                    <div class="wm-slider-container">
                        <input type="range"
                               id="timeframe-slider"
                               class="wm-slider"
                               min="5"
                               max="25"
                               value="15">
                    </div>
                    <div class="wm-slider-labels">
                        <span>5 jaar</span>
                        <span class="wm-slider-value" id="timeframe-value">15 jaar</span>
                        <span>25 jaar</span>
                    </div>
                </div>

                <!-- Rendement Info -->
                <div class="wm-form-group">
                    <label class="wm-label">Verwacht Rendement</label>
                    <div style="padding: 14px; background: rgba(66, 44, 7, 0.05); border-radius: 10px; border: 2px solid var(--wm-primary);">
                        <span style="font-weight: 600; font-size: 1.1rem; color: var(--wm-primary);">16% jaarlijks rendement</span>
                    </div>
                </div>

                <!-- Dividend Reinvestment Toggle -->
                <div class="wm-form-group mb-0">
                    <label class="wm-toggle">
                        <input type="checkbox" id="reinvest-toggle" checked>
                        <span class="wm-toggle-track">
                            <span class="wm-toggle-thumb"></span>
                        </span>
                        <span class="wm-toggle-label">Dividend Herinvesteren</span>
                    </label>
                    <small class="wm-helper">Dividend verwacht vanaf jaar 4 (2027-2028)</small>
                </div>
            </div>

            <!-- Summary Card -->
            <div class="wm-card wm-summary-card">
                <h2 class="wm-card-title">Verwachte Resultaten</h2>
                <div class="wm-summary">
                    <div class="wm-stat wm-stat-highlight">
                        <div class="wm-stat-value" id="final-value">€12,539</div>
                        <div class="wm-stat-label">Eindwaarde</div>
                    </div>
                    <div class="wm-stat">
                        <div class="wm-stat-value" id="total-return">+155.9%</div>
                        <div class="wm-stat-label">Totaal Rendement</div>
                    </div>
                    <div class="wm-stat">
                        <div class="wm-stat-value" id="total-dividends">€5,488</div>
                        <div class="wm-stat-label">Totaal Dividend</div>
                    </div>
                    <div class="wm-stat">
                        <div class="wm-stat-value" id="avg-annual">9.8%</div>
                        <div class="wm-stat-label">Gem. Jaarlijks Rendement</div>
                    </div>
                </div>
                <a href="#email-section" class="wm-btn wm-btn-cta" style="display: block; text-align: center; margin-top: 16px; padding: 14px 24px; background: var(--wm-gold); color: var(--wm-primary); text-decoration: none; border-radius: 10px; font-weight: 600;">Meer Informatie Aanvragen</a>
            </div>
        </div>

        <!-- Line Chart -->
        <div class="wm-card wm-chart-section">
            <h3 class="wm-card-title">Investeringsgroei (16% per jaar)</h3>
            <div class="wm-chart-wrapper">
                <canvas id="line-chart"></canvas>
            </div>
            <div class="wm-chart-legend">
                <div class="wm-legend-item">
                    <span class="wm-legend-line" style="background: var(--wm-primary);"></span>
                    <span>Portefeuillewaarde</span>
                </div>
            </div>
        </div>

        <!-- Bar Chart -->
        <div class="wm-card wm-chart-section">
            <h3 class="wm-card-title">Jaar-voor-Jaar Overzicht</h3>
            <div class="wm-chart-wrapper">
                <canvas id="bar-chart"></canvas>
            </div>
            <div class="wm-chart-legend">
                <div class="wm-legend-item">
                    <span class="wm-legend-dot" style="background: var(--wm-primary);"></span>
                    <span>Kapitaalgroei</span>
                </div>
                <div class="wm-legend-item">
                    <span class="wm-legend-dot" style="background: var(--wm-accent);"></span>
                    <span>Dividend</span>
                </div>
            </div>
        </div>

        <!-- Email Capture Section -->
        <div class="wm-email-section" id="email-section">
            <div class="wm-email-header">
                <h3>Interesse in Investeren?</h3>
                <p>Laat uw gegevens achter en wij sturen u meer informatie over WelMac investeringsmogelijkheden.</p>
            </div>
            <form class="wm-email-form" id="email-form">
                <div class="wm-form-group">
                    <label class="wm-label" for="email-name">Naam</label>
                    <input type="text" id="email-name" class="wm-input" placeholder="Uw naam" required>
                </div>
                <div class="wm-form-group">
                    <label class="wm-label" for="email-address">E-mail</label>
                    <input type="email" id="email-address" class="wm-input" placeholder="uw@email.nl" required>
                </div>
                <div class="wm-form-group">
                    <label class="wm-label" for="email-phone">Telefoon (optioneel)</label>
                    <input type="tel" id="email-phone" class="wm-input" placeholder="+31 6 1234 5678">
                </div>
                <button type="submit" class="wm-btn wm-btn-primary">Meer Informatie</button>
            </form>
            <div class="wm-email-success" id="email-success">
                Bedankt voor uw interesse! Wij nemen spoedig contact met u op met meer informatie over WelMac investeringen.
            </div>
        </div>

        <!-- Disclaimer -->
        <div class="wm-disclaimer">
            <strong>Disclaimer:</strong> Deze calculator biedt schattingen uitsluitend ter illustratie.
            In het verleden behaalde resultaten bieden geen garantie voor de toekomst. De verwachte rendementen
            zijn gebaseerd op historische gegevens en aannames die mogelijk niet overeenkomen met toekomstige
            prestaties. Beleggen in agrarische activa brengt risico's met zich mee, inclusief mogelijk verlies
            van de hoofdsom. Dividendbetalingen zijn niet gegarandeerd en zijn afhankelijk van de prestaties
            van de plantage. Raadpleeg een gekwalificeerd financieel adviseur alvorens beleggingsbeslissingen
            te nemen. WelMac BV certificaten worden verhandeld op NPEX.
        </div>
    </div>

    <script>
        // ========================================
        // Configuration
        // ========================================
        const CONFIG = {
            minInvestment: 490,
            certificateValue: 490,
            rate: 0.16,
            dividend: {
                startYear: 4,
                yield: 0.16
            },
            defaultTimeframe: 15,
            maxTimeframe: 25,
            minTimeframe: 5
        };

        // ========================================
        // State
        // ========================================
        const state = {
            investment: 4900,
            timeframe: 15,
            reinvestDividends: true
        };

        // ========================================
        // Chart Instances
        // ========================================
        let lineChart = null;
        let barChart = null;

        // ========================================
        // Calculation Functions
        // ========================================
        function calculateProjection(principal, years, reinvestDividends) {
            const rate = CONFIG.rate;
            const yearlyData = [];

            let currentValue = principal;
            let totalDividends = 0;
            let accumulatedDividends = 0;

            for (let year = 1; year <= years; year++) {
                const startValue = currentValue;
                const capitalGrowth = currentValue * rate;
                currentValue += capitalGrowth;

                let dividend = 0;
                if (year >= CONFIG.dividend.startYear) {
                    dividend = principal * CONFIG.dividend.yield;

                    if (reinvestDividends) {
                        currentValue += dividend;
                    } else {
                        accumulatedDividends += dividend;
                    }
                    totalDividends += dividend;
                }

                yearlyData.push({
                    year,
                    startValue,
                    endValue: currentValue,
                    capitalGrowth,
                    dividend,
                    totalDividends,
                    portfolioValue: reinvestDividends ? currentValue : currentValue + accumulatedDividends
                });
            }

            const finalValue = reinvestDividends ? currentValue : currentValue + accumulatedDividends;
            const totalReturn = ((finalValue - principal) / principal) * 100;
            const avgAnnualReturn = (Math.pow(finalValue / principal, 1 / years) - 1) * 100;

            return {
                yearlyData,
                summary: {
                    finalValue,
                    totalReturn,
                    totalDividends,
                    avgAnnualReturn,
                    principal
                }
            };
        }

        // ========================================
        // Formatting Functions
        // ========================================
        function formatCurrency(value) {
            return new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value);
        }

        function formatPercent(value, decimals = 1) {
            return \`\${value >= 0 ? '+' : ''}\${value.toFixed(decimals)}%\`;
        }

        // ========================================
        // UI Update Functions
        // ========================================
        function updateSummary(projection) {
            document.getElementById('final-value').textContent = formatCurrency(projection.summary.finalValue);
            document.getElementById('total-return').textContent = formatPercent(projection.summary.totalReturn);
            document.getElementById('total-dividends').textContent = formatCurrency(projection.summary.totalDividends);
            document.getElementById('avg-annual').textContent = formatPercent(projection.summary.avgAnnualReturn);
        }

        // ========================================
        // Chart Functions
        // ========================================
        function initCharts() {
            const lineCtx = document.getElementById('line-chart').getContext('2d');
            const barCtx = document.getElementById('bar-chart').getContext('2d');

            // Line Chart - Single 16% scenario
            lineChart = new Chart(lineCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Portefeuillewaarde (16%)',
                            data: [],
                            borderColor: '#422c07',
                            backgroundColor: 'rgba(66, 44, 7, 0.1)',
                            fill: true,
                            borderWidth: 3,
                            tension: 0.3,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#422c07',
                            titleFont: { family: 'Source Sans 3', weight: '600' },
                            bodyFont: { family: 'Source Sans 3' },
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: {
                                label: (ctx) => \`\${ctx.dataset.label}: \${formatCurrency(ctx.parsed.y)}\`
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: { display: false },
                            ticks: { font: { family: 'Source Sans 3', size: 11 } }
                        },
                        y: {
                            beginAtZero: false,
                            grid: { color: '#e8e4df' },
                            ticks: {
                                font: { family: 'Source Sans 3', size: 11 },
                                callback: (value) => formatCurrency(value)
                            }
                        }
                    },
                    interaction: { intersect: false, mode: 'index' }
                }
            });

            // Bar Chart - Yearly breakdown
            barChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Kapitaalgroei',
                            data: [],
                            backgroundColor: '#422c07',
                            borderRadius: 4
                        },
                        {
                            label: 'Dividend',
                            data: [],
                            backgroundColor: '#c9a227',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: '#422c07',
                            titleFont: { family: 'Source Sans 3', weight: '600' },
                            bodyFont: { family: 'Source Sans 3' },
                            padding: 12,
                            cornerRadius: 8,
                            callbacks: {
                                label: (ctx) => \`\${ctx.dataset.label}: \${formatCurrency(ctx.parsed.y)}\`
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            grid: { display: false },
                            ticks: { font: { family: 'Source Sans 3', size: 11 } }
                        },
                        y: {
                            stacked: true,
                            grid: { color: '#e8e4df' },
                            ticks: {
                                font: { family: 'Source Sans 3', size: 11 },
                                callback: (value) => formatCurrency(value)
                            }
                        }
                    }
                }
            });
        }

        function updateCharts(projection) {
            const years = state.timeframe;
            const labels = Array.from({ length: years }, (_, i) => \`Jaar \${i + 1}\`);

            // Update line chart
            lineChart.data.labels = labels;
            lineChart.data.datasets[0].data = projection.yearlyData.map(d => d.portfolioValue);
            lineChart.update('none');

            // Update bar chart
            barChart.data.labels = labels;
            barChart.data.datasets[0].data = projection.yearlyData.map(d => d.endValue - state.investment);
            barChart.data.datasets[1].data = projection.yearlyData.map(d => d.totalDividends);
            barChart.update('none');
        }

        // ========================================
        // Main Recalculate & UI Update
        // ========================================
        function recalculate() {
            const projection = calculateProjection(state.investment, state.timeframe, state.reinvestDividends);
            updateSummary(projection);
            updateCharts(projection);
        }

        // ========================================
        // Event Listeners
        // ========================================
        function attachEventListeners() {
            // Investment amount
            const investmentInput = document.getElementById('investment-input');
            investmentInput.addEventListener('input', (e) => {
                let value = parseInt(e.target.value) || CONFIG.minInvestment;
                value = Math.max(CONFIG.minInvestment, value);
                state.investment = value;
                recalculate();
            });

            investmentInput.addEventListener('blur', (e) => {
                if (parseInt(e.target.value) < CONFIG.minInvestment) {
                    e.target.value = CONFIG.minInvestment;
                    state.investment = CONFIG.minInvestment;
                    recalculate();
                }
            });

            // Timeframe slider
            const timeframeSlider = document.getElementById('timeframe-slider');
            const timeframeValue = document.getElementById('timeframe-value');

            timeframeSlider.addEventListener('input', (e) => {
                const years = parseInt(e.target.value);
                state.timeframe = years;
                timeframeValue.textContent = \`\${years} jaar\`;
                recalculate();
            });

            // Reinvest toggle
            const reinvestToggle = document.getElementById('reinvest-toggle');
            reinvestToggle.addEventListener('change', (e) => {
                state.reinvestDividends = e.target.checked;
                recalculate();
            });

            // Email form
            const emailForm = document.getElementById('email-form');
            const emailSuccess = document.getElementById('email-success');

            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const name = document.getElementById('email-name').value;
                const email = document.getElementById('email-address').value;
                const phone = document.getElementById('email-phone').value;

                // Create mailto link with projection summary
                const projection = calculateProjection(
                    state.investment,
                    state.timeframe,
                    state.reinvestDividends
                );

                const subject = encodeURIComponent('WelMac Investeringsaanvraag');
                const body = encodeURIComponent(
                    \`Naam: \${name}\\n\` +
                    \`E-mail: \${email}\\n\` +
                    \`Telefoon: \${phone || 'Niet opgegeven'}\\n\\n\` +
                    \`--- Investeringsprojectie ---\\n\` +
                    \`Investeringsbedrag: \${formatCurrency(state.investment)}\\n\` +
                    \`Termijn: \${state.timeframe} jaar\\n\` +
                    \`Verwacht Rendement: 16% per jaar\\n\` +
                    \`Verwachte Eindwaarde: \${formatCurrency(projection.summary.finalValue)}\\n\` +
                    \`Totaal Rendement: \${formatPercent(projection.summary.totalReturn)}\\n\` +
                    \`Dividend Herinvesteren: \${state.reinvestDividends ? 'Ja' : 'Nee'}\\n\`
                );

                // Open mailto
                window.location.href = \`mailto:info@welmac.nl?subject=\${subject}&body=\${body}\`;

                // Show success message
                emailForm.style.display = 'none';
                emailSuccess.classList.add('show');
            });
        }

        // ========================================
        // URL Parameter Handling
        // ========================================
        function parseUrlParams() {
            const params = new URLSearchParams(window.location.search);

            if (params.has('investment')) {
                const inv = parseInt(params.get('investment'));
                if (inv >= CONFIG.minInvestment) {
                    state.investment = inv;
                    document.getElementById('investment-input').value = inv;
                }
            }

            if (params.has('years')) {
                const years = parseInt(params.get('years'));
                if (years >= CONFIG.minTimeframe && years <= CONFIG.maxTimeframe) {
                    state.timeframe = years;
                    document.getElementById('timeframe-slider').value = years;
                    document.getElementById('timeframe-value').textContent = \`\${years} jaar\`;
                }
            }

            if (params.has('reinvest')) {
                const reinvest = params.get('reinvest') !== 'false';
                state.reinvestDividends = reinvest;
                document.getElementById('reinvest-toggle').checked = reinvest;
            }
        }

        // ========================================
        // Initialization
        // ========================================
        document.addEventListener('DOMContentLoaded', () => {
            parseUrlParams();
            initCharts();
            attachEventListeners();
            recalculate();
        });
    </script>
</body>
</html>`;

export default {
    async fetch(request, env, ctx) {
        return new Response(HTML, {
            headers: {
                'Content-Type': 'text/html;charset=UTF-8',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    }
};
