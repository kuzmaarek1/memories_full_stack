import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import useStyles from './styles'
import memoriesLogo from '@/images/memoriesLogo.png'
import memoriesText from '@/images/memoriesText.png'

import { LOGOUT } from '@/constants/actionTypes'

const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const logout = () => {
    dispatch({ type: LOGOUT })
    navigate('/auth')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token
    if (token) {
      const decodedToken = jwt_decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) logout()
    }
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img className={classes.image} src={memoriesText} alt="icon" />
        <img className={classes.image} src={memoriesLogo} alt="icon" />
      </Link>
      <Toolbar className={classes.toolbar}>
        <div className={classes.profile}>
          {user ? (
            <>
              <Avatar
                className={classes.purple}
                alt={user?.result.name}
                src={user?.result.imageUrl}
              >
                {user?.result?.name?.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logout}
                color="secondary"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
