console.log('script.js loaded');

//fetch from datamuse api and return the results

var datamuseAPI = "https://api.datamuse.com/words?ml=";
var word = "happy";
var url = datamuseAPI + word;

        // write to id="wordInFocus"
        document.getElementById("wordInFocus").innerHTML = word;

fetch(url) //fetch the data
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log("Datamuse API response: ")
        console.log(json);


    })
    .catch(function(error) {
        console.log(error);
    })

// fetch from words api and return the results
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d56f060f5msh38af9a8aa84bc68p1b4603jsn2583833b279c',
		'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
	}
};

var wordsAPI = 'https://wordsapiv1.p.rapidapi.com/words/';
var word = 'happy';
var url = wordsAPI + word + '/synonyms';
console.log("words api response: ")
fetch(url, options)
	.then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log("Words api API response for synonyms: ")
        console.log(json);
    })
    .catch(function(error) {
        console.log(error);
    })