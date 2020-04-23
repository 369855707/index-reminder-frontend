import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { subscribeActions } from '../_actions';

class SubscribePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                subscribe: {
                    code: '',
                    alarmPrice:''
                },
                submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value } = event.target;
        const {subscribe} = this.state
        this.setState({
            subscribe : {
                ...subscribe,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { subscribe } = this.state;
        //this.props.user.subscribe.push(subscribe)
        console.log("before send action : " + JSON.stringify(subscribe));

        if (subscribe.code) {
            this.props.subscribe(this.props.user._id,subscribe);
        }
    }

    render() {
        const { subscribe, submitted } = this.state;
        const { subscribing } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Subscribe</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !subscribe.code ? ' has-error' : '')}>
                        <label htmlFor="code">code</label>
                        <input type="text" className="form-control" name="code" value={subscribe.code} onChange={this.handleChange} />
                        {submitted && !subscribe.code &&
                            <div className="help-block">code is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !subscribe.alarmPrice ? ' has-error' : '')}>
                        <label htmlFor="alarmPrice">alarmPrice</label>
                        <input type="text" className="form-control" name="alarmPrice" value={subscribe.alarmPrice} onChange={this.handleChange} />
                        {submitted && !subscribe.alarmPrice &&
                            <div className="help-block">alarmPrice is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Subscribe</button>
                        {subscribing && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { user } = state.authentication;
    const { subscribing } = state.subscription;
    // const { subscribing } = state.subscribing;
    return { user, subscribing };
}

const actionCreators = {
    subscribe: subscribeActions.subscribe
}

const connectedSubscribePage = connect(mapState, actionCreators)(SubscribePage);
export { connectedSubscribePage as SubscribePage };