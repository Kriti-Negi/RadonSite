const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Radon', {useNewUrlParser: true});

const dataRowSchema = new mongoose.Schema({
    zipcode: Number,
    epa: Number,
    who: Number,
    total: Number
});

const Row = new mongoose.model("Row", dataRowSchema);

const app = express();

app.set("view engine", 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('info');
})

app.get('/zipcode', (req, res) => {
    res.render('zipcode', {zipcode:"N/A", showCard: false, epaPercent: "N/A", whoPercent: "N/A", total: "N/A"});
})

app.post('/zipcode', (req, res) => {

    const zip = req.body.zip;

    Row.findOne({zipcode: zip}, (err, results) => {
        if(err){
            console.log(err);
        }else{
            if(results){
                res.render('zipcode', {zipcode: zip, showCard: true, epaPercent:results.epa, whoPercent:results.who, total: results.total})
            }else{
                res.render('zipcode', {zipcode: "N/A", showCard: true, epaPercent: "N/A", whoPercent: "N/A", total: "N/A"})
            }
        }
    })
})

/*app.get('/test', (req, res) => {

})*/

app.listen(3000);