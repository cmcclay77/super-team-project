var body = document.getElementById("body");

var inputBox = document.getElementById('input-box');
var searchButton = document.getElementById('search-button');
var submitForm = document.getElementById('submit-form');

var resultsContainer = document.getElementById("results-container");
var searchResultsContainer = document.getElementById("search-results");

var synonymColumn = document.getElementById('synonym-column');
var rhymeColumn = document.getElementById('rhyme-column');
var antoonymColumn = document.getElementById('antonym-column');

var synonymContainer = document.getElementById('synonym-container');
var rhymeContainer = document.getElementById('rhyme-container');
var antonymContainer = document.getElementById('antonym-container');

var mainWord = document.getElementById('main-word');
var mainPronunciationContainer = document.getElementById('main-pronunciation-container');
var mainDefinition = document.getElementById('definition-main');
var mainDefinitionsContainer = document.getElementById('main-definitions-container');

var word;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2d56f060f5msh38af9a8aa84bc68p1b4603jsn2583833b279c",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};

var wordsAPI = "https://wordsapiv1.p.rapidapi.com/words/";
var wordsAPIUrl = wordsAPI + word;

const freeDictionaryAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en/'; //dictionary
const datamuseAPISyn = 'https://api.datamuse.com/words?rel_syn='; //synonyms
const datamuseAPIRhy = 'https://api.datamuse.com/words?rel_rhy='; //rhymes
const datamuseAPIAnt = 'https://api.datamuse.com/words?rel_ant='; //antonyms

var dictionaryURL = freeDictionaryAPI + word;
var synonymURL = datamuseAPISyn + word;
var rhymeURL = datamuseAPIRhy + word;
var antonymURL = datamuseAPIAnt + word;

var synonymList = [];
var rhymeList = [];
var antonymList = [];
var searchHistory = [];

var dropDownMenuEl = document.querySelector(".dropdown-menu");

var modalTitleTextEl = document.getElementById('modal-title-text');
var modalWord;
var modalPronunciationContainer = document.getElementById('modal-pronunciation-container');
var modalSyllablesContainer = document.getElementById('modal-syllables-container');
var modalFrequencyContainer = document.getElementById('modal-frequency-container');

var modalDefinition = document.getElementById('definition-modal');
var modalDefinitionsContainer = document.getElementById('modal-definitions-container');
var modalDiv = document.getElementById('modal-js-example');
var modal = document.querySelector('modal');
var modalBackground = document.querySelector('.modal-background');
var modalClose1 = document.getElementById('modal-close-1');
var modalClose2 = document.getElementById('modal-close-2');

