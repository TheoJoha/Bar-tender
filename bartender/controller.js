const modelFunctions = require("./model.js")

async function listAction(req, res) {
    const data = await modelFunctions.getAll()

    res.send([...data])
}

async function createDrink(req, res) {
    try {

        // check if customer number or drink type is missing
        if(!req.body.customerNumber || !req.body.drinkType) {

            res.status(400).json({
                "message": "All fields required"
            });
           return;
   
        }

        const drink = {
            customerNumber: req.body.customerNumber,
            drinkType: req.body.drinkType
        }
        const newDrink = await modelFunctions.orderDrink(drink)
        if (newDrink) {
            res.status(200).json(drink)
        } else {
            res.status(429).json("Order is not accepted at the moment")
        }
    } catch (e) {
        console.log(e)
        res.status(429).json("Order is not accepted at the moment")
    }
}

module.exports = {listAction, createDrink}