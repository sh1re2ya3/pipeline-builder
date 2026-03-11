// BaseNode.js
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

export const BaseNode = ({
  id,
  title,
  description,
  inputs = [],
  outputs = [],
  children,
}) => {
  const deleteNode = useStore((state) => state.deleteNode);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div className="node-container">
      {/* Delete button */}
      <button
        className="node-delete-btn"
        onClick={handleDelete}
        title="Delete node"
      >
        ✕
      </button>

      {/* Render input handles */}
      {inputs.map((input) => (
        <Handle
          key={`${id}-${input.key}`}
          type="target"
          position={input.position || Position.Left}
          id={`${id}-${input.key}`}
          style={input.top ? { top: input.top } : {}}
          title={input.key}
        />
      ))}

      {/* Content area */}
      <div className="node-title">
        <span>{title}</span>
      </div>
      {description && (
        <div className="node-description">
          <span>{description}</span>
        </div>
      )}
      {children}

      {/* Render output handles */}
      {outputs.map((output) => (
        <Handle
          key={`${id}-${output.key}`}
          type="source"
          position={output.position || Position.Right}
          id={`${id}-${output.key}`}
          style={output.top ? { top: output.top } : {}}
          title={output.key}
        />
      ))}
    </div>
  );
};
