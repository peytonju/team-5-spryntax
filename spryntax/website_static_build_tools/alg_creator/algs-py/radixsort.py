def counting_sort(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Store the count of occurrences in count[]
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1

    # Change count[i] so that count[i] contains actual position of this digit
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build the output array
    i = n - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    # Copy the sorted numbers into original array
    for i in range(n):
        arr[i] = output[i]

# Main function to implement Radix Sort
def radix_sort(arr):
    # Find the maximum number to determine number of digits
    max_num = max(arr)
    exp = 1  # Start with the least significant digit

    # Perform counting sort for every digit
    while max_num // exp > 0:
        counting_sort(arr, exp)
        exp *= 10

# Sample input
arr = [170, 45, 75, 90, 802, 24, 2, 66]
radix_sort(arr)
print("Sorted array:", arr)