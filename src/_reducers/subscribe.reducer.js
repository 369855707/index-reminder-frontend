import { subscribeConstants } from '../_constants';

export function subscription(state = {}, action) {
  switch (action.type) {
    case subscribeConstants.SUBSCRIBE_GETCURRENT_REQUEST:
      return {
        loading: true
      };
    case subscribeConstants.SUBSCRIBE_GETCURRENT_SUCCESS:
      return {
        items : action.user.subscribe
      };
    case subscribeConstants.SUBSCRIBE_GETCURRENT_FAILURE:
      return {
        error: action.error
      };
    case subscribeConstants.SUBSCRIBE_DELETE_REQUEST:
return {
  ...state,
  items : state.items.map(item => {
    return item._id === action.id ? {...item, deleting : true} : item
   }) 
}
   
    case subscribeConstants.SUBSCRIBE_DELETE_SUCCESS:
      return {
        ...state,
        items : state.items.filter(item => item._id !== action.id)
      }
        
    case subscribeConstants.SUBSCRIBE_DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(item => {
          if(item.id === action.id) {
            const {deleting, ...itemCopy} = item
            return {...itemCopy , deleteError : action.error}
          }

          return item;
        })
      }
      case subscribeConstants.SUBSCRIBE_REQUEST:
        return {subscribing : true};
        case subscribeConstants.SUBSCRIBE_SUCCESS:
        return {};
        case subscribeConstants.SUBSCRIBE_FAILURE:
        return {};
    default:
      return state
  }
}