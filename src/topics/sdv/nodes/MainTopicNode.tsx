import { Handle, Position, type NodeProps } from '@xyflow/react';

import { type MainTopicNode } from './types';

export function MainTopicNode({
  data,
}: NodeProps<MainTopicNode>) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}
