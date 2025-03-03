import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import { commentPost } from '@/actions/posts'
import useStyles from './styles'
import { useToast } from '@/hooks/useToast'
import { useEffect } from 'react'

const CommentSection = ({ post }) => {
  const toast = useToast()
  const user = JSON.parse(localStorage.getItem('profile'))
  const posts = useSelector((state) => state.posts)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const [comments, setComments] = useState(post?.comments)
  const classes = useStyles()
  const commentsRef = useRef()

  useEffect(() => {
    comment !== '' &&
      setComments((prev) => [...prev, `${user?.result?.name}: ${comment}`])
    setComment('')
  }, [posts])

  useEffect(() => {
    commentsRef.current.scrollIntoView()
  }, [comments])

  const handleComment = async () => {
    const newComments = dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    )
    toast.handleDisplayBanner(newComments, `Adding comment`, `Added comment`)
  }
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection
