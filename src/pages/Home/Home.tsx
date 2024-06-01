import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './Home.styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

/**
 * Zod é uma biblioteca de validação de modelo de dados.
 * O react-hook-form não consegue validar os dados de um formulário por si,
 * então é necessário de uma biblioteca de validação.
 *
 * zod.object - Cria um objeto de validação.
 */
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, { message: 'Informe o nome da tarefa' }),
  minutesAmount: zod
    .number()
    .min(1, { message: 'O ciclo precisa ser de no mínimo 5 minutos' })
    .max(60, { message: 'O ciclo precisa ser de no máximo 60 minutos' }),
})

/**
 * zod.infer - Função que ajuda a inferir o tipo de dados do formulário a partir do schema de validação.
 */
export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
  /**
   * register - Função do react-hook-form que registra um input do formulário
   * quando não se possui um objeto do modelo predefinido de formulário.
   *
   * handleSubmit - Função do react-hook-form que recebe uma função de callback
   * que será executada quando o formulário for submetido.
   */
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, reset } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}

export { Home }
