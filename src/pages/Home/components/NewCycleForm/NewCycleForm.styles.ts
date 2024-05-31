import styled from 'styled-components'

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
