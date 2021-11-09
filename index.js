const express = require("express");
const app = express();
const { spawn } = require('child_process');
const PORT = 3000;
app.use(express.static(__dirname + "/public"));

app.get("/hello", function (req, res) {
    // res.writeHead(200);
    var dataToSend = "";
    const hellocode = spawn("python", ['scripts/helloworld.py']);
    hellocode.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
       });
    hellocode.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        console.log(dataToSend);
        // send data to browser
        res.send(dataToSend);
    });
});
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
