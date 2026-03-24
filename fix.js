const fs = require('fs');
const path = require('path');

const file = 'c:/Users/kaila/Downloads/free/generator.html';
const content = fs.readFileSync(file, 'utf-8');
const lines = content.split('\n');

const toRemove = [
    [336, 349],
    [577, 867],
    [1192, 1192],
    [1217, 1221],
    [1273, 1298]
];

// Reconstruct by only pushing lines not in ranges
const newLines = [];
for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1; // 1-indexed
    let remove = false;
    for (const [start, end] of toRemove) {
        if (lineNum >= start && lineNum <= end) {
            remove = true;
            break;
        }
    }
    if (!remove) {
        newLines.push(lines[i]);
    }
}

fs.writeFileSync(file, newLines.join('\n'), 'utf-8');
console.log('Fixed generator.html');
