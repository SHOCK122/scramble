const scrabbleDict = require('./scrab_dict.json');

class Scramble {
    constructor(numPlayers = 1, dictionary = scrabbleDict) {
        this.TILESET = {
            //'blank' : { 'pts': 0, 'qty': 2, 'revealed': 0 }
        };
        this.hiddenTiles = [];
        this.revealedTiles = [];
        this.DICTIONARY = dictionary;
        this.PLAYERS = {};
        this.setPlayers(numPlayers);
        this.#createDefaultTemplate();
        this.#tilesToArray();
        this.isGameOngoing = false;
        this.currentPlayer = 1;
    }

    setPlayers = (num) => {
        const oldNum = this.numPlayers;
        this.numPlayers = num;
        if (num > oldNum) {
            for (let i = 1; i <= this.numPlayers; i++) {
                this.PLAYERS[i] = [];
            }
        }
        return this.numPlayers;
    }
    
    #createDefaultTemplate = () => {
        Array.from(Array(26)).map((e, i) => {
            const char = i + 65; //start at A
            const letter = String.fromCharCode(char);
            this.TILESET[letter] = { 'pts': null, 'qty': null, 'revealed': 0 };
            const tile = this.TILESET[letter];
            if (['D', 'G'].includes(letter)) {
                tile.pts =  2;
            }
            else if (['B', 'C', 'M', 'P'].includes(letter)) {
                tile.qty = 2;
                tile.pts =  3;
            }
            else if (['F', 'H', 'V', 'W', 'Y'].includes(letter)) {
                tile.qty = 2;
                tile.pts =  4;
            }
            else if (letter === 'K') {
                tile.qty = 1;
                tile.pts =  5;
            }
            else if (['J', 'X'].includes(letter)) {
                tile.qty = 1;
                tile.pts =  8;
            }
            else if (['Q', 'Z'].includes(letter)) {
                tile.qty = 1;
                tile.pts =  10;
            }
            else {
                tile.pts =  1;
                tile.qty = 0;
            }
            
            if (letter === 'A' || letter === 'I') {
                tile.qty = 9;
            }
            else if (letter === 'D'|| letter === 'L'|| letter === 'S'|| letter === 'U') {
                tile.qty = 4;
            }
            else if (letter === 'E') {
                tile.qty = 12;
            }
            else if (letter === 'G') {
                tile.qty = 3;
            }
            else if (letter === 'N'|| letter === 'R'|| letter === 'T') {
                tile.qty = 6;
            }
            if (letter === 'O') {
                tile.qty = 8;
            }
        });
    };

    #tilesToArray = () => {
        for (const letter in this.TILESET) {
            for (let i = 0; i < this.TILESET[letter].qty; i++) {
                this.hiddenTiles.push(letter);
            };
        }
        return this.hiddenTiles;
    };

    revealTile = () => {
        if (this.hiddenTiles.length > 0) {
            const end = (this.hiddenTiles.length - 1);
            const index = Math.floor(Math.random() * end);
            this.revealedTiles.push(this.hiddenTiles[index]);
            this.revealedTiles.sort();
            this.hiddenTiles = this.#exciseFromArray(this.hiddenTiles, index);
        }
        console.log(this.revealedTiles);
        return this.revealedTiles;
    }

    //is the word in the dictionary?
    #isValidWord = (word) => {
        word = word.toLowerCase();
        return this.DICTIONARY.includes(word);
    }
    
    //helper for #allConstruct()
    #constructWordBanks = () => {
        const wordBank = [this.revealedTiles];
        for (const player in this.PLAYERS) {
            wordBank.push(this.PLAYERS[player]);
        }
        return wordBank;
    }

    //helper for #allConstruct()
    #anagramCheck = (target, prefix) => {
        const end = prefix.length
        if (target.length >= end) {
            let a = target.substring(0, end).split('').sort().join('');
            let b = prefix.split('').sort().join('');
            return a === b
        }
        return false;
    }

    #allConstruct = (target, wordBanks = this.#constructWordBanks(), memo = {}) => {
        target = target.toUpperCase();
        if (target in memo) return memo[target]
        if (target === '') return [[]]
        let ways = []
        for (let p = 0; p < wordBanks.length; p++) {
            for (let w = 0; w < wordBanks[p].length; w++) {
                const word = wordBanks[p][w];
                if (this.#anagramCheck(target, word)) {
                    let updatedBank = wordBanks[p].slice(0, w).concat(wordBanks[p].slice(w+1))
                    let updatedBanks = wordBanks.slice(0, p).concat([updatedBank]).concat(wordBanks.slice(p+1))
                    const suffix = target.slice(word.length)
                    let suffixWays = this.#allConstruct(suffix, updatedBanks, memo)
                    let targetWays = suffixWays.map(w => [[p, word], ...w])
                    ways.push(...targetWays)
                }
            }
        }
        memo[target] = ways
        return ways
    }

    #takeTile = (tile) => {
        tile = tile.toUpperCase();
        const tileIdx = this.revealedTiles.indexOf(tile)
        this.revealedTiles = this.#exciseFromArray(this.revealedTiles, tileIdx)
    }

    //helper function
    #exciseFromArray = (array, idx) => {
        return array.slice(0, idx).concat(array.slice(idx + 1));
    }

    #constructWord = (choiceArray) => {
        let word = ''
        for (const tuple of choiceArray) {
            const [player, fragment] = tuple
            word = word + fragment;
            if (player === 0) {
                this.#takeTile(fragment);
            }
            else {
                const fragIdx = this.PLAYERS[player].indexOf(fragment)
                this.PLAYERS[player] = this.#exciseFromArray(this.PLAYERS[player], fragIdx)
            }
        }
        return word
    }

    #giveWord = (word, player) => {
        this.PLAYERS[player].push(word);
    }

    // default taking last choice in list of choices.
    // to do: pass choiceArray to takeWord().
    takeWord = (choice, player) => {
        if (choice.length > 0) {
            const word = this.#constructWord(choice);
            this.#giveWord(word, player);
        }
    }

    presentChoices = word => {
        if (this.#isValidWord(word)) {
            word = word.toUpperCase();
            const choices = this.#allConstruct(word);
            console.log(choices);
            return choices;
        }
        return [];
    }
    
    calcPlayerScore = (player = 1) => {
        let score = 0;
        const playerHand = this.PLAYERS[player]
        for (const word of playerHand) {
            for (const letter of word.split('')) {
                score += this.TILESET[letter].pts;
            }
        }
        console.log(score);
        return score;
    }

    beginPlay = () => {
        let numPlayers, userInput;

        numPlayers = prompt('How many players?')
        numPlayers > 0 ? this.setPlayers(numPlayers) : this.setPlayers(1);
        console.log(`Number of players: ${numPlayers}`)
        this.isGameOngoing = true;
        console.log('Valid commands: "-help", "-quit", "-players", "-scores", "-tiles", "-hands"');
        while (this.isGameOngoing) {
            prompt('Flipping a random tile...');
            this.revealTile();
            this.showPlayerHands();
            userInput = prompt('What word would you like to take?');
            userInput = userInput.toUpperCase();
            let selectedIdx = 0
            let choices = null;
            while (choices === null) {
                choices = this.handleInput(userInput);
                console.log(choices.length)
                choices.length > 0 ?
                    choices.length === 1 ?
                        this.takeWord(selectedIdx, this.currentPlayer) :
                        selectedIdx = prompt('Which way would you like to form the word?') :
                    console.log(`'${userInput}' is not a valid word. Passed play to Player ${this.passPlay()}`);
            }
        }
    }

    passPlay = () => {
        this.currentPlayer = (this.currentPlayer % this.numPlayers) + 1;
        return this.currentPlayer;
    }

    showPlayerHands = () => {
        for (const player in this.PLAYERS) {
            const hand = this.PLAYERS[player];
            console.log(`Player ${player} (${this.calcPlayerScore(player)} points): ${hand}`)
        }
    }

    handleInput = (userInput) => {
        let choices = null;
        switch (userInput) {
            case '-quit':
            case '-q':
                this.isGameOngoing = false;
                break;
            case '-help':
            case '-h':
                console.log('Valid commands: "-help", "-quit", "-players", "-scores", "-tiles"');
                break;
            case '-players':
            case '-p':
                let numPlayers = prompt('Number of players?')
                this.setplayers(numPlayers);
                break;
            case '-scores':
            case '-s':
            case '-playerhands':
            case '-ph':
                this.showPlayerHands();
                break;
            case '-tiles':
            case '-t':
                console.log(this.revealedTiles);
                break;
            case '':
                this.passPlay();
                console.log(`Passing to Player ${this.currentPlayer}.`);
                break;
            default:
                choices = this.presentChoices(userInput);
                console.log(choices); //make this pretty, later.
                break;
        }
        return choices
    }
    
    mockup = () => {
        this.PLAYERS[1].push('L')
        this.PLAYERS[1].push('AL')
        this.PLAYERS[1].push('W')
        this.PLAYERS[1].push('A')
        this.PLAYERS[2].push('W')
        this.PLAYERS[2].push('L')
        this.PLAYERS[2].push('AW')
    }

}

