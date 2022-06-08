const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];


function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true
}

function removeLoadingSpinner(){
    quoteContainer.hidden = false;
    loader.hidden=true
}


// Show new quote
function newQuote(){
    showLoadingSpinner();
// Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// Chech id author field is blank and replace it with "unkown"
    if(quote.author !== null){
        authorText.textContent = quote.author;
    }else{
        authorText.textContent = "Unknown";
    }

// Check quote size to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
// Hide loador set quote
    removeLoadingSpinner ();
    quoteText.textContent = quote.text;
    
}

// Get quotes from API
async function getQuotesFromAPI(){
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        newQuote();
    }catch(error){
    //Catch Error Here
    }
}
// Event listener

newQuoteBtn.addEventListener('click', newQuote);

// On Load
getQuotesFromAPI()
