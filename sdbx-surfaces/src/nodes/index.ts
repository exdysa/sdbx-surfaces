import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import { PositionLoggerNode } from './PositionLoggerNode';
import { TextUpdaterNode } from './TextUpdaterNode';
import ChartExample from './ChartNode';

export const initialNodes: AppNode[] = [
  { id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'wire' } },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'with React Flow' },
  },
  {
    id: 'e',
    type: 'text-updater',
    position: { x: 0, y: 300 },
    data: { label: 'label' } ,
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  // Add any of your custom nodes here!
  'text-updater': TextUpdaterNode,
} satisfies NodeTypes;
