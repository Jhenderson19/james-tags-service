const dbManager = require('./database/dbManager');
const Promise = require('bluebird');

//helper class to generate diverse relatively pronouncable tags
class WordGenerator {
  constructor() {
    this.consonants = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z','th','tl','tt','ph','st','sh','ch','tch','lp','ck'];
    this.vowels = ['a','e','i','o','u'];
  }
  getWord(length) {
    var word = '';
    var pullVowel = false;
    var charGenCount = 0;
    Math.random() < .2 ? pullVowel = true : null;
    while (charGenCount < length) {
      let charToGen = 1;
      charGenCount + charToGen < length ? null : charToGen = length - charGenCount;
      pullVowel ? word += this.getVowels(charToGen) : word += this.getConsonants(charToGen);
      pullVowel = !pullVowel;
      charGenCount++
    }
    return word;
  }
  getVowels(count) {
    var str = '';
    for(var i = 0; i < count; i++) {
      str += this.vowels[Math.floor(Math.random() * this.vowels.length)];
    }
    return str;
  }
  getConsonants(count) {
    var str = '';
    for(var i = 0; i < count; i++) {
      str += this.consonants[Math.floor(Math.random() * this.consonants.length)];
    }
    return str;
  }
}

console.log('Generating Tags...');
var wordGen = new WordGenerator();

//Begin trimming potential duplicates
var wordset = {};
var words = [];
var aoeTags = ['Strategy', 'RTS', 'City Builder', 'Multiplayer', 'Historical', 'Base Building', 'Medieval', 'Singleplayer', 'Classic', 'Resource Management',
  'Remake', 'Tactical', 'Real-Time', 'Co-op', 'Action', 'Replay Value', 'Isometric', '2D', 'Adventure', 'Great Soundtrack'];

for (let i = 0; i < 600; i++) {
  wordset[wordGen.getWord(Math.floor(Math.random()*6) + 4)] = true;
}
for (var key in wordset) {
  words.push(key);
}
delete wordset;

//end trimming duplicates
console.log('Initializing Database...');
dbManager.initializeDatabase().then(() => {
  //begin seeding database
  console.log('Adding Tags to Database...');
  var tagInsertPromises = [];

  words.forEach((word) => {
    tagInsertPromises.push(dbManager.insertTag(word));
  });
  aoeTags.forEach((word) => {
    tagInsertPromises.push(dbManager.insertTag(word));
  })

  return Promise.all(tagInsertPromises).then(() => {
    //When all tags have been inserted
    console.log('Adding Tags to Games...');

    gameTagsAdded = [];

    aoeTags.forEach((tag) => {
      gameTagsAdded.push(dbManager.addTagToGame(tag, 1));
    })

    for(let i = 2; i < 101; i++) {
      let curGameTags = [];
      let tagsToGen = 20;
      while (curGameTags.length < tagsToGen) {
        let tagID = Math.floor(Math.random() * words.length);
        curGameTags.indexOf(tagID) === -1 ? curGameTags.push(tagID) : null;
      }
      curGameTags.forEach((tagID) => {
        gameTagsAdded.push(dbManager.addTagToGame(words[tagID], i));
      })
    }

    return Promise.all(gameTagsAdded);
  }).then(() => {
    //When all game tags have been added
    return null;
  })
}).then(() => {
  console.log('Database Seeded!');
  process.exit(0);
})
