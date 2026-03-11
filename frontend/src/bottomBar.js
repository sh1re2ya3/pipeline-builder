// bottomBar.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const BottomBar = () => {
  const { nodes, edges, clearPipeline } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      clearPipeline: state.clearPipeline,
    }),
    shallow
  );

  const handleClear = () => {
    if (nodes.length === 0) {
      return;
    }
    if (window.confirm('Are you sure you want to clear all nodes and edges?')) {
      clearPipeline();
    }
  };

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert('Please add nodes to the pipeline first.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();

      let statusMessage;
      if (result.num_nodes === 0) {
        statusMessage = 'Pipeline is empty.';
      } else if (result.is_dag) {
        statusMessage = 'Valid directed acyclic graph.';
      } else {
        statusMessage = 'Contains a cycle.';
      }

      alert(
        `Pipeline Analysis:\n\nNodes: ${result.num_nodes}\nEdges: ${result.num_edges}\n\n${statusMessage}`
      );
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert('Failed to analyze pipeline. Check backend connection.');
    }
  };

  return (
    <footer className="bottom-bar">
      <div className="bottom-bar-content">
        <div className="bottom-bar-section">
          <div className="pipeline-stats">
            <span className="stat">{nodes.length} nodes</span>
            <span className="stat-divider">•</span>
            <span className="stat">{edges.length} edges</span>
          </div>
          <button
            className="clear-button"
            onClick={handleClear}
            disabled={nodes.length === 0}
            title="Clear all nodes and edges"
          >
            Clear
          </button>
        </div>
        <button
          className="primary-button"
          onClick={handleSubmit}
          disabled={nodes.length === 0}
        >
          Analyze Pipeline
        </button>
      </div>
    </footer>
  );
};
