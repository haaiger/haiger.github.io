const leftInput = document.querySelector(".leftInput");
const leftButton = document.querySelector(".leftButton");
let count = 0;

// Вешаю события на левую часть.
leftButton.addEventListener("click", () => {
  if (leftInput.value.length !== 0) {
    makeRightBlock();
  }
});
leftInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (leftInput.value.length !== 0) {
      makeRightBlock();
    }
  }
});

/**
 * Функция создания левой части. Блока для отгадывания слова.
 */
function makeRightBlock() {
  const findRightSection = document.querySelector(".right");
  if (findRightSection) {
    return;
  }
  count = 0;
  const findSection = document.querySelector("section");
  const array = leftInput.value.split("").filter((num) => num !== " ");
  const newArray = [];
  for (let index = 0; index < array.length; index++) {
    newArray.push(array[index].toLowerCase());
  }
  console.log(newArray); // Оставил, чтобы смотреть введное слово.
  const newRightBlock = document.createElement("div");
  newRightBlock.className = "right";
  const newBlock = document.createElement("div");
  newBlock.className = "block";
  const newRightBlockInput = document.createElement("input");
  newRightBlockInput.className = "rightInput";
  newRightBlockInput.placeholder = "Введите букву";
  const newRightBlockButton = document.createElement("button");
  newRightBlockButton.className = "rightButton";
  newRightBlockButton.innerText = "Клик";
  const newSpan = document.createElement("span");
  newSpan.innerText = "Вводите маленькие буквы";

  newBlock.append(newRightBlockInput, newRightBlockButton, newSpan);
  newRightBlock.appendChild(newBlock);

  const answerBlock = document.createElement("div");
  answerBlock.className = "answer";

  const newLettersWrapper = document.createElement("div");
  newLettersWrapper.className = "lettersWrapper";
  answerBlock.appendChild(newLettersWrapper);

  for (let index = 0; index <= newArray.length - 1; index++) {
    const newLetterBlock = document.createElement("div");
    newLetterBlock.className = "letter";
    const newSpan = document.createElement("span");
    newSpan.innerText = newArray[index];
    newSpan.className = "hide";
    newSpan.id = newArray[index];
    newLetterBlock.appendChild(newSpan);
    newLettersWrapper.appendChild(newLetterBlock);
  }

  newRightBlockButton.addEventListener("click", () => {
    findLetters(newArray);
  });
  newRightBlockInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      findLetters(newArray);
    }
  });

  const findLeftSection = document.querySelector(".left");
  findLeftSection.className = "hide left";

  newRightBlock.appendChild(answerBlock);
  findSection.appendChild(newRightBlock);
  leftInput.value = "";
}

/**
 * Функция проверки введенной буквы в инпут справа.
 */
function findLetters(array) {
  const findRightInput = document.querySelector(".rightInput");
  const findAllLetter = document.querySelectorAll("[id]");

  if (array.join("") === findRightInput.value) {
    findAllLetter.forEach((el) => {
      el.className = "show";
    });
    count = array.length;
  } else
    array.forEach((element, index) => {
      if (findRightInput.value === element) {
        findAllLetter[index].className = "show";
        count++;
      }
    });

  if (array.length === count && !document.querySelector(".congratulation")) {
    const findAnswer = document.querySelector(".answer");
    const congratulationBlock = document.createElement("div");
    congratulationBlock.className = "congratulation";
    congratulationBlock.innerText = "Вы отгадали всё слово!";
    findAnswer.appendChild(congratulationBlock);

    const resetButton = document.createElement("button");
    resetButton.className = "reset";
    resetButton.innerText = "Начать игру заново";
    findAnswer.appendChild(resetButton);

    resetButton.addEventListener("click", () => {
      const findRightSection = document.querySelector(".right");
      findRightSection.remove();
      const findLeftSection = document.querySelector(".left");
      findLeftSection.classList.remove();
      findLeftSection.setAttribute("class", "left");
    });
  }
  findRightInput.value = "";
}
