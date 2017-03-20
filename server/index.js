const express = require("express")
const app = express()
const db = require("../model/index")
const Person = db.model('person')

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/people", (req, res, next) => {
    //retrieve all users 
    Person.findAll()
    .then((allUsers) => res.json(allUsers))
    .catch(next)

})

app.get("/people/:id", (req, res, next) => {
    console.log('request for getting person')
    //retrieve user at id
    let id = +req.params.id  //+ converts to number
    Person.findById(id)
    .then((user) => res.json(user))
    .catch(next) 

})

app.put('/people/:id', (req, res, next) =>  {
    console.log('updating user')

    let id = +req.params.id
    Person.findById(id)
    .then(person => person.update(req.body))  
    .then((updatedUser) => res.json(updatedUser))
    .catch(next)

})

app.post('/people', (req, res, next) => {
    console.log(req.body)
    Person.create(req.body) //create person in database
    .then((createdUser) => res.json(createdUser)) // send back user after its created
    .catch(next) // if there is an error next will catch it and forward it to function
})


app.delete('/people/:id', (req, res, next) => {
    console.log('deleting user')
    
    let id = +req.params.id
    Person.findById(id)
    .then(person => person.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
})


db.sync()
.then(() => {
    app.listen(3000, () => {
        console.log("Server listening on port 3000")
    })
})
.catch(console.error)