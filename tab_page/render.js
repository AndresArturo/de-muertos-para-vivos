class Photo {
    constructor({ 
        url,
        src,
        description,
        author,
        credits_url,
        provider,
        provider_url
    }) {
        this.src = url || `../images/${src}`;
        this.description = description || '';
        this.author = author || '';
        this.link = credits_url || '';
        this.providerName = provider;
        this.providerLink = provider_url;
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

    getProviderName() {
        return this.providerName;
    }

    getProviderLink() {
        return this.providerLink;
    }
}

function setBackgroundImage(photo) {
    document.body.style.backgroundImage = `url(${photo.getSource()})`;
}

function showQuote(quote) {
    document.getElementById('quote').innerText = `${quote}`;
}

function showDonateRequest() {
    document.getElementById('donate').innerText = chrome.i18n.getMessage('donate');
}

function setDonateLink(link) {
    document.getElementById('donate').setAttribute('href', link);
}

function showPhotoCredits(photo) {
    const authorElement = document.getElementsByClassName('author')[0];
    const providerElement = document.getElementsByClassName('provider')[0];

    authorElement.innerText = chrome.i18n.getMessage('photo_credits_author', photo.getAuthorName());
    authorElement.setAttribute('href', photo.getLink());

    if (photo.getProviderName()) {
        providerElement.innerText = chrome.i18n.getMessage('photo_credits_provider', photo.getProviderName());
        providerElement.setAttribute('href', photo.getProviderLink());
    }
}

function showLeftFooter() {
    const leftFooter = document.getElementsByClassName('left-footer')[0];
    const leftFooterAnchor = leftFooter.getElementsByTagName('A')[0];
    leftFooterAnchor.innerText = chrome.i18n.getMessage('left_footer_text');
    leftFooterAnchor.setAttribute('href', chrome.i18n.getMessage('left_footer_link'));
}

function showCentralFooter() {
    const centralFooter = document.getElementsByClassName('central-footer')[0];
    const centralFooterAnchor = centralFooter.getElementsByTagName('A')[0];
    centralFooterAnchor.innerText = chrome.i18n.getMessage('title');
}

function showRightFooter() {
    const rightFooter = document.getElementsByClassName('right-footer')[0];
    const rightFooterAnchor = rightFooter.getElementsByTagName('A')[0];
    rightFooterAnchor.innerText = chrome.i18n.getMessage('right_footer_text');
    rightFooterAnchor.setAttribute('href', chrome.i18n.getMessage('right_footer_link'));
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
    showLeftFooter();
    showCentralFooter();
    showRightFooter();
});
