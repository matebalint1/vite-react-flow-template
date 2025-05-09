import { Handle, Position, type NodeProps } from '@xyflow/react';

import { type SubTopicNode } from './types';

export function SubTopicNode({
  data,
}: NodeProps<SubTopicNode>) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <Handle type="target" position={Position.Left} />
    </div>
  );
}
