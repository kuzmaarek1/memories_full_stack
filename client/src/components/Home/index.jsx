import React, { useState } from 'react'
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { MuiChipsInput } from 'mui-chips-input'
import { getPostsBySearch } from '@/actions/posts'
import useStyles from './styles'
import { Posts, Form, Pagination } from '*'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

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

  return (
    <>
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
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
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
