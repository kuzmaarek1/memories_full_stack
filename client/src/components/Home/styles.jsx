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
  [theme.breakpoints.down('md')]: {
    appBarSearch: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gridTemplateRows: '1fr 0.2fr',
    },
    elemnetButton: {
      gridColumn: 'span 2 / span 2',
    },
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      flexDirection: 'column-reverse',
    },
    appBarSearch: {
      gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      gridTemplateRows: '0.2fr 1fr 0.2fr',
    },
    elemnetButton: {
      gridColumn: 'span 1 / span 1',
    },
  },
}))
