const express = require("express")
const morgan = require("morgan")
const router = require("./bartender/index.js")

const app = express()
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :body'))


//constants
const port = 3003

// routes
app.use("/bartender", router)

app.get('/', (req, res) => res.redirect("/bartender"))


// listening on port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
