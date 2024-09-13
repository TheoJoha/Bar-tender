const acceptedOrders = [
    {
        "1001": { "beer": true, "drink": true },
        "666": { "beer": true }
    }
]

// none, one beer, two beers, or drink
let currentlyMadeByBartender = "none"
let timeToPrepareDrink = 5000

async function getAll() {
    return Promise.resolve(acceptedOrders)
}

async function orderDrink(drink) {
    // if a drink is already being made then the order is not accepted at the moment
    if (currentlyMadeByBartender === "drink") {
        return false
    }

    // if two beers are being made and any type is ordered then the order is not accepted at the moment
    if (currentlyMadeByBartender === "two beers") {
        return false
    }

    // if a beer is being made and a drink is ordered then the order is not accepted at the moment
    if (currentlyMadeByBartender === "one beer" && drink.drinkType.toUpperCase() === "DRINK") {
        return false
    }

    // if customer already has an order of that type then throw an error
    if (drink.customerNumber in acceptedOrders[0] && acceptedOrders[0][drink.customerNumber].hasOwnProperty(drink.drinkType)) {
        return false
    }

    // If a parameter to adjust time was passed in then use that parameter to adjust time it takes to prepare a drink
    if (drink.timeToPrepareDrinkInSeconds in drink) {
        timeToPrepareDrink = drink.timeToPrepareDrinkInSeconds * 1000
    }

    // otherwise the order will be placed
    let newTimeout = setTimeout(() => {
        // if drink type was made then reduce to "none"
        if (drink.drinkType.toUpperCase() == "DRINK") {
            currentlyMadeByBartender = "none"
        }
        // if beer type was made then reduce by one beer
        else if (drink.drinkType.toUpperCase() == "BEER" && currentlyMadeByBartender == "two beers") {
            currentlyMadeByBartender = "one beer"
        } else {
            currentlyMadeByBartender = "none"
        }

    }, timeToPrepareDrink);


    // if drink type was placed then set what the bartender is currently making to drink
    if (drink.drinkType.toUpperCase() == "DRINK") {
        currentlyMadeByBartender = "drink"
    }
    // if beer type was placed then increase by one beer
    else if (drink.drinkType.toUpperCase() == "BEER" && currentlyMadeByBartender == "one beer") {
        currentlyMadeByBartender = "two beers"
    } else {
        currentlyMadeByBartender = "one beer"
    }

    // if customer has already placed an order
    if (drink.customerNumber in acceptedOrders[0]) {
        if (drink.drinkType === "beer") {
            acceptedOrders[0][drink.customerNumber]["beer"] = true
        } else {
            acceptedOrders[0][drink.customerNumber]["drink"] = true
        }
    } else {
        if (drink.drinkType === "beer") {
            acceptedOrders[0][drink.customerNumber] = {"beer": true}
        } else {
            acceptedOrders[0][drink.customerNumber] = {"drink": true}
        }
    }
    
    return true

}

module.exports = { getAll, orderDrink }