import { AUTH } from '@/constants/actionTypes'
import * as api from '@/api/index.jsx'
import { toast } from 'react-hot-toast'

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    toast.error('Login failed')
    console.log(error)
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData)
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    console.log(error)
    return data
  }
}
