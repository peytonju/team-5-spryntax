def print_star_pattern(n):
	# Print a pattern of stars in a right-aligned triangle form
	for i in range(1, n + 1):
		# Print leading spaces for right alignment
		print(" " * (n - i) + "*" * i)


# Driver Code for Star Pattern
# Number of rows in the pattern
rows = 5
print_star_pattern(rows)