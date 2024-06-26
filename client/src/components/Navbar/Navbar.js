import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Button, AppBar, Avatar, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode'
import useStyles from './styles';
import travelgram from '../../images/travelgram.png';
import heading from '../../images/heading.png';
import icon from '../../images/icon.png';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        navigate('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <NavLink to='/' className={classes.brandContainer}>
                {/* <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">TravelGram</Typography> */}
                <img  src={heading} alt="icon" height="60px" />
                <img className={classes.image} src={icon} alt="icon" height="60px" />
            </NavLink>
            <Toolbar className={classes.toolbar}>
                {user && user.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (

                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;