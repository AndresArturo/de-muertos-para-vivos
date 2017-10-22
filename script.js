const QUOTES_COUNT = 1;
const PHOTOS = [{
    src: '1.jpg',
    descriptionKey: 'photo1',
    photographer: 'Andy Warhol',
    link: 'https://www.instagram.com'
}];

class Photo {
    constructor({ src, descriptionKey, photographer, link }) {
        this.src = `background_images/${src}`;
        this.description = descriptionKey ? chrome.i18n.getMessage(descriptionKey) : '';
        this.photographer = photographer || '';
        this.link = link || '';
    }

    getSource() {
        return this.src;
    }

    getDescription() {
        return this.description;
    }

    getPhotographer() {
        return this.photographer;
    }

    getLink() {
        return this.link;
    }
}

function setBackgroundImage(photo) {
    document.body.style.backgroundImage = `url(${photo.getSource()})`;
}

function showQuote(quoteId) {
    document.getElementsByClassName('quote')[0].innerHTML = chrome.i18n.getMessage(`quote${quoteId}`);
}

function showDonateRequest() {
    document.getElementsByClassName('donate')[0].innerHTML = chrome.i18n.getMessage('donate');
}

function showPhotoCredits(photo) {
    const creditsElement = document.getElementsByClassName('photo_credits')[0];
    const authorElement = creditsElement.getElementsByClassName('author')[0];

    creditsElement.getElementsByClassName('description')[0].innerHTML = photo.getDescription();
    authorElement.innerHTML = chrome.i18n.getMessage('photo_credits', photo.getPhotographer());
    authorElement.setAttribute('href', photo.getLink());
}

function sampleDiscreteRange(zeroOriginRange) {
    return Math.floor(Math.random() * zeroOriginRange);
}

function selectRandomArrayElement(array) {
    const index = sampleDiscreteRange(array.length);
    return array[index];
}

document.addEventListener('DOMContentLoaded', () => {
    const photo = new Photo(selectRandomArrayElement(PHOTOS));
    setBackgroundImage(photo);
    showPhotoCredits(photo);

    const quoteId = sampleDiscreteRange(QUOTES_COUNT) + 1;
    showQuote(quoteId);
    showDonateRequest();
});