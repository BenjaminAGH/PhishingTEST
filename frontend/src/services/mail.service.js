import axios from './root.service.js';

export const getMail = async () => {
    try {
        const response = await axios.get('/mail');
        if (response.status === 200) {
            return response.data.data;
        }
        return [];
    } catch (error) {
        console.error(error);
    }
}

export const getMailByCaseId = async (caseId) => {
    try {
        const response = await axios.get(`/mail/${caseId}`);
        if (response.status === 200) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error(error);
    }
}

export const postMail = async (mail) => {
    try {
        const response = await axios.post('/mail', mail);
        if (response.status === 200) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error(error);
    }
}

export const putLogin = async (caseId, login) => {
    try {
        const response = await axios.put(`/mail/login/${caseId}`, login);
        if (response.status === 200) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error(error);
    }
}

export const putReported = async (id, isReported) => {
    try {
        const response = await axios.put(`/mail/${id}`, isReported);
        if (response.status === 200) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error(error);
    }
}

export const deleteMail = async (id) => {
    try {
        const response = await axios.delete(`/mail/${id}`);
        if (response.status === 200) {
            return response.data.data;
        }
        return null;
    } catch (error) {
        console.error(error);
    }
}