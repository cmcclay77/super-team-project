console.log('script.js loaded');

//fetch from datamuse api and return the results

var datamuseAPI0 = "https://api.datamuse.com/words?ml="; //meaning like  
var datamuseAPI1 = "https://api.datamuse.com/words?rel_rhy=";  //rhymes
var datamuseAPI2 = "https://api.datamuse.com/words?rel_jjb=";  //adjectives
var datamuseAPI3 = "https://api.datamuse.com/words?rel_ant=";  //antonyms
var datamuseAPI4 = "https://api.datamuse.com/words?rel_hom="; //homophones
var datamuseAPI5 = "https://api.datamuse.com/words?rel_syn="; //synonyms
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
var url0 = wordsAPI + word + '/pronunciation';
var url1 = wordsAPI + word + '/frequency';
var url2 = wordsAPI + word + '/syllables';
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