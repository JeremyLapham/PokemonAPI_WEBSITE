function saveToLocalStorageByName(pokeName) {
    //get current values that are saved into local storage
    //create an array of values to store into local storage
    let favorites = getLocalStoage();

    //add new name to our favorites array
    favorites.push(pokeName);

    //save updated array to Local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));

}

function getLocalStoage() {
    //get all of the values that are stored in Favorites in local storage
    let localStorageData = localStorage.getItem('Favorites');

    if (localStorageData == null) {
        return [];
    }


    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(name) {
    let favorites = getLocalStoage();

    //find the index of the name in local storage
    let pokeNameIndex = favorites.indexOf(name);

    //remove the name from the array using splice method
    favorites.splice(pokeNameIndex, 1);

    //save our updated array to local storage
    localStorage.setItem('Favorites', JSON.stringify(favorites));
}

export { saveToLocalStorageByName, getLocalStoage, removeFromLocalStorage }