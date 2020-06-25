
export const convertToSlug = (phrase) => {
    let returnString = phrase.toLowerCase();
    returnString = returnString.replace(/ä/g, 'a');
    returnString = returnString.replace(/ö/g, 'o');
    returnString = returnString.replace(/ç/g, 'c');
    returnString = returnString.replace(/ş/g, 's');
    returnString = returnString.replace(/ı/g, 'i');
    returnString = returnString.replace(/ğ/g, 'g');
    returnString = returnString.replace(/ü/g, 'u');

    returnString = returnString.replace(/[\s-]+/g, " ");
    returnString = returnString.replace(/^\s+|\s+$/g,"");
    returnString = returnString.replace(/[']/g, "-");
    returnString = returnString.replace(/[ ]/g, "-");
    return returnString;
}

export const convertToSpaces = (phrase) => {
    let returnString = phrase.toLowerCase();
    returnString = returnString.replace(/-/g," ");
    return returnString;
}
