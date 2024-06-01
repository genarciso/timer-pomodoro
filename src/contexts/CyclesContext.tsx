import { ReactNode, createContext, useReducer, useState } from 'react'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CreateNewCycle {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  activeCycleId: string | null
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  markCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateNewCycle) => void
  interruptCurrentCycle: () => void
}

interface InfoCyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CyclesContext = createContext<CycleContextType>(
  {} as CycleContextType,
)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  /**
   * useReducer - Hook do React que permite gerenciar estados complexos.
   * O useReducer é utilizado quando possui estados mais complexos,
   * que precisa do seu estado anterior ou de outras fontes para realizar sua mudança.
   */
  const [infoCyclesState, dispatchChangeOnCycles] = useReducer(
    (
      actualState: InfoCyclesState,
      action: { type: string; payload?: { newCycle: Cycle } },
    ) => {
      const { newCycle } = action.payload || { newCycle: {} as Cycle }
      switch (action.type) {
        case 'CREATE_CYCLE':
          return {
            ...actualState,
            cycles: [...actualState.cycles, newCycle],
            activeCycleId: newCycle.id,
          }
        case 'FINISH_CYCLE':
          return {
            ...actualState,
            cycles: actualState.cycles.map((cycle) =>
              cycle.id === actualState.activeCycleId
                ? { ...cycle, finishedDate: new Date() }
                : cycle,
            ),
            activeCycleId: null,
          }
        case 'INTERRUPT_CYCLE':
          return {
            ...actualState,
            cycles: actualState.cycles.map((cycle) =>
              cycle.id === actualState.activeCycleId
                ? { ...cycle, interruptedDate: new Date() }
                : cycle,
            ),
            activeCycleId: null,
          }
        default:
          return actualState
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = infoCyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCycleAsFinished() {
    if (!activeCycle) {
      return
    }
    dispatchChangeOnCycles({
      type: 'FINISH_CYCLE',
    })
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateNewCycle) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      startDate: new Date(),
      minutesAmount: data.minutesAmount,
    }

    dispatchChangeOnCycles({
      type: 'CREATE_CYCLE',
      payload: { newCycle },
    })

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatchChangeOnCycles({
      type: 'INTERRUPT_CYCLE',
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycleId,
        cycles,
        activeCycle,
        amountSecondsPassed,
        markCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
