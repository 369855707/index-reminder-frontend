import { subscribeConstants } from '../_constants';

export function sms(state = {}, action) {
  switch (action.type) {
    case subscribeConstants.TESTSMS_REQUEST:
      return {
        sending: true
      };
    case subscribeConstants.TESTSMS_SUCCESS:
      return {};
    case subscribeConstants.TESTSMS_FAILURE:
      return {};
    default:
      return state
  }
}