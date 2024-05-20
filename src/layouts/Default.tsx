import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

function DefaultLayout() {
  /**
   * O <Outlet /> do react-router-dom demarca o local, onde o conteúdo ficará.
   */
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export { DefaultLayout }