function getFrequency() {
  fetch(wordsAPIUrl, options)
    .then((response) => response.json())
    .then((data) => {
      var frequency = data.frequency;
      if (frequency === undefined) {
        document.getElementById("main-frequency-container").innerHTML = "No frequency found";
      } else {
        // underline 'Frequency' in main word container
        document.getElementById("main-frequency-container").innerHTML = '<u> <strong>Frequency:</strong></u> ' + frequency;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("main-frequency-container").innerHTML = "No frequency found";
    });
}

function getSyllables() {
  fetch(wordsAPIUrl, options)
    .then((response) => response.json())
    .then((data) => {
      var syllables = data.syllables.count;
      if (syllables === undefined) {
        document.getElementById("main-syllables-container").innerHTML = "No syllables found";
      } else {
      document.getElementById("main-syllables-container").innerHTML = '<u> <strong>Syllables:</strong></u> ' + syllables;
    }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("main-syllables-container").innerHTML = "No syllables found";
    });
}

function getModalDefinition() {
  modalWord = inputBox.value;
  dictionaryURL = freeDictionaryAPI + modalWord;
  fetch(dictionaryURL, options)
    .then((response) => response.json())
    .then((data) => {
      if (data !== undefined) {
        if (data.length !== undefined) {
          modalTitleTextEl.textContent = modalWord[0].toUpperCase() + modalWord.slice(1).toLowerCase();
          var modProEl = document.createElement('p');
          modProEl.textContent = data[0].phonetic;
          modProEl.classList.add('pronunciation-text')
          modalPronunciationContainer.appendChild(modProEl);
          for (var i = 0; i < data.length; i++) {
            for (var x = 0; x < data[i].meanings.length; x++) {
              for (var y = 0; y < data[i].meanings[x].definitions.length; y++) {
                var modDefEl = document.createElement('p');
                modDefEl.textContent = data[i].meanings[x].definitions[y].definition + ';'
                modalDefinitionsContainer.appendChild(modDefEl);
              }
            }
          }
        } else {
          inputBox.value = '';
          inputBox.setAttribute('placeholder', 'no results found');
          setTimeout(function () {
            inputBox.setAttribute('placeholder', 'type to search');
          }, 3000);
          return;
        }
      } else {
        console.log('No results found. Please try again.')
        return;
      }
    })
    .catch((err) => {
      console.error(err);
      inputBox.setAttribute('placeholder', 'no results found')
    });
}

function getModalSyllables() {
  modalWord = inputBox.value;
  wordsAPIUrl = wordsAPI + modalWord;
  fetch(wordsAPIUrl, options)
    .then((response) => response.json())
    .then((data) => {
      var syllables = data.syllables.count;
      var modSylEl = document.createElement('p');
      modSylEl.textContent = syllables;
      modSylEl.classList.add('syllables-text')
      modalSyllablesContainer.appendChild(modSylEl);
      if (syllables === undefined) {
        document.getElementById("modal-syllables-container").innerHTML = "No syllables found";
      } else {
      document.getElementById("modal-syllables-container").innerHTML = ' <strong>Syllables:</strong> ' + syllables;
    }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("modal-syllables-container").innerHTML = "No syllables found";
    });
}

function getModalFrequency() {
  modalWord = inputBox.value;
  wordsAPIUrl = wordsAPI + modalWord;
  fetch(wordsAPIUrl, options)
    .then((response) => response.json())
    .then((data) => {
      var frequency = data.frequency;
      var modFreqEl = document.createElement('p');
      modFreqEl.textContent = frequency;
      modFreqEl.classList.add('frequency-text')
      modalFrequencyContainer.appendChild(modFreqEl);

      if (frequency === undefined) {
        document.getElementById("modal-frequency-container").innerHTML = "No frequency found";
      } else {
        // underline 'Frequency' in main word container
        document.getElementById("modal-frequency-container").innerHTML = ' <strong>Frequency:</strong> ' + frequency;
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("modal-frequency-container").innerHTML = "No frequency found";
    });
}


function renderSearchHistory() {
  dropDownMenuEl.innerHTML = "";
  if (searchHistory.length !== 0) {
    for (var i = 0; i < searchHistory.length; i++) {
      var dropDownContentEl = document.createElement("div");
      dropDownContentEl.classList.add("dropdown-item");
      dropDownContentEl.classList.add("dropdown-content-fix");
      var dropDownItemEl = document.createElement("h4");
      dropDownItemEl.classList.add("dropdown-item-fix");
      dropDownItemEl.setAttribute("data-word", searchHistory[i]);
      dropDownItemEl.textContent = searchHistory[i];
      dropDownMenuEl.appendChild(dropDownContentEl);
      dropDownContentEl.appendChild(dropDownItemEl);
      searchHistory[i]
    }
  };
}

function getSearchHistory() {
  try {
    var storedSearches = JSON.parse(localStorage.getItem('search-history'));
    if (storedSearches !== null) {
      searchHistory = storedSearches;
    } return;
  } catch (error) {
    console.log("No search history found");
  }
}

function setSearchHistory() {
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  renderSearchHistory();
  return;
}

function saveWord() {
  var userWord = inputBox.value[0].toUpperCase() + inputBox.value.slice(1).toLowerCase();
  inputBox.value = '';
  if (userWord !== undefined || userWord !== '') {
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

function getAntonyms() {
  antonymContainer.innerHTML = '';
  word = inputBox.value;
  antonymURL = datamuseAPIAnt + word;
  fetch(antonymURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) {
        antonymList = []
        for (var i = 0; i < data.length; i++) {
          antonymList.push(data[i].word);
          var newAntEl = document.createElement('p');
          newAntEl.textContent = data[i].word;
          newAntEl.setAttribute('id', data[i].word)
          newAntEl.classList.add('js-modal-trigger');
          newAntEl.setAttribute('data-target', 'modal-js-example');
          antonymContainer.appendChild(newAntEl);
        }
      } else {
        var newAntEl = document.createElement('p');
        newAntEl.textContent = 'No results found. Please try again.';
        antonymContainer.appendChild(newAntEl);
      }
    })
    .catch((err) => {
      console.error(err);
    });
  saveWord();
}

function getRhymes() {
  rhymeContainer.innerHTML = '';
  word = inputBox.value;
  rhymeURL = datamuseAPIRhy + word;
  fetch(rhymeURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) {
        rhymeList = []
        for (var i = 0; i < data.length; i++) {
          rhymeList.push(data[i].word);
          var newRhyEl = document.createElement('p');
          newRhyEl.textContent = data[i].word;
          newRhyEl.setAttribute('id', data[i].word);
          newRhyEl.classList.add('js-modal-trigger');
          newRhyEl.setAttribute('data-target', 'modal-js-example');
          rhymeContainer.appendChild(newRhyEl);
        }
      } else {
        var newRhyEl = document.createElement('p');
        newRhyEl.textContent = 'No results found. Please try again.';
        rhymeContainer.appendChild(newRhyEl);
      }
      getAntonyms();
    })
    .catch((err) => {
      console.error(err);
    });
}

