import { SyntheticEvent } from "react"

export function preventDefault(e: SyntheticEvent) {
  e.preventDefault()
}

export function stopPropagation(e: SyntheticEvent) {
  e.stopPropagation()
}

export function preventDefaultAndStopPropagation(e: SyntheticEvent) {
  e.preventDefault()
  e.stopPropagation()
}

export namespace HTMLInputEvents {

  export function select(e: SyntheticEvent<HTMLInputElement>) {
    e.currentTarget.select()
  }

}