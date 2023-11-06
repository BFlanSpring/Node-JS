const fs = require('fs');

fs.readFile('one.txt', 'utf8', (err, data) => {
    if (err){
        console.log('ERROR:', err);
        process.kill(1)
    }
    console.log("Data:", data)
});

function cat(filePath){
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err){
            console.log('ERROR reading ${filePath}:\n', err);
            process.kill(1);
        }
        console.log("Data:", data);
    })
}
  
  const filePath = 'one.txt';

  cat(filePath);