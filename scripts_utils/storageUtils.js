const IMG_STORAGE_KEY = 'remote_imgs';
const IMG_TO_DISPLAY_KEY = 'display_img';

function saveArrayInStorage(key, array) {
    let obj = {};
    obj[key] = array instanceof Array ? array : [array];
    
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(obj, () => {
            if (chrome.runtime.lastError) {
                reject();
            } else {
                resolve();
            }
        });
    });
}

function loadArrayFromStorage(key) {
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
