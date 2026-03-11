// textNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);

    // Auto-resize
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  // Extract variables directly from text (derived, no extra state)
  const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
  const matches = [...currText.matchAll(regex)];
  const variables = [...new Set(matches.map((m) => m[1]))];

  const spacing = 100 / (variables.length + 1);

  const dynamicInputs = variables.map((v, index) => ({
    key: v,
    position: Position.Left,
    top: `${spacing * (index + 1)}%`,
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={dynamicInputs}
      outputs={[{ key: "output", position: Position.Right }]}
    >
      <div className="node-content">
        <div className="node-field-group">
          <label>
            Text:
            <textarea
              value={currText}
              onChange={handleTextChange}
              className="node-textarea"
              rows={1}
            />
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
