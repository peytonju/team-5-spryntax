#include <stdio.h>

// Function to perform counting sort for radix sort
void counting_sort(int arr[], int n, int exp) {
	int output[n], count[10] = {0};

	// Store the count of occurrences in count[]
	for (int i = 0; i < n; i++) {
		int index = arr[i] / exp;
		count[index % 10]++;
	}

	// Change count[i] so that count[i] contains actual position of this digit
	for (int i = 1; i < 10; i++) {
		count[i] += count[i - 1];
	}

	// Build the output array
	for (int i = n - 1; i >= 0; i--) {
		int index = arr[i] / exp;
		output[count[index % 10] - 1] = arr[i];
		count[index % 10]--;
	}

	// Copy the sorted numbers into the original array
	for (int i = 0; i < n; i++) {
		arr[i] = output[i];
	}
}

// Main function to implement Radix Sort
void radix_sort(int arr[], int n) {
	// Find the maximum number to determine the number of digits
	int max_num = arr[0];
	for (int i = 1; i < n; i++) {
		if (arr[i] > max_num) {
			max_num = arr[i];
		}
	}

	// Perform counting sort for every digit
	for (int exp = 1; max_num / exp > 0; exp *= 10) {
		counting_sort(arr, n, exp);
	}
}

int main() {
	// Sample input
	int arr[] = {170, 45, 75, 90, 802, 24, 2, 66};
	int n = sizeof(arr) / sizeof(arr[0]);

	radix_sort(arr, n);
	printf("Sorted array: ");
	for (int i = 0; i < n; i++) {
		printf("%d ", arr[i]);
	}
	printf("\n");

	return 0;
}
