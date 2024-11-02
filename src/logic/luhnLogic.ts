export const isValidLuhn = (personalNumber: string) => {

    if(personalNumber.length === 0) return false;

    if (/[^0-9]/.test(personalNumber)) {
        return false;
    }

    if (personalNumber.length > 12) {
        return false;
    }

    return true;
}