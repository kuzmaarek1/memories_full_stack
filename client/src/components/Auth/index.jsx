import React, { useState } from 'react'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { GoogleLogin } from '@react-oauth/google'
import LockOutlineIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import { Input } from '*'
import { AUTH } from '@/constants/actionTypes'
import { signin, signup } from '@/actions/auth'
import { useToast } from '@/hooks/useToast'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const toast = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword)

  const switchMode = () => {
    setForm(initialState)
    setIsSignup((prevIsSignup) => !prevIsSignup)
    setShowPassword(false)
  }

  const googleSuccess = async (response) => {
    const { name, picture, sub } = jwt_decode(response.credential)
    const token = response.credential
    const result = {
      _id: sub,
      _type: 'user',
      name: name,
      imageUrl: picture,
    }
    try {
      dispatch({ type: AUTH, data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const googleError = () =>
    alert('Google Sign In was unsuccessful. Try again later')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignup) {
      const singup = dispatch(signup(form, navigate))
      toast.handleDisplayBanner(
        singup,
        `Creating user`,
        `Created user`,
        `Incorrect data or user is already exists!`
      )
    } else {
      const sigin = dispatch(signin(form, navigate))
    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <Container component="main" maxwidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlineIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>

          <GoogleLogin
            logo_alignment="center"
            onSuccess={googleSuccess}
            onError={googleError}
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
