const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/studentmanager"
);

const studentSeed = [
    {
        "keywords": [
            "Has 2 cats",
            "lived in NYC",
            "originally from Iowa",
            "has one arm"
        ],
        "name": "Sarah",
        "location": "Arvada, CO",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "likes travel",
            "tried coding before"
        ],
        "name": "Adina",
        "location": "Arvada, CO",
        "class": "Test Class 1",
        "isInTech": false,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "paints",
            "enjoys birdwatching",
            "visited all 50 states",
            "data science background"
        ],
        "name": "Leo",
        "location": "Broomfield, CO",
        "class": "Test Class 1",
        "isInTech": false,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Sang at Carnegie Hall",
            "born in Canada",
            "wants to develop video games"
        ],
        "name": "Lux",
        "location": "City Park",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "enjoys baking",
            "CPR certified",
            "never broken a limb"
        ],
        "name": "Brett",
        "location": "Parker",
        "class": "Test Class 1",
        "isInTech": false,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Former lifeguard",
            "loves paintball",
            "plays drums",
            "has many arms"
        ],
        "name": "Lew",
        "location": "Westminster, CO",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "former banker",
            "a bit nervous about class",
            "owns 5 abacuses"
        ],
        "name": "Karen",
        "location": "Glendale",
        "class": "Test Class 1",
        "isInTech": false,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Plays flag football",
            "has a gecko",
            "history major",
            "loves escape rooms"
        ],
        "name": "Al",
        "location": "Rino",
        "class": "Test Class 1",
        "isInTech": false,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Wants to skydive",
            "wants to work remotely",
            "does standup comedy"
        ],
        "name": "Clay",
        "location": "Wash Park",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Former teacher",
            "also coached track",
            "from Minnesota",
            "aspiring artist"
        ],
        "name": "Katie",
        "location": "Federal Heights",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Loves dogs",
            "former graphic designer",
            "trains ferrets"
        ],
        "name": "Audra",
        "location": "City Park",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Passionately loves pickles",
            "writes poetry",
            "former Irish dancer",
            "Raises parakeets"
        ],
        "name": "Matthew",
        "location": "Castle Rock",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "fav food is pizza",
            "background in marketing",
            "from Chicago",
            "sings in barber shop quartet"
        ],
        "name": "Eric",
        "location": "Boulder",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "juggler",
            "attended circus school",
            "Biology major"
        ],
        "name": "Lisa",
        "location": "Centennial",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "grew up in Iceland",
            "gymnast",
            "1st grade teacher",
            "gardener"
        ],
        "name": "Brian",
        "location": "LoHi",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "background in sales",
            "into cycling",
            "loves Arrested Development"
        ],
        "name": "Amanda",
        "location": "Highlands",
        "class": "Test Class 1",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "Pilot",
            "world traveler",
            "training to run 5k"
        ],
        "name": "Jason",
        "location": "Westminster",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "excited about class",
            "practiced lots on CodeWars"
        ],
        "name": "Alan",
        "location": "Lakewood",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "basketball",
            "volleyball",
            "former mechanic"
        ],
        "name": "Adam",
        "location": "Castle Rock",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "mother of twins",
            "former QA tester",
            "enjoys yoga"
        ],
        "name": "Brenda",
        "location": "Golden",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "home cook",
            "former bartender",
            "studying French"
        ],
        "name": "Micah",
        "location": "Colorado Springs",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "plays violin",
            "project management",
            "two kids"
        ],
        "name": "Josh",
        "location": "Brighton",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "massage school",
            "considering chiro school",
            "owns two golden retrievers"
        ],
        "name": "Brooke",
        "location": "LoDo",
        "class": "Test Class 2",
        "isInTech": false,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "mountain climbing",
            "hiking",
            "video games",
            "getting married in June"
        ],
        "name": "Nathan",
        "location": "Lakewood",
        "class": "Test Class 2",
        "isInTech": false,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "plays competitive foosball",
            "certified scrummaster",
            "brother is a coder"
        ],
        "name": "Aaron",
        "location": "Wheat Ridge",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "knits",
            "tattoo artist",
            "from Louisiana"
        ],
        "name": "Colin",
        "location": "Thornton",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "1 cat, 2 dogs, 1 fish",
            "loves GoT",
            "learning to scuba dive"
        ],
        "name": "Hai",
        "location": "Aurora",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "allergic to corn",
            "friends with Justin Bieber",
            "computer science student"
        ],
        "name": "Joe",
        "location": "DTC",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "vegetarian",
            "mom of two"
        ],
        "name": "Diana",
        "location": "LoHi",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "skateboarder",
            "journalism major",
            "mock trial champ"
        ],
        "name": "Mac",
        "location": "Wash Park",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "traveled 27 countries",
            "finishing BA",
            "loves classical music",
            "singer"
        ],
        "name": "Kim",
        "location": "Parker",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
    {
        "keywords": [
            "publishing industry",
            "just moved to Denver",
            "interested in hiking"
        ],
        "name": "Drew",
        "location": "Aurora",
        "class": "Test Class 2",
        "isInTech": true,
        "date": new Date(Date.now())
    },
];

db.Student
    .remove({})
    .then(() => db.Student.collection.insertMany(studentSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
