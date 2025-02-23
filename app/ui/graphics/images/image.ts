import { ImageShape } from '@/ui/graphics/schema/image'

export abstract class Image<T extends ImageShape> {

  constructor(protected readonly data?: unknown) { }

  protected abstract create(): T
  protected abstract edit(): T

}
