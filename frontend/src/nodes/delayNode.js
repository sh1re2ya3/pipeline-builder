// delayNode.js
import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const DelayNode = ({ id }) => {
  const [ms, setMs] = useState(1000);

  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[{ key: "input", position: Position.Left }]}
      outputs={[{ key: "output", position: Position.Right }]}
    >
      <div className="node-content">
        <div className="node-field-group">
          <input
            type="number"
            value={ms}
            onChange={(e) => setMs(e.target.value)}
            placeholder="Delay (ms)"
          />
        </div>
      </div>
    </BaseNode>
  );
};