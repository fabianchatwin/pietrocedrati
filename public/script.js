let currentIndex = 0;
let galleryData;

function loadSlide(index) {
    fetch('data.json') 
    .then(response => response.json())
    .then(data => {

    galleryData = data;
    const slide = galleryData[index];
    
    const textContainer = document.getElementById("textContainer");
    const imageContainer = document.getElementById("imageContainer");
    textContainer.style.opacity = 0;

    setTimeout(() => {
    const italianText = document.getElementById("italianText");
    const englishText = document.getElementById("englishText");
    italianText.innerHTML = slide.textItalian;
    englishText.innerHTML = slide.textEnglish;

    if (slide.textItalian || slide.textEnglish) {
        textContainer.style.display = 'flex';
    } else {
        textContainer.style.display = 'none'; 
    }

    textContainer.style.opacity = 1;
    }, 500);

    const slideImage = document.getElementById("slideImage");
    slideImage.style.opacity = 0;
    setTimeout(() => {
    slideImage.src = "images/"+slide.imageName;
    slideImage.style.opacity = 1;

    }, 500);

    const textCounter = document.getElementById("counter");
    textCounter.style.opacity = 0;
    setTimeout(() => {
    textCounter.textContent = index+1+"/"+data.length;
    textCounter.style.opacity = 1;
    }, 500);
})
    .catch(error => console.error('Error fetching data:', error));
}

function loadNext() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    loadSlide(currentIndex);
}

function loadPrevious() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    loadSlide(currentIndex);
}

function loadList() {
    alert("load List");
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
    loadNext();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
    loadPrevious();
    }
});
document.querySelector('.flex-container').addEventListener('click', loadNext);

loadSlide(currentIndex);
