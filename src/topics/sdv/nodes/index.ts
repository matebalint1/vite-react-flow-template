import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { AppNode } from './types';

// Import nodes from JSON
import rawNodes from './nodes.json';

export const initialNodes = rawNodes as unknown as AppNode[];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
