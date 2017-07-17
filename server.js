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
const properties = db.get('properties');


mongodb.MongoClient.connect(dbUrl, function(err, db) {

    // (READ) GET REQUEST - Contacts
    app.get('/api/contacts', (req, res, next) => {
        contacts.find({})
        .then(function(contacts){
            res.json(contacts);
        })
        .catch(function(err){
            res.json(err)
        })
    });


    // (READ) GET REQUEST - Properties
    app.get('/api/properties', (req, res, next) => {
        properties.find({})
        .then(function(properties){
            res.json(properties);
        })
        .catch(function(err){
            res.json(err)
        })
    });




    // (CREATE) POST REQUEST - Contacts
    app.post('/api/contacts', (req, res, next) => {
        contacts.insert(req.body).then(function(contact) {
            res.json(req.body)
        }).catch(function(err) {
            res.json(err)
        })
    });

    // (UPDATE) PUT REQUEST - Contacts
    app.put('/api/contacts/:_id', function(req, res, next){
        var id = req.params._id;

         contacts.findOneAndUpdate(
             {_id: id}, req.body)
         .then(function(contact){
             res.json({status: 'contact updated'})
         })
         .catch(function(err){
             res.json(err)
         })

    });










    //
    // app.put('/api/games/:_id', (req, res) => {
    //     const { errors, isValid } = validate(req.body);
    //
    //     if (isValid){
    //         const { title, cover} = req.body;
    //         db.collection('games').findOneAndUpdate(
    //             { _id: new mongodb.ObjectId(req.params._id) },
    //             { $set: { title, cover } },
    //             { returnOriginal: false },
    //             (err, result) => {
    //                 if (err) {res.status(500).json({ errors: {global: err}}); return; }
    //                 res.json({game: result.value})
    //             }
    //         )
    //     } else {
    //         res.status(400).json({errors});
    //     }
    // })



    // (DELETE) DELETE REQUEST - Contacts
    app.delete('/api/contacts/:id', (req,res, next) =>{
        var id = req.params.id;

        contacts.findOneAndDelete({_id: id})
        .then(function(){
            res.json({status: 'user deleted'})
        }).catch(function(err){
            res.json(err)
        })
    })





    // var contacts = db.get('contacts');

    // GET REQUEST - Contacts (WORKING?)
    // app.get('/api/contacts', (req, res, next) => {
    //     db.collection('contacts').find({}).toArray((err, contacts) => {
    //         res.json({contacts});
    //     });
    // });



    // // POST REQUEST - Contacts
    //    app.post('/api/contacts', (req, res, next) => {
    //             db.collection('contacts').push({}).toArray((err, contacts) => {
    //                 res.json({contacts});
    //             })
    //         });

    //GET REQUEST - Properties
    // app.get('/api/properties', (req, res, next) => {
    //     db.collection('properties').find({}).toArray((err, contacts) => {
    //         res.json({contacts});
    //     });
    // });

    // Retrieves simply 8080
    // app.get('/', function(req, res, next) {
    //     res.json({'key': 'value'})
    // })

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
