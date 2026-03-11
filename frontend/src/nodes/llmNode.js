// llmNode.js



import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      description="This is a LLM."
      inputs={[
        { key: "system", position: Position.Left, top: "33%" },
        { key: "prompt", position: Position.Left, top: "66%" }
      ]}
      outputs={[
        { key: "response", position: Position.Right }
      ]}
    />
  );
};