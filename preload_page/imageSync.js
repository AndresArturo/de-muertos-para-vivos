function getConfig() {
    return getJsonFromFile('../configs/config.json');
}

function getRemoteImagesMeta(config) {
    return getJsonFromFile(config.remoteImagesMetaFileUrl);
}

function preloadImages(images) {
    images.forEach(img => new Image().src = img.url);
}

// Preloads images and saves their meta info
function fetchRemoteImages(images) {
    saveArrayInStorage(IMG_STORAGE_KEY, images);
    preloadImages(images);
}

function loadRemoteImages() {
    getConfig()
        .then(getRemoteImagesMeta)
        .then(fetchRemoteImages);
}

if (chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(loadRemoteImages);
} else {
    loadRemoteImages();
}
