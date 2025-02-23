import { ImageShapeSchema, type ImageShape } from '@/ui/graphics/schema/image';
import { Image } from './image';

export class CustomerImage extends Image<ImageShape> {
  constructor(private readonly config: Partial<ImageShape>) {
    super(config);
  }

  protected create(): ImageShape {
    return ImageShapeSchema.parse({
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
  }

  protected edit(): ImageShape {
    return this.create();
  }

  render(): ImageShape {
    return this.create();
  }
}
