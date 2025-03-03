#include <stdio.h>

// Function to heapify a subtree rooted at index i
void heapify(int arr[], int n, int i) {
	// Initialize largest as root
	int largest = i;
	// Left child index
	int left = 2 * i + 1;
	// Right child index
	int right = 2 * i + 2;

	// Check if left child of root exists and is greater than root
	if (left < n && arr[left] > arr[largest]) {
		largest = left;
	}

	// Check if right child of root exists and is greater than largest so far
	if (right < n && arr[right] > arr[largest]) {
		largest = right;
	}

	// If largest is not root, swap the root with the largest element
	if (largest != i) {
		// Swap the values
		int temp = arr[i];
		arr[i] = arr[largest];
		arr[largest] = temp;

		// Recursively heapify the affected subtree
		heapify(arr, n, largest);
	}
}

// Function to perform heap sort
void heapSort(int arr[], int n) {
	// Build a max heap
	for (int i = n / 2 - 1; i >= 0; i--) {
		// Heapify the subtree rooted at index i
		heapify(arr, n, i);
	}

	// Extract elements from the heap one by one
	for (int i = n - 1; i > 0; i--) {
		// Swap the root (largest) element with the last element
		int temp = arr[0];
		arr[0] = arr[i];
		arr[i] = temp;

		// Heapify the reduced heap
		// Heapify the root node of the reduced heap
		heapify(arr, i, 0);
	}
}

// Function to print the array
void printArray(int arr[], int size) {
	for (int i = 0; i < size; i++) {
		printf("%d ", arr[i]);
	}
	printf("\n");
}

// Driver code to test the heapSort function
int main() {
	// Example array
	int arr[] = {12, 11, 13, 5, 6, 7};
	// Calculate the size of the array
	int n = sizeof(arr) / sizeof(arr[0]);

	printf("Original array: ");
	printArray(arr, n);

	// Call the heapSort function
	heapSort(arr, n);

	// Print the sorted array
	printf("Sorted array: ");
	printArray(arr, n);

	return 0;
}
