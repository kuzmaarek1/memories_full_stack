import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useRoutes,
} from 'react-router-dom'
import { Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Home, Auth, Navbar, PostDetails, CreatorOrTag } from '@/components'

const FindPosts = () =>
  useRoutes([
    { path: '/creators/:name', element: <CreatorOrTag /> },
    { path: '/tags/:name', element: <CreatorOrTag /> },
  ])

const App = () => {
  const user = useSelector((state) => state.auth.authData)
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" replace />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<PostDetails />} />
          <Route
            path="/auth"
            exact
            element={!user ? <Auth /> : <Navigate to="/posts" replace />}
          />
        </Routes>
        <FindPosts />
      </Container>
    </BrowserRouter>
  )
}

export default App
