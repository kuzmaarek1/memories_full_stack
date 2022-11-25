import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  mediaUpSm: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '40vw',
    maxHeight: '600px',
  },
  mediaDownSm: {
    display: 'none',
  },
  card: {
    display: 'flex',
    width: '100%',
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
  },
  recommendedPosts: {
    marginTop: '10px',
    gap: '5px',
    display: 'flex',
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  cardPostSimlar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  mediaPostSimlar: {
    paddingTop: '200px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  cardActionPostSimilar: {
    display: 'block',
    textAlign: 'initial',
  },
  [theme.breakpoints.down('sm')]: {
    mediaUpSm: {
      display: 'none',
    },
    mediaDownSm: {
      display: 'block',
      borderRadius: '20px',
      objectFit: 'cover',
      width: '100%',
      maxHeight: '400px',
      marginBottom: '5px',
    },
    card: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    imageSection: {
      marginLeft: 0,
    },
    recommendedPosts: {
      flexDirection: 'column',
    },
  },
}))
