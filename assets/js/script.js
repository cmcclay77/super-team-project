// the input box is named inputBox
// the search button is named searchButton
// the contents of the input box are shown in the element named mainWord and wordInFocus
// the definition of the word is gotten from words api and shown in the element named definitionMain
// the synonyms of the word are gotten from datamuse api and shown in the element named synonym-column
// the antonyms of the word are gotten from datamuse api and shown in the element named antonym-column
// the rhymes of the word are gotten from datamuse api and shown in the element named rhymes-column

// varibles showing the urls you will need for the datamuse api
var datamuseAPI0 = "https://api.datamuse.com/words?rel_syn="; //synonyms
var datamuseAPI1 = "https://api.datamuse.com/words?rel_rhy="; //rhymes
var datamuseAPI3 = "https://api.datamuse.com/words?rel_ant="; //antonyms

// varible holding the word you want to search for
var word = "";

// varible showing you how to search for the word
var datamuseUrl0 = datamuseAPI0 + word;
var datamuseUrl1 = datamuseAPI1 + word;
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

// function to get the pronunciation of the word and show it in mainPro
function getPronunciation() {
  fetch(wordsUrl0, options)
    .then((response) => response.json())
    .then((data) => {
      var pronunciation = data.pronunciation.all;
      document.getElementById("mainPro").innerHTML = 'Pronounciation: ' + pronunciation;
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
      document.getElementById("mainSyl").innerHTML = 'Syllables: ' + syllables;
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
        document.getElementById("mainFreq").innerHTML = 'Frequency: ' + frequency;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("mainFreq").innerHTML = "No frequency found";
    });
}


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

  // Add a click event on buttons to open a specific modal and console.log the innerHTML of the button
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(
    ($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);

      $trigger.addEventListener("click", () => {
        openModal($target);

        console.log($trigger.innerHTML);
        // change the innerHTML of modalContent to the innerHTML of the button but make first letter uppercase
        document.getElementById("modalContent").innerHTML = $trigger.innerHTML.charAt(0).toUpperCase() + $trigger.innerHTML.slice(1);
        var word1 = $trigger.innerHTML
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "2d56f060f5msh38af9a8aa84bc68p1b4603jsn2583833b279c",
            "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
          },
        };
        // varibles showing the urls you will need for the words api
        var wordsAPI = "https://wordsapiv1.p.rapidapi.com/words/";

        var word1Url0 = wordsAPI + word1;
        // function to get the pronunciation of the word and add it to the modalContent
        function getPronunciation1() {
          fetch(word1Url0, options)
            .then((response) => response.json())
            .then((data) => {
              var pronunciation = data.pronunciation.all;
              document.getElementById("modalPro").innerHTML = " Pronunciation: " + pronunciation;
            })
            .catch((err) => {
              console.error(err);
              document.getElementById("modalPro").innerHTML = " Pronunciation: No pronunciation found";
            });
        }
        getPronunciation1();
        // function to get the syllables of the word and add it to the modalContent
        function getSyllables1() {
          fetch(word1Url0, options)
            .then((response) => response.json())
            .then((data) => {
              var syllables = data.syllables.count;
              document.getElementById("modalSyl").innerHTML = " Syllables: " + syllables;
            })
            .catch((err) => {
              console.error(err);
              document.getElementById("modalSyl").innerHTML = " Syllables: No syllables found";
            });
        }
        getSyllables1();
        // function to get the frequency of the word and add it to the modalContent
        function getFrequency1() {
          fetch(word1Url0, options)
            .then((response) => response.json())
            .then((data) => {
              var frequency = data.frequency;
              if (frequency === undefined) {
                document.getElementById("modalFreq").innerHTML = " Frequency: No frequency found";
              } else {
                document.getElementById("modalFreq").innerHTML = " Frequency: " + frequency;
              }
            })
            .catch((err) => {
              console.error(err);
              document.getElementById("modalContent").innerHTML = " Frequency: No frequency found";
            });
        }
        getFrequency1();

        // function to get the definition of the word and add it to the modalContent
        function getDefinition1() {
          fetch(word1Url0, options)
            .then((response) => response.json())
            .then((data) => {
              var definition = data.results[0].definition;
              document.getElementById("modalDef").innerHTML = " Definition: " + definition;
            })
            .catch((err) => {
              console.error(err);
              document.getElementById("modalDef").innerHTML = " Definition: No definition found";
            });
        }
        getDefinition1();

        // event listener to close the modal when the modalContent is clicked and put the innerHTML of the modalContent into the inputBox
        document.getElementById("modalContent").addEventListener("click", () => {
          closeModal($target);

          document.getElementById("inputBox").value = word1;
          // clear the innerHTML of synonym-column, rhyme-column and antonym-column wordInFocus mainWord mainPro mainSyl mainFreq
          document.getElementById("synonym-column").innerHTML = "";
          document.getElementById("rhyme-column").innerHTML = "";
          document.getElementById("antonym-column").innerHTML = "";
          document.getElementById("wordInFocus").innerHTML = "";
          document.getElementById("mainWord").innerHTML = "";
          document.getElementById("mainPro").innerHTML = "";
          document.getElementById("mainSyl").innerHTML = "";
          document.getElementById("mainFreq").innerHTML = "";
          document.getElementById("definitionMain").innerHTML = "";
          // wait 1 second and then click the searchButton
          setTimeout(function () {
          document.getElementById("searchButton").click();
          }, 500);

        });



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
        for (var i = 0; i < synonyms.length; i++) {
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
      var synonymContainer = document.createElement('div');
      if (synonymsArray.length > 0) {
        synonymContainer.setAttribute('class', 'box synonym-container scroll')
      } else {
        synonymContainer.setAttribute('class', 'synonym-container')
      }

      document.getElementById("synonym-column").appendChild(synonymContainer)
      for (var i = 0; i < synonymsArray.length; i++) {
        var h3El = document.createElement("h3");
        h3El.innerHTML = synonymsArray[i];
        h3El.id = synonymsArray[i];
        h3El.className = "js-modal-trigger";
        // add attribute data-target to the button with value of modal-js-example
        h3El.setAttribute("data-target", "modal-js-example");
        synonymContainer.appendChild(h3El);
        // add event listener to the button with the id of the synonym to alert the id of the synonym
        document
          .getElementById(synonymsArray[i])

      }
      modalListener()
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
        for (var i = 0; i < antonyms.length; i++) {
          antonymsArray.push(antonyms[i].word);
          console.log(antonyms[i].word);
          console.log('---------------------');
          console.log(antonymsArray);
        }
      } catch (error) {
        console.log("No antonyms found");
        document.getElementById("antonym-column").innerHTML =
          "Less than 5 antonyms found";
      }
      // document.getElementById("antonym-column").innerHTML = antonymsArray;
      // for each antonym in the array create a button and add it to the antonyms column with the id of the antonym
      var antonymContainer = document.createElement('div');
      if (antonymsArray.length > 0) {
        antonymContainer.setAttribute('class', 'box antonym-container scroll')
      } else {
        antonymContainer.setAttribute('class', 'antonym-container')

      }
      document.getElementById("antonym-column").appendChild(antonymContainer)

      for (var i = 0; i < antonymsArray.length; i++) {
        var h3El = document.createElement("h3");
        h3El.innerHTML = antonymsArray[i];
        h3El.id = antonymsArray[i];
        h3El.className = "js-modal-trigger";
        // add attribute data-target to the button with value of modal-js-example
        h3El.setAttribute("data-target", "modal-js-example");
        antonymContainer.appendChild(h3El);
        // add event listener to the button with the id of the antonym to alert the id of the antonym
        document
          .getElementById(antonymsArray[i])
      }
      modalListener()
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
        for (var i = 0; i < rhymes.length; i++) {
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

      var rhymeContainer = document.createElement('div');
      if (rhymesArray.length > 0) {
        rhymeContainer.setAttribute('class', 'box rhyme-container scroll')
      } else {
        rhymeContainer.setAttribute('class', 'rhyme-container')

      }
      document.getElementById("rhyme-column").appendChild(rhymeContainer)

      for (var i = 0; i < rhymesArray.length; i++) {
        var h3El = document.createElement("h3");
        h3El.innerHTML = rhymesArray[i];
        h3El.id = rhymesArray[i];
        h3El.className = "js-modal-trigger";
        // add attribute data-target to the button with value of modal-js-example
        h3El.setAttribute("data-target", "modal-js-example");
        rhymeContainer.appendChild(h3El);
        // add event listener to the button with the id of the rhyme to alert the id of the rhyme
        document
          .getElementById(rhymesArray[i])
      }
      modalListener()
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
      console.log(data.results)
      for (var i = 0; i < data.results.length; i++) {
        var definition = data.results[i].definition;
        var definitionEl = document.createElement('p')
        // document.getElementById("definitionMain").innerHTML = definition;
        definitionEl.innerHTML = definition + ';';
        console.log(definitionEl.innerHTML)
        document.getElementById("definitionMain").appendChild(definitionEl)
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("definitionMain").innerHTML =
        "No definition found for this word. Please try another word.";
    });
}

