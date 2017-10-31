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

function showQuote(quote) {
    document.getElementById('quote').innerHTML = `${quote}`;
}

function showDonateRequest() {
    document.getElementById('donate').innerHTML = chrome.i18n.getMessage('donate');
}

function setDonateLink(link) {
    document.getElementById('donate').setAttribute('href', link);
}

function showPhotoCredits(photo) {
    const authorElement = document.getElementsByClassName('author')[0];

    authorElement.innerHTML = chrome.i18n.getMessage('photo_credits', photo.getAuthorName());
    authorElement.setAttribute('href', photo.getLink());
}

function selectRandomArrayElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

document.addEventListener('DOMContentLoaded', () => {
    IMAGES_METAS_PROMISE.then(photos => {
        const photo = new Photo(selectRandomArrayElement(photos));
        setBackgroundImage(photo);
        showQuote(photo.getDescription());
        showPhotoCredits(photo);
    });

    getDonateLinks().then(links => setDonateLink(selectRandomArrayElement(links)));
    showDonateRequest();
});
