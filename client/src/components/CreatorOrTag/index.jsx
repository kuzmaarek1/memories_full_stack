import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { Typography, CircularProgress, Grid, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByCreator, getPostsBySearch } from '@/actions/posts'
import { Post } from '*'

const CreatorOrTag = () => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const { posts, isLoading } = useSelector((state) => state.posts)

  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }))
    } else {
      dispatch(getPostsByCreator(name))
    }
  }, [])

  if (!posts?.data?.length && !isLoading) return 'No posts'

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading && posts?.length ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.data?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post key={post._id} post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default CreatorOrTag
