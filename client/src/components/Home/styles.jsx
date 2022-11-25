import { makeStyles } from '@material-ui/core/styles'
export default makeStyles((theme) => ({
  appBarSearch: {
    margin: 'auto',
    width: '95%',
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'grid',
    gridTemplateColumns: '0.5fr 0.5fr 0.2fr',
    gap: '5px',
    padding: '5px',
  },
  elemnetAppBar: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  icons: {
    display: 'none',
  },
  modal: {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    appBarSearch: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gridTemplateRows: '1fr 0.2fr',
    },
    elemnetButton: {
      gridColumn: 'span 2 / span 2',
      position: 'relative',
    },
    icons: {
      display: 'block',
      position: 'absolute',
      top: 0,
      right: '20px',
      bottom: 0,
      margin: 'auto 0',
      width: '30px',
      height: '30px',
      cursor: 'pointer',
    },
    form: {
      display: 'none',
    },
    modal: {
      display: 'block',
    },
    modalContainer: {
      position: 'absolute',
      width: '90%',
      outline: 'none',
      border: 'none',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    closeButton: {
      position: 'absolute',
      cursor: 'pointer',
      top: '12px',
      right: '12px',
    },
    modalForm: {
      boxShadow: '24',
    },
    [theme.breakpoints.down('xs')]: {
      appBarSearch: {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
        gridTemplateRows: '0.2fr 1fr 0.2fr',
      },
      elemnetButton: {
        gridColumn: 'span 1 / span 1',
      },
    },
  },
}))
