import config from 'config';
import { authHeader } from '../_helpers';

export const subscribeService = {
    getCurrent,
    delete : _delete,
    subscribe,
    sendTestSMS
};

function sendTestSMS(id, sbid) {
    console.log('###subscribe.service : id : ' + id + ', sbid : ' + sbid);
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify({'id':id,'sbid':sbid})

    };

    return fetch(`${config.apiUrl}/sms/sendTestSMS`, requestOptions).then(handleResponse);
}

function getCurrent(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function _delete(id,sbid) {
    const requestOptions = {
        method: 'DELETE',
        headers : authHeader()
    }

    return fetch(`${config.apiUrl}/users/${id}/subscription/${sbid}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function subscribe(id,subscirbe) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(),'Content-Type': 'application/json' },
        body: JSON.stringify(subscirbe)
    };

    return fetch(`${config.apiUrl}/users/${id}/subscribe`, requestOptions).then(handleResponse);
}