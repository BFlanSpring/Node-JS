const fs = require('fs');
const axios = require('axios');


function cat(filePath){
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            console.log('ERROR reading ${filePath}:\n', err);
            process.kill(1);
        }
        console.log("File-Data:", data);
    })
}

function webCat(filePath){
    axios.get(filePath)
        .then((response)=> {
            const data =response.data;
            console.log('URL-data:', data);
        })
        .catch((err) => {
            console.log('ERROR, cannot get url content', err)
            process.kill(1);
        });
}
  

function getData(filePath) {
    if (isValidURL(filePath)) {
        webCat(filePath); 
    } else {
        cat(filePath); 
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


const inputPath = 'http://google.com';

getData(inputPath);
