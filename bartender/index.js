const express = require("express")
const router = express.Router()
const controllerFunctions = require("./controller.js")



router.get("/", controllerFunctions.listAction)
router.post("/", controllerFunctions.createDrink)

module.exports = router