// the input box is named inputBox
// the search button is named searchButton
// the contents of the input box are shown in the element named mainWord and wordInFocus
// the definition of the word is gotten from words api and shown in the element named definitionMain
// the synonyms of the word are gotten from datamuse api and shown in the element named synonym-column
// the antonyms of the word are gotten from datamuse api and shown in the element named antonym-column
// the rhymes of the word are gotten from datamuse api and shown in the element named rhymes-column
// the hominophones of the word are gotten from datamuse api and shown in the element named homophones-column

// varibles showing the urls you will need for the datamuse api
var datamuseAPI0 = "https://api.datamuse.com/words?rel_syn="; //synonyms
var datamuseAPI1 = "https://api.datamuse.com/words?rel_rhy="; //rhymes
var datamuseAPI2 = "https://api.datamuse.com/words?rel_hom="; //homophones
var datamuseAPI3 = "https://api.datamuse.com/words?rel_ant="; //antonyms

// varible holding the word you want to search for
var word = "";

// varible showing you how to search for the word
var datamuseUrl0 = datamuseAPI0 + word;
var datamuseUrl1 = datamuseAPI1 + word;
var datamuseUrl2 = datamuseAPI2 + word;
var datamuseUrl3 = datamuseAPI3 + word;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2d56f060f5msh38af9a8aa84bc68p1b4603jsn2583833b279c",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};
// varibles showing the urls you will need for the words api
var wordsAPI = "https://wordsapiv1.p.rapidapi.com/words/";

var wordsUrl0 = wordsAPI + word;

function modalListener() {
  // document.addEventListener("DOMContentLoaded", () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add("is-active");
    }

    function closeModal($el) {
      $el.classList.remove("is-active");
    }

    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-trigger") || []).forEach(
      ($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener("click", () => {
          openModal($target);
        });
      }
    );

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");

      $close.addEventListener("click", () => {
        closeModal($target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) {
        // Escape key
        closeAllModals();
      }
    });
  }
//   );
// }

