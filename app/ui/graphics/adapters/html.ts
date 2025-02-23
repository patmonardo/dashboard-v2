import { FormElement, FormShape } from '@/ui/graphics/schema/form';

export class ShapeToHTMLAdapter {
  static toHTML(shape: FormShape, data?: any): string {
    let html = `<div><h1>${shape.layout.title}</h1>`;

    shape.elements.forEach((element) => {
      switch (element.type) {
        case 'text':
          html += ShapeToHTMLAdapter.renderText(element);
          break;
        case 'email':
          html += ShapeToHTMLAdapter.renderEmail(element);
          break;
        case 'number':
          html += ShapeToHTMLAdapter.renderNumber(element);
          break;
        case 'select':
          html += ShapeToHTMLAdapter.renderSelect(element);
          break;
        case 'date':
          html += ShapeToHTMLAdapter.renderDate(element);
          break;
      }
    });

    html += `</div>`;
    return html;
  }

  static renderText(element: FormElement): string {
    return `<div><label for="${element.id}">${element.label}</label><input type="text" id="${element.id}" name="${element.id}" required="${element.required}" /></div>`;
  }

  static renderEmail(element: FormElement): string {
    return `<div><label for="${element.id}">${element.label}</label><input type="email" id="${element.id}" name="${element.id}" required="${element.required}" /></div>`;
  }

  static renderNumber(element: FormElement): string {
    return `<div><label for="${element.id}">${element.label}</label><input type="number" id="${element.id}" name="${element.id}" required="${element.required}" /></div>`;
  }

  static renderSelect(element: FormElement): string {
    return `<div><label for="${element.id}">${element.label}</label><select id="${element.id}" name="${element.id}" required="${element.required}">{/* Render options here */}</select></div>`;
  }

  static renderDate(element: FormElement): string {
    return `<div><label for="${element.id}">${element.label}</label><input type="date" id="${element.id}" name="${element.id}" required="${element.required}" /></div>`;
  }
}
