import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type TextUpdaterNode = Node<{ label: string }, 'text-updater'>;
export type ChartExample = Node<{ label: string }, 'chart'>;
export type AppNode = BuiltInNode | PositionLoggerNode | TextUpdaterNode;
