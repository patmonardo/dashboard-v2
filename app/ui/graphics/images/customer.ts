import { ImageShapeSchema, type ImageShape } from '@/ui/graphics/schema/image';
import { Image } from './image';
import type { OperationResult } from '@/lib/data/schema/base';

export class CustomerImage extends Image<ImageShape> {
  constructor(private readonly config: Partial<ImageShape>) {
    super(config);
  }

  protected create(): OperationResult<ImageShape> {
    const result = ImageShapeSchema.safeParse({
      src: this.config.src || '/placeholder-customer.png',
      alt: this.config.alt || 'Customer image',
      size: {
        width: 100,
        height: 100,
        aspectRatio: '1/1'
      },
      fit: 'cover',
      position: 'center',
      loading: 'lazy',
      quality: 80
    });

    if (!result.success) {
      return {
        data: null,
        status: "error",
        message: "Invalid image configuration",
      };
    }

    return {
      data: result.data,
      status: "success",
      message: "Image configuration created successfully"
    };
  }

  protected edit(): OperationResult<ImageShape> {
    return this.edit();
  }

  render(): OperationResult<ImageShape> {
    return this.render();
  }
}
