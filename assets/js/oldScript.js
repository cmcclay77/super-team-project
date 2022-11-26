console.log("script.js successfully loaded");

var userInput = document.getElementById("inputBox");
var searchBtn = document.getElementById("searchButton");

var definitionMain = document.getElementById("definitionMain");
var mainPro = document.getElementById("mainPro");
var mainSyl = document.getElementById("mainSyl");
var mainFreq = document.getElementById("mainFreq");

// varibles showing the urls you will need for the datamuse api
var datamuseAPI0 = "https://api.datamuse.com/words?rel_syn="; //synonyms
var datamuseAPI1 = "https://api.datamuse.com/words?rel_rhy="; //rhymes
var datamuseAPI2 = "https://api.datamuse.com/words?rel_hom="; //homophones
var datamuseAPI3 = "https://api.datamuse.com/words?rel_ant="; //antonyms

// varible holding the word you want to search for
var word = "";

// varible showing you how to search for the word
var url = datamuseAPI0 + word;

// write word to DOM in id="wordInFocus"
document.getElementById("wordInFocus").innerHTML = word;

var synonyms = [];
var rhymes = [];
var homophones = [];
var antonyms = [];
var synonymsData = [];
var rhymesData = [];
var homophonesData = [];
var antonymsData = [];

//fetch from datamuse api and return the results
function searchCats() {
  fetch(url) //fetch the data
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      for (var i = 0; i < json.length; i++) {
        savedWord = json[i].word;
        if (savedWord !== undefined) {
          synonyms.push(savedWord);
        }
      }
      getSynonymsData();
      console.log(synonymsData);

      renderSynonyms();
    })
    .catch(function (error) {
      console.log(error);
    });

  url = datamuseAPI1 + word;
  fetch(url) //fetch the data
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      for (var i = 0; i < json.length; i++) {
        savedWord = json[i].word;
        rhymes.push(savedWord);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  url = datamuseAPI2 + word;
  fetch(url) //fetch the data
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      for (var i = 0; i < json.length; i++) {
        savedWord = json[i].word;
        homophones.push(savedWord);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  url = datamuseAPI3 + word;
  fetch(url) //fetch the data
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      for (var i = 0; i < json.length; i++) {
        savedWord = json[i].word;
        antonyms.push(savedWord);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2d56f060f5msh38af9a8aa84bc68p1b4603jsn2583833b279c",
    "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
  },
};
// varibles showing the urls you will need for the words api
var wordsAPI = "https://wordsapiv1.p.rapidapi.com/words/";

var url0 = wordsAPI + word;

// fetch from words api and return the results
function searchWord() {
  fetch(url0, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      for (var i = 0; i < json.results.length; i++) {
        var newDefEl = document.createElement("p");
        newDefEl.textContent = json.results[i].definition + ".";
        definitionMain.appendChild(newDefEl);
      }
      mainPro.textContent = "Pronunciation: " + json.pronunciation.all;
      mainFreq.textContent = "Frequency: " + json.frequency;
      mainSyl.textContent = "Syllable(s): - ";
      for (var i = 0; i < json.syllables.list.length; i++) {
        var newSylEl = document.createElement("span");
        newSylEl.textContent = json.syllables.list[i] + " - ";
        mainSyl.appendChild(newSylEl);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

var synColEl = document.getElementById("synonym-column");
var rhymesColEl = document.getElementById("rhymes-column");
var hpColEl = document.getElementById("homophones-column");
var antColEl = document.getElementById("antonym-column");

function getSynonymsData() {
  for (var i = 0; i < synonyms.length; i++) {
    word = synonyms[i];
    url0 = wordsAPI + word;
    fetch(url0, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        synonymsData.push(json);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function getRhymesData() {
  for (var i = 0; i < rhymes.length; i++) {
    word = rhymes[i];
    url0 = wordsAPI + word;
    fetch(url0, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        rhymesData.push(json);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function getHomophonesData() {
  for (var i = 0; i < homophones.length; i++) {
    word = homophones[i];
    url0 = wordsAPI + word;
    fetch(url0, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        homophonesData.push(json);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function getAntonymsData() {
  for (var i = 0; i < antonyms.length; i++) {
    word = antonyms[i];
    url0 = wordsAPI + word;
    fetch(url0, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        antonymsData.push(json);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

function getData() {
  getSynonymsData();
  getRhymesData();
  getHomophonesData();
  getAntonymsData();
}

function renderSynonyms() {
  console.log(synonymsData);

  for (var i = 0; i < 5; i++) {
    if (synonymsData[i].word !== undefined) {
      var synContEl = document.createElement("div");
      synContEl.setAttribute("class", "box synonyms-container");
      synColEl.appendChild(synContEl);

      var singleSynContEl = document.createElement("div");
      singleSynContEl.setAttribute("class", "content is-small");
      synContEl.appendChild(singleSynContEl);

      var synHeader = document.createElement("h1");
      synHeader.setAttribute("class", "altSyn");
      synHeader.textContent = synonymsData[i].word;
      singleSynContEl.appendChild(synHeader);

      var definitionsCont = document.createElement("div");
      definitionsCont.setAttribute("class", "definitions");
      singleSynContEl.appendChild(definitionsCont);

      if (synonymsData[i].results !== undefined) {
        for (var x = 0; x < synonymsData[i].results.length; x++) {
          var defEl = document.createElement("p");
          defEl.setAttribute("class", "definitions");
          defEl.textContent = synonymsData[i].results[x].definition + ".";
          definitionsCont.appendChild(defEl);
        }
      }

      var ulEl = document.createElement("ul");
      singleSynContEl.appendChild(ulEl);

      if (synonymsData[i].pronunciation.all !== undefined) {
        var proEl = document.createElement("li");
        proEl.textContent =
          "Pronunciation: " + synonymsData[i].pronunciation.all;
        ulEl.appendChild(proEl);
      }

      if (synonymsData[i].syllables !== undefined) {
        var sylContEl = document.createElement("li");
        sylContEl.textContent = "Syllable(s): - ";
        ulEl.appendChild(sylContEl);

        for (var y = 0; y < synonymsData[i].syllables.list.length; y++) {
          var sylEl = document.createElement("span");
          sylEl.textContent = synonymsData[i].syllables.list[y] + " - ";
          sylContEl.appendChild(sylEl);
        }
      }

      var freqEl = document.createElement("li");
      freqEl.textContent = "Frequency: " + synonymsData[i].frequency;
      ulEl.appendChild(freqEl);
    }
  }
}

function renderRhymes() {
  for (var i = 0; i < 5; i++) {
    if (rhymesData[i].word !== undefined) {
      var rhymesContEl = document.createElement("div");
      rhymesContEl.setAttribute("class", "box rhymes-container");
      rhymesColEl.appendChild(rhymesContEl);

      var singleRhymesContEl = document.createElement("div");
      singleRhymesContEl.setAttribute("class", "content is-small");
      rhymesContEl.appendChild(singleRhymesContEl);

      var rhymesHeader = document.createElement("h1");
      rhymesHeader.setAttribute("class", "altRhym");
      rhymesHeader.textContent = rhymesData[i].word;
      singleRhymesContEl.appendChild(rhymesHeader);

      var definitionsCont = document.createElement("div");
      definitionsCont.setAttribute("class", "definitions");
      singleRhymesContEl.appendChild(definitionsCont);

      if (rhymesData[i].results !== undefined) {
        for (var x = 0; x < rhymesData[i].results.length; x++) {
          var defEl = document.createElement("p");
          defEl.setAttribute("class", "definitions");
          defEl.textContent = rhymesData[i].results[x].definition + ".";
          definitionsCont.appendChild(defEl);
        }
      }

      var ulEl = document.createElement("ul");
      singleRhymesContEl.appendChild(ulEl);

      if (rhymesData[i].pronunciation !== undefined) {
        var proEl = document.createElement("li");
        proEl.textContent = "Pronunciation: " + rhymesData[i].pronunciation.all;
        ulEl.appendChild(proEl);
      }

      if (rhymesData[i].syllables !== undefined) {
        var sylContEl = document.createElement("li");
        sylContEl.textContent = "Syllable(s): - ";
        ulEl.appendChild(sylContEl);

        for (var y = 0; y < rhymesData[i].syllables.list.length; y++) {
          var sylEl = document.createElement("span");
          sylEl.textContent = rhymesData[i].syllables.list[y] + " - ";
          sylContEl.appendChild(sylEl);
        }
      }

      var freqEl = document.createElement("li");
      freqEl.textContent = "Frequency: " + rhymesData[i].frequency;
      ulEl.appendChild(freqEl);
    }
  }
}

function renderHomophones() {
  for (var i = 0; i < 5; i++) {
    if (homophonesData[i] !== undefined) {
      var hpContEl = document.createElement("div");
      hpContEl.setAttribute("class", "box homophones-container");
      hpColEl.appendChild(hpContEl);

      var singleHpContEl = document.createElement("div");
      singleHpContEl.setAttribute("class", "content is-small");
      HpContEl.appendChild(singleHpContEl);

      var hpHeader = document.createElement("h1");
      hpHeader.setAttribute("class", "altSound");
      hpHeader.textContent = homophonesData[i].word;
      singleHpContEl.appendChild(hpHeader);

      var definitionsCont = document.createElement("div");
      definitionsCont.setAttribute("class", "definitions");
      singleHpContEl.appendChild(definitionsCont);

      for (var x = 0; x < homophonesData[i].results.length; x++) {
        var defEl = document.createElement("p");
        defEl.setAttribute("class", "definitions");
        defEl.textContent = homophonesData[i].results[x].definition + ".";
        definitionsCont.appendChild(defEl);
      }

      var ulEl = document.createElement("ul");
      hpSynContEl.appendChild(ulEl);

      if (homophonesData[i].pronunciation.all !== undefined) {
        var proEl = document.createElement("li");
        proEl.textContent =
          "Pronunciation: " + homophonesData[i].pronunciation.all;
        ulEl.appendChild(proEl);
      }

      if (homophonesData[i].syllables !== undefined) {
        var sylContEl = document.createElement("li");
        sylContEl.textContent = "Syllable(s): - ";
        ulEl.appendChild(sylContEl);

        for (var y = 0; y < homophonesData[i].syllables.list.length; y++) {
          var sylEl = document.createElement("span");
          sylEl.textContent = homophonesData[i].syllables.list[y] + " - ";
          sylContEl.appendChild(sylEl);
        }
      }

      var freqEl = document.createElement("li");
      freqEl.textContent = "Frequency: " + homophonesData[i].frequency;
      ulEl.appendChild(freqEl);
    }
  }
}

function renderAntonyms() {
  for (var i = 0; i < 5; i++) {
    if (antonymsData[i] !== undefined) {
      var antContEl = document.createElement("div");
      antContEl.setAttribute("class", "box antonyms-container");
      antColEl.appendChild(antContEl);

      var singleAntContEl = document.createElement("div");
      singleAntContEl.setAttribute("class", "content is-small");
      antContEl.appendChild(singleAntContEl);

      var antHeader = document.createElement("h1");
      antHeader.setAttribute("class", "altAnt");
      antHeader.textContent = antonymsData[i].word;
      singleAntContEl.appendChild(antHeader);

      var definitionsCont = document.createElement("div");
      definitionsCont.setAttribute("class", "definitions");
      singleAntContEl.appendChild(definitionsCont);

      for (var x = 0; x < antonymsData[i].results.length; x++) {
        var defEl = document.createElement("p");
        defEl.setAttribute("class", "definitions");
        defEl.textContent = antonymsData[i].results[x].definition + ".";
        definitionsCont.appendChild(defEl);
      }

      var ulEl = document.createElement("ul");
      singleAntContEl.appendChild(ulEl);

      if (antonymsData[i].pronunciation.all !== undefined) {
        var proEl = document.createElement("li");
        proEl.textContent =
          "Pronunciation: " + antonymsData[i].pronunciation.all;
        ulEl.appendChild(proEl);
      }

      if (antonymsData[i].syllables !== undefined) {
        var sylContEl = document.createElement("li");
        sylContEl.textContent = "Syllable(s): - ";
        ulEl.appendChild(sylContEl);

        for (var y = 0; y < antonymsData[i].syllables.list.length; y++) {
          var sylEl = document.createElement("span");
          sylEl.textContent = antonymsData[i].syllables.list[y] + " - ";
          sylContEl.appendChild(sylEl);
        }
      }

      var freqEl = document.createElement("li");
      freqEl.textContent = "Frequency: " + antonymsData[i].frequency;
      ulEl.appendChild(freqEl);
    }
  }
}

function renderLists() {
  renderSynonyms();
  renderRhymes();
  renderHomophones();
  renderAntonyms();
}

//-----------------------------//
// chart.js content  this is the code for the chart
//-----------------------------//
// note: if you want to change the size of the chart then you do that in the style.css file
const ctx = document.getElementById("myChart");

function renderChart() {
  new Chart(ctx, {
    type: "bar",
    data: {
      // these are the labels for the chart
      labels: [
        synonymsData[0].word,
        synonymsData[1].word,
        synonymsData[2].word,
        synonymsData[3].word,
        synonymsData[4].word,
      ],
      datasets: [
        {
          label: "Frequency of words",
          // this data array is where you will store the frequency of the words
          data: [
            synonymsData[0].frequency,
            synonymsData[1].frequency,
            synonymsData[2].frequency,
            synonymsData[3].frequency,
            synonymsData[4].frequency,
          ],

          // these colors are the background colors for the chart bars
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],

          // these colors are the border colors for the chart bars
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
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

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  word = userInput.value;
  url0 = wordsAPI + word;

  searchWord();
  url = datamuseAPI0 + word;

  searchCats();
});
