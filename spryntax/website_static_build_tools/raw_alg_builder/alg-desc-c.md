# Team5 spryntax C Language Algorithm List

| Algorithm Name | Difficulty | Data Structure | Approach/Technique |
| -------------  | ---------- | ---------------| ------------------ |
| Bubble Sort | Easy | Array | Bruteforce |
| Insertion Sort | Easy | Array | Bruteforce |
| Queue | Easy | Array | - |
| Stack | Easy | Array | - |
| Singly Linked List | Medium | Linked List | - |
| Doubly Linked List | Medium | Linked List | - |
| Merge Sort | Easy | Array | Divide and conquer |

## C Language: (all code from geeksforgeeks)
### Bubble Sort
**Code:**
```
// Optimized implementation of Bubble sort
#include <stdbool.h>
#include <stdio.h>

void swap(int* xp, int* yp){
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

// An optimized version of Bubble Sort
void bubbleSort(int arr[], int n){
    int i, j;
    bool swapped;
    for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }

        // If no two elements were swapped by inner loop,
        // then break
        if (swapped == false)
            break;
    }
}

// Function to print an array
void printArray(int arr[], int size){
    int i;
    for (i = 0; i < size; i++)
        printf("%d ", arr[i]);
}

int main(){
    int arr[] = { 64, 34, 25, 12, 22, 11, 90 };
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    printf("Sorted array: \n");
    printArray(arr, n);
    return 0;
}
```
**Explanation:** (Straight from geeksforgeeks)\
"Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order."

"The provided code implements the Bubble Sort algorithm, which sorts an array by repeatedly comparing adjacent elements and swapping them if they are in the wrong order. The algorithm iterates through the array multiple times, with each pass pushing the largest unsorted element to its correct position at the end. The code includes an optimization: if no swaps are made during a pass, the array is already sorted, and the sorting process stops."
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n^2) | Easy | (https://www.geeksforgeeks.org/bubble-sort-algorithm/?ref=gcse_outind) |


### Insertion Sort
**Explanation:** (Straight from geeksforgeeks)\
"Insertion sort is a simple sorting algorithm that works the way we sort playing cards in our hands."
"The insertionSort function takes an array arr as input. It first calculates the length of the array (n). If the length is 0 or 1, the function returns immediately as an array with 0 or 1 element is considered already sorted."

"For arrays with more than one element, the function proceeds to iterate over the array starting from the second element. It takes the current element (referred to as the “key”) and compares it with the elements in the sorted portion of the array that precede it. If the key is smaller than an element in the sorted portion, the function shifts that element to the right, creating space for the key. This process continues until the correct position for the key is found, and it is then inserted in that position."\

| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n^2) | Easy | (https://www.geeksforgeeks.org/c-program-for-insertion-sort/?ref=gcse_outind) |


### Queue (Using Array)
**Explanation:** (Straight from geeksforgeeks)\
"Like a stack, the queue is a linear data structure that stores items in a First In First Out (FIFO) manner. With a queue, the least recently added item is removed first. A good example of a queue is any queue of consumers for a resource where the consumer that came first is served first."

"The queue uses an array with a fixed capacity, referred to as capacity, and tracks the current number of elements with a variable size.
The variable front is initialized to 0 and represents the index of the first element in the array. In the dequeue operation, the element at this index is removed."

| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(1) | Easy | (https://www.geeksforgeeks.org/queue-in-c/?ref=gcse_outind) |


### Stack (Using Array)
**Explanation:** (Straight from geeksforgeeks)\
"Stack is a linear data structure which follows LIFO principle. In this article, we will learn how to implement Stack using Arrays. In Array-based approach, all stack-related operations are executed using arrays. "

"To implement a stack using an array, initialize an array and treat its end as the stack’s top. Implement push (add to end), pop (remove from end), and peek (check end) operations, handling cases for an empty or full stack."
Step-by-step approach:
- Initialize an array to represent the stack.
- Use the end of the array to represent the top of the stack.
- Implement push (add to end), pop (remove from the end), and peek (check end) operations, ensuring to handle empty and full stack conditions.
  
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(1) | Easy | (https://www.geeksforgeeks.org/implement-stack-using-array/?ref=gcse_outind) |


### Singly Linked List
**Explanation:** (Straight from geeksforgeeks)\
"A Singly Linked List is a type of data structure that is made up of nodes that are created using self-referential structures. Each node contains a data element and a reference (link) to the next node in the sequence. This allows for a dynamic and efficient management of data elements."

"A singly linked list is a linear data structure in which the elements are not stored in contiguous memory locations and each element is connected only to its next element using a pointer. We can traverse the entire linked list using the next pointer of each node."
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n) | Medium | (https://www.geeksforgeeks.org/singly-linked-list-tutorial/) |


### Doubly Linked List
**Explanation:** (Straight from geeksforgeeks)\
"Doubly Linked List is a type of linked list in which each node contains a data element and two links pointing to the next and previous node in the sequence. This allows for more efficient operations such as traversals, insertions, and deletions because it can be done in both directions."

"Doubly Linked List (DLL) is a special type of linked list in which each node contains a pointer to the previous node as well as the next node of the linked list. In a Doubly Linked List, we can traverse in forward and backward direction using the next and previous pointer respectively."
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n) | Medium | (https://www.geeksforgeeks.org/doubly-linked-list/) |


### Merge Sort
**Explanation:** (Straight from geeksforgeeks)\
"Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array.

In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted."
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n log n) | Easy | (https://www.geeksforgeeks.org/merge-sort/?ref=gcse_outind) |
