// loggerNode.js
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Logger"
      inputs={[{ key: "input", position: Position.Left }]}
      outputs={[]}
    >
      <div className="node-content">
        <p className="node-description">Logs incoming data</p>
      </div>
    </BaseNode>
  );
};