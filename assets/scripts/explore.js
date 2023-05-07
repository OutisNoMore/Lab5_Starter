// explore.js

const synth = window.speechSynthesis;
window.addEventListener('DOMContentLoaded', init);

function init() {
  const selectVoice = document.getElementById("voice-select");
  const text = document.getElementById("text-to-speak");
  const button = document.querySelector("button");
  const image = document.querySelector("img");

  populateVoices(selectVoice); // For firefox compatability
  synth.addEventListener("voiceschanged", () => { populateVoices(selectVoice) }); // To fix delay between loading voices

  // Start talking using speech synthesis
  button.addEventListener("click", () => {
    if (text.value != "") {
      const talk = new SpeechSynthesisUtterance(text.value);
      const voice = selectVoice.selectedOptions[0].getAttribute("data-name");
      for (let i = 0; i < voices.length; i++) {
        if (voices[i].name == voice) {
          talk.voice = voices[i];
        }
      }
      image.src = "assets/images/smiling-open.png";
      synth.speak(talk);

      talk.addEventListener("end", (event) => {
        image.src = "assets/images/smiling.png";
      });
    }
  });
}

// Get and load all available voices 
// Taken from: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event
function populateVoices(selectVoice) {
  const voices = synth.getVoices();
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    if (voices[i].default) {
      option.textContent += "DEFAULT";
    }
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    selectVoice.appendChild(option);
  }
}
