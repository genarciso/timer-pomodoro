import { InfoCyclesAction } from './actions'

/**
 * Immer - Biblioteca que ajuda a simplificar a manipulação de estados imutáveis.
 * Transformando a lógica de manipulação de estados imutáveis em mutáveis.
 */
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface InfoCyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducers(
  actualState: InfoCyclesState,
  action: { type: string; payload?: { newCycle: Cycle } },
) {
  const { newCycle } = action.payload || { newCycle: {} as Cycle }
  switch (action.type) {
    case InfoCyclesAction.CREATE_CYCLE:
      return produce(actualState, (draft) => {
        draft.cycles.push(newCycle)
        draft.activeCycleId = newCycle.id
      })

    case InfoCyclesAction.FINISH_CYCLE: {
      const currentCycleIndex = actualState.cycles.findIndex(
        (cycle) => cycle.id === actualState.activeCycleId,
      )

      if (currentCycleIndex === -1) {
        return actualState
      }

      return produce(actualState, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()

        draft.activeCycleId = null
      })
    }
    case InfoCyclesAction.INTERRUPT_CYCLE: {
      const currentCycleIndex = actualState.cycles.findIndex(
        (cycle) => cycle.id === actualState.activeCycleId,
      )

      if (currentCycleIndex === -1) {
        return actualState
      }

      return produce(actualState, (draft) => {
        draft.cycles[currentCycleIndex].interruptedDate = new Date()

        draft.activeCycleId = null
      })
    }
    default:
      return actualState
  }
}
