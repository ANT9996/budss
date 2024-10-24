const prev = document.getElementById("prev");
const next = document.getElementById("next");
const images = document.getElementById("images");
const ms = 7; // Скорость перехода
const step = 10;

let selectSlide = 0;
let width = document.querySelector(".slider").clientWidth;

// Отступ слева от элемента
const margin = () => parseInt(images.style.marginLeft || '0px')

const setDisableDots = (bool) => {
  const dots = document.getElementsByClassName("dot");
  next.classList.toggle("disable", bool);
  prev.classList.toggle("disable", bool);
  for (const dot of dots) {
    dot.classList.toggle("disable", bool);
  }
}

let interval;
const changeInterval = (direction, index, marginStep = 10) => interval = setInterval(() => {
  console.log(margin(images), -(width * index))
  console.log(direction)
  if (margin(images) === -(width * index)) {
    document.getElementById("dot_" + selectSlide).classList.remove("activeSlide");
    selectSlide = index;
    document.getElementById("dot_" + selectSlide).classList.add("activeSlide");
    clearInterval(interval)
    setDisableDots(false)
  } else {
    direction
        ? images.style.marginLeft = (margin(images) - marginStep) + "px"
        : images.style.marginLeft = (margin(images) + marginStep) + "px"
  }
}, 0);

// Функция для перемещения по точкам
const changeSlide = (index) => {
  setDisableDots(true)
  width = document.querySelector(".slider").clientWidth;
  const changeType = index > selectSlide
  changeInterval(changeType, index, 10)
};

// Проверка на наличие изображений
if (document.getElementById("images").children.length > 0) {
  
  // Сокращение лишних изображений (если больше 10)
  if (images.children.length > 10) {
    for (let i = images.children.length-1; i > 9; i--) {
      console.log(images.children[i]);
      images.children[i].remove()
    }
  }
  // Дублирование первого элемента в конец
  images.innerHTML += images.children[0].outerHTML;
  //  Длина без последнего элемента
  const imagesCount = images.children.length - 1;
  
  // Рендер точек для перемещения
  const dotsBlock = document.getElementById("dots");
  for (let index = 0; index < imagesCount; index++) {
    dotsBlock.innerHTML +=
    `<div id="dot_${index}" class="dot ${index === 0 ? "activeSlide" : ""}" onclick="changeSlide(${index})"></div>`;
  }
  
  // Переход по клику на кнопку (next)
  const plus = () => {
    width = document.querySelector(".slider").clientWidth;
    if (selectSlide >= imagesCount - 1) {
      setDisableDots(true);
      let start = 0;
      let interval = setInterval(() => {
        if (start >= width) {
          document.getElementById("dot_" + selectSlide).classList.remove("activeSlide");
          selectSlide = 0;
          document.getElementById("dot_" + selectSlide).classList.add("activeSlide");
          clearInterval(interval);
          images.style.marginLeft = -(width * imagesCount) + 'px'
          setDisableDots(false)
        } else {
          images.style.marginLeft = -((selectSlide === 0 ? 0 : selectSlide) * width + start) + "px";
          start += step;
        }
      }, ms);
    } else {
      setDisableDots(true);
      let start = 0;
      let interval = setInterval(() => {
        if (start > width) {
          document.getElementById("dot_" + selectSlide).classList.remove("activeSlide");
          selectSlide++;
          document.getElementById("dot_" + selectSlide).classList.add("activeSlide");
          clearInterval(interval);
          images.style.marginLeft = -(width * selectSlide) + 'px'
          setDisableDots(false)
        } else {
          images.style.marginLeft = -((selectSlide === 0 ? 0 : selectSlide) * width + start) + "px";
          start += step;
        }
      }, ms);
    }
  };

    // Переход по клику на кнопку (prev)
  const minus = () => {
    width = document.querySelector(".slider").clientWidth;
    console.log(width);
    if (selectSlide === 0) {
      setDisableDots(true);
      document.getElementById("dot_" + selectSlide).classList.remove("activeSlide");
      selectSlide = imagesCount - 1;
      document.getElementById("dot_" + selectSlide).classList.add("activeSlide");
      images.style.marginLeft = -selectSlide * width + "px";
      setDisableDots(false);
      return;
    }
    setDisableDots(true);
    document.getElementById("dot_" + selectSlide).classList.remove("activeSlide");
    selectSlide--;
    document.getElementById("dot_" + selectSlide).classList.add("activeSlide");
    images.style.marginLeft = -selectSlide * width + "px";
    setDisableDots(false);
  };

  next.addEventListener("click", plus);
  prev.addEventListener("click", minus);
} else { // Если нет изображений
  document.getElementById("images").innerHTML = "<h1>Добавьте изображения</h1>";
}