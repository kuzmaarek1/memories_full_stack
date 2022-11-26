import * as api from '@/api/index.jsx'
import { toast } from 'react-hot-toast'

export const uploadImage = (data) => async (dispatch) => {
  try {
    await api.uploadImage(data)
  } catch (e) {
    toast.error(`Error! Image not uploaded`)
    console.log(error)
  }
}
