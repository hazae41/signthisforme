export class UIError extends Error {
  readonly #class = UIError
  readonly name = this.#class.name
}

export namespace Errors {

  export function toJSON(error: unknown): unknown {
    if (Array.isArray(error))
      return error.map(toJSON)
    if (error instanceof Error)
      return { name: error.name, message: error.message, cause: toJSON(error.cause) }
    return error
  }

  export function toString(error: unknown) {
    return JSON.stringify(toJSON(error))
  }
  export function log(error: unknown) {
    console.error({ error })
  }

  export function alert(error: unknown) {
    if (error instanceof UIError)
      return globalThis.alert(error.message)
    return globalThis.alert(toString(error))
  }

  export function logAndAlert(error: unknown) {
    log(error)
    alert(error)
  }

  export async function runAndAlert<T>(callback: () => Promise<T>) {
    try {
      return await callback()
    } catch (e: unknown) {
      alert(e)
      throw e
    }
  }

  export async function runAndAlertSync<T>(callback: () => Promise<T>) {
    try {
      return await callback()
    } catch (e: unknown) {
      alert(e)
      throw e
    }
  }

  export async function runAndLogAndAlert<T>(callback: () => Promise<T>) {
    try {
      return await callback()
    } catch (e: unknown) {
      alert(e)
      log(e)
      throw e
    }
  }

  export function runAndLogAndAlertSync<T>(callback: () => T) {
    try {
      return callback()
    } catch (e: unknown) {
      alert(e)
      log(e)
      throw e
    }
  }

}