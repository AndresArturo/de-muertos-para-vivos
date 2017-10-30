class Photo {
    constructor({ url, src, description, author, credits_url }) {
        this.src = url || `../images/${src}`;
        this.description = description || '';
        this.author = author || '';
        this.link = credits_url || '';
    }

    getSource() {
        return this.src;
    }

    getDescription() {
        return this.description;
    }

    getAuthorName() {
        return this.author;
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
    const creditsElement = document.getElementsByClassName('photo-credits')[0];
    const authorElement = creditsElement.getElementsByClassName('author')[0];

    creditsElement.getElementsByClassName('description')[0].innerHTML = photo.getDescription();
    authorElement.innerHTML = chrome.i18n.getMessage('photo_credits', photo.getAuthorName());
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
    IMAGES_METAS_PROMISE.then(photos => {
        const photo = new Photo(selectRandomArrayElement(photos));
        setBackgroundImage(photo);
        showPhotoCredits(photo);
    });

    const QUOTES_COUNT = 1;
    const quoteId = sampleDiscreteRange(QUOTES_COUNT) + 1;
    showQuote(quoteId);
    showDonateRequest();
});
