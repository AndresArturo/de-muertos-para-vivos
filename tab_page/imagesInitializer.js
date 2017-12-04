function getImagesMetaFromConfig() {
    return getJsonFromFile('../configs/localImagesMeta.json')
        .catch(() => []);
}

function getDefaultImagesMeta() {
    return [{
        description: chrome.i18n.getMessage('title') || '',
        src: 'default.jpg',
        author: 'anonymous',
        credits_url: '',
        provider: '',
        provider_url: ''
    }];
}

function getImagesMetas() {
    const imgsMetaPromises = [
        loadArrayFromStorage(IMG_STORAGE_KEY),
        getImagesMetaFromConfig()
    ];

    return Promise
        .all(imgsMetaPromises)
        .then(imgsMetasArray => {
            return imgsMetasArray.reduce(
                (imgsMetas, currentImgsMetas) => imgsMetas.concat(currentImgsMetas),
                getDefaultImagesMeta()
            );
        });
}

function selectRandomArrayElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function getRandomImageMetaSelector() {
    const metasPromise = getImagesMetas();
    return () => metasPromise.then(selectRandomArrayElement);
}

function fetchImgToDisplay(getAlternativeImage) {
    return loadArrayFromStorage(IMG_TO_DISPLAY_KEY)
        .then(imgArray => imgArray.length > 0 
            ? imgArray[0] 
            : getAlternativeImage()
        );
}

const getRandomImageMeta = getRandomImageMetaSelector();

// Load meta of image to display ASAP
const IMAGE_META_PROMISE = fetchImgToDisplay(getRandomImageMeta);

// Set and pre-fetch next image to display 
IMAGE_META_PROMISE.then(() => {
    getRandomImageMeta()
    .then(img => {
        new Image().src = img.url;
        saveArrayInStorage(IMG_TO_DISPLAY_KEY, img);
    });
});

