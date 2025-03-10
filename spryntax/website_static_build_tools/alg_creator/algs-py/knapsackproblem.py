# Knapsack Problem (Dynamic Programming solution)
# Function to solve the Knapsack problem
def knapsack(weights, values, capacity, n):
	# Create a 2D table to store the maximum value at each n and capacity
	dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

	# Build the dp table from the bottom up
	for i in range(n + 1):
		for w in range(capacity + 1):
			if i == 0 or w == 0:
				dp[i][w] = 0
			elif weights[i - 1] <= w:
				dp[i][w] = max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w])
			else:
				dp[i][w] = dp[i - 1][w]
	
	return dp[n][capacity]

# Sample input for weights, values, and capacity
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
n = len(weights)

# Call the knapsack function
result = knapsack(weights, values, capacity, n)
print(f"Maximum value in Knapsack: {result}")