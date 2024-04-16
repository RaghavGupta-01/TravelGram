import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {signin,signup} from '../../actions/auth'
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState(initialState);


  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (e,res) => {
    e.preventDefault();

    console.log(formData)

    if(isSignup){
        dispatch(signup(formData,navigate));
    }else{
        dispatch(signin(formData,navigate));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const switchMode = () => {
    setIsSignup((previsSignup) => !previsSignup)
    handleShowPassword(false);
  }

  const googleSuccess = async (res) => {
    console.log(res);
    const result = jwtDecode(res.credential);

    try {
      dispatch({ type: 'AUTH', data: { result } });

      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }
  const googleFailure = (error) => {
    console.log(error)
    console.log("Google Sign In was unsuccessful. Try Again")
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} autoFocus type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type='password' />}
          </Grid>
          <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>{isSignup ? 'Sign Up' : 'Sign In'} </Button>
          <Grid container justifyContent='center'>
            <GoogleOAuthProvider clientId='304865678711-4dl8k3jh73ph494joqmkdep6c3lmsuff.apps.googleusercontent.com'>
              <GoogleLogin
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? 'Already a user?,Sign In' : 'New user?,Sign Up'} </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;