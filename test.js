// Function to parse the input and decode the y values
function parseInput(jsonInput2) {
    const data = JSON.parse(jsonInput2);
    
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
    // return c.toFixed(6);  // Adjust precision to six decimal places

}

// Main function
function findConstantTerm(jsonInput2) {
    // Step 1: Parse the input
    const { n, k, points } = parseInput(jsonInput2);
    
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
const jsonInput2 =`
{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}
`;


// Run the function with the provided input
findConstantTerm(jsonInput2);
