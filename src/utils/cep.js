import axios from "axios";

function validateCEP(value) {
    return ((value.replace(/\D/g, '')).length === 8);
}

async function getAddressByCEP(cep) {
    return axios.get(`${import.meta.env.VITE_CONSULTA_CEP_URL}/ws/${cep}/json/`);
}

export {
    validateCEP,
    getAddressByCEP,
}