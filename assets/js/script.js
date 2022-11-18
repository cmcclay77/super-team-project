console.log("script.js successfully loaded");

var definitionMain = document.getElementById('definitionMain');
var mainPro = document.getElementById('mainPro');
var mainSyl = document.getElementById('mainSyl');
var mainFreq = document.getElementById('mainFreq');

var synCont = document.getElementById('synonyms-container');
var listCont = document.createElement('ul');
var singleSynContEl = document.createElement('div');


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
var url = datamuseAPI0 + word;

// write word to DOM in id="wordInFocus"
document.getElementById("wordInFocus").innerHTML = word;

//fetch from datamuse api and return the results

function fetchSyn() {

fetch(url) //fetch the data
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log("Datamuse API response: ");
    console.log(json);
    for ( var i = 0; i < 5; i++) {
      word = json[i].word;

      
      singleSynContEl.setAttribute('class', 'content is-small');
      synCont.appendChild(singleSynContEl);

      var altSynEl = document.createElement('h1');
      altSynEl.setAttribute('class', 'altSyn');
      altSynEl.textContent = word;
      singleSynContEl.appendChild(altSynEl);

      renderSynonyms();
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
// varibles showing the urls you will need for the words  api
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
      newDefEl.textContent = json.results[i].definition;
      definitionMain.appendChild(newDefEl);
    }
    mainPro.textContent = json.pronunciation.all;
    mainFreq.textContent = json.frequency;
    mainSyl.textContent = '- ';
    for (var i = 0; i < json.syllables.list.length; i++) {
      var newSylEl = document.createElement('span');
      newSylEl.textContent = json.syllables.list[i] + ' - ';
      mainSyl.appendChild(newSylEl);

      fetchSyn();
    }
  })
  .catch(function (error) {
    console.log(error);
  });

  function renderSynonyms() {
    
  fetch(url0, options)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    
    var proEl = document.createElement('li');
    proEl.textContent = json.pronunciation.all;
    listCont.appendChild('proEl');

    var sylEl = document.createElement('li');
    sylEl.textContent = '- ';

    for (var i = 0; i < json.syllables.list.length; i++) {
      var newSylEl = document.createElement('span');
      newSylEl.textContent = json.syllables.list[i] + ' - ';
      sylEl.appendChild(newSylEl);
    }

    var freqEl = document.createElement('li');
    freqEl.textContent = json.frequency;
    listCont.appendChild('freqEl');


  })
  .catch(function (error) {
    console.log(error);
  });
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
