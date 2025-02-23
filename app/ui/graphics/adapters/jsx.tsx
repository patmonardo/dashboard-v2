import React from 'react';
import { FormElement, FormMode, FormMatter, FormShape } from '@/ui/graphics/schema/form';

export class ShapeToJSXAdapter {
  static toJSX(shape: FormShape, data: FormMatter): React.ReactNode {
    return (
      <div>
        <h1>{shape.layout.title}</h1>
        {shape.elements.map((element) => {
          switch (element.type) {
            case 'text':
              return ShapeToJSXAdapter.renderText(element, data);
            case 'email':
              return ShapeToJSXAdapter.renderEmail(element, data);
            case 'number':
              return ShapeToJSXAdapter.renderNumber(element, data);
            case 'select':
              return ShapeToJSXAdapter.renderSelect(element, data);
            case 'date':
              return ShapeToJSXAdapter.renderDate(element, data);
            default:
              return null;
          }
        })}
      </div>
    );
  }

  static renderText(element: FormElement, data: FormMatter): React.ReactNode {
    return (
      <div>
        <label htmlFor={element.id}>{element.label}</label>
        <input
          type="text"
          id={element.id}
          name={element.id}
          required={element.required}
          defaultValue={data?.[element.id]} // Prepopulate with data.id
        />
      </div>
    );
  }

  static renderEmail(element: FormElement, data: FormMatter): React.ReactNode {
    return (
      <div>
        <label htmlFor={element.id}>{element.label}</label>
        <input
          type="email"
          id={element.id}
          name={element.id}
          required={element.required}
          defaultValue={data?.[element.id]} // Prepopulate with data.id
        />
      </div>
    );
  }

  static renderNumber(element: FormElement, data: FormMatter): React.ReactNode {
    return (
      <div>
        <label htmlFor={element.id}>{element.label}</label>
        <input
          type="number"
          id={element.id}
          name={element.id}
          required={element.required}
          defaultValue={data?.[element.id]} // Prepopulate with data.id
        />
      </div>
    );
  }

  static renderSelect(element: FormElement, data: FormMatter): React.ReactNode {
    return (
      <div>
        <label htmlFor={element.id}>{element.label}</label>
        <select id={element.id} name={element.id} required={element.required}  defaultValue={data?.[element.id]}>
          {/* Render options here */}
        </select>
      </div>
    );
  }

  static renderDate(element: FormElement, data: FormMatter): React.ReactNode {
    return (
      <div>
        <label htmlFor={element.id}>{element.label}</label>
        <input
          type="date"
          id={element.id}
          name={element.id}
          required={element.required}
          defaultValue={data?.[element.id]} // Prepopulate with data.id
        />
      </div>
    );
  }
}