function getSynonyms() {
  synonymContainer.innerHTML = '';
  word = inputBox.value;
  synonymURL = datamuseAPISyn + word;
  fetch(synonymURL)
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0) {
        synonymList = []
        for (var i = 0; i < data.length; i++) {
          synonymList.push(data[i].word);
          var newSynEl = document.createElement('p');
          newSynEl.textContent = data[i].word;
          newSynEl.setAttribute('id', data[i].word)
          newSynEl.classList.add('js-modal-trigger');
          newSynEl.setAttribute('data-target', 'modal-js-example');
          synonymContainer.appendChild(newSynEl);
        }
      } else {
        var newSynEl = document.createElement('p');
        newSynEl.textContent = 'No results found. Please try again.';
        synonymContainer.appendChild(newSynEl);
      }
      getRhymes();
    })
    .catch((err) => {
      console.error(err);
    });
}

function getMainDefinition() {
  word = inputBox.value;
  dictionaryURL = freeDictionaryAPI + word;
  fetch(dictionaryURL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data !== undefined) {
        if (data.length !== undefined) {
          resultsContainer.classList.remove("hidden");
          body.classList.remove('on-load');
          mainWord.textContent = inputBox.value[0].toUpperCase() + inputBox.value.slice(1).toLowerCase();
          mainPronunciationContainer.innerText = '';
          mainDefinitionsContainer.innerHTML = '';
          var newProEl = document.createElement('p');
          newProEl.textContent = data[0].phonetic;
          newProEl.classList.add('pronunciation-text')
          // var newToolTipText = document.createElement('span');
          // newToolTipText.textContent('Click to hear pronunciation')
          // newToolTipText.classList.add('tooltip-text')
          mainPronunciationContainer.appendChild(newProEl);

          for (var i = 0; i < data.length; i++) {
            for (var x = 0; x < data[i].meanings.length; x++) {
              for (var y = 0; y < data[i].meanings[x].definitions.length; y++) {
                var newDefEl = document.createElement('p');
                newDefEl.textContent = data[i].meanings[x].definitions[y].definition + ';'
                mainDefinitionsContainer.appendChild(newDefEl);
              }
            }
          }
          getSynonyms();
        } else {
          inputBox.value = '';
          inputBox.setAttribute('placeholder', 'no results found');
          setTimeout(function () {
            inputBox.setAttribute('placeholder', 'type to search');
          }, 3000);
          return;
        }
      } else {
        console.log('No results found. Please try again.')
        return;
      }
    })
    .catch((err) => {
      console.error(err);
      inputBox.setAttribute('placeholder', 'no results found')
    });
}

function submitSearch() {
  getMainDefinition();
  getFrequency();
  getSyllables();

}

submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  submitSearch();
},);

document.getElementById('delete-button').addEventListener('click', function (event) {
  event.preventDefault()
  inputBox.setAttribute('placeholder', 'type to search')
  resultsContainer.classList.add("hidden");
  body.classList.add("on-load");
})

dropDownMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  var dataWord = event.target.getAttribute("data-word");
  inputBox.value = dataWord;
  resultsContainer.classList.remove("hidden");
  body.classList.remove('on-load');
  submitSearch();
});

searchResultsContainer.addEventListener("click", function (event) {
  event.preventDefault();
  modalPronunciationContainer.innerHTML = '';
  modalDefinitionsContainer.innerHTML = '';
  modalSyllablesContainer.innerHTML = '';
  modalFrequencyContainer.innerHTML = '';
  if (event.target.getAttribute('class') === 'js-modal-trigger') {
    modalDiv.classList.add('is-active');
    var targetWord = event.target.getAttribute("id");
    inputBox.value = targetWord;
    getModalDefinition();
    getModalFrequency();
    getModalSyllables();

  }
});

document.addEventListener('click', function (event) {
  if (event.target === modalBackground || event.target === modalClose1 || event.target === modalClose2) {
    modalDiv.classList.remove('is-active');
    modalPronunciationContainer.innerHTML = '';
    modalSyllablesContainer.innerHTML = '';
    modalFrequencyContainer.innerHTML = '';
    modalDefinitionsContainer.innerHTML = '';
  }
})

modalTitleTextEl.addEventListener('click', function (event) {
  inputBox.value = modalTitleTextEl.textContent;
  modalDiv.classList.remove('is-active');
  getMainDefinition();
})

mainPronunciationContainer.addEventListener('click', function (event) {
  var textToSpeech = new SpeechSynthesisUtterance();
  textToSpeech.text = word;
  window.speechSynthesis.speak(textToSpeech)
})

modalPronunciationContainer.addEventListener('click', function (event) {
  var modTextToSpeech = new SpeechSynthesisUtterance();
  modTextToSpeech.text = modalWord;
  window.speechSynthesis.speak(modTextToSpeech)
})

getSearchHistory();
renderSearchHistory();

