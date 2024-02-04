let userData = {
  plan: {
    name: "arcade",
    price: [9, 90],
  },
  addOns: [],
  total: 9,
};
let plansData = [
  { name: "Arcade", price: [9, 90] },
  { name: "Advanced", price: [12, 120] },
  { name: "Pro", price: [15, 150] },
];
let addOnsData = [
  { index: 0, price: [1, 10], statue: false },
  { index: 1, price: [2, 20], statue: false },
  { index: 2, price: [2, 20], statue: false },
];

let duration = "monthly";
// selectors
let sideBarsSteps = document.querySelectorAll("li");
let steps = document.querySelectorAll(".step");
let nextBtn = document.querySelectorAll(".next-step-btn");
let backBtn = document.querySelectorAll(".go-back-btn");
let cards = document.querySelectorAll(".card");
let durationToggle = {
  monthly: document.querySelector("#duration-monthly"),
  toggle: document.querySelector("#toggle"),
  yearly: document.querySelector("#duration-yearly"),
};
let addOns = document.querySelectorAll(".add-on");
let addOnsSummary = document.querySelectorAll(".add-ons-summary");
let changeBtn = document.querySelector(".change-btn");
let final = {
  plan: document.querySelector("#chosen-plan"),
  planPrice: document.querySelector(".summary-price"),
  totalText: document.querySelector("#total").querySelector("p"),
  totalPrice: document.querySelector("#total-price"),
};

// event listeners

nextBtn.forEach((e, i) => {
  e.addEventListener("click", function () {
    if (i === 0) {
      if (validateForm()) {
        stepChange(i, i + 1);
      }
    } else {
      if (i === 2) {
        final.plan.textContent = `${userData.plan.name}(${duration})`;
        final.planPrice.textContent =
          duration == "monthly"
            ? `$${userData.plan.price[0]}/Mo`
            : `$${userData.plan.price[1]}/yr`;
        final.totalText.textContent =
          duration == "monthly" ? `total per month` : `total per year`;
        final.totalPrice.textContent =
          duration == "monthly" ? `$${total()}/Mo` : `$${total() * 10}/yr`;
      }
      stepChange(i, i + 1);
    }
  });
});

backBtn.forEach((e, i) => {
  e.addEventListener("click", function () {
    stepChange(i + 1, i);
  });
});

cards.forEach((e, i) => {
  e.addEventListener("click", function () {
    cards.forEach((e) => {
      classRemove(e, "active");
    });
    classAdd(e, "active");
    userData.plan = plansData[i];
  });
});

durationToggle.toggle.addEventListener("click", function () {
  classToggle(durationToggle.toggle, "active");
  classToggle(durationToggle.monthly, "active");
  classToggle(durationToggle.yearly, "active");
  duration = duration == "monthly" ? "yearly" : "monthly";
  cards.forEach((e, i) => {
    classToggle(e.querySelector(".additional-text"), "active");
    e.querySelector(".price").textContent =
      duration == "monthly"
        ? `$${plansData[i].price[0]}/Mo`
        : `$${plansData[i].price[1]}/yr`;
  });
  addOns.forEach((e, i) => {
    e.querySelector(".add-ons-price").textContent =
      duration == "monthly"
        ? `$${addOnsData[i].price[0]}/Mo`
        : `$${addOnsData[i].price[1]}/yr`;
  });
  addOnsSummary.forEach((e, i) => {
    e.querySelector(".added-price").textContent =
      duration == "monthly"
        ? `$${addOnsData[i].price[0]}/Mo`
        : `$${addOnsData[i].price[1]}/yr`;
  });
});

addOns.forEach((e) => {
  e.addEventListener("click", function () {
    classToggle(e, "active");
    addOns.forEach((e, i) => {
      addOnsData[i].statue = e.classList.contains("active") ? true : false;
    });
    addOnsSummary.forEach((e, i) => {
      e.querySelector(".added-price").textContent =
        duration == "monthly"
          ? `$${addOnsData[i].price[0]}/Mo`
          : `$${addOnsData[i].price[1]}/yr`;
      if (addOnsData[i].statue) {
        classAdd(e, "active");
      } else {
        classRemove(e, "active");
      }
    });
  });
});

changeBtn.addEventListener("click", function () {
  stepChange(3, 1);
});

// functions

function stepChange(st, end) {
  steps[st].classList.remove("active");
  sideBarsSteps[st].classList.remove("active");
  steps[end].classList.add("active");
  if (end < 4) {
    sideBarsSteps[end].classList.add("active");
  } else {
    sideBarsSteps.forEach((e) => {
      e.classList.add("active");
    });
  }
}

function validateForm() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let number = document.getElementById("phone");
  let namePass = true;
  let emailPass = true;
  let numberPass = true;
  document.querySelectorAll("label").forEach((e) => {
    classRemove(e, "error");
  });
  if (!name.value) {
    classAdd(document.querySelectorAll("label")[0], "error");
    namePass = false;
  }
  if (!email.value) {
    classAdd(document.querySelectorAll("label")[1], "error");
    emailPass = false;
  }
  if (!number.value) {
    classAdd(document.querySelectorAll("label")[2], "error");
    numberPass = false;
  }
  let result = namePass && emailPass && numberPass;
  return result;
}

function total() {
  let total = userData.plan.price[0];
  addOnsData.forEach((e) => {
    if (e.statue) {
      total += e.price[0];
    }
  });
  return total;
}

function classAdd(element, c) {
  element.classList.add(c);
}
function classRemove(element, c) {
  element.classList.remove(c);
}
function classToggle(element, c) {
  element.classList.toggle(c);
}
