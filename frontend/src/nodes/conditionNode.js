// conditionNode.js
import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const ConditionNode = ({ id }) => {
  const [condition, setCondition] = useState("");

  return (
    <BaseNode
      id={id}
      title="Condition"
      inputs={[
        { key: "input", position: Position.Left },
      ]}
      outputs={[
        { key: "true", position: Position.Right, top: "35%" },
        { key: "false", position: Position.Right, top: "65%" },
      ]}
    >
      <div className="node-content">
        <div className="node-field-group">
          <input
            type="text"
            placeholder="Enter condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          />
        </div>
      </div>
    </BaseNode>
  );
};