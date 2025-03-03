// Depth-First Search (DFS) using recursion
#include <stdio.h>
#include <stdlib.h>
// Function to perform DFS traversal
void dfs(int graph[][10], int visited[], int node, int n) {
	// Mark the node as visited
	visited[node] = 1;
	printf("%d ", node);

	// Recursively visit each adjacent node
	for (int i = 0; i < n; i++) {
		if (graph[node][i] == 1 && !visited[i]) {
			dfs(graph, visited, i, n);
		}
	}
}
int main() {
	// Adjacency matrix representation of the graph
	int graph[10][10] = {
		{0, 1, 1, 0, 0, 0},
		{0, 0, 0, 1, 1, 0},
		{0, 0, 0, 0, 0, 1},
		{0, 0, 0, 0, 0, 0},
		{0, 0, 0, 0, 0, 1},
		{0, 0, 0, 0, 0, 0}
	};
	// Array to track visited nodes
	int visited[10] = {0};
	// Start DFS traversal from node 0
	dfs(graph, visited, 0, 6);
	return 0;
}
