const audioElement = document.getElementById('audio');
const button = document.getElementById('btn');

// toggle button
function toggleBtn() {
  button.disabled = !button.disabled;
}

// Pass joke to voice API
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'f7aa4d3614614699932eac5ade18ea03',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

async function getJoke() {
  let joke = '';
  const apiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);

    // disable btn
    toggleBtn();
  } catch (err) {
    console.log('Failed to get joke', err);
  }
}

// EVENT LISTENERS
button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleBtn);
