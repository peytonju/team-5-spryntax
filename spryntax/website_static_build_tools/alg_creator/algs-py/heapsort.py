# Heap Sort implementation in Python
# Function to heapify a subtree rooted at index i
def heapify(arr, n, i):
    largest = i  # Initialize largest as root
    left = 2 * i + 1  # Left child index
    right = 2 * i + 2  # Right child index

    # Check if left child of root exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left

    # Check if right child of root exists and is greater than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right

    # If largest is not root, swap the root with the largest element
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]  # Swap

        # Recursively heapify the affected subtree
        heapify(arr, n, largest)

# Function to perform heap sort
def heapSort(arr):
    n = len(arr)  # Get the number of elements in the array

    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):  # Start from the last non-leaf node
        heapify(arr, n, i)  # Heapify the subtree rooted at index i

    # Extract elements from the heap one by one
    for i in range(n - 1, 0, -1):
        # Swap the root (largest) element with the last element
        arr[i], arr[0] = arr[0], arr[i]  # Swap root and last element

        # Heapify the reduced heap
        heapify(arr, i, 0)  # Heapify the root node of the reduced heap

# Driver code to test the heapSort function
if __name__ == "__main__":
    arr = [12, 11, 13, 5, 6, 7]  # Example array
    print("Original array:", arr)

    # Call the heapSort function
    heapSort(arr)

    # Print the sorted array
    print("Sorted array:", arr)
