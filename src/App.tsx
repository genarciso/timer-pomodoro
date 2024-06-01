import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default.styles'
import { GlobalStyle } from './styles/global.styles'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  )
}
