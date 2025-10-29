import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  NodeTypes,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node components
const ProcessNode = ({ data }: { data: any }) => (
  <div className="process-node">
    <div className="node-header">
      <span className="node-icon">{data.icon}</span>
      <span className="node-title">{data.label}</span>
    </div>
    <div className="node-content">
      {data.description && <p className="node-description">{data.description}</p>}
      {data.tools && (
        <div className="node-tools">
          {data.tools.map((tool: string, index: number) => (
            <span key={index} className="tool-tag">{tool}</span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const DeliverableNode = ({ data }: { data: any }) => (
  <div className="deliverable-node">
    <div className="node-header">
      <span className="node-icon">{data.icon}</span>
      <span className="node-title">{data.label}</span>
    </div>
    <div className="node-content">
      {data.description && <p className="node-description">{data.description}</p>}
      {data.examples && (
        <div className="node-examples">
          {data.examples.map((example: string, index: number) => (
            <span key={index} className="example-tag">{example}</span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const DecisionNode = ({ data }: { data: any }) => (
  <div className="decision-node">
    <div className="node-header">
      <span className="node-icon">{data.icon}</span>
      <span className="node-title">{data.label}</span>
    </div>
    <div className="node-content">
      {data.description && <p className="node-description">{data.description}</p>}
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  process: ProcessNode,
  deliverable: DeliverableNode,
  decision: DecisionNode,
};

const InteractiveMindMap: React.FC = () => {
  const initialNodes: Node[] = useMemo(() => [
    // Central node
    {
      id: '1',
      type: 'process',
      position: { x: 400, y: 300 },
      data: {
        label: 'Technical Writing Process',
        icon: '📝',
        description: 'Complete workflow from requirements to deliverables',
        tools: ['Research', 'Planning', 'Writing', 'Review']
      },
    },
    
    // Research & Discovery Phase
    {
      id: '2',
      type: 'process',
      position: { x: 100, y: 100 },
      data: {
        label: 'Research & Discovery',
        icon: '🔍',
        description: 'Understanding user needs and technical requirements',
        tools: ['User Interviews', 'Stakeholder Analysis', 'Technical Review']
      },
    },
    {
      id: '3',
      type: 'deliverable',
      position: { x: 50, y: 200 },
      data: {
        label: 'User Personas',
        icon: '👥',
        description: 'Detailed profiles of target users',
        examples: ['Developers', 'End Users', 'Support Teams']
      },
    },
    {
      id: '4',
      type: 'deliverable',
      position: { x: 150, y: 200 },
      data: {
        label: 'Requirements Document',
        icon: '📋',
        description: 'Comprehensive requirements analysis',
        examples: ['Functional Specs', 'Technical Constraints', 'Success Metrics']
      },
    },
    
    // Planning Phase
    {
      id: '5',
      type: 'process',
      position: { x: 400, y: 100 },
      data: {
        label: 'Content Strategy',
        icon: '🎯',
        description: 'Planning content structure and delivery',
        tools: ['Information Architecture', 'Content Types', 'Timeline']
      },
    },
    {
      id: '6',
      type: 'deliverable',
      position: { x: 350, y: 200 },
      data: {
        label: 'Content Outline',
        icon: '🗂️',
        description: 'Structured content plan',
        examples: ['Hierarchy', 'Navigation', 'Cross-references']
      },
    },
    {
      id: '7',
      type: 'deliverable',
      position: { x: 450, y: 200 },
      data: {
        label: 'Project Plan',
        icon: '📅',
        description: 'Timeline and resource allocation',
        examples: ['Milestones', 'Dependencies', 'Risk Assessment']
      },
    },
    
    // Writing Phase
    {
      id: '8',
      type: 'process',
      position: { x: 700, y: 100 },
      data: {
        label: 'Content Creation',
        icon: '✍️',
        description: 'Writing and developing content',
        tools: ['Drafting', 'Code Examples', 'Visual Design']
      },
    },
    {
      id: '9',
      type: 'deliverable',
      position: { x: 650, y: 200 },
      data: {
        label: 'First Draft',
        icon: '📄',
        description: 'Initial content creation',
        examples: ['API Docs', 'User Guides', 'Tutorials']
      },
    },
    {
      id: '10',
      type: 'deliverable',
      position: { x: 750, y: 200 },
      data: {
        label: 'Interactive Elements',
        icon: '🎨',
        description: 'Visual and interactive components',
        examples: ['Code Samples', 'Diagrams', 'Demos']
      },
    },
    
    // Review Phase
    {
      id: '11',
      type: 'process',
      position: { x: 400, y: 500 },
      data: {
        label: 'Quality Assurance',
        icon: '✅',
        description: 'Review and validation process',
        tools: ['Technical Review', 'User Testing', 'Editorial Review']
      },
    },
    {
      id: '12',
      type: 'deliverable',
      position: { x: 300, y: 600 },
      data: {
        label: 'Reviewed Content',
        icon: '📖',
        description: 'Validated and approved content',
        examples: ['SME Approved', 'User Tested', 'Editorial Review']
      },
    },
    {
      id: '13',
      type: 'deliverable',
      position: { x: 500, y: 600 },
      data: {
        label: 'Feedback Report',
        icon: '📊',
        description: 'Analysis of review feedback',
        examples: ['Issues Found', 'Improvements', 'Metrics']
      },
    },
    
    // Delivery Phase
    {
      id: '14',
      type: 'process',
      position: { x: 700, y: 500 },
      data: {
        label: 'Publishing & Deployment',
        icon: '🚀',
        description: 'Final delivery and launch',
        tools: ['Version Control', 'CI/CD', 'Analytics']
      },
    },
    {
      id: '15',
      type: 'deliverable',
      position: { x: 650, y: 600 },
      data: {
        label: 'Live Documentation',
        icon: '🌐',
        description: 'Published and accessible content',
        examples: ['Website', 'API Docs', 'Help Center']
      },
    },
    {
      id: '16',
      type: 'deliverable',
      position: { x: 750, y: 600 },
      data: {
        label: 'Analytics Dashboard',
        icon: '📈',
        description: 'Performance monitoring and metrics',
        examples: ['Usage Stats', 'User Feedback', 'Success Metrics']
      },
    },
    
    // Decision points
    {
      id: '17',
      type: 'decision',
      position: { x: 250, y: 350 },
      data: {
        label: 'Content Type?',
        icon: '❓',
        description: 'Choose appropriate content format'
      },
    },
    {
      id: '18',
      type: 'decision',
      position: { x: 550, y: 350 },
      data: {
        label: 'Review Complete?',
        icon: '❓',
        description: 'Validate content quality'
      },
    },
  ], []);

  const initialEdges: Edge[] = useMemo(() => [
    // Main workflow connections
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#7c3aed' } },
    { id: 'e1-5', source: '1', target: '5', animated: true, style: { stroke: '#7c3aed' } },
    { id: 'e1-8', source: '1', target: '8', animated: true, style: { stroke: '#7c3aed' } },
    { id: 'e1-11', source: '1', target: '11', animated: true, style: { stroke: '#7c3aed' } },
    { id: 'e1-14', source: '1', target: '14', animated: true, style: { stroke: '#7c3aed' } },
    
    // Research phase
    { id: 'e2-3', source: '2', target: '3', style: { stroke: '#10b981' } },
    { id: 'e2-4', source: '2', target: '4', style: { stroke: '#10b981' } },
    
    // Planning phase
    { id: 'e5-6', source: '5', target: '6', style: { stroke: '#f59e0b' } },
    { id: 'e5-7', source: '5', target: '7', style: { stroke: '#f59e0b' } },
    
    // Writing phase
    { id: 'e8-9', source: '8', target: '9', style: { stroke: '#ef4444' } },
    { id: 'e8-10', source: '8', target: '10', style: { stroke: '#ef4444' } },
    
    // Review phase
    { id: 'e11-12', source: '11', target: '12', style: { stroke: '#8b5cf6' } },
    { id: 'e11-13', source: '11', target: '13', style: { stroke: '#8b5cf6' } },
    
    // Delivery phase
    { id: 'e14-15', source: '14', target: '15', style: { stroke: '#06b6d4' } },
    { id: 'e14-16', source: '14', target: '16', style: { stroke: '#06b6d4' } },
    
    // Decision connections
    { id: 'e17-2', source: '17', target: '2', style: { stroke: '#64748b', strokeDasharray: '5,5' } },
    { id: 'e18-11', source: '18', target: '11', style: { stroke: '#64748b', strokeDasharray: '5,5' } },
    
    // Cross-phase connections
    { id: 'e2-5', source: '2', target: '5', style: { stroke: '#64748b', strokeDasharray: '5,5' } },
    { id: 'e5-8', source: '5', target: '8', style: { stroke: '#64748b', strokeDasharray: '5,5' } },
    { id: 'e8-11', source: '8', target: '11', style: { stroke: '#64748b', strokeDasharray: '5,5' } },
    { id: 'e11-14', source: '11', target: '14', style: { stroke: '#64748b', strokeDasharray: '5,5' } },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '800px', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'process': return '#7c3aed';
              case 'deliverable': return '#10b981';
              case 'decision': return '#f59e0b';
              default: return '#64748b';
            }
          }}
        />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default InteractiveMindMap;
