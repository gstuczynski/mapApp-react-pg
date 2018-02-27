const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const fs = require('fs');
const xml = require("xml-parse");
const GeoJSON = require('geojson');

const PORT = 3000;

let pool = new pg.Pool({port: 5432, user: 'docker', password: 'docker', database: 'gis', host: 'localhost'})
/*
pool.connect((err, db, done) => {
    if (err) {
        return console.log(err)
    } else {
        db.query('Select name from x', (err, table) => {
            done();
            if (err) {
                return console.log(err)
            } else {
                console.log(table)
            }
        })
    }
})
*/
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Security-Policy", "default-src 'none'");
    next();
});

app.get('/api/countries', function(req, res){
    pool.connect(function(err, db, done){
        if(err){
            return res.status(400).send(err)
        }else{
            //Select name, ST_AsGeoJSON(ST_Transform(geom, 3857)) AS geom from countries_kml
            db.query('Select name, ST_AsGeoJSON(wkb_geometry) AS geom from data', function(err, table){
                if(err){
                    return res.status(400).send(err)
                    console.log(err)
                }else{
                    return res.status(200).send(table.rows)
                    console.log(table.rows)
                }
            })
        }
    })
})

app.post('/api/add-guideline', function (req, res) {
    var guideline_name = req.body.guideline_name;
    var city = req.body.guideline_city;
    var coords = req.body.coords;
    var iso_a2 = req.body.iso_a2;
    pool.connect((err, db, done) => {
        if (err) {
            console.log(err)
            return res.status(400).send(err);
        } else {
            db.query('Insert INTO guidelines (guideline_name, coords, iso_a2) VALUES($1, POINT($2, $3), $4)', [guideline_name,  coords.lat, coords.lng, iso_a2], (err, table) => {
                done();
                if (err) {
                    console.log(err)
                    return res.status(400).send(err);
                } else {
                    db.end();
                   return res.status(200).send({message: 'Data inserted!'})
                }
            })
        }
    })
})

app.get('/api/get-country', function(req, res){
    fs.readFile( 'assets/countries_kml.xml', 'utf-8' ,function(err, data) {
        res.header("Content-Type", "application/xml");
        res.status(200).send(data)
     });
})

app.get('/api/get-guidelines', (req, res)=>{
    pool.connect(function(err, db, done){
        if(err){
            return res.status(400).send(err)
        }else{
            db.query(`select guideline_name, city, id, json_build_object('lat', coords[0], 'lng', coords[1]) as coords from guidelines`, (err, table) => {
                if(err){
                    return res.status(400).send(err)
                    console.log(err)
                }else{
                    console.log(table.rows)

                    return res.status(200).send(table.rows)
                }
            })
        }
    })
})


app.get('/api/get-boundary', function(req, res){
    fs.readFile( 'assets/data.json', 'utf-8' ,function(err, data) {
       let x = data.sovereignt
console.log(err, x)
        res.status(200).send(data)
     });
})
app.listen(PORT, () => console.log('Listening on port ' + PORT))



