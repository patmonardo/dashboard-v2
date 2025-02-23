import { ImageShapeSchema, type ImageShape } from '@/ui/graphics/schema/image';
import { Image } from './image';

export class AvatarImage extends Image<ImageShape> {
  constructor(private readonly config: Partial<ImageShape>) {
    super(config);
  }

  protected create(): ImageShape {
    return ImageShapeSchema.parse({
      src: this.config.src || '/placeholder-avatar.png',
      alt: this.config.alt || 'User avatar',
      size: {
        width: 40,
        height: 40,
        aspectRatio: '1/1'
      },
      fit: 'cover',
      position: 'center',
      loading: 'eager', // Avatars should load immediately
      quality: 90      // Higher quality for small images
    });
  }

  protected edit(): ImageShape {
    return this.create();
  }

  render(): ImageShape {
    return this.create();
  }
}
