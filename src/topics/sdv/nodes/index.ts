import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { SubTopicNode } from './SubTopicNode';
import { MainTopicNode } from './MainTopicNode';
import { AppNode } from './types';

// Import nodes from JSON
import rawNodes from './nodes.json';

export const initialNodes = rawNodes as unknown as AppNode[];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'subtopic': SubTopicNode,
  'maintopic': MainTopicNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
