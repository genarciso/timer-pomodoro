import 'styled-components'
import { defaultTheme } from './styles/themes/default'

/**
 * Mecanismo para "tipar" o tema default do styled-components
 */
type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
