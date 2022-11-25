import React, { useState } from 'react'
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  Modal,
  Box,
} from '@material-ui/core'
import { IoIosCreate } from 'react-icons/io'
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MuiChipsInput } from 'mui-chips-input'
import { getPostsBySearch } from '@/actions/posts'
import { useQuery } from '@/hooks/useQuery'
import useStyles from './styles'
import { Posts, Form, Pagination } from '*'

const Home = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')
  const [currentId, setCurrentId] = useState(0)
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [toggle, setToggle] = useState(false)

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
      navigate(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      )
    } else {
      navigate('/')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchPost()
    }
  }

  const handleChange = (tag) => setTags(tag)

  const handleOpen = () => {
    setToggle(true)
  }

  const handleClose = () => {
    setToggle(false)
  }

  return (
    <>
      <Modal open={toggle} onClose={handleClose} className={classes.modal}>
        <Box className={classes.modalContainer}>
          <GrClose className={classes.closeButton} onClick={handleClose} />
          <Form
            currentId={currentId}
            setCurrentId={setCurrentId}
            className={classes.modalForm}
          />
        </Box>
      </Modal>
      <AppBar
        className={classes.appBarSearch}
        position="static"
        color="inherit"
      >
        <div className={classes.elemnetAppBar}>
          <TextField
            name="search"
            style={{ width: '90%' }}
            color="primary"
            variant="outlined"
            label="Search Memories"
            size="small"
            onKeyPress={handleKeyPress}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={classes.elemnetAppBar}>
          <MuiChipsInput
            name="tag"
            variant="outlined"
            size="small"
            style={{ width: '90%' }}
            value={tags}
            onChange={handleChange}
            label="Search Tags"
          />
        </div>
        <div className={`${classes.elemnetAppBar} ${classes.elemnetButton}`}>
          <Button onClick={searchPost} color="primary" variant="contained">
            Search
          </Button>
          <IoIosCreate className={classes.icons} onClick={handleOpen} />
        </div>
      </AppBar>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            className={classes.container}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={12} md={12} lg={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <div className={classes.form}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </div>
              {!searchQuery && !tags.length && (
                <Paper elevation={6} className={classes.pagination}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  )
}

export default Home
