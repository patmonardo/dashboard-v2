import { FormField, FormShape } from '@/ui/graphics/schema/form';

export class ShapeToHTMLAdapter {
  static toHTML(shape: FormShape, data?: any): string {
    let html = `<div><h1>${shape.layout.title}</h1>`;

    shape.fields.forEach((field) => {
      switch (field.type) {
        case 'text':
          html += ShapeToHTMLAdapter.renderText(field);
          break;
        case 'email':
          html += ShapeToHTMLAdapter.renderEmail(field);
          break;
        case 'number':
          html += ShapeToHTMLAdapter.renderNumber(field);
          break;
        case 'select':
          html += ShapeToHTMLAdapter.renderSelect(field);
          break;
        case 'date':
          html += ShapeToHTMLAdapter.renderDate(field);
          break;
      }
    });

    html += `</div>`;
    return html;
  }

  static renderText(field: FormField): string {
    return `<div><label for="${field.id}">${field.label}</label><input type="text" id="${field.id}" name="${field.id}" required="${field.required}" /></div>`;
  }

  static renderEmail(field: FormField): string {
    return `<div><label for="${field.id}">${field.label}</label><input type="email" id="${field.id}" name="${field.id}" required="${field.required}" /></div>`;
  }

  static renderNumber(field: FormField): string {
    return `<div><label for="${field.id}">${field.label}</label><input type="number" id="${field.id}" name="${field.id}" required="${field.required}" /></div>`;
  }

  static renderSelect(field: FormField): string {
    return `<div><label for="${field.id}">${field.label}</label><select id="${field.id}" name="${field.id}" required="${field.required}">{/* Render options here */}</select></div>`;
  }

  static renderDate(field: FormField): string {
    return `<div><label for="${field.id}">${field.label}</label><input type="date" id="${field.id}" name="${field.id}" required="${field.required}" /></div>`;
  }
}
