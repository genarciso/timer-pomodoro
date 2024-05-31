import { useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './Countdown.styles'
import { differenceInSeconds } from 'date-fns'
import { Cycle } from '../../Home'

/**
 * --- Alerta ---
 * Uma má pratica criar um componente com muitas props dependentes de seu pai.
 * Isso é chamado de props drilling. Pode ser evitado com o uso de contextos.
 */
// interface CountdownProps {
//   activeCycle: Cycle | undefined
//   activeCycleId: string | null
//   setCycles: any
//   setActiveCycleId: any
}

export function Countdown() {
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = String(Math.floor(currentSeconds / 60)).padStart(2, '0')
  const secondsAmount = String(currentSeconds % 60).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
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

          setAmountSecondPassed(totalSeconds)
          setActiveCycleId(null)
          clearInterval(interval)
        } else {
          setAmountSecondPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesAmount}:${secondsAmount} - ${activeCycle.task}`
    } else {
      document.title = 'Timer - Pomodoro'
    }
  }, [minutesAmount, secondsAmount])

  return (
    <CountdownContainer>
      <span>{minutesAmount[0]}</span>
      <span>{minutesAmount[1]}</span>
      <Separator>:</Separator>
      <span>{secondsAmount[0]}</span>
      <span>{secondsAmount[1]}</span>
    </CountdownContainer>
  )
}
