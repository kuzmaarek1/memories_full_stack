import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { useImage } from '@/hooks/useImage'
import { useToast } from '@/hooks/useToast'
import useStyles from './styles'
import { createPost, updatePost } from '@/actions/posts'

const Form = ({ currentId, setCurrentId, setToggle }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })
  const user = JSON.parse(localStorage.getItem('profile'))
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  )
  const dispatch = useDispatch()
  const classes = useStyles()
  const image = useImage()
  const toast = useToast()

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const clear = () => {
    setCurrentId(0)
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (postData.selectedFile) {
      image.handleUploadImage(postData.selectedFile)
      postData.selectedFile = image.fileName.current
    } else postData.selectedFile = ''
    if (currentId === 0) {
      const create = dispatch(
        createPost({ ...postData, name: user?.result?.name })
      )
      toast.handleDisplayBanner(
        create,
        `Creating post ${postData.title}`,
        `Added post ${postData.title}`
      )
      clear()
    } else {
      const update = dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      )
      toast.handleDisplayBanner(
        update,
        `Updating post ${postData.title}`,
        `Update post ${postData.title}`
      )
      clear()
    }
    setToggle(false)
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${post.title}"` : 'Creating a Memory'}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(image) =>
              setPostData({ ...postData, selectedFile: image })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default Form
