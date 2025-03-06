import {
    getAdjectives
} from "./data.js";

let adjectives;
let sortDirection = "";

function init() {
    //  laad de JSON oplade.
    // TODO: load in JSON from API.
    // TODO: Read the Render based on API object
    fetch('https://dev2-prima.onrender.com/adjectives')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            console.log('Parsed JSON response:', data);
            //  render functie callen
            render(data);
            //  call addSortevents
            addSortEvents(data);
        })
        .catch(function (error) {
            console.error('Error fetching data:', error);
        });

    // let data = getAdjectives();
    // console.log(data);
    //  JSON omzetten naar een object
    // let adjectiveObject = JSON.parse(data);
    // console.log(adjectiveObject);
}

function addSortEvents(objectAdjectives) {
    // sort object items (sortDirection) based on "adjectives.score"

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
    // gebruiken van een forEach om door het object te loopen, met als gevlog dat men kan weten welke "target" moet aangepast worden

    const upVoteButtons = document.querySelectorAll('.upvote-button');
    upVoteButtons.forEach(function (button) {

        button.addEventListener('click', function (event) {

            let targetWord = event.target.value;

            upVote(objectAdjectives, targetWord);
            console.log(event.target.value);
            // target laat weten welke exact het is & value zorgt dat deze een gebruikbare value.
        })

    });

    const downVoteButtons = document.querySelectorAll('.downvote-button');
    downVoteButtons.forEach(function (button) {

        button.addEventListener('click', function (event) {

            let targetWord = event.target.value;
            downVote(objectAdjectives, targetWord);
            console.log(event.target.value);
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
    console.log(objectAdjectives);
}

function upVote(objectAdjectives, target) {

    // TODO: send the word being upvoted to server.
    // TODO: render the updated score.
    // array --> object word --> edit
    // fix so that sort is kept.
    console.log(target);

    fetch(`https://dev2-prima.onrender.com/upvote/${target}`)
        .then(function () {
            init();
        });

    // objectAdjectives.forEach(function (wordScore) {
    //     if (wordScore.word == target) {

    //         wordScore.score += 0.1;
    //         wordScore.score = Math.round(wordScore.score * 100) / 100;
    //     }
    //     // console.log(objectAdjectives);
    // })
    // sort(objectAdjectives);
    // render(objectAdjectives);
}


function downVote(objectAdjectives, target) {

    // TODO: send the word being downvoted to server.
    // TODO: render the updated score.

    fetch(`https://dev2-prima.onrender.com/downvote/${target}`)
        .then(function () {
            init();
        })

    // //  add a math.round to round out the score result 
    // console.log(target);
    // objectAdjectives.forEach(function (wordScore) {
    //     if (wordScore.word == target) {

    //         wordScore.score -= 0.1;
    //         wordScore.score = Math.round(wordScore.score * 100) / 100;
    //     }
    //     // console.log(objectAdjectives);
    // })
    // sort(objectAdjectives);
    // render(objectAdjectives);

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