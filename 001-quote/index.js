const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnTwitter = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://enigmatic-sea-09985.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // If author is blank, add 'unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font-size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;

    removeLoadingSpinner();
  } catch (error) {
    if (error.message.includes('JSON.parse:')) {
      getQuote();
    } else {
      loader.hidden = true;
      quoteContainer.hidden = false;
      quoteContainer.innerHTML = `<h1>Access-Control-Allow-Origin denied <br> Reload the page</h1>`;
      console.log('whoops, no quote', error.message);
    }
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuoteBtn.addEventListener('click', () => {
  getQuote();
});

btnTwitter.addEventListener('click', () => {
  tweetQuote();
});

// On Load
getQuote();
