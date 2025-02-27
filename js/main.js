import {
    getAdjectives
} from "./data.js";

let adjectives;
let sortDirection = "up";

function init() {
    //  laad de JSON oplade.
    let data = getAdjectives();
    console.log(data);
    //  JSON omzetten naar een object
    let adjectiveObject = JSON.parse(data);
    console.log(adjectiveObject);
    //  render functie callen
    render(adjectiveObject);
    //  call addSortevents
    addSortEvents(adjectiveObject);
}

function addSortEvents(objectAdjectives) {
    // TODO: sort object items (sortDirection) based on "adjectives.score"

    document.getElementById("sort-down").addEventListener('click', function () {
        sortDirection = ;
    });

    document.getElementById("sort-up").addEventListener('click', function () {
        sortDirection = ;
    });

    if (sortDirection == "up") {
        objectAdjectives.sort(function (a, b) {

            if (a.score > b.score) {
                return 1
            } else {
                return -1
            }
        });
        console.log(objectAdjectives);
    } else if (sortDirection == "down") {

    }

    render(objectAdjectives);
}

function addVoteEvents() {

}

function sort() {

}

function render(objectAdjectives) {
    // TODO: add HTML string to HTML string forEach adjective in adjectives
    let htmlCode = ``;
    console.log("rendering...");

    const scaleOfGreat = document.getElementById("container");
    // clear section
    scaleOfGreat.innerHTML = "";
    objectAdjectives.forEach(function (wordScore) {

        let scoreGood = "";

        if (wordScore.score >= 6) {
            scoreGood = "good";
        } else {
            scoreGood = "bad";
        }
        htmlCode += `  <div class="word-item">
                               <span class="word-score ${scoreGood}">${wordScore.score}</span>
                               <span>${wordScore.word}</span>
                          <div class="vote-buttons">
                                <button value="ok" class="upvote-button">👍</button>
                                <button value="ok" class="downvote-button">👎</button>
                          </div>
                       </div>`;


    });
    // console.log(htmlCode);
    // TODO: add class based on Score (>= 6 is 'good')

    // TODO: 3.3 HTML string toevoegen aan pagina -> container.
    scaleOfGreat.innerHTML = htmlCode;
    // TODO: call addVoteEvents
    // op het einde omdat ze niet kunnen verhanderen/geklickt worden als ze niet "bestaan"


}

function upVote(target) {

}


function downVote(target) {

}

function updateScore(word, scoreChange) {
    const foundIndex = adjectives.findIndex(function (item, index) {
        if (item.word == word) {
            return true
        }
    });

    if (foundIndex != null) {
        let newScore = adjectives[foundIndex]['score'] + scoreChange;
        adjectives[foundIndex]['score'] = Math.round(newScore * 100) / 100;
    }
}

init();