export default Scramble;

// const game = new Scramble(3);
// game.beginPlay();
// console.log(game.TILESET);
// game.mockup();
// game.revealTile()
// game.revealTile()
// game.revealTile()
// console.log(game.PLAYERS)
// let word = game.presentChoices('law')
// game.takeWord(word[word.length - 1], 3)
// //console.log(game.PLAYERS)
// word = game.presentChoices('wall')
// game.takeWord(word[0], 1)
// console.log(game.PLAYERS)
// game.calcPlayerScore()
// game.calcPlayerScore(2)

/*----------------------------------------------------------------
// todo:
// - calculate player scores
// - take user input.
// - pick from choices of all construct
// num key to reveal UP TO that many tiles (custome rule)
// type and enter word to attempt take
// - custom rulesets
// multi-flip?
// take turns:
// flip on turn. if no word taken, pass.
// if word taken, repeat turn
// - allow custom tile counts
// - allow custom tile points
// - disallow pluralization toggle
// - quest mode (coop modes)
// -- build specific word
// -- make word of a threshold score (at least or exactly)
// -- multiple quests at once
// -- reward = new tiles dumped (endless mode?)
// - burn mode
// -- heat continuously decreases
// -- score points to increase heat
// -- rate of heat decrease can be constant or accelerating (endless mode?)
// -- heat can be coop or vs mode (lose heat if points stolen)
// - something fun for waiting players to do?
// -- spin/nudge tiles; slam table
// -- join new team
// - automatic flipping on a timer
// - take turns flipping
// - flip table on new game vote
// - rule toggle: You cannot simply combine existing words without adding at least one extra letter from the pool of revealed tiles.
----------------------------------------------------------------*/