volimgsrc = chrome.runtime.getURL("vol.png");
gifsrc = chrome.runtime.getURL("gificon.gif");

sideimgsrc = chrome.runtime.getURL("sideicon.png");
const sidebaricon = document.createElement("img");
sidebaricon.src = sideimgsrc;
sidebaricon.classList.add("VocabVault-sideIcon");
sidebaricon.addEventListener("click", function () {
  toggleSidebar();
});
document.body.appendChild(sidebaricon);

const sidebar = document.createElement("div");
sidebar.classList.add("VocabVault-dictSidebar");

sidebar.innerHTML = `

<div class="VocabVault-body">
      <div class="VocabVault-searchBar">
        <input id="wordInput" type="text" name="searchQueryInput" placeholder="Search" value="" />
        <button id="searchButton" type="submit" name="searchQuerySubmit" >
          <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </button>
      </div>
      <h2 class="VocabVault-search-word">hello</h2>
      <div class="VocabVault-phonetics">
        <p class="VocabVault-phonetics-text">həˈləʊ</p>
        <div class="VocabVault-sound VocabVault-sound-mute">
          <img src="${volimgsrc}" style="width:24px;height:24px" />
          <div style="width:41.6px; font-size:0rem" class="VocabVault-audiourl">https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3
        </div>
          <div class="VocabVault-sound-wave VocabVault-sound-wave_one"></div>
          <div class="VocabVault-sound-wave VocabVault-sound-wave_two"></div>
        </div>
      </div>
      <div class="VocabVault-partsofspeech">
        <h3 class="VocabVault-pos-title">exclamation</h3>
        <div class="VocabVault-pos-def">
          <p class="VocabVault-pos-def-title">Definition</p>
          <p class="VocabVault-pos-def-text">Lused as a greeting or to begin a phone conversation.</p>
        </div>
        <div class="VocabVault-pos-def">
          <p class="VocabVault-pos-def-title">Example</p>
          <p class="VocabVault-pos-def-text">hello there, Katie!</p>
        </div>
      </div>
      <div class="VocabVault-partsofspeech">
        <h3 class="VocabVault-pos-title">Noun</h3>
        <div class="VocabVault-pos-def">
          <p class="VocabVault-pos-def-title">Definition</p>
          <p class="VocabVault-pos-def-text">an utterance of ‘hello’; a greeting.</p>
        </div>
        <div class="VocabVault-pos-def">
          <p class="VocabVault-pos-def-title">Example</p>
          <p class="VocabVault-pos-def-text">she was getting polite nods and hellos from people</p>
        </div>
      </div>
      <div class="VocabVault-partsofspeech">
        <h3 class="VocabVault-pos-title">verb</h3>
        <div class="VocabVault-pos-def">
          <p class="VocabVault-pos-def-title">Definition</p>
          <p class="VocabVault-pos-def-text">say or shout ‘hello’.</p>
        </div>
        <div class="VocabVault-pos-def">
          <p class="VocabVault-pos-def-title">Example</p>
          <p class="VocabVault-pos-def-text">I pressed the phone button and helloed</p>
        </div>
      </div>
    </div>  
    <style>
     @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap");

    </style>
   
    `;
sidebar.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent the click event from propagating to the document
});
document.body.appendChild(sidebar);

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("wordInput");
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the form from submitting
    performSearch();
  }
});
searchButton.onclick = function () {
  performSearch();
};

const Sidebar = document.querySelector(".VocabVault-dictSidebar");
Sidebar.style.right = "-600px";

document.querySelectorAll(".VocabVault-sound").forEach(function (soundElement) {
  soundElement.addEventListener("click", function () {
    const url = document.getElementsByClassName("VocabVault-audiourl");
    const audiourl = url[0].innerHTML;
    if (audiourl !== "") {
      var audio = new Audio(audiourl);
      this.classList.toggle("VocabVault-sound-mute");
      audio.play();
      setTimeout(function () {
        const sound = document.getElementsByClassName("VocabVault-sound");
        sound[0].classList.toggle("VocabVault-sound-mute");
      }, 1500);
    }
  });
});

document.addEventListener("dblclick", function () {
  var selectedText = window.getSelection().toString();

  if (selectedText.length > 0) {
    const popup = document.createElement("img");
    popup.src = gifsrc;
    popup.classList.add("VocabVault-dictIcon");
    popup.style.width = "40px";
    popup.style.zIndex = "10";
    popup.style.height = "40px";
    popup.style.position = "fixed";
    popup.style.top =
      window.getSelection().getRangeAt(0).getBoundingClientRect().top -
      32 +
      "px";
    popup.style.left =
      window.getSelection().getRangeAt(0).getBoundingClientRect().left + "px";
    document.body.appendChild(popup);
    popup.addEventListener("click", function (e) {
      fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + selectedText)
        .then((response) => response.json())
        .then((data) => {
          const image = document.getElementsByClassName("VocabVault-dictIcon");
          document.body.removeChild(image[0]);
          if (data.title) {
            showerrorpopup();
          } else {
            const definition = data[0].meanings[0].definitions[0].definition;
            const popup = document.createElement("div");
            popup.classList.add("VocabVault-dictDef");
            popup.style.position = "fixed";
            popup.style.top =
              window.getSelection().getRangeAt(0).getBoundingClientRect().top +
              15 +
              "px";

            popup.style.left =
              window.getSelection().getRangeAt(0).getBoundingClientRect().left +
              "px";
            popup.innerHTML = `
            <div class="VocabVault-floatingBox">
              <div class="VocabVault-header">
                  <div class="VocabVault-title">
                  <p style="color: #000000;margin:0px; padding:5px 0px;  font-size: 20px; border-bottom: 1px solid #ccc">${selectedText}</p> 
                  <img src="${gifsrc}"  alt="Icon" style="width: 40px; height:auto;" /> 
                  </div>
                  <div class="VocabVault-textarea">
                    <p style="color: #000000; margin:0px; font-size: 12.8px; ">${definition}<span class="VocabVault-moreInfo" onmouseover="this.style.textDecoration='underline';" onmouseout="this.style.textDecoration='none';" >..read more</span>
                    </p>
                  </div>
                  
                </div>
            </div>
          `;
            document.body.appendChild(popup);
            updatesidebarcontent(data);
          }
        });
    });

    // console.log("Selected text: " + selectedText);
  }
});

document.addEventListener("click", function (event) {
  const image = document.getElementsByClassName("VocabVault-dictIcon");
  const info = document.getElementsByClassName("VocabVault-moreInfo");
  const def = document.getElementsByClassName("VocabVault-dictDef");
  const toggle = document.getElementsByClassName("VocabVault-dictSidebar");
  const button = document.querySelector(".VocabVault-sideIcon");
  if (image.length > 0 && event.target !== image[0]) {
    document.body.removeChild(image[0]);
  }
  if (event.target !== toggle[0] && event.target !== button) {
    removeSidebar();
  }
  if (def.length > 0) {
    if (event.target == info[0]) {
      showSlidebar();
    }
    document.body.removeChild(def[0]);
  }
});
window.addEventListener("scroll", function () {
  const image = document.getElementsByClassName("VocabVault-dictIcon");
  if (image.length > 0) {
    document.body.removeChild(image[0]);
  }
  const def = document.getElementsByClassName("VocabVault-dictDef");
  if (def.length > 0) {
    document.body.removeChild(def[0]);
  }
});

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (sender.id === chrome.runtime.id) {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + message.message)
      .then((response) => response.json())
      .then((data) => {
        if (data.title) {
          showerrorpopup();
        } else {
          updatesidebarcontent(data);
          showSlidebar();
        }
      });
  }
});
