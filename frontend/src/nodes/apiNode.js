// apiNode.js
import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const APINode = ({ id  }) => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  return (
    <BaseNode
      id={id}
      title="API"
      inputs={[
        { key: "payload", position: Position.Left, top: "40%" },
      ]}
      outputs={[
        { key: "response", position: Position.Right },
      ]}
    >
      <div className="node-content">
        <div className="node-field-group">
          <input
            type="text"
            placeholder="API URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>GET</option>
            <option>POST</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};