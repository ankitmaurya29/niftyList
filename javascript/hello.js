import { data } from "./data.js";
window.onload = function () {
  if (!sessionStorage.getItem("index")) {
    sessionStorage.setItem("index", (-1).toString());
    console.log("restting values");
  }
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
    previousBtn.target = "_top";
    backCompanynameDiv.textContent = company.name;
  } else {
    previousBtn.removeAttribute("href");
    previousBtn.setAttribute("disabled", "true");
    backCompanynameDiv.textContent = "";
  }

  previousBtn.addEventListener("click", (event) => {
    navigateAndUpdate(event, false);
  });

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
  nextBtn.addEventListener("click", (event) => {
    navigateAndUpdate(event, true);
  });
  function navigateAndUpdate(event, up) {
    if (up) {
      sessionStorage.setItem(
        "index",
        Math.min(data.length - 1, storedIndex + 1)
      );
    } else {
      sessionStorage.setItem("index", Math.max(-1, storedIndex - 1));
    }
    setTimeout(() => {
      setUpList();
      setUpButtons();
    }, 0);
  }
}
function setUpList() {
  var storedIndex = parseInt(sessionStorage.getItem("index"));
  const list = document.getElementById("list");
  list.innerHTML = "";
  console.log(`size: ${data.length}`);
  data.forEach((i, index, _) => {
    const a = document.createElement("a");
    a.href = i.url;
    a.target = "_top";
    a.textContent = i.name;
    a.classList.add("list");

    list.appendChild(a);

    if (storedIndex == index) {
      a.classList.add("selected");
      a.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    a.addEventListener("click", () => {
      document.querySelectorAll(".selected").forEach((item) => {
        item.classList.remove("selected");
      });
      a.classList.add("selected");
      sessionStorage.setItem("index", index.toString());
      setUpButtons();
    });
  });
}
