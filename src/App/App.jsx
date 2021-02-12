import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { Box } from '@material-ui/core';
import Home from '../_components/Home/Home';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        const { searchSettings, searchResults } = this.props;
		const { query, articleType, timeRange, sort } = searchSettings;
		const { page } = searchResults;

        if(window.location.pathname==='/')
            history.push(`/query=${query}/sort=${sort}/page=${page}/dateRange=${timeRange}/type=${articleType}`);
        return (
            <Container component="main" maxWidth="lg">
                {alert.message &&
                    <Box m={2} pt={3}>
                        <Alert variant="outlined" severity={`${alert.type}`}>
                            {alert.message}
                        </Alert>
                    </Box>
                }
                
                <Router history={history}>
                    <Switch>
                            <PrivateRoute exact path="/query=:query?/sort=:sort/page=:page/dateRange=:dateRange/type=:type" component={Home} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </Container>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    const { searchSettings, searchResults } = state;
    const { users, authentication } = state;
    const { user } = authentication;
    return { searchSettings, searchResults, user, users, alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };