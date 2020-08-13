const btn = document.getElementById('btn');
const videoElem = document.getElementById('video');

//Capture media, and display on video
async function startCapture() {
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia();
    videoElem.srcObject = captureStream;
    videoElem.onloadedmetadata = () => videoElem.play();
  } catch (err) {
    console.error('Error: ' + err);
  }
  return captureStream;
}

// Functio to set a time out on the display the pic in pic video
function requestPicinPic() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(videoElem.requestPictureInPicture());
    }, 1000);
  });
}

btn.addEventListener('click', async () => {
  // requet media
  startCapture();
  //Disable button
  btn.disabled = true;
  // start pic in pic
  await requestPicinPic();
  //Reset Button
  btn.disabled = false;
});
