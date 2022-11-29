// variables for all the different elements that will be called upon
// the body element changes depending on whether the page is populated with search results or not
var body = document.getElementById("body");
// these elements are all a part of the search form
var inputBox = document.getElementById("input-box");
var searchButton = document.getElementById("search-button");
var submitForm = document.getElementById("submit-form");
var searchSection = document.getElementById("search-section");
var dropDownMenu4 = document.getElementById("dropdown-menu4"); 
// this is where the dropdown menu for previous searches are stored
var resultsContainer = document.getElementById("results-container");
var searchResultsContainer = document.getElementById("search-results");
// these are the three columns of the datamuse api that lists the alternative words
var synonymColumn = document.getElementById("synonym-column");
var rhymeColumn = document.getElementById("rhyme-column");
var antonymColumn = document.getElementById("antonym-column");
// these contain the actual words returned in the 3 results column
var synonymContainer = document.getElementById("synonym-container");
var rhymeContainer = document.getElementById("rhyme-container");
var antonymContainer = document.getElementById("antonym-container");
// the elements that will populate the data on the searched word
var mainWord = document.getElementById("main-word");
var mainPronunciationContainer = document.getElementById("main-pronunciation-container");
var mainPronunciationHover = document.getElementById("main-pronunciation-hover");
var mainFrequencyContainer = document.getElementById("main-frequency-container");
var mainSyllablesContainer = document.getElementById("main-syllables-container");
var mainDefinition = document.getElementById("definition-main");
var mainDefinitionsContainer = document.getElementById("main-definitions-container");
// blank variable to store the word from input box but to use in the global scope
var word;
// info to get wordsapi to deliver results
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2d56f060f5msh38af9a8aa84bc68p1b4603jsn2583833b279c",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};
// variable for words api url for searched word
var wordsAPI = "https://wordsapiv1.p.rapidapi.com/words/";
var wordsAPIUrl = wordsAPI + word;
// datamuse urls
const datamuseAPISyn = "https://api.datamuse.com/words?rel_syn="; //synonyms
const datamuseAPIRhy = "https://api.datamuse.com/words?rel_rhy="; //rhymes
const datamuseAPIAnt = "https://api.datamuse.com/words?rel_ant="; //antonyms
// search word urls for datamuse
var synonymURL = datamuseAPISyn + word;
var rhymeURL = datamuseAPIRhy + word;
var antonymURL = datamuseAPIAnt + word;
// empty arrays to be used in global scope later
var synonymList = [];
var rhymeList = [];
var antonymList = [];
var searchHistory = [];
// dropdown menu for search history
var dropDownMenuEl = document.querySelector(".dropdown-menu");
// modal variables for various elements used in the modal
var modalTitleTextEl = document.getElementById("modal-title-text");
var modalWord;
var modalPronunciationContainer = document.getElementById("modal-pronunciation-container");
var modalPronunciationHover = document.getElementById("modal-pronunciation-hover");
var modalSyllablesContainer = document.getElementById("modal-syllables-container");
var modalFrequencyContainer = document.getElementById("modal-frequency-container");
var modalDefinition = document.getElementById("definition-modal");
var modalDefinitionsContainer = document.getElementById("modal-definitions-container");
var modalDiv = document.getElementById("modal-js-example");
var modal = document.querySelector("modal");
var modalBackground = document.querySelector(".modal-background");
var modalClose1 = document.getElementById("modal-close-1");
var modalClose2 = document.getElementById("modal-close-2");
// function to search wordsapi to get the frequency for the searched word
function getFrequency() {
  // clear the frequency container
  mainFrequencyContainer.innerHTML = "";
  // fetch api and behavior if data or no data returned
  fetch(wordsAPIUrl, options)
    .then((response) => response.json())
    .then((data) => {
      // sift through data to return the values requested
      // if no frequency, then show message, otherwise, use the data found and show on screen
      var frequency = data.frequency;
      if (frequency === undefined) {
        mainFrequencyContainer.innerHTML = "No frequency found";
      } else {
        // underline 'Frequency' in main word container
        mainFrequencyContainer.innerHTML = "<u> <strong>Frequency:</strong></u> " + frequency;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("main-frequency-container").innerHTML = "No frequency found";
    });
}

// function to pull syllables from wordsapi, nearly identical to frequency but with syllables instead
function getSyllables() {
  mainSyllablesContainer.innerHTML = "";
  fetch(wordsAPIUrl, options) //fetching from wordsAPI
    .then((response) => response.json())
    .then((data) => {
      var syllables = data.syllables.count;
      if (syllables === undefined) {
        mainSyllablesContainer.innerHTML = "No syllables found";
      } else {
        mainSyllablesContainer.innerHTML = "<u> <strong>Syllables:</strong></u> " + syllables;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("main-syllables-container").innerHTML = "No syllables found";
    });
}

// function to search words api for definition and pronunciation of word
function getModalDefinition() {
  // enter the modal word into the input box, set up the fetch url, and then search through the data
  // for pronunciation and definitions, if no info, then show on screen, if data found, show on screen, for loop used for multpiple definitions
  // if no definition found, the user will get a subtle message inside the input box letting them know, the message disappears after 3 seconds

  modalWord = inputBox.value;
  wordsAPIUrl = wordsAPI + modalWord;
  fetch(wordsAPIUrl, options) // fetching from wordsAPI
    .then((response) => response.json())
    .then((data) => {
      if (data !== undefined) {
        modalTitleTextEl.textContent = modalWord[0].toUpperCase() + modalWord.slice(1).toLowerCase();
        // pronunciation search
        if (data.pronunciation !== undefined) {
          var modProEl = document.createElement("span");
          modProEl.textContent = " " + data.pronunciation.all;
          modProEl.classList.add("pronunciation-text");
          modalPronunciationContainer.appendChild(modProEl);
        } else {
          var modProEl = document.createElement("span");
          modProEl.textContent = "No pronunciation found";
          modProEl.classList.add("pronunciation-text");
          modalPronunciationContainer.appendChild(modProEl);
        }
        // definition search
        if (data.results !== undefined) {
          for (var i = 0; i < data.results.length; i++) {
            var modDefEl = document.createElement("p");
            modDefEl.textContent = i + 1 + ". " + data.results[i].definition + ";";
            modalDefinitionsContainer.appendChild(modDefEl);
          }
        } else {
          var modDefEl = document.createElement("p");
          modDefEl.textContent = "No pronunciation found";
          modalDefinitionsContainer.appendChild(modDefEl);
        }

      } else {
        inputBox.value = "";
        inputBox.setAttribute("placeholder", "no results found");
        setTimeout(function () {
          inputBox.setAttribute("placeholder", "type to search");
        }, 3000);
        console.log("No results found. Please try again.");
        return;
      }
    })
    .catch((err) => {
      console.error(err);
      inputBox.value = "";
      inputBox.setAttribute("placeholder", "no results found");
      setTimeout(function () {
        inputBox.setAttribute("placeholder", "type to search");
      }, 3000);
      return;
    });
}

// function to get the syllables to show in the modal, basically the same funciton as the getSyllables function
function getModalSyllables() {
  // enters word into input box and sets up url for words api
  modalWord = inputBox.value;
  wordsAPIUrl = wordsAPI + modalWord;
  // fetch api to serach for syllables, very similar to the getMainSyllables function
  fetch(wordsAPIUrl, options)

    .then((response) => response.json())
    .then((data) => {
      var syllables = data.syllables.count;
      var modSylEl = document.createElement("p");
      modSylEl.textContent = syllables;
      modSylEl.classList.add("syllables-text");
      modalSyllablesContainer.appendChild(modSylEl);
      if (syllables === undefined) {
        document.getElementById("modal-syllables-container").innerHTML = "No syllables found";
      } else {
        document.getElementById("modal-syllables-container").innerHTML = " <strong>Syllables:</strong> " + syllables;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("modal-syllables-container").innerHTML = "No syllables found";
    });
}

// function to get freqnecy to show in the modal, basically the same funciton as the getFrequency function
function getModalFrequency() {

  modalWord = inputBox.value;
  wordsAPIUrl = wordsAPI + modalWord;
  fetch(wordsAPIUrl, options) // fetching from wordsAPI
    .then((response) => response.json())
    .then((data) => {
      var frequency = data.frequency;
      var modFreqEl = document.createElement("p");
      modFreqEl.textContent = frequency;
      modFreqEl.classList.add("frequency-text");
      modalFrequencyContainer.appendChild(modFreqEl);

      if (frequency === undefined) {
        document.getElementById("modal-frequency-container").innerHTML = "No frequency found";
      } else {
        // underline 'Frequency' in main word container
        document.getElementById("modal-frequency-container").innerHTML = " <strong>Frequency:</strong> " + frequency;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("modal-frequency-container").innerHTML = "No frequency found";
    });
}

// function to set up the pulldown menu of the most recent searches
function renderSearchHistory() {
  // clear list, before repopulating

  dropDownMenuEl.innerHTML = "";
  // only populate list if the length isn't 0
  if (searchHistory.length !== 0) {
    // iterate through all values in array
    for (var i = 0; i < searchHistory.length; i++) {
      // create elements, add classes, set text, and append elements to search history button
      var dropDownContentEl = document.createElement("div");
      dropDownContentEl.classList.add("dropdown-item");
      dropDownContentEl.classList.add("dropdown-content-fix");
      var dropDownItemEl = document.createElement("h4");
      dropDownItemEl.classList.add("dropdown-item-fix");
      dropDownItemEl.setAttribute("data-word", searchHistory[i]);
      dropDownItemEl.textContent = searchHistory[i];
      dropDownMenuEl.appendChild(dropDownContentEl);
      dropDownContentEl.appendChild(dropDownItemEl);
      searchHistory[i]; //??
    }
  }
}

// retrieve the search history from local storage and save as array
function getSearchHistory() {

  try {
    var storedSearches = JSON.parse(localStorage.getItem("search-history"));
    if (storedSearches !== null) {
      searchHistory = storedSearches;
    } return;
  } catch (error) {
    console.log("No search history found");
  }
}

// after search history array is updated, function called to save to local storage
function setSearchHistory() {

  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  renderSearchHistory();
  return;
}

// save word to array, before saving to local storage
function saveWord() {
  // capitalize first letter and clear all inputbox
  var userWord = inputBox.value[0].toUpperCase() + inputBox.value.slice(1).toLowerCase();

  inputBox.value = "";
  // the word is determined to be a word when this function is called, but this is a double check to make sure word contains letters
  if (userWord !== undefined || userWord !== "") {
    // checks to see if word is in array, if so, it is removed from array and placed at the beginning, otherwise, it is placed in beginning
    if (searchHistory.indexOf(userWord) > -1) {
      searchHistory.splice(searchHistory.indexOf(userWord), 1);
      searchHistory.unshift(userWord);
    } else {
      searchHistory.unshift(userWord);
    }
    setSearchHistory();
  }
  if (searchHistory.length > 100) {
    searchHistory.length = 100;
  }
}

// these next 3 functions are nearly identical
// get antonyms from datamuse
function getAntonyms() {
  // clears container of previous results and saves the input text, then set up the url for datamuse, then save word
  antonymContainer.innerHTML = "";
  word = inputBox.value;
  antonymURL = datamuseAPIAnt + word;
  // fetch api
  fetch(antonymURL)

    .then((response) => response.json())
    .then((data) => {
      // if there is data, clear the previous list
      if (data.length !== 0) {
        antonymList = [];
        // for loop to create elements, assign attributes, set text, and append to parent element
        for (var i = 0; i < data.length; i++) {
          antonymList.push(data[i].word);
          var newAntEl = document.createElement("p");
          newAntEl.textContent = data[i].word;
          newAntEl.setAttribute("id", data[i].word);
          newAntEl.classList.add("js-modal-trigger");
          newAntEl.setAttribute("data-target", "modal-js-example");
          antonymContainer.appendChild(newAntEl);
        }
        // otherwise say there are no results
      } else {
        var newAntEl = document.createElement("p");
        newAntEl.textContent = "No results found. Please try again.";
        antonymContainer.appendChild(newAntEl);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  saveWord();
}

// nearly identical to get antonyms function
function getRhymes() {

  rhymeContainer.innerHTML = "";
  word = inputBox.value;
  rhymeURL = datamuseAPIRhy + word;
  fetch(rhymeURL) // fetching rhymes from datamuseAPI
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) {
        rhymeList = [];
        for (var i = 0; i < data.length; i++) {
          rhymeList.push(data[i].word);
          var newRhyEl = document.createElement("p");
          newRhyEl.textContent = data[i].word;
          newRhyEl.setAttribute("id", data[i].word);
          newRhyEl.classList.add("js-modal-trigger");
          newRhyEl.setAttribute("data-target", "modal-js-example");
          rhymeContainer.appendChild(newRhyEl);
        }
      } else {
        var newRhyEl = document.createElement("p");
        newRhyEl.textContent = "No results found. Please try again.";
        rhymeContainer.appendChild(newRhyEl);
      }
      getAntonyms();
    })
    .catch((err) => {
      console.error(err);
    });
}

// nearly identical to antonyms and rhymes functions
function getSynonyms() {

  synonymContainer.innerHTML = "";
  word = inputBox.value;
  synonymURL = datamuseAPISyn + word;
  fetch(synonymURL) // fetching synonym from datamuseAPI
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) {
        synonymList = [];
        for (var i = 0; i < data.length; i++) {
          synonymList.push(data[i].word);
          var newSynEl = document.createElement("p");
          newSynEl.textContent = data[i].word;
          newSynEl.setAttribute("id", data[i].word);
          newSynEl.classList.add("js-modal-trigger");
          newSynEl.setAttribute("data-target", "modal-js-example");
          synonymContainer.appendChild(newSynEl);
        }
      } else {
        var newSynEl = document.createElement("p");
        newSynEl.textContent = "No results found. Please try again.";
        synonymContainer.appendChild(newSynEl);
      }
      getRhymes();
    })
    .catch((err) => {
      console.error(err);
    });
}

// function to get the definition of the search word, and pronunciation, also, stops other functions from running if word doesn't have a definition
function getMainDefinition() {
  // saves input box value as word, set up fetch url, and perform fetch

  word = inputBox.value;
  wordsAPIUrl = wordsAPI + word;
  fetch(wordsAPIUrl, options) // fetches from wordsAPI
    .then((response) => response.json())
    .then((data) => {
      // if data, search through it for relevant info
      if (data.results !== undefined) {
        // clear out previous data
        resultsContainer.classList.remove("hidden");
        // shows results containers for new data
        body.classList.remove("on-load");
        // capitalize first letter
        mainWord.textContent = inputBox.value[0].toUpperCase() + inputBox.value.slice(1).toLowerCase();
        // clear contents of pronunciations and definitions
        mainPronunciationContainer.innerText = "";
        mainDefinitionsContainer.innerHTML = "";
        // create element to store pronunciation, set text, add class, and append to parent
        var newProEl = document.createElement("span");
        newProEl.textContent = " " + data.pronunciation.all;
        newProEl.classList.add("pronunciation-text");
        mainPronunciationContainer.appendChild(newProEl);
        // for loop to create element, set text to definition, and append to parent, could have many definitions
        for (var i = 0; i < data.results.length; i++) {
          var newDefEl = document.createElement("p");
          newDefEl.textContent = i + 1 + ". " + data.results[i].definition + ";";
          mainDefinitionsContainer.appendChild(newDefEl);
        }
        // changes class so search bar can fit better on a fully populated screen
        searchSection.classList.add("noblank-screen");
        searchSection.classList.remove("blank-screen");
        dropDownMenu4.classList.add('dropdown-length2');
        dropDownMenu4.classList.remove('dropdown-length1');
        // run other functions to get more data
        getSynonyms();
        getFrequency();
        getSyllables();
      } else {
        // otherwise change placeholder text to show no results for 3 seconds
        inputBox.value = "";
        inputBox.setAttribute("placeholder", "no results found");
        setTimeout(function () {
          inputBox.setAttribute("placeholder", "type to search");
        }, 3000);
        // console logs no results and puts focus back on input box
        console.log("No results found. Please try again.");
        inputBox.focus();
        return;
      }
    })
    // behavior is bad results
    .catch((err) => {
      console.error(err);
      inputBox.value = "";
      inputBox.setAttribute("placeholder", "no results found");
      setTimeout(function () {
        inputBox.setAttribute("placeholder", "type to search");
      }, 3000);
      return;
    });
}
// function to run get main definition function,
function submitSearch() {
  getMainDefinition();
}

// event listener for form submission or clicking on search button
submitForm.addEventListener("submit", function (event) {

  event.preventDefault();
  submitSearch();
});
// event listener for delete button next to searched word to clear all contents from the screen
document.getElementById("delete-button").addEventListener("click", function (event) {
    event.preventDefault();
    inputBox.setAttribute("placeholder", "type to search");
    resultsContainer.classList.add("hidden");
    body.classList.add("on-load");
    searchSection.classList.add("blank-screen");
    searchSection.classList.remove("noblank-screen");
    dropDownMenu4.classList.add('dropdown-length1');
    dropDownMenu4.classList.remove('dropdown-length2');
  });
// event listener for dropdown menu click to put clicked word in input box and search
dropDownMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  var dataWord = event.target.getAttribute("data-word");
  inputBox.value = dataWord;
  resultsContainer.classList.remove("hidden");
  body.classList.remove("on-load");
  submitSearch();
});
// event listeners for all words in 3 results columns to be clicked and populate modal
searchResultsContainer.addEventListener("click", function (event) {
  event.preventDefault();
  modalPronunciationContainer.innerHTML = "";
  modalDefinitionsContainer.innerHTML = "";
  modalSyllablesContainer.innerHTML = "";
  modalFrequencyContainer.innerHTML = "";
  if (event.target.getAttribute("class") === "js-modal-trigger") {
    modalDiv.classList.add("is-active");
    var targetWord = event.target.getAttribute("id");
    inputBox.value = targetWord;
    getModalDefinition();
    getModalFrequency();
    getModalSyllables();
  }
});
// event listener for closing modal by clicking x or background and clears modal content
document.addEventListener("click", function (event) {
  if (
    event.target === modalBackground ||
    event.target === modalClose1 ||
    event.target === modalClose2
  ) {
    modalDiv.classList.remove("is-active");
    modalPronunciationContainer.innerHTML = "";
    modalSyllablesContainer.innerHTML = "";
    modalFrequencyContainer.innerHTML = "";
    modalDefinitionsContainer.innerHTML = "";
  }
});
// event listener to clicking on modal word to begin new search
modalTitleTextEl.addEventListener("click", function (event) {
  inputBox.value = modalTitleTextEl.textContent;
  modalDiv.classList.remove("is-active");
  getMainDefinition();
});
// event listner to hear pronunciation for word
mainPronunciationHover.addEventListener("click", function (event) {
  var textToSpeech = new SpeechSynthesisUtterance();
  textToSpeech.text = word;
  window.speechSynthesis.speak(textToSpeech);
});
// event listener to hear pronunciation for word in modal
modalPronunciationHover.addEventListener("click", function (event) {
  var modTextToSpeech = new SpeechSynthesisUtterance();
  modTextToSpeech.text = modalWord;
  window.speechSynthesis.speak(modTextToSpeech);
});

getSearchHistory();
renderSearchHistory();
