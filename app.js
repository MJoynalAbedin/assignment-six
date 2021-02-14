const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');

// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key

const KEY = '15674931-a9d714b6e9d654524df198e00&q';


const getImages = (query) => {

  spinnerToggle(); // Start Loading

  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits)) // Problem 1 Solved
    .catch(err => console.log(err))
}

const showImages = (images) => {

  document.getElementById('error-message').innerHTML = '';

  // For no search results Addition 1 For Extra Marks

  if (images.length == 0) {

    var errorDisplay = document.getElementById('error-message');
    errorDisplay.innerHTML = `<h3>Sorry No Result For What You Have Searched!</h3>`
    spinnerToggle(); // Stop Loading

  } else {

    imagesArea.style.display = 'block';
    gallery.innerHTML = '';

    // show gallery title

    galleryHeader.style.display = 'flex';

    images.forEach(image => {
      let div = document.createElement('div');
      div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
      div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;

      gallery.appendChild(div);

    })
    spinnerToggle(); // Stop Loading
  }

}


// Spinner addition 2 For extra marks

function spinnerToggle() {
  const spinner = document.getElementById('spinner');
  spinner.classList.toggle('invisible');
}


let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added'); // Problem 5 Solved!

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    sliders.pop(img); // Problem 5 Part!
  }
}

var timer
const createSlider = () => {

  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }

  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';

  // hide image area

  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000; // Problem 2 Solved

  //If duration is negative Problem 3 Solved

  if (duration < 0) {
    alert('Duration Cannot be negative!');
  } else {
    sliders.forEach(slide => {
      let item = document.createElement('div');
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100" src="${slide}" alt="">`;
      sliderContainer.appendChild(item)
    })
  }

  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;

})

// Click on enter Problem 4 Solved

document.getElementById('search').addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.getElementById('search-btn').click();
  }
});

sliderBtn.addEventListener('click', function () {
  createSlider()
})

