const fs = require('fs');
const axios = require('axios');
const { resolve, join } = require('path');

function cat(filePath, outputPath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(`ERROR reading ${filePath}:\n`, err);
            process.kill(1);
        } else {
            if (outputPath) {
                fs.writeFile(outputPath, data, (err) => {
                    if (err) {
                        console.log(`Couldn't write ${outputPath}:\n`, err);
                        process.kill(1);
                    }
                });
            } else {
                console.log("File-Data:", data);
            }
        }
    });
}

function webCat(filePath, outputPath) {
    axios.get(filePath)
        .then((response) => {
            const data = response.data;
            if (outputPath) {
                fs.writeFile(outputPath, data, (err) => {
                    if (err) {
                        console.log(`Couldn't write ${outputPath}:\n`, err);
                        process.kill(1);
                    }
                });
            } else {
                console.log('URL-data:', data);
            }
        })
        .catch((err) => {
            console.log('ERROR, cannot get URL content', err);
            process.kill(1);
        });
}

function getData(filePath, outputPath) {
    if (isValidURL(filePath)) {
        webCat(filePath, outputPath);
    } else {
        cat(filePath, outputPath);
    }
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (error) {
        return false;
    }
}

const args = process.argv.slice(2);

if (args[0] === '--out') {
    if (args.length < 3) {
        console.error('Usage: node step3.js --out output-filename.txt readfile-or-url');
        process.exit(1);
    }
    const outputPath = args[1];
    const filePath = args[2];
    getData(filePath, outputPath);
    
} else {
    if (args.length < 1) {
        console.error('Usage: node step3.js [--out output-filename.txt] readfile-or-url');
        process.exit(1);
    }
    const filePath = args[0];
    getData(filePath);
}
