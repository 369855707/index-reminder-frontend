import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions,subscribeActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleDeleteSubscription = this.handleDeleteSubscription.bind(this);
        this.sendTestSMS = this.sendTestSMS.bind(this);
    }

    componentDidMount() {
        console.log('###componentDidMount : ' + JSON.stringify(this.props.user));
        this.props.getUsers();
        this.props.getCurrentUser(this.props.user._id);
        console.log("##HomePage : subscription : " + JSON.stringify(this.props.subscription))
    }

    handleDeleteUser(id) {
        console.log('### HomePage -> handleDeleteUser, id : ' + id)
        return (e) => this.props.deleteUser(id);
    }

    handleDeleteSubscription(id,sbid) {
        console.log('### HomePage -> deleteSubscription, id - sbid : ' + id + ' - '+ sbid)
        return () => this.props.deleteSubscription(id,sbid);
    }

    sendTestSMS(id,sbid) {
        console.log('### HomePage -> sendTestSMS :' + id + ' - '+ sbid);
        return () => this.props.sendTestSMS(id,sbid);
    }

    render() {
        const { user, users, subscription } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <h3>Your Subscriptions:</h3>
                {subscription.items && 
                    <ul>
                        {subscription.items.map((item, index) =>
                            <li key={item._id}>
                                {item.code + ' ' + item.alarmPrice + ' ' + item.createDate}
                                <span> - <a onClick={this.handleDeleteSubscription(user._id,item._id)}>Delete</a></span>
                                <span> - <a onClick={this.sendTestSMS(user._id,item._id)}>sendTestSMS</a></span>
                                
                            </li>
                        )}
                    </ul>
                }

                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                            : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/subscribe">Subscribe</Link>
                </p>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication,subscription } = state;
    const { user } = authentication;
    return { user, users, subscription };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getCurrentUser : subscribeActions.getCurrent,
    deleteSubscription : subscribeActions.delete,
    sendTestSMS : subscribeActions.sendTestSMS
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };