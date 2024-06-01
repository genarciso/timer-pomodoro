import { ReactNode, createContext, useState } from 'react'

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

export const CyclesContext = createContext<CycleContextType>(
  {} as CycleContextType,
)

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCycleAsFinished() {
    if (!activeCycle) {
      return
    }

    setCycles((prevCycles: Cycle[]) =>
      prevCycles.map((cycle) => {
        if (cycle.id === activeCycle.id) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }

        return cycle
      }),
    )
    setActiveCycleId(null)
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

    setCycles((prevCycles) => [...prevCycles, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    setCycles((prevCycles) =>
      prevCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      }),
    )

    setActiveCycleId(null)
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
