export const validateEmail = (e) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(e).toLowerCase());
}

export const validatePassword = (e) => {
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let specialChar = /^[A-Za-z0-9 ]+$/;
    let countWValidator = 1;
    let countSValidator = 5;

    if(e.length >= 6) {
        countWValidator -=1
    }

    if((e).match(lowerCaseLetters)) {
        countSValidator -=1
    }
    
    if((e).match(upperCaseLetters)) {
        countSValidator -=1
    }

    if((e).match(numbers)) {
        countSValidator -=1
    }

    if(e.length >= 8) {
        countSValidator -=1
    }

    if(!specialChar.test(e)) {
        countSValidator -=1
    }

    return {
        wvalidator: countWValidator,
        svalidator: countSValidator,
    }
}

export const validateFileSize = (size) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
}