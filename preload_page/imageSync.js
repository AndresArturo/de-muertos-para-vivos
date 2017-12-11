function getConfig() {
    return getJsonFromFile('../configs/config.json');
}

function getRemoteImagesMeta(config) {
    return getJsonFromFile(config.remoteImagesMetaFileUrl);
}

function loadRemoteImages() {
    getConfig()
        .then(getRemoteImagesMeta)
        .then(images => saveArrayInStorage(IMG_STORAGE_KEY, images));
}

if (chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(loadRemoteImages);
} else {
    loadRemoteImages();
}
