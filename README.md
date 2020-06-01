# IndexReminderSystemV1

development memo : 

1.Brief introduction for login module, first thing here is JWT,  FrontEnd would save token while Login/PWD are authenticate. like this localStorage.setItem('user', JSON.stringify(user)); And after that every request sent out would use token in user OBJ like this return { 'Authorization': 'Bearer ' + user.token };
the JWT work perfectly as of now , one thing is that I am making JWT expired every 1 hour so as to avoid Token was stolen by others. Say, if you got my Token, and it never go expiration, you keep pick my data through this token, that would be nightmight for user who leak their token accidentally.
The problem here is that how should we do to refresh the token from Server, because it will expires after one hour loign. We can not kick user out by that. still doing research on it

refresh JWT : 


2.for Redux, I would say it is samewhat complicated. the concept we need to know first is, Reducer, 

steps to use Redux in React Project : 
1. wrap Root Component with <Provider store={store}>
2. connect Redux to Component, here we must be carefull as anything changed in Store would trigger whole ConnectedComponent refresh, it would have performance issue in somecases. I did not met yet, but will.
after Component get connected, it will be able to do two things: 1.access Store in Redux; 2. send out action to change Store.
Component got refresh while Store was changed by Action.
I am giving an example here : 
in APP.jsx component, we connect to Redux like this connect(mapState, actionCreators)(App);
and in mapState, we return Store fileds APP.jsx component need(because Store could be huge in a medium project)
function mapState(state) {
    const { alert } = state;
    return { alert };
}
after that App.jsx would have ability to access Store like this : 
const { alert } = this.props;
