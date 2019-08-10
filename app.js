// ====================== INTRO SCREEN ========================

// global variable to have instructions hide on page load

$(document).ready(function () {
    $("#instructions").hide();
})

// onclick function for when the user clicks the image

$("#akey").on("click", function () {

    // hide the intro text div
    $("#introtext").hide();


    // display instructions div
    $("#instructions").show();

})

// onclick function for when the user clicks the down arrow


$("#downkey").click(function () {
    $("html, body").animate({ scrollTop: $(document).height() }, 1600);
    return false;
});



// ====================== END OF INTRO SCREEN ========================

// ========= Method to call on the AOS library for card animation=======================

AOS.init({
    duration: 3000,
    delay: 1000,
});

// ========= End of Method to call on the AOS library for card animation=======================

//this variable will hold the output of the faceAPI call 
//this will be a list of key/value pairs related to emotions and % of emotion detected 
var highestEmotion = "";
//object containing the arrays of pokemon and associated emoitons
var pokemonEmotions = {
    anger: [3, 14, 15, 18, 20, 24, 28, 29, 33, 34, 55, 56, 57, 62, 64, 65, 76, 83, 85, 100, 105, 106, 107, 115, 117, 123, 125, 127, 130, 145],
    contempt: [2, 5, 6, 7, 8, 9, 17, 38, 45, 53, 58, 59, 67, 73, 91, 96, 97, 99, 102, 126, 128, 131, 133, 134, 135, 146, 150],
    disgust: [12, 16, 68, 74, 78, 88, 89, 95, 108, 109, 110],
    happiness: [1, 4, 25, 26, 35, 36, 39, 40, 43, 61, 66, 87, 103, 113, 122, 149],
    neutral: [10, 13, 46, 49, 50, 51, 71, 77, 79, 81, 82, 84, 98, 111, 116, 120, 121, 129, 132, 137, 138, 140, 141, 143, 147, 148],
    sadness: [11, 30, 44, 60, 63, 104],
    surprise: [21, 23, 31, 37, 46, 54, 69, 70, 80, 86, 90, 112, 118, 136, 144]
}
//want to display the top 5 pokemon that poeople are getting
//this object will hold the count for each pokemon that get generated 
//try creating an object equal to the pokemon and then giving that k/v equal to the count and the link to the sprite 
let pokeTotals = {};
//add object {name:v,link:v}
let pokeTotalsArray = [];


//Poke Array Object 
// var pokemonEmotions = {
//     anger: [3, 14, 15, 18, 20, 24, 28, 29, 33, 34, 55, 56, 57, 62, 64, 65, 76, 83, 85, 100, 105, 106, 107, 115, 117, 123, 125, 127, 130, 145],
//     contempt: [2, 5, 6, 7, 8, 9, 17, 38, 45, 53, 58, 59, 67, 73, 91, 96, 97, 99, 102, 126, 128, 131, 133, 134, 135, 146, 150],
//     disgust: [12, 16, 68, 74, 78, 88, 89, 95, 108, 109, 110],
//     happy: [1, 4, 25, 26, 35, 36, 39, 40, 43, 61, 66, 87, 103, 113, 122, 149],
//     neutral: [10, 13, 46, 49, 50, 51, 71, 77, 79, 81, 82, 84, 98, 111, 116, 120, 121, 129, 132, 137, 138, 140, 141, 143, 147, 148],
//     sad: [11, 30, 44, 60, 63, 104],
//     surprise: [21, 23, 31, 37, 46, 54, 69, 70, 80, 86, 90, 112, 118, 136, 144]
// }

// console.log(pokemonEmotions[highestEmotion]);

//This function is essentially what runs when the user hits their submit button to upload their image

