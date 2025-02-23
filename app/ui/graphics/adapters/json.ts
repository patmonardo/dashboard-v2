import type { FormMatter, FormShape } from '@/ui/graphics/schema/form';

export class ShapeToJSONAdapter {
  static toJSON(shape: FormShape, data: FormMatter): string {
    const json = {
      layout: {
        title: shape.layout.title,
      },
      elements: shape.elements.map((element) => ({
        id: element.id,
        label: element.label,
        value: data?.[element.id] || '', // Use data to populate the value
      })),
    };
    return JSON.stringify(json, null, 2);
  }
}
