// submit.js

import { useStore } from "./store"; // or the correct path to your store

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await response.json();
      let statusMessage;
      if (result.num_nodes === 0) {
        statusMessage = "Pipeline is empty.";
      } else if (result.is_dag) {
        statusMessage = "Valid directed acyclic graph (DAG).";
      } else {
        statusMessage = "Contains a cycle (not a DAG).";
      }

      alert(
        `Pipeline Analysis:

        Total Nodes: ${result.num_nodes}
        Total Edges: ${result.num_edges}
        ${statusMessage}`,
      );
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("Failed to analyze pipeline.");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
