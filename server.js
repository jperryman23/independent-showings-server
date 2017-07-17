// create server
const express = require('express')
const bodyParser = require('body-parser')
const monk = require('monk')
const mongodb = require('mongodb')
const cors = require('cors')

const app = express()
// // parse applications/x-www-form/urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// app.use(cors());
app.use(cors());




const port = process.env.PORT || 8080;
const dbUrl = 'mongodb://localhost/independentshowings';
const mongoURI = process.env.MONGO_URI;

const db = monk(mongoURI || dbUrl)

const contacts = db.get('contacts');


mongodb.MongoClient.connect(dbUrl, function(err, db) {

    // var contacts = db.get('contacts');

    // GET REQUEST - Contacts (WORKING?)
    // app.get('/api/contacts', (req, res, next) => {
    //     db.collection('contacts').find({}).toArray((err, contacts) => {
    //         res.json({contacts});
    //     });
    // });

    // GET REQUEST - Contacts
    app.get('/api/contacts', (req, res, next) => {
        contacts.find({})
        .then(function(contacts){
            res.json(contacts);
        })
        .catch(function(err){
            res.json(err)
        })
    });




    // POST REQUEST - Contacts
    app.post('/api/contacts', (req, res, next) => {
        contacts.insert(req.body).then(function(contact) {
            res.json(req.body)
        }).catch(function(err) {
            res.json(err)
        })
    });

    // // POST REQUEST - Contacts
    //    app.post('/api/contacts', (req, res, next) => {
    //             db.collection('contacts').push({}).toArray((err, contacts) => {
    //                 res.json({contacts});
    //             })
    //         });

    //GET REQUEST - Properties
    app.get('/api/properties', (req, res, next) => {
        db.collection('properties').find({}).toArray((err, contacts) => {
            res.json({contacts});
        });
    });

    // Retrieves simply 8080
    app.get('/', function(req, res, next) {
        res.json({'key': 'value'})
    })

    app.use((req, res, next) => {
        res.status(404).json({
            errors: {
                global: "Something went wrong"
            }
        })
    })

    // tell the app to listen on a port for incoming connections, and pass it callback
    app.listen(8080, () => console.log('Server is running on localhost 8080'));

})
