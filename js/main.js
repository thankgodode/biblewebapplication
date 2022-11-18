const oldTestament = document.querySelector(".book1");
const newTestament = document.querySelector(".book2");
const span = document.querySelector("span");
const sideNavBar = document.querySelector("ul");
const chapters = document.querySelector(".chapter");
const verses = document.querySelector(".verses");
const bookName = document.querySelector(".bookName");

//NAVIGATE BACKGROUND FOR TESTAMENTS
newTestament.addEventListener("click", function () {
  span.style.marginLeft = "385px";

  getNewTestaments();
  chapters.innerHTML = "";
  verses.innerHTML = "";
  bookName.innerHTML = "";
});

oldTestament.addEventListener("click", function (e) {
  span.style.marginLeft = "0";

  getOldTestaments();
  chapters.innerHTML = "";
  verses.innerHTML = "";
  bookName.innerHTML = "";
});

//GET API KEY
const options = {
  method: "GET",
  headers: {
    "api-key": "adf98f727d5d5c878397d7d051ff97af",
  },
};

//GET OLD TESTAMENTS BOOKS

getOldTestaments();
async function getOldTestaments() {
  let response = await fetch(
    "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books",
    options
  );

  let data = await response.json();
  let oldBooks = data.data.slice(0, 39);
  oldTestamentFunc(oldBooks);

  const allNewBooks = document.querySelectorAll("li");
  allNewBooks.forEach((element) => {
    element.addEventListener("click", function (e) {
      oldBookFunc(element.classList);
      verses.innerHTML = "";
      bookName.innerHTML = element.innerHTML;
    });
  });

  const b = document.querySelectorAll("li");

  //Code for highlighting the active Book
  b.forEach((d) => {
    const a = document.querySelectorAll("li");
    a.forEach((e) => {
      e.addEventListener("click", function () {
        if (e !== d) {
          e.setAttribute("id", "bgColor");
        }
        d.removeAttribute("id");
      });
    });
  });
}

function oldTestamentFunc(param) {
  let displayParam = param.map((para) => {
    return `<li class=${para.id}>${para.name}</li>`;
  });

  sideNavBar.innerHTML = displayParam.join("");
}

//GET OLD TESTAMENTS CHAPTERS
function getOldBookChapters(param) {
  let displayParam = param.map((para) => {
    return `<p class=${para.id} id="verses">${para.number}</p>`;
  });

  chapters.innerHTML = displayParam.join("");
}

async function oldBookFunc(a) {
  let response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books/${a}/chapters`,
    options
  );
  let data = await response.json();
  let oldBooks = data.data;
  let filtered = oldBooks.shift();
  getOldBookChapters(oldBooks);

  const chapters = document.querySelectorAll("#verses");

  chapters.forEach((chapter) => {
    chapter.addEventListener("click", function () {
      oldBookVerses(chapter.classList);
      bookName.innerHTML += " " + chapter.innerHTML;
    });
  });
}

//Get Old Testaments Verses of Chapter
async function oldBookVerses(a) {
  let response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/${a}/verses`,
    options
  );
  let data = await response.json();
  let data2 = data.data;

  filterOldVerse(data2);
  const verses = document.querySelectorAll("#verses");

  verses.forEach((verse) => {
    verse.addEventListener("click", function () {
      displayOldTestamentVerse(verse.classList);
      bookName.innerHTML += ":" + verse.innerHTML;
    });
  });
}

function filterOldVerse(param) {
  let displayParam = param.map((para) => {
    let b = para.orgId;
    let d = b.split(".");
    let f = d[2];
    return `<p id="verses" class=${b}>${f}</p>`;
  });

  chapters.innerHTML = displayParam.join("");
}

//Display Old Testament Verses
async function displayOldTestamentVerse(a) {
  let response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/passages/${a}`,
    options
  );

  let data = await response.json();
  let data2 = data.data;
  console.log(data.data.content);
  renderOldTestamentVerse(data2);
}

function renderOldTestamentVerse(param) {
  let displayParam = `${param.content}`;
  chapters.innerHTML = "";
  verses.innerHTML = displayParam;
}

//GET NEW TESTAMENTS BOOKS
async function getNewTestaments() {
  let response = await fetch(
    "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books",
    options
  );

  let data = await response.json();
  let newBooks = data.data.slice(39, 66);
  newTestamentFunc(newBooks);

  const allNewBooks = document.querySelectorAll("li");
  allNewBooks.forEach((element) => {
    element.addEventListener("click", function () {
      newBookFunc(element.classList);
      bookName.innerHTML = element.innerHTML;
      verses.innerHTML = "";
    });
  });

  const b = document.querySelectorAll("li");

  //Code for highlighting the active Book
  b.forEach((d) => {
    const a = document.querySelectorAll("li");
    a.forEach((e) => {
      e.addEventListener("click", function () {
        if (e !== d) {
          e.setAttribute("id", "bgColor");
        }
        d.removeAttribute("id");
      });
    });
  });
}

function newTestamentFunc(param) {
  let displayParam = param.map((para) => {
    return `<li class=${para.id}>${para.name}</li>`;
  });

  sideNavBar.innerHTML = displayParam.join("");
}

// GET NEW TESTAMENTS CHAPTERS
function getNewBookChapters(param) {
  let displayParam = param.map((para) => {
    return `<p id="verses" class=${para.id}>${para.number}</p>`;
  });

  chapters.innerHTML = displayParam.join("");
}

async function newBookFunc(a) {
  let response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/books/${a}/chapters`,
    options
  );
  let data = await response.json();
  let newBooks = data.data;
  let e = newBooks.shift();
  console.log(e);

  getNewBookChapters(newBooks);
  const chapters = document.querySelectorAll("#verses");

  chapters.forEach((chapter) => {
    chapter.addEventListener("click", function () {
      newBookVerses(chapter.classList);
      console.log(newBookVerses(chapter.classList));
      bookName.innerHTML += " " + chapter.innerHTML;
    });
  });
}

//Get New Testaments Verses
async function newBookVerses(a) {
  let response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/${a}/verses`,
    options
  );
  let data = await response.json();
  let data2 = data.data;
  console.log(data2);

  filterNewVerse(data2);
  const verses = document.querySelectorAll("#verses");

  verses.forEach((verse) => {
    verse.addEventListener("click", function () {
      displayNewTestamentVerse(verse.classList);
      bookName.innerHTML += ":" + verse.innerHTML;
    });
  });
}

function filterNewVerse(param) {
  let displayParam = param.map((para) => {
    let b = para.orgId;
    let d = b.split(".");
    let f = d[2];
    return `<p id="verses" class="${b}">${f}</p>`;
  });

  chapters.innerHTML = displayParam.join("");
}

//Display New Testament Verses
async function displayNewTestamentVerse(a) {
  let response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/passages/${a}`,
    options
  );

  let data = await response.json();
  let data2 = data.data;
  console.log(data.data.content);
  renderNewTestamentVerse(data2);
}

function renderNewTestamentVerse(param) {
  let displayParam = `${param.content}`;
  chapters.innerHTML = "";
  verses.innerHTML = displayParam;
}
