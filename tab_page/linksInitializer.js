function getDonateLinksFromConfig() {
    return getJsonFromFile('../configs/donateLinks.json')
        .catch(() => []);
}

function getDefaultDonateLinks() {
    return ['https://donate.omaze.com/mexico'];
}

function getDonateLinks() {
    return getDonateLinksFromConfig()
        .then(donateLinks =>
            donateLinks.concat(getDefaultDonateLinks())
        );
}
