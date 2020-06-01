import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, subscribeActions } from '../_actions';

import SbTable from './SbTable'
import UserTable from './UserTable'

import HomeDrawer from './HomeDrawer'

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleDeleteSubscription = this.handleDeleteSubscription.bind(this);
        this.sendTestSMS = this.sendTestSMS.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
        this.props.getCurrentUser(this.props.user._id);
    }

    handleDeleteUser(id) {
        console.log('### HomePage -> handleDeleteUser, id : ' + id)
        return (e) => this.props.deleteUser(id);
    }

    handleDeleteSubscription(id, sbid) {
        console.log('### HomePage -> deleteSubscription, id - sbid : ' + id + ' - ' + sbid)
        return () => this.props.deleteSubscription(id, sbid);
    }

    sendTestSMS(id, sbid) {
        console.log('### HomePage -> sendTestSMS :' + id + ' - ' + sbid);
        return () => this.props.sendTestSMS(id, sbid);
    }

    render() {
        const { user, users, subscription } = this.props;
        return (
            <HomeDrawer user={user} items={subscription.items}
                onDelete={this.props.deleteSubscription}
                onSendSMS={this.props.sendTestSMS} />
        );
    }
}

function mapState(state) {
    const { users, authentication, subscription } = state;
    const { user } = authentication;
    return { user, users, subscription };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getCurrentUser: subscribeActions.getCurrent,
    deleteSubscription: subscribeActions.delete,
    sendTestSMS: subscribeActions.sendTestSMS
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };