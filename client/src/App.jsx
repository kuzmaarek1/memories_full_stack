import React from 'react'
import { Routes, Route, Navigate, useRoutes } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Home, Auth, Navbar, PostDetails, CreatorOrTag } from '@/components'

const App = () => {
  const user = useSelector((state) => state.auth.authData)
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Navigate to="/posts" replace />} />
        <Route path="/posts" exact element={<Home />} />
        <Route path="/posts/search" exact element={<Home />} />
        <Route path="/posts/:id" exact element={<PostDetails />} />
        {['/creators/:name', '/tags/:name'].map((path, index) => (
          <Route path={path} element={<CreatorOrTag />} key={index} />
        ))}
        <Route
          path="/auth"
          exact
          element={!user ? <Auth /> : <Navigate to="/posts" replace />}
        />
      </Routes>
    </Container>
  )
}

export default App
