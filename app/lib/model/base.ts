import { z } from 'zod'
import type { Base, BaseState, BaseShape } from '../data/schema/base'

export abstract class BaseModel<T extends Base> {
  // Core data and validation
  constructor(
    protected readonly schema: z.ZodType<T>,
    protected readonly value: T
  ) { }

  // Pure validation
  validate(): boolean {
    try {
      this.schema.parse(this.value)
      return true
    } catch {
      return false
    }
  }

  // Pure transformation - returns new data
  map<U extends Base>(fn: (value: T) => U): U {
    return fn(this.value)
  }

  // Get current state
  getState(): BaseState {
    return {
      status: 'active',
      validation: {},
      message: undefined
    }
  }

  // Get complete shape
  getShape(): BaseShape {
    return {
      base: this.value,
      state: this.getState()
    }
  }
}
