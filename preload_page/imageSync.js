function getConfig() {
    return getJsonFromFile('../configs/config.json');
}

function getRemoteImagesMeta(config) {
    return getJsonFromFile(config.remoteImagesMetaFileUrl);
}

function preloadImages(images) {
    images.forEach(img => new Image().src = img.url);
}

function saveImagesMeta(key, images) {
    let obj = {};
    obj[key] = images;
    chrome.storage.local.set(obj);
}

// Preloads images and saves their meta info
function fetchRemoteImages(images) {
    saveImagesMeta('remote_imgs', images);
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
