def insertionSort(arr):
	# Get the length of the array
	n = len(arr)
	  
	if n <= 1:
		# If the array has 0 or 1 element, it is already sorted, so return
		return
 
	# Iterate over the array starting from the second element
	for i in range(1, n):
		# Store the current element as the key to be inserted in the right position
		key = arr[i]
		j = i-1
		# Move elements greater than key one position ahead
		while j >= 0 and key < arr[j]:
			# Shift elements to the right
			arr[j+1] = arr[j]
			j -= 1
		# Insert the key in the correct position
		arr[j+1] = key
  
# Sorting the array [12, 11, 13, 5, 6] using insertionSort
arr = [12, 11, 13, 5, 6]
insertionSort(arr)
print(arr)