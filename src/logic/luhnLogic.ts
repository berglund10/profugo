export const isValidLuhn = (personalNumber: string) => {
    if (!format(personalNumber)) return false;

    const digitsOnly = personalNumber.replace(/-/g, '');

    return checkLuhn(digitsOnly.slice(2));

};

const format = (personalNumber: string) => {
    if (personalNumber.length === 0) return false;

    if (personalNumber.length !== 13 && personalNumber.length !== 12) {
        return false;
    }

    const hasDash = personalNumber.includes("-");

    if (hasDash) {
        if (personalNumber[8] !== "-") {
            return false;
        }
    }

    const digitsOnly = personalNumber.replace(/-/g, "");

    if (/[^0-9]/.test(digitsOnly)) {
        return false;
    }

    if (digitsOnly.length !== 12) {
        return false;
    }

    return true;
};

const checkLuhn = (luhnNumber: string): boolean => {
    let sum = 0;
    const length = luhnNumber.length;

    for (let i = 0; i < length; i++) {
        let digit = parseInt(luhnNumber.charAt(length - 1 - i), 10);

        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    return sum % 10 === 0;
};