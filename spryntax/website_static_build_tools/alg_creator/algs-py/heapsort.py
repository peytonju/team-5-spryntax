# Heap Sort implementation in Python
# Function to heapify a subtree rooted at index i
def heapify(arr, n, i):
    # Initialize largest as root
    largest = i
    # Left child index
    left = 2 * i + 1
    # Right child index
    right = 2 * i + 2

    # Check if left child of root exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left

    # Check if right child of root exists and is greater than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right

    # If largest is not root, swap the root with the largest element
    if largest != i:
        # Swap
        arr[i], arr[largest] = arr[largest], arr[i]

        # Recursively heapify the affected subtree
        heapify(arr, n, largest)

# Function to perform heap sort
def heapSort(arr):
    # Get the number of elements in the array
    n = len(arr)

    # Build a max heap
    # Start from the last non-leaf node
    for i in range(n // 2 - 1, -1, -1):
        # Heapify the subtree rooted at index i
        heapify(arr, n, i)

    # Extract elements from the heap one by one
    for i in range(n - 1, 0, -1):
        # Swap the root (largest) element with the last element
        # Swap root and last element
        arr[i], arr[0] = arr[0], arr[i]

        # Heapify the reduced heap
        # Heapify the root node of the reduced heap
        heapify(arr, i, 0)

# Driver code to test the heapSort function
if __name__ == "__main__":
    # Example array
    arr = [12, 11, 13, 5, 6, 7]
    print("Original array:", arr)

    # Call the heapSort function
    heapSort(arr)

    # Print the sorted array
    print("Sorted array:", arr)
