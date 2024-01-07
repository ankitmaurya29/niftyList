window.onload = function () {
  setUpList();
  setUpButtons();
  if (sessionStorage.getItem("index") === null) {
    sessionStorage.setItem("index", (-1).toString());
    console.log("restting values");
  }
};

function setUpButtons() {
  let storedIndex = parseInt(sessionStorage.getItem("index"));
  const previousBtn = document.getElementById("previousBtn");
  var backCompanynameDiv = previousBtn.querySelector(".backCompanyname");
  if (niftyFifty[storedIndex - 1]) {
    const company = niftyFifty[storedIndex - 1];
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
  if (niftyFifty[storedIndex + 1]) {
    const company = niftyFifty[storedIndex + 1];
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
    event.pre;
    if (up) {
      sessionStorage.setItem(
        "index",
        Math.min(niftyFifty.length - 1, storedIndex + 1)
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
  niftyFifty.forEach((i, index, _) => {
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
