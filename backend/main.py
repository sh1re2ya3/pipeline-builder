import os

from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Dict
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]
    
# React build folder
build_dir = os.path.join(os.getcwd(), "frontend", "build")

# Serve static assets
app.mount("/static", StaticFiles(directory=os.path.join(build_dir, "static")), name="static")

# Serve React app
@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    return FileResponse(os.path.join(build_dir, "index.html"))

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_status
    }


def is_dag(nodes, edges):
    # Build adjacency list
    graph = {node["id"]: [] for node in nodes}

    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        if source in graph:
            graph[source].append(target)

    visited = set()
    recursion_stack = set()

    def dfs(node):
        if node in recursion_stack:
            return False  # cycle detected

        if node in visited:
            return True

        visited.add(node)
        recursion_stack.add(node)

        for neighbor in graph.get(node, []):
            if not dfs(neighbor):
                return False

        recursion_stack.remove(node)
        return True

    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True

