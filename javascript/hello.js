import { data, sortedData } from "./data.js";
window.onload = function () {
  if (!sessionStorage.getItem("index")) {
    sessionStorage.setItem("index", (-1).toString());
    console.log("restting values");
  }

  const previousBtn = document.getElementById("previousBtn");
  previousBtn.addEventListener("click", (event) => {
    setTimeout(() => navigateAndUpdate(event, false), 0);
  });
  const nextBtn = document.getElementById("nextBtn");
  nextBtn.addEventListener("click", (event) => {
    setTimeout(() => navigateAndUpdate(event, true), 0);
  });

  setUpList();
  setUpButtons();
};

function setUpButtons() {
  let storedIndex = parseInt(sessionStorage.getItem("index"));
  const previousBtn = document.getElementById("previousBtn");
  var backCompanynameDiv = previousBtn.querySelector(".backCompanyname");
  if (data[storedIndex - 1]) {
    const company = data[storedIndex - 1];
    previousBtn.href = company.url;
    backCompanynameDiv.textContent = company.name;
  } else {
    previousBtn.removeAttribute("href");
    previousBtn.setAttribute("disabled", "true");
    backCompanynameDiv.textContent = "";
  }

  const nextBtn = document.getElementById("nextBtn");
  var nextCompanynameDiv = nextBtn.querySelector(".nextCompanyname");
  if (data[storedIndex + 1]) {
    const company = data[storedIndex + 1];
    nextBtn.href = company.url;
    nextBtn.target = "_top";
    nextCompanynameDiv.textContent = company.name;
  } else {
    nextBtn.removeAttribute("href");
    nextBtn.setAttribute("disabled", "true");
    nextCompanynameDiv.textContent = "";
  }
}
function navigateAndUpdate(event, up) {
  let storedIndex = parseInt(sessionStorage.getItem("index"));
  if (up) {
    sessionStorage.setItem("index", Math.min(data.length - 1, storedIndex + 1));
  } else {
    sessionStorage.setItem("index", Math.max(-1, storedIndex - 1));
  }

  setUpList();
  setUpButtons();
}

function setUpList() {
  var storedIndex = parseInt(sessionStorage.getItem("index"));
  const list = document.getElementById("list");
  list.innerHTML = "";
  console.log(`size: ${data.length}`);
  sortedData.forEach((i, index, _) => {
    const a = document.createElement("a");
    a.href = i.url;
    a.target = "_top";
    a.textContent = i.name;
    a.classList.add("list");

    list.appendChild(a);

    if (data[storedIndex]?.name === i.name) {
      a.classList.add("selected");
    }
    a.addEventListener("click", () => {
      document.querySelectorAll(".selected").forEach((item) => {
        item.classList.remove("selected");
      });
      a.classList.add("selected");
      const targetIndex = data.findIndex((real) => real.name == a.textContent);

      console.log(`textContent: ${a.textContent}, targetIndex: ${targetIndex}`);
      sessionStorage.setItem("index", targetIndex.toString());
      setUpButtons();
    });
  });
}
