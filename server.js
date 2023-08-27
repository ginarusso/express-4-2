const express = require('express')
const app = express()
const port = 3001

let peopleDB = [
    {
        name: "Gina",
        age: 40,
        location: "Long Island"
    },
    {
        name: "Andrew",
        age: 21,
        location: "Charleson"
    },
    {
        name: "Julia",
        age: 24,
        location: "New York City"
    }
]

app.use(express.json()) //this allows to send JSON data asn a post request

// create a get request
app.get('/', (req, res) => {
    // console.log('test')
    res.status(200).json( {message: 'response'} )
})

app.get('/people', (req, res) => {
    res.status(200).json({data:peopleDB})
})

app.get('/people/:name', (req, res) => {
    // console.log(req) // url: '/people/gina'
    // console.log(req.params) // { name: 'gina' }
    let nameToFind = req.params.name 
    // console.log(nameToFind) // Gina

    /// use higher-order method instead
//     for (let i = 0; i < peopleDB.length; i++) {
// //find name, and when it's matched, return it
//         let potentialMatch = peopleDB[i]
//         // console.log(potentialMatch)
//         // { name: 'Gina', age: 40, location: 'Long Island' }
//         // { name: 'Andrew', age: 21, location: 'Charleson' }
//         // { name: 'Julia', age: 24, location: 'New York City' }
//         let nameOfPotentialMatch = potentialMatch.name
//         if (nameOfPotentialMatch === nameToFind) {
//             // console.log(potentialMatch)
//             // { name: 'Gina', age: 40, location: 'Long Island' }
//            return res.status(200).json(potentialMatch)
//         }
//     }

    let potentialMatch = peopleDB.filter( people => people.name === nameToFind)
    // console.log(potentialMatch)
    // console.log(potentialMatch.length)

if (potentialMatch.length > 0) {
    res.status(200).json(potentialMatch) 
    // res.status(200).json(potentialMatch[0]) 
} else {
         res.status(404).json({message: "Person not found"})
}
})

app.delete('/people/:name', (req, res) => {
    let personToDelete = req.params.name

    let filtered = peopleDB.filter( people => people.name !== personToDelete)
    // console.log(filtered)

    let lengthComparison = peopleDB.length - filtered.length // 0 means no delete happened, 1 means delete happened
    // console.log(lengthComparison)

    peopleDB =  [...filtered]
    // console.log(peopleDB)

    if (lengthComparison > 0) {
        res.status(200).json(peopleDB)
    } else {
        res.status(404).json({message: "Person not found"})
    }
    
})

app.post('/people', (req, res) => {

    // add code to make sure there is no duplicates

    let personToAdd = req.body
    peopleDB.push(personToAdd)
    res.status(201).json(peopleDB)
})

app.put('/people/:name', (req,res) => {

    for (let i=0; i < peopleDB.length; i++) {
        // find the person
        let potentialMatch = peopleDB[i]
        console.log(potentialMatch)
        let nameOfPotentialMatch = potentialMatch.name
        console.log(nameOfPotentialMatch)
        if (nameOfPotentialMatch === req.params.name) {
            // found the person
            let updatedInfo = req.body
            peopleDB[i] = updatedInfo

            return res.status(200).json(peopleDB)
        }
    }
    return res.status(404).json({message: "Person not found"})
})

app.listen(port, () => {
    console.log("server is running")
})