export const isValidLuhn = (personalNumber: string) => {

    if(personalNumber.length === 0) return false;

    if (personalNumber.length !== 13 && personalNumber.length !== 12) {
        return false;
    }

    const hasDash = personalNumber.includes('-');

    if (hasDash) {
        if (personalNumber[8] !== '-') {
            return false;
        }
    }

    const digitsOnly = personalNumber.replace(/-/g, '');

    if (/[^0-9]/.test(digitsOnly)) {
        return false;
    }

    if (digitsOnly.length !== 12) {
        return false;
    }

    return true;
}