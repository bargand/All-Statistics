document.addEventListener('DOMContentLoaded', function() {
    const dataInput = document.getElementById('data-input');
    const calculateBtn = document.getElementById('calculate-btn');
    const clearBtn = document.getElementById('clear-btn');
    
    // Result elements
    const meanResult = document.getElementById('mean-result');
    const medianResult = document.getElementById('median-result');
    const modeResult = document.getElementById('mode-result');
    const varianceResult = document.getElementById('variance-result');
    const stddevResult = document.getElementById('stddev-result');
    const rangeResult = document.getElementById('range-result');
    const sortedDataElement = document.getElementById('sorted-data');
    
    calculateBtn.addEventListener('click', calculateStatistics);
    clearBtn.addEventListener('click', clearResults);
    
    function calculateStatistics() {
        // Get input value and split into array
        const input = dataInput.value.trim();
        
        if (!input) {
            alert('Please enter some data');
            return;
        }
        
        // Parse input into numbers
        let data;
        try {
            data = input.split(',')
                        .map(item => parseFloat(item.trim()))
                        .filter(item => !isNaN(item));
        } catch (e) {
            alert('Invalid input format. Please enter numbers separated by commas.');
            return;
        }
        
        if (data.length === 0) {
            alert('No valid numbers found in input.');
            return;
        }
        
        // Sort the data for display and median calculation
        const sortedData = [...data].sort((a, b) => a - b);
        
        // Calculate all statistics
        const mean = calculateMean(data);
        const median = calculateMedian(sortedData);
        const mode = calculateMode(data);
        const variance = calculateVariance(data, mean);
        const stddev = Math.sqrt(variance);
        const range = calculateRange(sortedData);
        
        // Display results
        meanResult.textContent = mean.toFixed(4);
        medianResult.textContent = median.toFixed(4);
        modeResult.textContent = mode.length > 0 ? mode.join(', ') : 'No mode';
        varianceResult.textContent = variance.toFixed(4);
        stddevResult.textContent = stddev.toFixed(4);
        rangeResult.textContent = range.toFixed(4);
        
        // Display sorted data
        sortedDataElement.textContent = sortedData.join(', ');
    }
    
    function clearResults() {
        dataInput.value = '';
        meanResult.textContent = '-';
        medianResult.textContent = '-';
        modeResult.textContent = '-';
        varianceResult.textContent = '-';
        stddevResult.textContent = '-';
        rangeResult.textContent = '-';
        sortedDataElement.textContent = '';
    }
    
    // Statistics calculation functions
    function calculateMean(data) {
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / data.length;
    }
    
    function calculateMedian(sortedData) {
        const middle = Math.floor(sortedData.length / 2);
        
        if (sortedData.length % 2 === 0) {
            return (sortedData[middle - 1] + sortedData[middle]) / 2;
        } else {
            return sortedData[middle];
        }
    }
    
    function calculateMode(data) {
        const frequencyMap = {};
        let maxFrequency = 0;
        const modes = [];
        
        // Count frequencies
        data.forEach(num => {
            frequencyMap[num] = (frequencyMap[num] || 0) + 1;
            
            if (frequencyMap[num] > maxFrequency) {
                maxFrequency = frequencyMap[num];
            }
        });
        
        // Find all numbers with max frequency
        for (const num in frequencyMap) {
            if (frequencyMap[num] === maxFrequency) {
                modes.push(parseFloat(num));
            }
        }
        
        // Return modes only if they occur more than once and not all numbers are modes
        return modes.length === data.length ? [] : modes;
    }
    
    function calculateVariance(data, mean) {
        const squaredDifferences = data.map(num => Math.pow(num - mean, 2));
        const sumSquaredDiff = squaredDifferences.reduce((acc, val) => acc + val, 0);
        return sumSquaredDiff / data.length;
    }
    
    function calculateRange(sortedData) {
        return sortedData[sortedData.length - 1] - sortedData[0];
    }
});

console.log(77)