// variable to hold an array of the search history
var searchHistory = [];

// function to get the search history from local storage
function getSearchHistory() {
  console.log("getSearchHistory was called");
  try {
    var storedSearches = JSON.parse(localStorage.getItem('search-history'));
    if (storedSearches !== null) {
      searchHistory = storedSearches;
    } return;
  } catch (error) {
    console.log("No search history found");
  }
}
// function to save the search history to local storage
function setSearchHistory() {
  console.log("setSearchHistory was called");
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  return;
}

// function to save a word to the search history
function saveWord() {
  console.log("saveWord was called");
  var userWord = inputBox.value;
  if (userWord !== undefined || userWord !== '') {
    console.log(userWord)
    var userCount = 1;
    var storedWord = {};

    if (searchHistory.length === 0) {
      storedWord = { word: userWord, count: userCount }
      searchHistory.unshift(storedWord)
    } else {
      for (var i = 0; i < searchHistory.length; i++) {
        if (searchHistory[i].word === userWord) {
          userCount = searchHistory[i].count + 1
          console.log(userCount)
          storedWord = { word: userWord, count: userCount }
          searchHistory.splice(i, 1);
          searchHistory.unshift(storedWord)
          setSearchHistory();
          return;
        }
      }
      console.log(userCount)
      storedWord = { word: userWord, count: userCount }
      console.log(storedWord)
      searchHistory.unshift(storedWord)
      console.log(searchHistory)
      setSearchHistory();
    }
  }
}

