console.log("script.js successfully loaded");

var definitionMain = document.getElementById('definitionMain');
var mainPro = document.getElementById('mainPro');
var mainSyl = document.getElementById('mainSyl');
var mainFreq = document.getElementById('mainFreq');

// varibles showing the urls you will need for the datamuse api
var datamuseAPI0 = "https://api.datamuse.com/words?ml="; //meaning like

var datamuseAPI1 = "https://api.datamuse.com/words?rel_syn="; //synonyms
var datamuseAPI2 = "https://api.datamuse.com/words?rel_rhy="; //rhymes
var datamuseAPI3 = "https://api.datamuse.com/words?rel_hom="; //homophones
var datamuseAPI4 = "https://api.datamuse.com/words?rel_ant="; //antonyms
var datamuseAPI5 = "https://api.datamuse.com/words?rel_jjb="; //adjectives - this may be extra

// varible holding the word you want to search for
var word = "happy";
// varible showing you how to search for the word
var url = datamuseAPI1 + word;

var synonyms = [];
var synonymsData = [];

// write word to DOM in id="wordInFocus"
document.getElementById("wordInFocus").innerHTML = word;

//fetch from datamuse api and return the results

fetch(url) //fetch the data 
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    for (var i = 0; i < json.length; i++) {
      savedWord = json[i].word;
      synonyms.push(savedWord);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

url = datamuseAPI2 + word

var rhymes = [];

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

url = datamuseAPI3 + word

var homophones = [];

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

url = datamuseAPI4 + word

var antonyms = [];

fetch(url) //fetch the data
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);

    // for (var i = 0; i < json.length; i++) {
    //   savedWord = json[i].word;
    //   homophones.push(savedWord);
    // }
  })
  .catch(function (error) {
    console.log(error);
  });

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
fetch(url0, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    for (var i = 0; i < json.results.length; i++) {
      var newDefEl = document.createElement('p');
      newDefEl.textContent = json.results[i].definition + '.';
      definitionMain.appendChild(newDefEl);
    }
    mainPro.textContent = 'Pronunciation: ' + json.pronunciation.all;
    mainFreq.textContent = 'Frequency: ' + json.frequency;
    mainSyl.textContent = 'Syllable(s): - ';
    for (var i = 0; i < json.syllables.list.length; i++) {
      var newSylEl = document.createElement('span');
      newSylEl.textContent = json.syllables.list[i] + ' - ';
      mainSyl.appendChild(newSylEl);
    }
  })
  .catch(function (error) {
    console.log(error);
  });

var synColEl = document.getElementById('synonym-column');

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

function renderSynonyms() {
  for (var i = 0; i < 5; i++) {
    if (synonymsData[i].word !== undefined) {
      var synContEl = document.createElement('div');
      synContEl.setAttribute('class', 'box synonyms-container');
      synColEl.appendChild(synContEl);

      var singleSynContEl = document.createElement('div');
      singleSynContEl.setAttribute('class', 'content is-small');
      synContEl.appendChild(singleSynContEl);

      var synHeader = document.createElement('h1');
      synHeader.setAttribute('class', 'altSyn');
      synHeader.textContent = synonymsData[i].word;
      singleSynContEl.appendChild(synHeader);

      var definitionsCont = document.createElement('div');
      definitionsCont.setAttribute('class', 'definitions');
      singleSynContEl.appendChild(definitionsCont);

      for (var x = 0; x < synonymsData[i].results.length; x++) {
        var defEl = document.createElement('p');
        defEl.setAttribute('class', 'definitions');
        defEl.textContent = synonymsData[i].results[x].definition + '.';
        definitionsCont.appendChild(defEl);
      }

      var ulEl = document.createElement('ul');
      singleSynContEl.appendChild(ulEl);

      if (synonymsData[i].pronunciation.all !== undefined) {
        var proEl = document.createElement('li');
        proEl.textContent = 'Pronunciation: ' + synonymsData[i].pronunciation.all;
        ulEl.appendChild(proEl);
      }

      if (synonymsData[i].syllables !== undefined) {

        var sylContEl = document.createElement('li');
        sylContEl.textContent = 'Syllable(s): - ';
        ulEl.appendChild(sylContEl);

        for (var y = 0; y < synonymsData[i].syllables.list.length; y++) {
          var sylEl = document.createElement('span');
          sylEl.textContent = synonymsData[i].syllables.list[y] + ' - ';
          sylContEl.appendChild(sylEl);
        }
      }

      var freqEl = document.createElement('li');
      freqEl.textContent = 'Frequency: ' + synonymsData[i].frequency;
      ulEl.appendChild(freqEl);
    }
  }
}

//-----------------------------//
// chart.js content  this is the code for the chart
//-----------------------------//
// note: if you want to change the size of the chart then you do that in the style.css file
const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    // these are the labels for the chart
    labels: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"],
    datasets: [
      {
        label: "Frequency of words",
        // this data array is where you will store the frequency of the words
        data: [12, 19, 3, 5, 2, 3],

        // these colors are the background colors for the chart bars
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],

        // these colors are the border colors for the chart bars
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
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
