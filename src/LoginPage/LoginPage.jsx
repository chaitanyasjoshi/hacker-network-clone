import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const classes = {
            paper: {
                marginTop: '64px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: '8px',
                backgroundColor: '#f48fb1',
            },
            form: {
                width: '100%', // Fix IE 11 issue.
                marginTop: '8px',
            },
            submit: {
                margin: '24px 0px 16px 0px' ,
                padding: '15px',
            },
            link: {
                color: '#648dae',
                textDecoration: 'none',
            },
          };
        const { username, password } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div style={classes.paper}>
                    <Avatar style={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Login
                    </Typography>
                    <form style={classes.form} onSubmit={this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        type="text"
                        name="username"
                        autoComplete="username"
                        value={username} 
                        onChange={this.handleChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password} 
                        onChange={this.handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={classes.submit}
                    >
                        Login
                    </Button>
                    </form>
                    <Typography>
                        <Link to="/register" style={classes.link}>Don't have an account? Register</Link>
                    </Typography>
                </div>
            </Container>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };