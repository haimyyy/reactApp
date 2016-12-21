import {
ADD_MESSAGE,
GET_ALL_MESSAGES} from '../App/constants';
var SERVER_URL = "http://localhost:8080"
export function addMessage(message) {
    return function (dispatch) {
        var request = new Request(SERVER_URL + '/add_message', {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }),
            body: JSON.stringify({
                message: message,
            })
        });

        fetch(request).then(function(response) {
            console.log(response)
             if (!response.ok) {
                throw Error(response.statusText);
            }
            response.json().then(function(data) {
                dispatch(addMessageInner(data))
            });

        }).catch(function(error) {
           alert('ישנה שגיאה אנא נסה מחדש ' + error.message);
        });
    }
}

function addMessageInner(message) {
    return {
        type: ADD_MESSAGE,
        message: message
    };
}