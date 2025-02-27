import {
    getAdjectives
} from "./data.js";

let adjectives;
let sortDirection = "";

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

    // code wordt niet verder uitgevoerd na een addEventListener.
    document.getElementById("sort-down").addEventListener('click', function () {
        sortDirection = "down";
        console.log("sort down");
        sort(objectAdjectives);
    });

    document.getElementById("sort-up").addEventListener('click', function () {
        sortDirection = "up";
        console.log("sort up");
        sort(objectAdjectives);
    });

}

function addVoteEvents(objectAdjectives) {
    // TODO: gebruiken van een forEach om door het object te loopen, met als gevlog dat men kan weten welke "target" moet aangepast worden
    // document.getElementsByClassName("upvote-button").addEventListener('click', function () {
    //     upVote(objectAdjectives,);
    //     console.log("up vote");
    // });
    // query selector geeft aleen de eerste passende data terug.
    // query selector all geeft een lijst van alle passende waarden terug. 


    // document.getElementsByClassName("downvote-button").addEventListener('click', function () {
    //     downVote(objectAdjectives,);
    //     console.log("down vote");
    // });

    const upVoteButtons = document.querySelectorAll('.upvote-button');
    upVoteButtons.forEach(function (button) {

        button.addEventListener('click', function (event) {

            console.log(event.target.value);
            // target laat weten welke exact het is & value zorgt dat deze een gebruikbare value.
        })

    });

}

function sort(objectAdjectives) {
    if (sortDirection == "down") {
        objectAdjectives.sort(function (a, b) {

            if (a.score > b.score) {
                return 1
            } else {
                return -1
            }
        });
        console.log(objectAdjectives);
    } else if (sortDirection == "up") {
        objectAdjectives.sort(function (a, b) {

            if (a.score > b.score) {
                return -1
            } else {
                return 1
            }
        });
        console.log(objectAdjectives);
    }

    render(objectAdjectives);
}

function render(objectAdjectives) {
    //  add HTML string to HTML string forEach adjective in adjectives
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
                                <button value="${wordScore.word}" class="upvote-button">👍</button>
                                <button value="${wordScore.word}" class="downvote-button">👎</button>
                          </div>
                       </div>`;


    });
    // console.log(htmlCode);
    //  add class based on Score (>= 6 is 'good')

    //  3.3 HTML string toevoegen aan pagina -> container.
    scaleOfGreat.innerHTML = htmlCode;
    //  call addVoteEvents
    // op het einde omdat ze niet kunnen verhanderen/geklickt worden als ze niet "bestaan"
    addVoteEvents(objectAdjectives);
}

function upVote(objectAdjectives, target) {

    target = "";

    objectAdjectives.forEach(function (target) {
        target.score += 0.1;
    });
}


function downVote(objectAdjectives, target) {

    target = "";

    objectAdjectives.forEach(function (target) {
        target.score -= 0.1;
    });
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