# Depth-First Search (DFS) using recursion
# Function to perform DFS traversal
def dfs(graph, node, visited):
    # Mark the node as visited
    if node not in visited:
        print(node, end=" ")
        visited.add(node)
        # Recursively visit each adjacent node
        for neighbor in graph[node]:
            dfs(graph, neighbor, visited)
# Sample graph represented as an adjacency list
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

# Set to track visited nodes
visited = set()

# Start DFS traversal from node 'A'
dfs(graph, 'A', visited)
