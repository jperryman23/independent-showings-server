// create server
const express = require('express')
const bodyParser = require('body-parser')
const monk = require('monk')
const mongodb = require('mongodb')
const cors = require('cors')

const app = express()
const port = process.env.PORT ||8080;
const dbUrl = 'mongodb://localhost/independentshowings';
const mongoURI = process.env.MONGO_URI;

const db = monk(mongoURI || dbUrl)
// const games = db.get('contacts')

// // parse applications/x-www-form/urlencoded
app.use(bodyParser.urlencoded({ extend: false }))

// parse application/json
 app.use(bodyParser.json())

// app.use(cors());
app.use(cors());


mongodb.MongoClient.connect(dbUrl, function(err, db){

        app.get('/api/contacts', (req, res, next) => {
            db.collection('contacts').find({}).toArray((err, contacts) =>{
                res.json({contacts});
            });
        });



        // Retrieves
        app.get('/', function(req, res, next){
            res.json({'key': 'value'})
        })

        app.use((req, res, next) =>{
            res.status(404).json({
                errors: {
                    global: "Something went wrong"
                }
            })
        })


        // tell the app to listen on a port for incoming connections, and pass it callback
            app.listen(8080, () => console.log('Server is running on localhost 8080'));

})
