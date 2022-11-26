import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  START_LOADING,
  END_LOADING,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  FETCH_BY_CREATOR,
} from '@/constants/actionTypes'
import * as api from '@/api/index.jsx'
import { toast } from 'react-hot-toast'

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.fetchPosts(page)
    dispatch({ type: FETCH_ALL, payload: data })

    dispatch({ type: END_LOADING })
  } catch (error) {
    toast.error('Error! Posts not loaded!')
    console.log(error.message)
  }
}

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const { data } = await api.fetchPost(id)

    dispatch({ type: FETCH_POST, payload: { post: data } })
  } catch (error) {
    toast.error('Error! Post not loaded!')
    console.log(error)
  }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery)
    dispatch({ type: FETCH_BY_SEARCH, payload: data })

    dispatch({ type: END_LOADING })
  } catch (error) {
    toast.error('Error! Posts not loaded!')
    console.log(error.message)
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.createPost(post)

    dispatch({ type: CREATE, payload: data })
    dispatch({ type: END_LOADING })

    dispatch(getPosts(1))
  } catch (error) {
    console.log(error.message)
    return data
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error.message)
    return data
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)
    dispatch({ type: LIKE, payload: data })
  } catch (error) {
    toast.error('Error!')
    console.log(error.message)
  }
}

export const deletePost = (id, page) => async (dispatch) => {
  try {
    const data = await api.deletePost(id)
    dispatch({ type: DELETE, payload: id })
    dispatch(getPosts(page))
  } catch (error) {
    console.log(error.message)
    return data
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id)
    dispatch({ type: COMMENT, payload: data })
    //    return data.comments
  } catch (error) {
    console.log(error)
    return data
  }
}

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const {
      data: { data },
    } = await api.fetchPostsByCreator(name)

    dispatch({ type: FETCH_BY_CREATOR, payload: { data } })
    dispatch({ type: END_LOADING })
  } catch (error) {
    toast.error('Error! Posts not loaded!')
    console.log(error)
  }
}