//function to get 5 synonyms of the word
function getSynonyms() {
  fetch(datamuseUrl0)
    .then((response) => response.json())
    .then((data) => {
      var synonyms = data;
      var synonymsList = "";
      for (var i = 0; i < synonyms.length; i++) {
        synonymsList += synonyms[i].word + ", ";
      }
      console.log(synonymsList);
      var synonymsArray = [];
      try {
        for (var i = 0; i < 5; i++) {
          // create a variable to hold the array of 5 synonyms and add the synonyms to it
          synonymsArray.push(synonyms[i].word);
          console.log(synonyms[i].word);
          console.log(synonymsArray);
        }
      } catch (error) {
        console.log("No synonyms found");
        document.getElementById("synonym-column").innerHTML =
          "Less than 5 synonyms found";
      }
      // document.getElementById("synonym-column").innerHTML = synonymsArray;
      // for each synonym in the array create a button and add it to the synonyms column with the id of the synonym
      for (var i = 0; i < synonymsArray.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = synonymsArray[i];
        button.id = synonymsArray[i];
        button.className = "js-modal-trigger";
        // add attribute data-target to the button with value of modal-js-example
        button.setAttribute("data-target", "modal-js-example");
        document.getElementById("synonym-column").appendChild(button);
        // add event listener to the button with the id of the synonym to alert the id of the synonym
        document
          .getElementById(synonymsArray[i])
          modalListener()

      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//function to get the antonyms of the word
function getAntonyms() {
  fetch(datamuseUrl3)
    .then((response) => response.json())
    .then((data) => {
      var antonyms = data;
      var antonymsList = "";
      for (var i = 0; i < antonyms.length; i++) {
        antonymsList += antonyms[i].word + ", ";
      }
      console.log(antonymsList);
      // create a variable to hold the array of 5 antonyms and add the antonyms to it
      var antonymsArray = [];
      try {
        for (var i = 0; i < 5; i++) {
          antonymsArray.push(antonyms[i].word);
          console.log(antonyms[i].word);
          console.log(antonymsArray);
        }
      } catch (error) {
        console.log("No antonyms found");
        document.getElementById("antonym-column").innerHTML =
          "Less than 5 antonyms found";
      }
      // document.getElementById("antonym-column").innerHTML = antonymsArray;
      // for each antonym in the array create a button and add it to the antonyms column with the id of the antonym
      for (var i = 0; i < antonymsArray.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = antonymsArray[i];
        button.id = antonymsArray[i];
        button.className = "js-modal-trigger";
        // add attribute data-target to the button with value of modal-js-example
        button.setAttribute("data-target", "modal-js-example");
        document.getElementById("antonym-column").appendChild(button);
        // add event listener to the button with the id of the antonym to alert the id of the antonym
        document
          .getElementById(antonymsArray[i])
          modalListener()
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//function to get the rhymes of the word
function getRhymes() {
  fetch(datamuseUrl1)
    .then((response) => response.json())
    .then((data) => {
      var rhymes = data;
      var rhymesList = "";
      for (var i = 0; i < rhymes.length; i++) {
        rhymesList += rhymes[i].word + ", ";
      }
      console.log(rhymesList);

      // create a variable to hold the array of 5 rhymes and add the rhymes to it
      var rhymesArray = [];
      try {
        for (var i = 0; i < 5; i++) {
          rhymesArray.push(rhymes[i].word);
          console.log(rhymes[i].word);
          console.log(rhymesArray);
        }
      } catch (error) {
        console.log("No rhymes found");
        document.getElementById("rhymes-column").innerHTML =
          "Less than 5 rhymes found";
      }
      // document.getElementById("rhymes-column").innerHTML = rhymesArray;
      // for each rhyme in the array create a button and add it to the rhymes column with the id of the rhyme
      for (var i = 0; i < rhymesArray.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = rhymesArray[i];
        button.id = rhymesArray[i];
        button.className = "js-modal-trigger";
        // add attribute data-target to the button with value of modal-js-example
        button.setAttribute("data-target", "modal-js-example");
        document.getElementById("rhymes-column").appendChild(button);
        // add event listener to the button with the id of the rhyme to alert the id of the rhyme
        document
          .getElementById(rhymesArray[i])
          modalListener()
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//function to get the homophones of the word
function getHomophones() {
  fetch(datamuseUrl2)
    .then((response) => response.json())
    .then((data) => {
      var homophones = data;
      var homophonesList = "";
      for (var i = 0; i < homophones.length; i++) {
        homophonesList += homophones[i].word + ", ";
      }
      console.log(homophonesList);

      // create a variable to hold the array of 5 homophones and add the homophones to it
      var homophonesArray = [];
      try {
        for (var i = 0; i < 5; i++) {
          homophonesArray.push(homophones[i].word);
          console.log(homophones[i].word);
          console.log(homophonesArray);
        }
      } catch (error) {
        console.log("No homophones found");
        document.getElementById("homophones-column").innerHTML =
          "Less than 5 homophones found";
      }
      // document.getElementById("homophones-column").innerHTML = homophonesArray;
      // for each homophone in the array create a button and add it to the homophones column with the id of the homophone
      for (var i = 0; i < homophonesArray.length; i++) {
        var button = document.createElement("button");
        button.innerHTML = homophonesArray[i];
        button.id = homophonesArray[i];
        button.className = "js-modal-trigger";
        // add attribute data-target to the button with value of modal-js-example
        button.setAttribute("data-target", "modal-js-example");
        document.getElementById("homophones-column").appendChild(button);
        // add event listener to the button with the id of the homophone to alert the id of the homophone
        document
          .getElementById(homophonesArray[i])
          modalListener()
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//function to get the definition of the word
function getDefinition() {
  fetch(wordsUrl0, options)
    .then((response) => response.json())
    .then((data) => {
      var definition = data.results[0].definition;
      document.getElementById("definitionMain").innerHTML = definition;
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("definitionMain").innerHTML =
        "No definition found for this word. Please try another word.";
    });
}

// function to get the pronunciation of the word and show it in mainPro
function getPronunciation() {
  fetch(wordsUrl0, options)
    .then((response) => response.json())
    .then((data) => {
      var pronunciation = data.pronunciation.all;
      document.getElementById("mainPro").innerHTML = pronunciation;
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("mainPro").innerHTML = "No pronunciation found";
    });
}

// function to get the syllables of the word and show it in mainSyl
function getSyllables() {
  fetch(wordsUrl0, options)
    .then((response) => response.json())
    .then((data) => {
      var syllables = data.syllables.count;
      document.getElementById("mainSyl").innerHTML = syllables;
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("mainSyl").innerHTML = "No syllables found";
    });
}

// function to get the frequency of the word and show it in mainFreq
function getFrequency() {
  fetch(wordsUrl0, options)
    .then((response) => response.json())
    .then((data) => {
      var frequency = data.frequency;
      if (frequency === undefined) {
        document.getElementById("mainFreq").innerHTML = "No frequency found";
      } else {
        document.getElementById("mainFreq").innerHTML = frequency;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("mainFreq").innerHTML = "No frequency found";
    });
}

// the search button is clicked
searchButton.addEventListener("click", function () {
  // the word in the input box is stored in the variable word
  var word = inputBox.value;
  // the word is shown in the element named mainWord and wordInFocus
  mainWord.innerHTML = word;
  wordInFocus.innerHTML = word;

  // the urls are updated to include the word
  datamuseUrl0 = datamuseAPI0 + word;
  datamuseUrl1 = datamuseAPI1 + word;
  datamuseUrl2 = datamuseAPI2 + word;
  datamuseUrl3 = datamuseAPI3 + word;
  wordsUrl0 = wordsAPI + word;

  // the functions to get the synonyms, antonyms, rhymes, homophones and definition of the word are called
  getSynonyms();
  getAntonyms();
  getRhymes();
  getHomophones();
  getDefinition();
  getPronunciation();
  getSyllables();
  getFrequency();
 

  // the input box is cleared
  inputBox.value = "";

  document.getElementById("synonym-column").style.display = "block";
  document.getElementById("antonym-column").style.display = "block";
  document.getElementById("rhymes-column").style.display = "block";
  document.getElementById("homophones-column").style.display = "block";
  document.getElementById("definitionMain").style.display = "block";
});
