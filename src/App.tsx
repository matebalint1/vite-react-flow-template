import { useCallback, useState, useRef, useEffect, type MouseEvent } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event: MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    []
  );

  const closeModal = () => setSelectedNode(null);

  // Ref to the modal pane div
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Click handler on container to detect outside clicks
  const onContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (selectedNode && modalRef.current && event.target instanceof Node && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }} onClick={onContainerClick}>
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          edgeTypes={edgeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>

      {selectedNode && (
        <div
          ref={modalRef}
          style={{
            width: '30vw',
            backgroundColor: '#f0f0f0',
            borderLeft: '1px solid #ccc',
            padding: '1rem',
            overflowY: 'auto',
          }}
        >
          <button onClick={closeModal} style={{ marginBottom: '1rem' }}>
            Close
          </button>
          <h2>Node Details</h2>
          <p><strong>ID:</strong> {selectedNode.id}</p>
          <p><strong>Label:</strong> {"hello"}</p>
          {/* Add more node data display here as needed */}
        </div>
      )}
    </div>
  );
}