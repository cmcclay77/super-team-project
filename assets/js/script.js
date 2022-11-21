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
        // change the innerHTML of modalContent to the innerHTML of the button
        document.getElementById("modalContent").innerHTML = $trigger.innerHTML;
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
      synonymContainer.setAttribute('class', 'box synonym-container')
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
      antonymContainer.setAttribute('class', 'box antonym-container')
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
      rhymeContainer.setAttribute('class', 'box rhyme-container')
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

// //function to get the homophones of the word
// function getHomophones() {
//   fetch(datamuseUrl2)
//     .then((response) => response.json())
//     .then((data) => {
//       var homophones = data;
//       var homophonesList = "";
//       for (var i = 0; i < homophones.length; i++) {
//         homophonesList += homophones[i].word + ", ";
//       }
//       console.log(homophonesList);

//       // create a variable to hold the array of 5 homophones and add the homophones to it
//       var homophonesArray = [];
//       try {
//         for (var i = 0; i < 5; i++) {
//           homophonesArray.push(homophones[i].word);
//           console.log(homophones[i].word);
//           console.log(homophonesArray);
//         }
//       } catch (error) {
//         console.log("No homophones found");
//         document.getElementById("homophones-column").innerHTML =
//           "Less than 5 homophones found";
//       }
//       // document.getElementById("homophones-column").innerHTML = homophonesArray;
//       // for each homophone in the array create a button and add it to the homophones column with the id of the homophone
//       for (var i = 0; i < homophonesArray.length; i++) {
//         var button = document.createElement("button");
//         button.innerHTML = homophonesArray[i];
//         button.id = homophonesArray[i];
//         button.className = "js-modal-trigger";
//         // add attribute data-target to the button with value of modal-js-example
//         button.setAttribute("data-target", "modal-js-example");
//         document.getElementById("homophones-column").appendChild(button);
//         // add event listener to the button with the id of the homophone to alert the id of the homophone
//         document
//           .getElementById(homophonesArray[i])
//           modalListener()
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

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

var searchHistory = [];

function getSearchHistory() {
  var storedSearches = JSON.parse(localStorage.getItem('search-history'));
  if (storedSearches !== null) {
    searchHistory = storedSearches;
  } return;
}

function setSearchHistory() {
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  return;
}

function saveWord() {
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
          searchHistory[i].count = userCount
          console.log(searchHistory[i].count)
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

// chart.js content  this is the code for the chart
//-----------------------------//
// note: if you want to change the size of the chart then you do that in the style.css file
const ctx = document.getElementById("myChart");

function renderChart() {
  var labelsWords = []
  var dataCount = []
  var bgColorsArray = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(255, 159, 64, 0.2)",
    "rgba(255, 205, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(201, 203, 207, 0.2)",
  ];
  var borderColorsArray = [
    "rgb(255, 99, 132)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
  ];

  if (searchHistory.length < 7) {
    for (var i = 0; i < searchHistory.length; i++) {
      labelsWords.push(searchHistory[i].word);
      dataCount.push(searchHistory[i].count);
    }
    bgColorsArray.length = labelsWords.length;
    borderColorsArray.length = labelsWords.length;
  } else {
    for (var i = 0; i < 7; i++) {
      labelsWords.push(searchHistory[i].word);
      dataCount.push(searchHistory[i].count);
    }
  }

  new Chart(ctx, {
    type: "bar",
    data: {
      // these are the labels for the chart
      labels: labelsWords,
      datasets: [
        {
          label: "Number of Times Searched",
          // this data array is where you will store the number of times a word is searched
          data: dataCount,

          // these colors are the background colors for the chart bars
          backgroundColor: bgColorsArray,

          borderColor: borderColorsArray,
          // these colors are the border colors for the chart bars
          // this is the width of the border on the chart
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


// the search button is clicked or form submitted
document.getElementById('submit-form').addEventListener("submit", function (event) {
  event.preventDefault()
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
  datamuseUrl2 = datamuseAPI2 + word;
  datamuseUrl3 = datamuseAPI3 + word;
  wordsUrl0 = wordsAPI + word;

  // the functions to get the synonyms, antonyms, rhymes, homophones and definition of the word are called
  getSynonyms();
  getAntonyms();
  getRhymes();
  // getHomophones();
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

getSearchHistory();
renderChart();