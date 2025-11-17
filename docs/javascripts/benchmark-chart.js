/* docs/javascripts/benchmark-chart.js */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Get all HTML elements ---
    const ctx = document.getElementById('benchmark-radar-chart')?.getContext('2d');
    
    // Mode-switching radio buttons
    const modeSingle = document.getElementById('mode-single');
    const modeCompare = document.getElementById('mode-compare');

    // Dropdown selects
    const target1Select = document.getElementById('target1-select');
    const target2Select = document.getElementById('target2-select');

    // Robustness check: If elements aren't on this page, do nothing.
    if (!ctx || !modeSingle || !modeCompare || !target1Select || !target2Select) {
        console.log('Benchmark chart elements not found on this page. Skipping init.');
        return;
    }

    let chartInstance; // Will hold the Chart.js object
    let allBenchmarkData; // Will hold the loaded JSON data

    // --- 2. Fetch data from your JSON file ---
    fetch('/data/benchmarks.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allBenchmarkData = data;
            populateDropdowns(allBenchmarkData.targets);
            
            // Set initial state from the controls
            handleModeChange();
        })
        .catch(error => {
            console.error("Error loading benchmark data:", error);
            // You could display an error message to the user here
        });

    // --- 3. Define Helper Functions ---

    /**
     * Populates both dropdowns with target names from the data
     * @param {object} targets - The "targets" object from benchmarks.json
     */
    function populateDropdowns(targets) {
        const targetNames = Object.keys(targets);
        
        target1Select.innerHTML = ''; // Clear existing options
        target2Select.innerHTML = ''; // Clear existing options

        targetNames.forEach(name => {
            target1Select.add(new Option(name, name));
            target2Select.add(new Option(name, name));
        });
        
        // Set a different default for the second dropdown to avoid confusion
        if (targetNames.length > 1) {
            target2Select.selectedIndex = 1;
        }
    }

    /**
     * Handles the "Single" vs "Compare" mode change
     */
    function handleModeChange() {
        const isCompareMode = modeCompare.checked;
        
        // This is the logic you requested:
        // Disable and gray-out the second dropdown if not in compare mode
        target2Select.disabled = !isCompareMode;
        
        // Trigger a chart update to add/remove the second dataset
        updateChart();
    }

    /**
     * The main function to draw or update the chart
     */
    function updateChart() {
        if (!allBenchmarkData) return; // Data hasn't loaded yet

        const labels = allBenchmarkData.labels;
        const targets = allBenchmarkData.targets;
        
        const target1Name = target1Select.value;
        const target1Data = targets[target1Name];

        // This array will hold one or two datasets
        const datasets = [];

        // Dataset 1 (Always shown)
        datasets.push({
            label: target1Name,
            data: target1Data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        });

        // Dataset 2 (Only add if in compare mode)
        if (modeCompare.checked) {
            const target2Name = target2Select.value;
            const target2Data = targets[target2Name];
            
            datasets.push({
                label: target2Name,
                data: target2Data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            });
        }

        // --- 4. Create or Update the Chart.js instance ---
        if (chartInstance) {
            // Chart already exists, just update its data
            chartInstance.data.labels = labels;
            chartInstance.data.datasets = datasets;
            chartInstance.update();
        } else {
            // Chart doesn't exist, create it
            chartInstance = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.dataset.label}: ${context.raw}`
                            }
                        }
                    },
                    scales: {
                        r: {
                            angleLines: { display: true },
                            suggestedMin: 0,
                            // Set a max if all your metrics are on the same scale (e.g., 0-100)
                            // suggestedMax: 100 
                        }
                    }
                }
            });
        }
    }

    // --- 5. Attach Event Listeners ---
    modeSingle.addEventListener('change', handleModeChange);
    modeCompare.addEventListener('change', handleModeChange);
    target1Select.addEventListener('change', updateChart);
    target2Select.addEventListener('change', updateChart);
});
