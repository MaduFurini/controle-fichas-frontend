function validatePhoneNumber(phone) {
    if (!phone) {
        return true;
    }

    const phoneRegex = /^(\+55)?\s?\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;
    return phoneRegex.test(phone);
}

const onlyContainsNumbers = (value) => /^\d+$/.test(value);
function maskPhoneNumber(phone) {
    if (!phone) {
        return '';
    }

    let size = 0;
    if (onlyContainsNumbers(phone)) {
        size = 11;
    } else {
        size = 15;
    }

    if (phone.length >= size) {
        return phone.replace(/\D/g, '')
            .replace(/^(\d)/, '($1')
            .replace(/^(\(\d{2})(\d)/, '$1) $2')
            .replace(/(\d{5})(\d{1,6})/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    } else {
        return phone.replace(/\D/g, '')
            .replace(/^(\d)/, '($1')
            .replace(/^(\(\d{2})(\d)/, '$1) $2')
            .replace(/(\d{4})(\d{1,4})/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    }
}

export {
    validatePhoneNumber,
    maskPhoneNumber,
};