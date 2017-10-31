function getDonateLinksFromConfig() {
    return getJsonFromFile('../configs/donateLinks.json')
        .catch(() => []);
}

function getDefaultDonateLinks() {
    return [];
}

function getDonateLinks() {
    return getDonateLinksFromConfig()
        .then(donateLinks =>
            donateLinks.concat(getDefaultDonateLinks())
        );
}
