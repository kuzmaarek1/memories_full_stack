import * as api from '../api/index.jsx'

export const uploadImage = (data) => async (dispatch) => {
  try {
    await api.uploadImage(data)
  } catch (e) {
    console.log(error)
  }
}
