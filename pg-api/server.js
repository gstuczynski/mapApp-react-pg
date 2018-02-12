let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
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
            db.query('Select * from test', function(err, table){
                console.log('aa'+table)
                if(err){
                    return res.status(400).send(err)
                }else{
                    return res.status(200).send(table.rows)
                }
            })
        }
    })
})

app.post('/api/new-country', function (req, res) {
    var country_name = req.body.country_name;
    pool.connect((err, db, done) => {
        if (err) {
            return res.status(400).send(err);
        } else {
            db.query('Insert INTO x (name) VALUES($1)', [country_name], (err, table) => {
                done();
                if (err) {
                    return res.status(400).send(err);
                } else {
                    db.end();
                    res.status(201).send({message: 'Data inserted!'})
                }
            })
        }
    })
})

app.listen(PORT, () => console.log('Listening on port ' + PORT))