import { createGlobalStyle } from 'styled-components'

/**
 * Criação de um estilo global para o projeto
 */
export const GlobalStyle = createGlobalStyle`
  /**
  * Define o tamanho da fonte base para 10px
  * Com isso melhorar os cálculos com a unidade 'rem'
  */ 
  html {
    font-size: 62.5%;
  }

  /**
  * Remove o espaçamento interno e a margem padrão dos elementos
  * E define o cálculo do box-model para ser a partir da borda do elemento
  */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /**
  * Remove o 'focus' padrão dos elementos
  * e adiciona um 'box-shadow' personalizado
  */
  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
  }

  body {
    background-color: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};

    --webkit-font-smoothing: antialiased;
  }
`