// function to render the search history to the dropdown menu
// each word in the search history will be an h4 that will be added to a div with class of dropdown-item
// the div with class of dropdown-item will be added to the div with class of dropdown-menu
function renderSearchHistory() {
  console.log("renderSearchHistory was called");
  var dropDownItemEl = document.createElement("div");
  dropDownItemEl.classList.add("dropdown-item");
  var dropDownMenuEl = document.querySelector(".dropdown-menu");
  dropDownMenuEl.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var dropDownItemEl = document.createElement("div");
    dropDownItemEl.classList.add("dropdown-content-fix");
    var dropDownh4El = document.createElement("h4");
    dropDownh4El.classList.add("dropdown-item-fix");
    // dropDownh4El.setAttribute("type", "button");
    dropDownh4El.setAttribute("data-word", searchHistory[i].word);
    dropDownh4El.textContent = searchHistory[i].word;
    // only append the h4 to the div if the word is not undefined or null or empty
    if (searchHistory[i].word !== undefined || searchHistory[i].word !== null || searchHistory[i].word !== '') {

      dropDownItemEl.appendChild(dropDownh4El);
      dropDownMenuEl.appendChild(dropDownItemEl);
    }
    // event listener for the dropdown menu items that will put the word in the inputBox
    dropDownh4El.addEventListener("click", function (event) {
      event.preventDefault();
      var word = event.target.getAttribute("data-word");
      inputBox.value = word;
    }); // end of event listener
  }
}

// function to clear the search history
function clearSearchHistory() {
  console.log("clearSearchHistory was called");
  searchHistory = [];
  localStorage.removeItem('search-history');
  renderSearchHistory();
}
function submitSearch() {
  if (inputBox.value !== "") {
  var resultsContainer = document.getElementById("results-container");
  resultsContainer.classList.remove("hidden");
  document.getElementById("body").classList.remove("on-load");

  document.getElementById("synonym-column").innerHTML = "";
  document.getElementById("rhyme-column").innerHTML = "";
  document.getElementById("antonym-column").innerHTML = "";

  var synonymHeading = document.createElement("h2");
  var rhymeHeading = document.createElement("h2");
  var antonymHeading = document.createElement("h2");

  synonymHeading.textContent = "Synonyms";
  rhymeHeading.textContent = "Rhymes";
  antonymHeading.textContent = "Antonyms";

  synonymHeading.classList.add("column-heading");
  rhymeHeading.classList.add("column-heading");
  antonymHeading.classList.add("column-heading");

  document.getElementById("synonym-column").appendChild(synonymHeading);
  document.getElementById("rhyme-column").appendChild(rhymeHeading);
  document.getElementById("antonym-column").appendChild(antonymHeading);

  document.getElementById("wordInFocus").innerHTML = "";
  document.getElementById("mainWord").innerHTML = "";
  document.getElementById("mainPro").innerHTML = "";
  document.getElementById("mainSyl").innerHTML = "";
  document.getElementById("mainFreq").innerHTML = "";
  document.getElementById("definitionMain").innerHTML = "";
  // the word in the input box is stored in the variable word
  var word = inputBox.value;

  // saves the search history for each unique search
  saveWord();

  // the word is shown in the element named mainWord and wordInFocus
  mainWord.innerHTML = word;
  wordInFocus.innerHTML = word;

  // the urls are updated to include the word
  datamuseUrl0 = datamuseAPI0 + word;
  datamuseUrl1 = datamuseAPI1 + word;
  datamuseUrl3 = datamuseAPI3 + word;
  wordsUrl0 = wordsAPI + word;

  // the functions to get the synonyms, antonyms, rhymes and definition of the word are called
  getSynonyms();
  getAntonyms();
  getRhymes();
  getDefinition();
  getPronunciation();
  getSyllables();
  getFrequency();

  // the input box is cleared
  inputBox.value = "";

  document.getElementById("synonym-column").style.display = "block";
  document.getElementById("antonym-column").style.display = "block";
  document.getElementById("rhyme-column").style.display = "block";
  document.getElementById("definitionMain").style.display = "block";
} else {
document.getElementById("inputBox").placeholder = "Please enter a word"
}}

// the search button is clicked or form submitted
document.getElementById('submit-form').addEventListener("submit", function (event) {
  event.preventDefault()
submitSearch();

});

getSearchHistory();
renderSearchHistory();

document.getElementById('delete-button').addEventListener('click', function (event) {
  event.preventDefault()
  var resultsContainer = document.getElementById("results-container");
  resultsContainer.classList.add("hidden");
  document.getElementById("body").classList.add("on-load");

})