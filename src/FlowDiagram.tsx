import { useCallback, useState, useRef, useEffect, type MouseEvent } from 'react';
import {
  ReactFlow,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Node,
} from '@xyflow/react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import '@xyflow/react/dist/style.css';

// Remove these imports from here and load dynamically based on topicId
// import { initialNodes, nodeTypes } from './nodes';
// import { initialEdges, edgeTypes } from './edges';

// You can keep nodeTypes and edgeTypes if they are shared across topics
import { nodeTypes } from './topics/sdv/nodes';
import { edgeTypes } from './topics/sdv/edges';

export default function FlowDiagram() {
  const { topicId } = useParams<{ topicId: string }>();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [markdownContent, setMarkdownContent] = useState<string>('');

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Load topic-specific nodes and edges when topicId changes
  useEffect(() => {
    async function loadTopicData() {
      if (!topicId) return;

      try {
        const nodesModule = await import(`./topics/${topicId}/nodes/index.ts`);
        const edgesModule = await import(`./topics/${topicId}/edges/index.ts`);

        setNodes(nodesModule.initialNodes);
        setEdges(edgesModule.initialEdges);
      } catch (error) {
        console.error('Failed to load topic data:', error);
        setNodes([]);
        setEdges([]);
      }
    }

    loadTopicData();
    setSelectedNode(null); // Reset selection on topic change
  }, [topicId, setNodes, setEdges]);

  // Load markdown content when a node is selected
  useEffect(() => {
    if (!selectedNode) {
      setMarkdownContent('');
      return;
    }

    async function loadMarkdown() {
      try {
        const mdModule = await import(
          `./topics/${topicId}/nodes/content/${selectedNode!.id}.md?raw`
        );
        setMarkdownContent(mdModule.default);
      } catch (error) {
        setMarkdownContent('# No content available for this node.');
      }
    }

    loadMarkdown();
  }, [selectedNode, topicId]);

  const onNodeClick = useCallback((event: MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const closeModal = () => setSelectedNode(null);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Optional: close modal when clicking outside
  const onContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      selectedNode &&
      modalRef.current &&
      event.target instanceof Node &&
      !modalRef.current.contains(event.target)
    ) {
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
          <p>
            <strong>ID:</strong> {selectedNode.id}
          </p>
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
