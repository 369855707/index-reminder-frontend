import { subscribeConstants } from '../_constants';
import { subscribeService } from '../_services';
import { history } from '../_helpers';
import { alertActions } from './';

export const subscribeActions = {
    getCurrent,
    delete:_delete,
    subscribe,
    sendTestSMS
};

function sendTestSMS(id, sbid) {
    return dispatch => {
        dispatch(request());
        console.log("user.action -> sendTestSMS : id :" + id + ', sbid : ' + sbid)
            subscribeService.sendTestSMS(id, sbid)
            .then(() => {
                    dispatch(success());
                    //history.push('/');
                    dispatch(alertActions.success('Send SMS successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: subscribeConstants.TESTSMS_REQUEST}}
    function success() { return { type: subscribeConstants.TESTSMS_SUCCESS}}
    function failure(error) { return { type: subscribeConstants.TESTSMS_FAILURE, error}}
}

function _delete(id, sbid) {
    console.log('########subscribe.action _delete')
    return dispatch => {
        dispatch(request(sbid));
        subscribeService.delete(id,sbid)
        .then(
            () => dispatch(success(sbid)),
            error => dispatch(failure(error.toString()))
        )
    };

    function request(id) {return {type : subscribeConstants.SUBSCRIBE_DELETE_REQUEST, id}}    
    function success(id) {return {type : subscribeConstants.SUBSCRIBE_DELETE_SUCCESS, id}}
    function failure(error) {return {type : subscribeConstants.SUBSCRIBE_DELETE_FAILURE, error}}
}

function getCurrent(id) {
    return dispatch => {
        dispatch(request());
        subscribeService.getCurrent(id)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: subscribeConstants.SUBSCRIBE_GETCURRENT_REQUEST } }
    function success(user) { return { type: subscribeConstants.SUBSCRIBE_GETCURRENT_SUCCESS, user } }
    function failure(error) { return { type: subscribeConstants.SUBSCRIBE_GETCURRENT_FAILURE, error } }
}


function subscribe(id, subscribe) {
    return dispatch => {
        dispatch(request());
        console.log("user.action : " + JSON.stringify(subscribe))
            subscribeService.subscribe(id, subscribe)
            .then(() => {
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Subscribe successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: subscribeConstants.SUBSCRIBE_REQUEST} }
    function success(subscribe) { return { type: subscribeConstants.SUBSCRIBE_SUCCESS, subscribe } }
    function failure(error) { return { type: subscribeConstants.SUBSCRIBE_REQUEST, error } }
}