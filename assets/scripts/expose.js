// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const volumeRange = document.getElementById("volume"); 
  const volumeImage = document.querySelector("div#volume-controls img");
  const selectHorn  = document.getElementById("horn-select");
  const playAudio   = document.querySelector("button");
  const hornImage   = document.querySelector("img:not([alt='Volume level 2'])");
  const audio       = document.getElementsByClassName("hidden")[0];

  const jsConfetti = new JSConfetti();

  volumeRange.addEventListener("input", () => {
    if (volumeRange.value >= 67) {
      volumeImage.src = `assets/icons/volume-level-3.svg`;
    }
    else if (volumeRange.value >= 33) {
      volumeImage.src = `assets/icons/volume-level-2.svg`;
    }
    else if (volumeRange.value >= 1) {
      volumeImage.src = `assets/icons/volume-level-1.svg`;
    }
    else {
      volumeImage.src = `assets/icons/volume-level-0.svg`;
    }
    audio.volume = volumeRange.value/100;
  });

  selectHorn.addEventListener("change", () => {
    hornImage.src = `assets/images/${selectHorn.value}.svg`;
    audio.src = `assets/audio/${selectHorn.value}.mp3`;
    hornImage.alt = selectHorn.value;
  });

  playAudio.addEventListener("click", () => {
    if (audio.src.includes("horn")) {
      audio.play();
      if (audio.src.includes("party-horn")) {
        jsConfetti.addConfetti();
      }
    }
  });

}
