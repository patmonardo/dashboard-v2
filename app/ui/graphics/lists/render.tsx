//@/ui/graphics/lists/render.tsx
import ListRenderer from './list';
import { ListShape } from '@/ui/graphics/schema/list';
import { ReactNode } from 'react';

// This is the render function that returns the component
export function renderList(list: ListShape): ReactNode {
  return <ListRenderer list={list} />;
}
