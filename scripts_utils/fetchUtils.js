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
