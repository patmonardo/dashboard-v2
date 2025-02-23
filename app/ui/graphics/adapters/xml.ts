import type { FormMatter, FormShape, FormElement } from '@/ui/graphics/schema/form';

export class ShapeToXMLAdapter {
  static toXML(shape: FormShape, data: FormMatter): string {
    let xml = `<form title="${shape.layout.title}">\n`;

    shape.elements.forEach(element => {
      xml += `  <element id="${element.id}" type="${element.type}" label="${element.label}">\n`;
      xml += `    <value>${data?.[element.id] || ''}</value>\n`;
      xml += `  </element>\n`;
    });

    xml += `</form>`;
    return xml;
  }
}
