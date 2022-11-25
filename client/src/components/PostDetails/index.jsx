import React, { useEffect } from 'react'
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  CardMedia,
  ButtonBase,
  Card,
  Grid,
} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPost, getPostsBySearch } from '@/actions/posts'
import useStyles from './styles'
import CommentSection from './CommentSection'

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles()
  const { id } = useParams()
  const serverPublic = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    dispatch(getPost(id))
  }, [id])

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
    }
  }, [post])

  if (!post) return null

  const openPost = (_id) => navigate(`/posts/${_id}`)

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    )
  }

  const recommendedPosts = posts.filter(({ _id }, index) => {
    if (index < 7) return _id !== post._id
  })

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => (
              <Link
                to={`/tags/${tag}`}
                style={{ textDecoration: 'none', color: '#3f51b5' }}
              >
                {` #${tag} `}
              </Link>
            ))}
          </Typography>
          <div className={classes.imageSection}>
            <img
              className={classes.mediaDownSm}
              src={
                post.selectedFile !== ''
                  ? `${serverPublic}${post.selectedFile}`
                  : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
              }
              alt={post.title}
            />
          </div>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by:
            <Link
              to={`/creators/${post.name}`}
              style={{ textDecoration: 'none', color: '#3f51b5' }}
            >
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.mediaUpSm}
            src={
              post.selectedFile !== ''
                ? `${serverPublic}${post.selectedFile}`
                : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <Grid key={_id} item xs={12} sm={12} md={3} lg={2}>
                  <Card className={classes.cardPostSimlar} raised elevation={6}>
                    <ButtonBase
                      className={classes.cardActionPostSimilar}
                      component="button"
                      name="test"
                      onClick={() => openPost(_id)}
                    >
                      <CardMedia
                        className={classes.mediaPostSimlar}
                        image={
                          selectedFile !== ''
                            ? `${serverPublic}${selectedFile}`
                            : 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
                        }
                        title={title}
                      />
                      <div className={classes.overlay}>
                        <Typography gutterBottom variant="h6">
                          {title}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          {name}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          {message.length > 50
                            ? `${message.substring(0, 50)}...`
                            : message}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                          Likes: {likes.length}
                        </Typography>
                      </div>
                    </ButtonBase>
                  </Card>
                </Grid>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default Post
