import express from 'express'
import fs from 'fs'

const app = express()

const port = 3000

app.use(express.json())


app.get('/', (req, res) =>{
    fs.readFile('./html/home.html', 'utf8',
        (err, html) => {
            if(err){
                res.status(500).send('There was an error ' + err)
                return
            }

            console.log("Sendig page...")
            res.send(html)
            console.log("Page sent!")
        }
    )
})

app.get('/person', (req, res) =>{
    console.log("hello server")
    const person = {
        name: "Rebeca",
        email: "a01029805@tec.mx",
        message: "Hello world from server"
    }

    res.json(person)
})

app.listen(port, () => {
    console.log(`example app listenign `+ port)
})