//Initialize function when user clicks the submit button
$("#submitButton").on("click", function () {
    //Defining count variable to iterate through ajax calls while avoiding use of for loop (due to asynchronous-ness)
    var count = 1;

    //IGNORE, OLD CODE
    // //Create empty array to store ajax call results, end result should be an array of all pokemon called + details
    // var pokemonAvailable = []

    //Angry Poke
    var angryPoke = [3, 14, 15, 18, 20, 24, 28, 29, 33, 34, 55, 56, 57, 62, 64, 65, 76, 83, 85, 100, 105, 106, 107, 115, 117, 123, 125, 127, 130, 145];
    var angryPokeDeets = [];

    //Contempt Poke
    var contemptPoke = [2, 5, 6, 7, 8, 9, 17, 38, 45, 53, 58, 59, 67, 73, 91, 96, 97, 99, 102, 126, 128, 131, 133, 134, 135, 146, 150]
    var contemptPokeDeets = []

    //Disgust Poke
    var disgustPoke = [12, 16, 68, 74, 78, 88, 89, 95, 108, 109, 110]
    var disgustPokeDeets = []

    //Fear Poke
    var fearPoke = [19, 22, 27, 32, 41, 42, 48, 52, 71, 75, 92, 93, 94, 101, 114, 119, 124, 139, 142]
    var fearPokeDeets = []

    //Happiness Poke
    var happyPoke = [1, 4, 25, 26, 35, 36, 39, 40, 43, 61, 66, 87, 103, 113, 122, 149]
    var happyPokeDeets = []

    //Neutral Poke
    var neutralPoke = [10, 13, 46, 49, 50, 51, 71, 77, 79, 81, 82, 84, 98, 111, 116, 120, 121, 129, 132, 137, 138, 140, 141, 143, 147, 148]
    var neutralPokeDeets = []

    //Sad Poke
    var sadPoke = [11, 30, 44, 60, 63, 104]
    var sadPokeDeets = []

    //Surprise Poke
    var surprisePoke = [21, 23, 31, 37, 46, 54, 69, 70, 80, 86, 90, 112, 118, 136, 144]
    var surprisePokeDeets = []

    //STEPS TO FETCH POKE
    //1. Run Poke API to loop thru each poke
    //2. For each poke, look at the stats + type of poke
    //3. Based on stats + type of poke (plus whatever other arbitrary stats), push poke into one of 8 poke arrays
    //4. After poke array is fully dealt with, then we run face api
    //a. take user image, and get data from that when 'upload' button is hit. Determine which emotion class the face falls into
    //5. When 'Submit' button is hit, link face emotion type w/ pokemon array of same emotion, return random poke from that array + stats


    //Function w/ ajax call to pull data on however many pokemon
    function fetchPokemon() {

        // Here we construct our URL, and pick our pokemon by its 'id number' (pokedex number). In this case, we limit our results to the first 150 pokemon (OG) -- 50 for testing purposes
        var queryURL1 = "https://pokeapi.co/api/v2/pokemon/" + count + "/"


        // Write code to hit the queryURL with $ajax, 'GET' our returned results, and then take the response data
        // and console log the specific elements we are returning
        $.ajax({
            url: queryURL1,
            method: 'GET'
        })
            // .then() => is a method from the Promise library that promises to execute a callback function. The callback => is going to capture the data that comes back from our AJAX call
            .then(function (response1) {

                // console.log("response1", response1)
                // console.log("POKEMON ID NUMBER", response1.id)

                if (angryPoke.includes(response1.id)) {
                    angryPokeDeets.push(response1)
                }
                else if (contemptPoke.includes(response1.id)) {
                    contemptPokeDeets.push(response1)
                }
                else if (disgustPoke.includes(response1.id)) {
                    disgustPokeDeets.push(response1)
                }
                else if (fearPoke.includes(response1.id)) {
                    fearPokeDeets.push(response1)
                }
                else if (happyPoke.includes(response1.id)) {
                    happyPokeDeets.push(response1)
                }
                else if (neutralPoke.includes(response1.id)) {
                    neutralPokeDeets.push(response1)
                }
                else if (sadPoke.includes(response1.id)) {
                    sadPokeDeets.push(response1)
                }
                else if (surprisePoke.includes(response1.id)) {
                    surprisePokeDeets.push(response1)
                }

                // console.log("ARRAY OF ANGRY POKES", angryPokeDeets);
                // console.log("ARRAY OF CONTEMPT POKES", contemptPokeDeets);
                // console.log("ARRAY OF DISGUST POKES", disgustPokeDeets);
                // console.log("ARRAY OF FEAR POKES", fearPokeDeets);
                // console.log("ARRAY OF HAPPPY POKES", happyPokeDeets);
                // console.log("ARRAY OF NEUTRAL POKES", neutralPokeDeets);
                // console.log("ARRAY OF SAD POKES", sadPokeDeets);
                // console.log("ARRAY OF SURPRISE POKES", surprisePokeDeets);

                // OLD CODE ////////////////////////////////////
                // //For each ajax call run, push the resulting details to our array outside of ajax

                // pokemonAvailable.push(response1)

                // //Testing console logs + information we want to use in face comparison
                // // console.log(response1.name)
                // // console.log(response1.stats)
                // // console.log(response1.height)
                // // console.log(response1.weight)
                // // console.log(response1.sprites.front_default)
                // console.log(pokemonAvailable)
                //OLD CODE END ////////////////////////////////////

                //Loop through number of pokemon that we want to have in our sample (bypasses for loop so that each call is fully executed before next one is run)
                if (count < 50) {
                    count = count + 1;
                    // console.log('GRAND TOTAL:', count);
                    fetchPokemon();
                }
            })

        //CODE to GRAB RANDOM POKE FROM SELECTED ARRAY AND PUSH TO IMAGE
        // var randomPoke = Math.floor(Math.random()*50)
        // var randomPokeName = pokemonAvailable[randomPoke].name
        // var randomPokeImg = pokemonAvailable[randomPoke].sprites.front_default
        // console.log("Random Poke Name", randomPokeName )
        // console.log("Random Poke Image", randomPokeImg)
        // // return(randomPokeName, randomPokeImg)

        // $("#pokeImage").html("<img src='"+randomPokeImg+"'>")
    }

    fetchPokemon();
});


