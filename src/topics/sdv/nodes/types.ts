import type { Node, BuiltInNode } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type SubTopicNode = Node<{ label: string }, 'subtopic'>;
export type MainTopicNode = Node<{ label: string }, 'maintopic'>;
export type AppNode = BuiltInNode | PositionLoggerNode | SubTopicNode | MainTopicNode;


