import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));// to access the style file in the public folder
app.use(bodyParser.urlencoded({ extended: true}));//to handle the input we will get from the user

//to render the ejs file/homepage
app.get("/", async (req, res) => {// Handle GET request to the homepage
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any");// Make an API call to JokeAPI to get a random joke
        const result = response.data;// Extract the data from the API response
        res.render("index", {data: result});// Render the "index" view and pass the joke data to it
    } catch (error) { // If there's an error making the API request, log it and send an error message to the view
        console.error("Failed to make request", error.message);
        res.render("index.ejs", {
            error: error.message,// Pass the error message to the view
        });
    }
});

// Handle POST request to fetch a joke based on user input
app.post("/joke", async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');//Make an API call to JokeAPI to get a random "single" type joke
        let joke = response.data.joke;// Extract the joke from the response data
        joke = joke.replace(/Chuck Norris/g, '${firstName} ${lastNName}');//to replace generic names

        res.render('joke', { joke });// Render the 'joke' view and pass the modified joke to it
    } catch (error) {
        res.send('Something went wrong fetching the joke.');//to catch error
    }
});

//to listen for the port
app.listen(port, () => {
    console.log("Server running on port: " + port);
});