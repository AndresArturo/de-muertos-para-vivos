function getFile(fileUrl) {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        };

        xhr.open('GET', fileUrl, true);
        xhr.send();
    });

    return promise;
}

function getJsonFromFile(fileUrl) {
    return getFile(fileUrl)
        .then(JSON.parse);
}

function getConfig() {
    return getJsonFromFile('configs/config.json');
}

function getRemoteImagesMeta(config) {
    return getJsonFromFile(config.remoteImagesMetaFileUrl);
}

function preloadImages(images) {
    images.forEach(img => new Image().src = img.url);
}

function saveImagesMeta(key, images) {
    chrome.storage.local.set({
        key: images
    });
}

// Preloads images and saves their meta info
function fetchRemoteImages(images) {
    saveImagesMeta('remote_imgs', images);
    preloadImages(images);
}

if (chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(() => {
        getConfig()
            .then(getRemoteImagesMeta)
            .then(fetchRemoteImages);
    });
}