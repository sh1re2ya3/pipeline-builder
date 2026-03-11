// staticNode.js
import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const StaticNode = ({ id }) => {
  const [value, setValue] = useState("");

  return (
    <BaseNode
      id={id}
      title="Static Data"
      inputs={[]}
      outputs={[{ key: "output", position: Position.Right }]}
    >
      <div className="node-content">
        <div className="node-field-group">
          <textarea
            className="node-textarea"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={2}
            placeholder="Enter static value"
          />
        </div>
      </div>
    </BaseNode>
  );
};
