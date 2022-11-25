import { makeStyles } from '@material-ui/core/styles'
import { deepPurple } from '@material-ui/core/colors'

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    width: '100%',
    height: '10vh',
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginTop: '5px',
    height: '50px',
  },
  toolbar: {
    width: '50%',
  },
  profile: {
    width: '100%',
    display: 'flex',
    gap: '5%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logout: {
    marginLeft: '5px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      padding: '10px 20px',
    },
    image: {
      height: '30px',
    },
    toolbar: {
      width: '90%',
    },
  },
  [theme.breakpoints.down('xs')]: {
    appBar: {
      flexDirection: 'column',
      height: '120px',
      padding: '5px',
    },
    image: {
      height: '40px',
    },
    toolbar: {
      width: '100%',
      justifyContent: 'flex-start',
    },
    profile: {
      marginTop: '1px',
      marginBottom: '5px',
      gap: '2%',
      justifyContent: 'center',
    },
    logout: {
      transform: 'scale(0.8)',
    },
    userName: {
      fontSize: '0.9em',
    },
    brandContainer: {
      justifyContent: 'center',
      width: '100%',
    },
    purple: {
      width: '35px',
      height: '35px',
    },
  },
}))
