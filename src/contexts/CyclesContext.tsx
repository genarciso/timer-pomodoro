import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducers } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

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
    cyclesReducers,
    {
      cycles: [] as Cycle[],
      activeCycleId: null,
    },
    (initialState) => {
      const stateStoredAsJSON = localStorage.getItem('@pomodoro:cycles-info')

      if (stateStoredAsJSON) {
        return JSON.parse(stateStoredAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = infoCyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function markCycleAsFinished() {
    if (!activeCycle) {
      return
    }
    dispatchChangeOnCycles(finishCycleAction())
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

    dispatchChangeOnCycles(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatchChangeOnCycles(interruptCycleAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(infoCyclesState)

    localStorage.setItem('@pomodoro:cycles-info', stateJSON)
  }, [infoCyclesState])

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
