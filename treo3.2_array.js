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