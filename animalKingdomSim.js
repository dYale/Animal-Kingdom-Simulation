/**
 * Created by Dan on 3/22/2015.
 */

var animalArray = [];
var originalArray = [];
var numberOfDays = 0;
var newLine = "</br>";


//Basic object constructor
function CreateAnAnimal(name, species, color, aggressive, strength) {
    this.name = name;
    this.species = species;
    this.color = color;
    this.aggressive = aggressive;
    this.strength = strength;
    this.alive = true;
    };

//utilize object constructor and push into an array.
function addAnimal(name, species, color, aggressive, strength) {
    animalArray.push(new CreateAnAnimal(name, species, color, aggressive, strength));
}

//add objects to array
addAnimal("Paul", "Dog", "Blue Merle", false, 6);
addAnimal("Susan", "Mountain Goat", "White", false, 5);
addAnimal("Ernesto", "Sloth", "pink", false, 3);
addAnimal("Neville", "Humpback Whale", "Grey", false, 10);
addAnimal("Sadie", "Sable", "Chartreuse", false, 2);
addAnimal("Vladimir", "Wolf", "Grey", true, 12);
addAnimal("Minerva", "Guinea Hen", "Ugly", false, 1);
addAnimal("Phillipe", "Kangaroo", "Red", false, 4);
addAnimal("Leila", "Polar Bear", "White", true, 13);
addAnimal("Jeffrey", "Hyena", "Yellow Spotted", true, 17);
addAnimal("Pierre", "Lemur", "Turquoise", true, 13);
addAnimal("Gerta", "Rhinoceros", "Charcoal", true, 18);
addAnimal("Astro", "Chipmunk", "Brown", false, 1);
addAnimal("Kitty", "Catfish", "Beige", false, 5);
addAnimal("Belle", "Sheep", "White", false, 3);
addAnimal("George", "Turtle", "Green", false, 2);
addAnimal("Drogon", "Dragon", "Black", true, 30);
addAnimal("Sarah", "Shark", "Gray", true, 42);
addAnimal("Lorrenz", "Seal", "Tan", false, 5);
addAnimal("Rime", "Rabbit", "White", true, 30);
addAnimal("Guillermo", "Toucan", "Rainbow", false, 2);
addAnimal("Elend", "Elephant", "Grey", true, 9);
addAnimal("Carrie", "Crow", "Black", false, 6);
addAnimal("Bill", "Texan", "Caucasian", true, 10);
addAnimal("Ryan", "Lion", "Yellow", true, 50);


//duplicate original array for later comparisons
originalArray = animalArray.map(function (animal) {
    return animal;
});

//write function to get enemies for aggressive animals
//refactor and abstract below
function getEnemy(animals) {
    for (var i = 0; i < animals.length; i++) {

        if (animals[i].aggressive) {

            var enemyIndex = Math.round(Math.random(0.0, 1) * animals.length);
            if (enemyIndex !== i) {
                animals[i].enemy = animals[enemyIndex];
            } else {
                getEnemy(animals[i]);
            }
        }
    }
    return animals;
}

//adds 1 health to all animals alive within the array.
function addHealth(animals) {
    animals.forEach(function (animal) {
        if (animal.alive) {
            return animal.strength ++;
        }
    });
    return animals;
}

//runs mostly-random mathematical simulation, sort of a dice roll?
function battle(animals) {
    animals.forEach(function (animal) {
        if (animal.enemy && animal.enemy.alive) {
            var aggressorHits = Math.round(Math.random(0, 1) * animal.enemy.strength);
            var defenderHits = Math.round(Math.random(0, 1) * animal.strength);

                animal.enemy.strength -= defenderHits;
                animal.strength -= aggressorHits;
            }
        if (animal.strength === null || animal.strength <= 0) {
            animal.alive = false;
            animals.splice(animals.indexOf(animal),1);
        }
    })
    return animals;
}

//randomizes array in preparation for new battle order
function randomizeArray(animals) {
    function randomize(animals) {

        for (var i = animals.length - 1; animals >= 0; i--); {
            var randomIndex = Math.floor(Math.random(0, 1) * i + 1);

            var valueAtIndex = animals[i];
            animals[i] = animals[randomIndex];
            animals[randomIndex] = valueAtIndex;
        }
        return animals;
    }
    randomize(animals).reverse();
    return animals;
}

//lines up several functions in a day.
function quickDay(array) {
    battle(randomizeArray(getEnemy(addHealth(array))));
    numberOfDays++;

}

//runs the day as well as implants functions for what is logged.
function dayLoop(array, events, printAggressor, printNoAggressors) {
    var count = 0;
    array.forEach(function (animal) {
        if (animal.aggressive === true && animal.alive === true) {
            count++;
        }
    });

    ///abstract below
    if (count < 1) {
        return printNoAggressors(array);

    } else if (array.length == 1 && array.filter(function (animal) {
            return animal.aggressive;
        })) {
        return printAggressor(array);

    } else if (array.length === 0) {
        return "On the " + numberOfDays + "day, a mass suicide took place. God save the queen.";

    } else {
        events(array);
        return dayLoop(array, events, printAggressor, printNoAggressors);
    }
}

//conditional response if only 1 aggressive animal left in array
function aggressiveCallback(animal) {
    return "After " + numberOfDays + " days, only the aggressive " + animal[0].name + " the " + animal[0].color + " " + animal[0].species + " remains in our beautiful forest, with a strength of " + animal[0].strength + ", all praise King " + animal[0].name + "!!!";
}

//return array of strings to compliment other strings.
function animalReturn(animals) {
    animals.sort(function(curr, next) {
        return next.strength - curr.strength;
    });
    return animals.map(function (animal) {
            if (animals.length - 1 === animals.indexOf(animal) && animals.length > 1) {
                return newLine + " and " + animal.name + " the " + animal.color + " " + animal.species + ", with a strength of " + animal.strength + "!";
            } else if (animals.length === 1)
                return newLine + " " + animal.name + " the " + animal.color + " " + animal.species + ", with a strength of " + animal.strength + ".";
            else {
                return newLine + " " + animal.name + " the " + animal.color + " " + animal.species + ", with a strength of " + animal.strength;
            }
    });
}

function nonAgressiveCallback(animals) {
    return " Somehow, after " + numberOfDays + " days of turmoil within our beautiful forest, all of the predators have died leaving only:" + newLine + animalReturn(animals) + "" + newLine + newLine + " Good Game, Predators!";
}


//runs the simulation
var result = dayLoop(animalArray, quickDay, aggressiveCallback, nonAgressiveCallback);

//sends value of result to HTML
document.getElementById('out').innerHTML = result;