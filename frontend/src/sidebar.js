// sidebar.js

import { DraggableNode } from "./draggableNode";

const NODE_OPTIONS = [
  { type: "customInput", label: "Input", description: "Pipeline input" },
  { type: "customOutput", label: "Output", description: "Pipeline output" },
  { type: "text", label: "Text", description: "Text transformation" },
  { type: "llm", label: "LLM", description: "Language model" },
  { type: "api", label: "API", description: "API call" },
  { type: "condition", label: "Condition", description: "Branching logic" },
  { type: "delay", label: "Delay", description: "Time delay" },
  { type: "logger", label: "Logger", description: "Log output" },
  { type: "static", label: "Static", description: "Static value" },
];

export const Sidebar = ({ collapsed, onToggle }) => {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2 className="sidebar-header-title">Nodes</h2>}
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="node-options">
            {NODE_OPTIONS.map((node) => (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={node.label}
                description={node.description}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
        <div>
          {!collapsed && (
            <p className="sidebar-instructions">
              Drag and drop a node onto the canvas to start building your
              pipeline.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};
