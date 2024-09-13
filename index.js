const express = require("express")
const morgan = require("morgan")
const router = require("./bartender/index.js")

const app = express()
app.use(express.json())
app.use(morgan('combined'))


//constants
const port = 3003

// routes
app.use("/bartender", router)

app.get('/', (req, res) => res.redirect("/bartender"))


// listening on port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
