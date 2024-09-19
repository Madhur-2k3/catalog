// Function to parse the input and decode the y values
function parseInput(jsonInput) {
    const data = JSON.parse(jsonInput);
    
    const n = data.keys.n;
    const k = data.keys.k;
    
    const points = [];
    
    for (const key in data) {
        if (key !== 'keys') {
            const x = parseInt(key);  // x is the key in the JSON object
            const base = parseInt(data[key].base);  // base of the y value
            const y = parseInt(data[key].value, base);  // decode the y value from the base
            points.push({ x, y });
        }
    }
    
    return { n, k, points };
}

// Lagrange Interpolation to find the constant term (c) of the polynomial
function lagrangeInterpolation(points) {
    function L(i, xVal) {
        const xi = points[i].x;
        let product = 1;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                const xj = points[j].x;
                product *= (xVal - xj) / (xi - xj);
            }
        }
        return product;
    }
    
    let c = 0;
    for (let i = 0; i < points.length; i++) {
        c += points[i].y * L(i, 0);
    }
    
    return Math.round(c);
}

// Main function
function findConstantTerm(jsonInput) {
    // Step 1: Parse the input
    const { n, k, points } = parseInput(jsonInput);
    
    // Step 2: Apply Lagrange interpolation to find the constant term
    const constantTerm = lagrangeInterpolation(points.slice(0, k));
    
    // Step 3: Output the constant term
    console.log(constantTerm);
}

// Example input
const jsonInput = `
{
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
}
`;

// Run the function with the provided input
findConstantTerm(jsonInput);
