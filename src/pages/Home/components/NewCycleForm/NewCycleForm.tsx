import {
  FormContainer,
  MinutesAmountInput,
  TaskInput,
} from './NewCycleForm.styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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

export function NewCycleForm() {
  /**
   * register - Função do react-hook-form que registra um input do formulário
   * quando não se possui um objeto do modelo predefinido de formulário.
   *
   * handleSubmit - Função do react-hook-form que recebe uma função de callback
   * que será executada quando o formulário for submetido.
   */
  const { register, handleSubmit, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em:</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        disabled={!!activeCycle}
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto A" />
        <option value="Projeto B" />
        <option value="Projeto C" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        id="minutesAmount"
        type="number"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
