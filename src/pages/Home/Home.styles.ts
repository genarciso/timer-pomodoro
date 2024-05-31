import styled from 'styled-components'

export const HomeContainer = styled.div`
  flex: 1;
  max-height: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5.6rem;
  }
`

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.8rem;
  font-weight: bold;

  flex-wrap: wrap;
`

/**
 * O BaseInput é um componente de input genérico, que pode ser estilizado
 * passará suas propriedades para o input que herda-lo.
 */
const BaseInput = styled.input`
  background-color: transparent;
  height: 4rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};

  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme['gray-100']};

  padding: 0 0.8rem;

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 6.4rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 16rem;
  line-height: 12.8rem;

  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  gap: 1.6rem;

  span {
    background: ${({ theme }) => theme['gray-700']};
    padding: 3.2rem 1.6rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 3.2rem 0;
  color: ${({ theme }) => theme['green-500']};

  width: 6.4rem;
  overflow: hidden;

  display: flex;
  justify-content: center;
`

export const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1.6rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  font-weight: bold;

  color: ${({ theme }) => theme['gray-100']};

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background-color: ${({ theme }) => theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['red-700']};
  }
`
