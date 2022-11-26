import React from 'react'
import { toast } from 'react-hot-toast'

export const useToast = () => {
  const handleDisplayBanner = (
    func,
    messageLoading,
    messageSuccess,
    messageError
  ) => {
    toast.promise(func, {
      loading: messageLoading || `Loading`,
      success: <b> {messageSuccess || `Success`} </b>,
      error: <b>{messageError || `Error! Try again later!`}</b>,
    })
  }
  return { handleDisplayBanner }
}
