function toggleSidebar() {
  const sidebar = document.querySelector(".VocabVault-dictSidebar");

  const button = document.querySelector(".VocabVault-sideIcon");

  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-600px";
    button.style.transform = "rotate(360deg)";
  } else {
    sidebar.style.right = "0px";
    button.style.transform = "rotate(0deg)";
  }
}

function removeSidebar() {
  const sidebar = document.querySelector(".VocabVault-dictSidebar");

  const button = document.querySelector(".VocabVault-sideIcon");

  if (sidebar.style.right === "0px") {
    sidebar.style.right = "-600px";

    button.style.transform = "rotate(360deg)";
  }
}

function showSlidebar() {
  const sidebar = document.querySelector(".VocabVault-dictSidebar");

  const button = document.querySelector(".VocabVault-sideIcon");

  if (sidebar.style.right === "-600px") {
    sidebar.style.right = "0px";

    button.style.transform = "rotate(0deg)";
  }
}


function performSearch() {
  const inputword = document.getElementById("wordInput");
  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + inputword.value)
    .then((response) => response.json())
    .then((data) => {
      inputword.value = "";
      if (data.title) {
        inputword.placeholder = "ERROR 404 not found";
        inputword.style.backgroundColor = "rgb(255 0 0 / 50%)";
        inputword.style.boxShadow = "rgb(255 0 0 / 73%) 0px 14px 40px 5px";
        // background-color: rgb(255 0 0 / 50%);
        // box-shadow: rgb(255 0 0 / 73%) 0px 14px 40px 5px;
      } else {
        updatesidebarcontent(data);
      }
    });
}

function updatesidebarcontent(data) {
  const inputword = document.getElementById("wordInput");
  inputword.value = "";
  inputword.placeholder = "Search";
  inputword.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
  inputword.style.boxShadow =
    "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px";
  var wordPhoneticsText = "";
  var wordPhoneticsAudio = "";
  var information = new Map();

  if (data.length > 0) {
    data.forEach((item) => {
      const wordPhonetics = item.phonetics;
      if (wordPhonetics.length > 0) {
        wordPhonetics.forEach((element) => {
          if (element.audio && wordPhoneticsAudio == "") {
            wordPhoneticsAudio = element.audio;
          }
          if (element.text && wordPhoneticsText == "") {
            wordPhoneticsText = element.text;
          }
        });
      }
      const wordMeaning = item.meanings;
      wordMeaning.forEach((meaning) => {
        const partsOfSpeech = meaning.partOfSpeech;
        if (!information.has(partsOfSpeech)) {
          information.set(partsOfSpeech, []);
        }
        const definitions = meaning.definitions;
        definitions.forEach((def) => {
          if (def.definition) {
            information.get(partsOfSpeech).push(def.definition);
            if (def.example) information.get(partsOfSpeech).push(def.example);
            else information.get(partsOfSpeech).push("404");
          }
        });
      });
    });
  }
  document
    .querySelectorAll(".VocabVault-search-word")
    .forEach(function (wordElement) {
      wordElement.innerHTML = data[0].word;
    });
  document
    .querySelectorAll(".VocabVault-phonetics-text")
    .forEach(function (phoneticsElement) {
      phoneticsElement.innerHTML = wordPhoneticsText;
    });

  document
    .querySelectorAll(".VocabVault-audiourl")
    .forEach(function (audioElement) {
      audioElement.innerHTML = wordPhoneticsAudio;
    });
  var sidebarElements = document.getElementsByClassName("VocabVault-body");
  const pos = document.getElementsByClassName("VocabVault-partsofspeech");
  var l = pos.length;
  for (let i = 0; i < l; i = i + 1) {
    sidebarElements[0].removeChild(pos[0]);
  }
  information.forEach((value, key) => {
    const poscontent = document.createElement("div");
    poscontent.classList.add("VocabVault-partsofspeech");
    const postitle = document.createElement("h3");
    postitle.classList.add("VocabVault-pos-title");
    postitle.innerHTML = key;
    poscontent.appendChild(postitle);
    var i = 0;
    value.forEach(function (info) {
      if (info !== "404") {
        const inf = document.createElement("div");
        inf.innerHTML = i % 2 == 0 ? "Definition" : "Example";
        inf.classList.add("VocabVault-pos-def-title");
        const cont = document.createElement("div");
        cont.innerHTML = info;
        cont.classList.add("VocabVault-pos-def-text");
        poscontent.appendChild(inf);
        poscontent.appendChild(cont);
      }
      i++;
    });
    sidebarElements[0].appendChild(poscontent);
  });
}

function showerrorpopup() {
  imgsrc = chrome.runtime.getURL("error.png");

  const popup = document.createElement("div");
  popup.classList.add("VocabVault-dictDef");
  popup.style.position = "fixed";
  popup.style.top =
    window.getSelection().getRangeAt(0).getBoundingClientRect().top + 15 + "px";

  popup.style.left =
    window.getSelection().getRangeAt(0).getBoundingClientRect().left + "px";
  popup.innerHTML = `
  <div class="VocabVault-errorBox">
        <div class="VocabVault-header">
          <div
            class="title"
            style="
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              gap: 6.4px;
            "
          >
            <p
              style="
                color: #000000;
                margin: 0px;
                padding: 5px 0px;
                font-size: 20px;
                border-bottom: 1px solid #c00d0d;
              "
            >
              Error 404 not found
            </p>
            <img
              class="close-button"
              src="${imgsrc}"
              alt="Icon"
              style="width: 24px; height: auto; margin-left: 8px"
            />
          </div>
          <div class="VocabVault-textarea">
            <p
              style="
                color: #000000;
                margin: 10px 0px 0px 0px;
                font-size: 12.8px;
              "
            >
              sorry pal, we couldn't find definitions for the word you were
              looking for.
            </p>
          </div>
        </div>
      </div>
  `;
  document.body.appendChild(popup);
}
