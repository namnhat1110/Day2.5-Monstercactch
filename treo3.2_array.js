// Assignment 1

const inventors = [
    "Albert Einstein",
    "Issac Newton",
    "Galileo Galilei",
    "Marie Curie",
    "Johannes Kepler",
    "Nicolaus Copernicus",
    "Max Planck",
    "Katherine Blodgett",
    "Ada Lovelace",
    "Sarah E. Goode",
    "Lise Meitner",
    "Hanna Hammarstrom",
];
const inventorA = inventors.filter(inventorA => inventorA[0] === 'A')
console.log(inventorA)

const inventorAA = inventors.filter(inventorAA => inventorAA.split(" ")[0][0] === inventorAA.split(" ")[1][0])
console.log(inventorAA)

inventors.sort();
console.log(inventors)

inventors.sort((a, b) => a.length - b.length);
console.log(inventors)

const definelength = inventors.map((name) => name.length)
console.log(definelength)

const defineUppercase = inventors.map((name) => name.toUpperCase())
console.log(defineUppercase)

const firstname = inventors.reduce((accumulator, name) => accumulator + name.split(" ")[0] + " ", "")
console.log(firstname)


const sumlength =
    inventors
        .map((name) => name.length)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
    ;
console.log(sumlength)



// Assignment 2

let startAmount = 1000;
let transactions = [
    { currency: 'USD', amount: 12, type: 'withdrawal' },
    { currency: 'USD', amount: 104, type: 'withdrawal' },
    { currency: 'USD', amount: 150, type: 'deposit' },
    { currency: 'USD', amount: 150, type: 'deposit' },
    { currency: 'USD', amount: 250, type: 'withdrawal' },
    { currency: 'USD', amount: 500, type: 'deposit' },
    { currency: 'USD', amount: 447, type: 'withdrawal' },
    { currency: 'USD', amount: 120, type: 'deposit' },
    { currency: 'USD', amount: 58, type: 'withdrawal' },
    { currency: 'USD', amount: 90, type: 'withdrawal' },
];
const usdToVND = 23000;

function transactionHistory() {
    console.log("Balance: " + "$" + startAmount);
    console.log("Transaction History:");
    transactions.forEach((transaction) => {
        if (transaction.type === "withdrawal") {
            startAmount = startAmount - transaction.amount;
            console.log("- You withdrew " + "$" + transaction.amount + ". The new balance is " + "$" + startAmount);
        } else {
            startAmount = startAmount + transaction.amount;
            console.log("- You deposited " + "$" + transaction.amount + ". The new balance is " + "$" + startAmount);
        }
    });
}
transactionHistory();

function balance() {
    return transactions.reduce((accumulator, transaction) => {
        if (transaction.type === 'withdrawal') {
            accumulator = accumulator - transaction.amount;
        } else {
            accumulator = accumulator + transaction.amount;
        }
        return accumulator;
    }, startAmount);
}
console.log(balance());

function changetoVND(transactions, currency, exchangerate) {
    return transactions.map((transaction) =>
    ({
        ...transaction,
        currency,
        amount: transaction.amount * exchangerate,
    }));
}
console.log(changetoVND(transactions, 'VND', usdToVND));



// Asssignment 3

let shoppingCart = [
    { id: 'A31', item: 'T-shirt', price: 9.9, quantity: 5 },
    { id: 'A32', item: 'Jacket', price: 99.9, quantity: 1 },
    { id: 'A33', item: 'Skirt', price: 19.9, quantity: 2 },
    { id: 'A34', item: 'Ankle Pant', price: 39.9, quantity: 3 },
    { id: 'A35', item: 'Polo shirt', price: 14.9, quantity: 3 },
    { id: 'A36', item: 'Chino Short', price: 29.9, quantity: 2 },
    { id: 'A37', item: 'Easy Short', price: 19.9, quantity: 2 },
];

function calculatePrice() {
    return (item) => item.price * item.quantity
}
const totalPriceforeachitem = shoppingCart.map(calculatePrice());
console.log(totalPriceforeachitem)

const totalPriceforallitem = (accumulator, currentValue) => accumulator + currentValue
console.log(totalPriceforeachitem.reduce(totalPriceforallitem))