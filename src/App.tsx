import { lazy, Suspense, useEffect, useState } from 'react'
import { LoginPage } from './features/auth/LoginPage'
import { HomePage } from './home/HomePage'
import type { LoginCredentials } from './features/auth/validation'

// Loaded on demand so the login page stays small.
const GalleryPage = lazy(() => import('./gallery/GalleryPage'))

const HOME_HASH = '#/'
const LOGIN_HASH = '#/login'
const GALLERY_HASH = '#/gallery'

/**
 * No authentication backend exists in this project yet, so login is a
 * frontend-only placeholder. Replace this with your real auth call; throw an
 * Error to surface its message on the form.
 */
async function handleLogin(credentials: LoginCredentials): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 900))
  console.info('Login submitted for', credentials.email)
}

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash)
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

function App() {
  const hash = useHash()

  if (hash === GALLERY_HASH) {
    return (
      <Suspense fallback={null}>
        <GalleryPage />
      </Suspense>
    )
  }

  if (hash === LOGIN_HASH) {
    return <LoginPage onLogin={handleLogin} homeHref={HOME_HASH} galleryHref={GALLERY_HASH} />
  }

  return <HomePage loginHref={LOGIN_HASH} galleryHref={GALLERY_HASH} />
}

export default App