/*=============================================
=User image upload (POST) and faceAPI call (POST)=
=============================================*/
$(document).ready(function () {
    //Cloudinary is the image hosting service
    //variable that holds the link provided by the site and uses the 'upload' method
    //cloudinary upload API url 
    var CLOUNDINARY_URL = 'https://api.cloudinary.com/v1_1/da35qrt1i/upload';
    //unique id link to our cloudinary account 
    var CLOUNDINARY_UPLOAD_PRESET = 'zqc6zawb';
    //Executes after the user has chosen a file to open 
    //detects "change"

    $("#user-image").change(function (e) {

        //variable that stores the file the user uploaded
        var uploadFile = e.target.files[0];
        //formData provides a way to easily construct a set of key/value pairs representing form fields and their values
        var formData = new FormData();
        //appends a new key/value pair representing the file to upload to the cloud
        formData.append('file', uploadFile);
        //appends a new key/value pair repretenting the unique id link to our cloudinary account 
        formData.append('upload_preset', CLOUNDINARY_UPLOAD_PRESET);
        // Promise based HTTP client for the browser and node.js
        //similar to ajax
        //asynchronous POST which reurns a promise
        //this method is used to upload the user image to the cloud and return the link to the image
        axios({
            url: CLOUNDINARY_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'applications/x-www-form-urlencoded'
            },
            data: formData
        })
            //a method from the Promise library that promises to execute a callback function. The callback => is going to capture the data that comes back from our AJAX call
            .then(function (res) {

                //variable that stores the url leading to the user image that was uploaded to the cloud 
                uploadedImgLink = res.data.url;
                //this variable holds the Face API url
                faceURL = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion&recognitionModel=recognition_01&detectionModel=detection_01"

                //this method is used to POST to the the Face API 
                //this will use the FaceAPI to analyze the user image after it has been uploaded to the cloud 
                axios({
                    url: faceURL,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Ocp-Apim-Subscription-Key': '42bfc0fb6f98403fa3df091c5f1a4b15'
                    },
                    data: {
                        'url': uploadedImgLink
                    }
                })
                    //will caputue the promise returned by the POST
                    .then(function (res2) {
                        //variable that stores the faceAttributes object spit out from the FaceAPI POST call
                        //example: "faceAttributes": { "emotion": { "anger": 0.0, "contempt": 0.0, "disgust": 0.0, "fear": 0.015, "happiness": 0.219, "neutral": 0.0, "sadness": 0.0, "surprise": 0.766 } }
                        let faceEmotions = res2.data[0].faceAttributes.emotion;
                        //this will turn the faceEmoitons object in to an array of the key value pairs (array = [key,value])
                        let emotionValues = Object.entries(faceEmotions);
                        //temp store the value of the highest emotion value (0 to 1) for the loop below
                        var count = 0;
                        //iterate through each k,v pair and find the highest value; assign the string descriptor for the highest value to a variable 
                        for (let i = 0; i < emotionValues.length - 1; i++) {
                            //if the value of the emotion is greater than the next highest
                            if (emotionValues[i][1] > count) {
                                //assign that value as the highest 
                                count = emotionValues[i][1];
                                //assign the string descriptor for the highest value to a variable
                                highestEmotion = emotionValues[i][0];
                            }
                        }
                        console.log(highestEmotion);

                        //this variable will hold the array related to the pokemon with the assocted with the highest valued emotion
                        var choosenArray = pokemonEmotions[highestEmotion];


                        //generate a random number based on the length of the pokeArray related to the highest valued emotion
                        var randomNumber = Math.floor(Math.random() * choosenArray.length);


                        //should be a random number from the array 
                        var choosenPokemon = choosenArray[randomNumber];


                        var queryURL1 = "https://pokeapi.co/api/v2/pokemon/" + choosenPokemon + "/"
                        //async call to the pokemonAPI
                        //should return just one pokemon 
                        //store relevaent imformation with future variables 
                        $.ajax({
                            url: queryURL1,
                            method: 'GET'
                        }).then(function (res3) {
                            console.log(res3.name);


                            let isThere = false;
                            //iterate through the pokeTotals array 
                            //check to see if the pokemon is in the array and add to the count if so and cset isThere to true so that a duplicate is not added after the loop ends 
                            for (let i = 0; i < pokeTotalsArray.length - 1; i++) {
                                if (isThere === false) {
                                    if (pokeTotalsArray[i].name === res3.name) {
                                        isThere = true;
                                        pokeTotalsArray[i].count = pokeTotalsArray[i].count+1;
                                    }
                                }
                            }
                            //creates a new pokemon object to keep count and grab the link to the sprite 
                            if (isThere === false) {
                                let countedPokemon = {
                                    name: res3.name,
                                    link: res3.sprites.front_default,
                                    count: 1
                                }
                                pokeTotalsArray.push(countedPokemon);
                            }

                            console.log(pokeTotalsArray);




                            //set the meta tag which represents the image when shared to facebook
                            $("#facebook-img").attr("content", res3.sprites.front_default);
                            $("#twitter-link").attr("data-url", res3.sprites.front_default);

                        }).catch(function (err3) {
                            console.error(err3);
                        })
                    })
                    //returns a Promise and deals with rejected cases 
                    .catch(function (err2) {
                        console.error(err2);
                    })
            })
            .catch(function (err) {
                console.error(err);
            });

    });
});

