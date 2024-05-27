import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './DefaultLayout.styles'

function DefaultLayout() {
  /**
   * O <Outlet /> do react-router-dom demarca o local, onde o conteúdo ficará.
   */
  return (
    <LayoutContainer>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}

export { DefaultLayout }
