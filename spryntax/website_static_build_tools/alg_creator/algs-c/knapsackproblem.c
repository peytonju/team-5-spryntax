#include <stdio.h>
// Function to solve the Knapsack problem
int knapsack(int weights[], int values[], int capacity, int n) {
	// Create a 2D table to store the maximum value at each n and capacity
	int dp[n+1][capacity+1];

	// Build the dp table from the bottom up
	for (int i = 0; i <= n; i++) {
		for (int w = 0; w <= capacity; w++) {
			if (i == 0 || w == 0)
				dp[i][w] = 0;
			else if (weights[i-1] <= w)
				dp[i][w] = (values[i-1] + dp[i-1][w - weights[i-1]] > dp[i-1][w]) ? 
							values[i-1] + dp[i-1][w - weights[i-1]] : dp[i-1][w];
			else
				dp[i][w] = dp[i-1][w];
		}
	}
	return dp[n][capacity];
}

int main() {
	// Sample input for weights, values, and capacity
	int weights[] = {2, 3, 4, 5};
	int values[] = {3, 4, 5, 6};
	int capacity = 5;
	int n = sizeof(weights) / sizeof(weights[0]);

	// Call the knapsack function
	int result = knapsack(weights, values, capacity, n);
	printf("Maximum value in Knapsack: %d\n", result);

	return 0;
}