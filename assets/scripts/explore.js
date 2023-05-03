// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const selectVoice = document.getElementById("voice-select");
  const text = document.getElementById("text-to-speak");
  const button = document.querySelector("button");
  const image = document.querySelector("img");

  let voices = synth.getVoices();
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
