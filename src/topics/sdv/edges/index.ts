import type { Edge, EdgeTypes } from '@xyflow/react';
import rawEdges from './edges.json';

export const initialEdges: Edge[] = rawEdges;

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
