import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './Countdown.styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../Home'

/**
 * --- Alerta ---
 * É uma má pratica criar um componente com muitas props dependentes de seu pai.
 * Isso é chamado de props drilling. Pode ser evitado com o uso de contextos.
 */
// interface CountdownProps {
//   activeCycle: Cycle | undefined
//   activeCycleId: string | null
//   setCycles: any
//   setActiveCycleId: any
// }

export function Countdown() {
  const { activeCycle, activeCycleId, markCycleAsFinished } =
    useContext(CyclesContext)

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
          markCycleAsFinished()

          setAmountSecondPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCycleAsFinished])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesAmount}:${secondsAmount} - ${activeCycle.task}`
    } else {
      document.title = 'Timer - Pomodoro'
    }
  }, [minutesAmount, secondsAmount, activeCycle])

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
