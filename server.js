const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload());

app.post('/upload', (req, res) => { 
    console.log("server endpoint called..")
    if(!req.files){
        return res.status(400).json({msg: "No file uploaded"});
    }

    const file = req.files.file;
    console.log(file);
    console.log(req.body);
    console.log(JSON.parse(req.body.tags)[0]);
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err){
            console.log(err);
            return res.status(500).send(err);
        }

        res.json({fileName: file.name, fileSize: file.size, filePath: `/uploads/${file.name}`});
    });
});


 app.listen(5000, () => console.log('server started....'));