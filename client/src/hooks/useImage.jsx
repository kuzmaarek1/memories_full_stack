import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { uploadImage } from '@/actions/upload'

export const useImage = () => {
  const fileName = useRef('')
  const dispatch = useDispatch()
  const handleUploadImage = (image) => {
    const data = new FormData()
    fileName.current = `${Date.now()}${image.name}`
    data.append('name', fileName.current)
    data.append('file', image.file)
    try {
      dispatch(uploadImage(data))
    } catch (err) {
      console.log(err)
      fileName.current = ''
    }
  }
  return { fileName, handleUploadImage }
}
