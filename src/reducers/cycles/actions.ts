import { Cycle } from './reducer'

export enum InfoCyclesAction {
  CREATE_CYCLE = 'CREATE_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: InfoCyclesAction.CREATE_CYCLE,
    payload: { newCycle },
  }
}

export function finishCycleAction() {
  return {
    type: InfoCyclesAction.FINISH_CYCLE,
  }
}

export function interruptCycleAction() {
  return {
    type: InfoCyclesAction.INTERRUPT_CYCLE,
  }
}
