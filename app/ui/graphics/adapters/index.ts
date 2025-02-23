import React from 'react';
import type { FormShape, FormMatter } from '@/ui/graphics/schema/form';
import { ShapeToJSXAdapter } from './jsx';
import { ShapeToJSONAdapter } from './json';
import { ShapeToHTMLAdapter } from './html';
import { ShapeToXMLAdapter } from './xml';

export class FormShapeAdapter {
  static toJSX(shape: FormShape, data: FormMatter): React.ReactNode {
    return ShapeToJSXAdapter.toJSX(shape, data);
  }

  static toJSON(shape: FormShape, data: FormMatter): string {
    return ShapeToJSONAdapter.toJSON(shape, data);
  }

  static toHTML(shape: FormShape, data: FormMatter): string {
    return ShapeToHTMLAdapter.toHTML(shape, data);
  }

  static toXML(shape: FormShape, data: FormMatter): string {
    return ShapeToXMLAdapter.toXML(shape, data);
  }
}
