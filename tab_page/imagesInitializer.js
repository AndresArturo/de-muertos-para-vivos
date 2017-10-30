function getImagesMetaFromStorage(key) {
    return new Promise(resolve => {
        chrome.storage.local.get(key, items => {
            if (chrome.runtime.lastError || items[key] === undefined) {
                resolve([]);
            } else {
                resolve(items[key]);
            }
        });
    });
}

function getImagesMetaFromConfig() {
    return getJsonFromFile('../configs/localImagesMeta.json')
        .catch(() => []);
}

function getDefaultImagesMeta() {
    return [{
        description: 'default image',
        src: 'default.jpg',
        author: 'anonymous',
        credits_url: '',
        provider: 'local',
        provider_url: ''
    }];
}

function getImagesMetas() {
    const imgsMetaPromises = [
        getImagesMetaFromStorage('remote_imgs'),
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

// Start fetching images metas ASAP
const IMAGES_METAS_PROMISE = getImagesMetas();