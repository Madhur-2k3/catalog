// Test case data (replace with your actual JSON data)
const testCases = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

// Function to decode Y values and create roots array
function decodeYValues(data) {
    const roots = [];
    for (const key in data) {
        if (key !== 'keys') {
            const { base, value } = data[key];
            const y = parseInt(value, base);
            roots.push([parseInt(key), y]);
        }
    }
    return roots;
}

// Function to find the secret (constant term) using Lagrange interpolation
function findSecret(roots) {
    const xValues = roots.map(([x]) => x);
    const yValues = roots.map(([, y]) => y);

    // Calculate the Lagrange interpolation polynomial
    let secret = 0;
    for (let i = 0; i < xValues.length; i++) {
        let product = yValues[i];
        for (let j = 0; j < xValues.length; j++) {
            if (j !== i) {
                product *= (xValues[i] - xValues[j]) / (xValues[i] - 0);
            }
        }
        secret += product;
    }

    return secret;
}

// Main function
function main() {
    const roots = decodeYValues(testCases);
    const secret = findSecret(roots);
    console.log('Secret (c):', secret);
}

main();