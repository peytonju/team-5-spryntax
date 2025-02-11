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
**Code:**
```
// C program to implement insertion sort
#include <math.h>
#include <stdio.h>

void insertionSort(int arr[], int N) {

    // Starting from the second element
    for (int i = 1; i < N; i++) {
        int key = arr[i];
        int j = i - 1;

        // Move elements of arr[0..i-1], that are
          // greater than key, to one position to
          // the right of their current position
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        // Move the key to its correct position
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = { 12, 11, 13, 5, 6 };
    int N = sizeof(arr) / sizeof(arr[0]);

    printf("Unsorted array: ");
    for (int i = 0; i < N; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    // Calling insertion sort on array arr
    insertionSort(arr, N);

    printf("Sorted array: ");
    for (int i = 0; i < N; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return 0;
}

```
**Explanation:** (Straight from geeksforgeeks)\
"Insertion sort is a simple sorting algorithm that works the way we sort playing cards in our hands."
"The insertionSort function takes an array arr as input. It first calculates the length of the array (n). If the length is 0 or 1, the function returns immediately as an array with 0 or 1 element is considered already sorted."

"For arrays with more than one element, the function proceeds to iterate over the array starting from the second element. It takes the current element (referred to as the “key”) and compares it with the elements in the sorted portion of the array that precede it. If the key is smaller than an element in the sorted portion, the function shifts that element to the right, creating space for the key. This process continues until the correct position for the key is found, and it is then inserted in that position."\

| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n^2) | Easy | (https://www.geeksforgeeks.org/c-program-for-insertion-sort/?ref=gcse_outind) |

### Queue (Using Array)
**Code:**
```
// C Program to demonstrate how to Implement a queue
#include <stdbool.h>
#include <stdio.h>
#define MAX_SIZE 100

// Defining the Queue structure
typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
} Queue;

// Function to initialize the queue
void initializeQueue(Queue* q)
{
    q->front = -1;
    q->rear = 0;
}

// Function to check if the queue is empty
bool isEmpty(Queue* q) { return (q->front == q->rear - 1); }

// Function to check if the queue is full
bool isFull(Queue* q) { return (q->rear == MAX_SIZE); }

// Function to add an element to the queue (Enqueue
// operation)
void enqueue(Queue* q, int value)
{
    if (isFull(q)) {
        printf("Queue is full\n");
        return;
    }
    q->items[q->rear] = value;
    q->rear++;
}

// Function to remove an element from the queue (Dequeue
// operation)
void dequeue(Queue* q)
{
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return;
    }
    q->front++;
}

// Function to get the element at the front of the queue
// (Peek operation)
int peek(Queue* q)
{
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return -1; // return some default value or handle
                   // error differently
    }
    return q->items[q->front + 1];
}

// Function to print the current queue
void printQueue(Queue* q)
{
    if (isEmpty(q)) {
        printf("Queue is empty\n");
        return;
    }

    printf("Current Queue: ");
    for (int i = q->front + 1; i < q->rear; i++) {
        printf("%d ", q->items[i]);
    }
    printf("\n");
}

int main()
{
    Queue q;
    initializeQueue(&q);

    // Enqueue elements
    enqueue(&q, 10);
    printQueue(&q);

    enqueue(&q, 20);
    printQueue(&q);

    enqueue(&q, 30);
    printQueue(&q);

    // Peek front element
    printf("Front element: %d\n", peek(&q));

    // Dequeue an element
    dequeue(&q);
    printQueue(&q);

    // Peek front element after dequeue
    printf("Front element after dequeue: %d\n", peek(&q));

    return 0;
}

```
**Explanation:** (Straight from geeksforgeeks)\
"Like a stack, the queue is a linear data structure that stores items in a First In First Out (FIFO) manner. With a queue, the least recently added item is removed first. A good example of a queue is any queue of consumers for a resource where the consumer that came first is served first."

"The queue uses an array with a fixed capacity, referred to as capacity, and tracks the current number of elements with a variable size.
The variable front is initialized to 0 and represents the index of the first element in the array. In the dequeue operation, the element at this index is removed."

| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(1) | Easy | (https://www.geeksforgeeks.org/queue-in-c/?ref=gcse_outind) |

### Stack (Using Array)
**Code:**
```
// C program for array implementation of stack 
#include <limits.h> 
#include <stdio.h> 
#include <stdlib.h> 

// A structure to represent a stack 
struct Stack { 
    int top; 
    unsigned capacity; 
    int* array; 
}; 

// function to create a stack of given capacity. It initializes size of 
// stack as 0 
struct Stack* createStack(unsigned capacity) 
{ 
    struct Stack* stack = (struct Stack*)malloc(sizeof(struct Stack)); 
    stack->capacity = capacity; 
    stack->top = -1; 
    stack->array = (int*)malloc(stack->capacity * sizeof(int)); 
    return stack; 
} 

// Stack is full when top is equal to the last index 
int isFull(struct Stack* stack) 
{ 
    return stack->top == stack->capacity - 1; 
} 

// Stack is empty when top is equal to -1 
int isEmpty(struct Stack* stack) 
{ 
    return stack->top == -1; 
} 

// Function to add an item to stack. It increases top by 1 
void push(struct Stack* stack, int item) 
{ 
    if (isFull(stack)) 
        return; 
    stack->array[++stack->top] = item; 
    printf("%d pushed to stack\n", item); 
} 

// Function to remove an item from stack. It decreases top by 1 
int pop(struct Stack* stack) 
{ 
    if (isEmpty(stack)) 
        return INT_MIN; 
    return stack->array[stack->top--]; 
} 

// Function to return the top from stack without removing it 
int peek(struct Stack* stack) 
{ 
    if (isEmpty(stack)) 
        return INT_MIN; 
    return stack->array[stack->top]; 
} 

// Driver program to test above functions 
int main() 
{ 
    struct Stack* stack = createStack(100); 

    push(stack, 10); 
    push(stack, 20); 
    push(stack, 30); 

    printf("%d popped from stack\n", pop(stack)); 

    return 0; 
} 

```
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
**Code:**
```
// Definition of a Node in a singly linked list
struct Node {
    int data;          
    struct Node* next;
};

// Function to create a new Node
struct Node* newNode(int data) {
    struct Node* temp = 
      (struct Node*)malloc(sizeof(struct Node));
    temp->data = data;
    temp->next = NULL;
    return temp;
}

// Function to traverse and print the elements 
// of the linked list
void traverseLinkedList(struct Node* head)
{
    // Start from the head of the linked list
    struct Node* current = head;

    // Traverse the linked list until reaching the end (NULL)
    while (current != NULL) {

        // Print the data of the current node
        printf("%d ", current->data);

        // Move to the next node
        current = current->next;
    }

    printf("\n");
}

```
**Explanation:** (Straight from geeksforgeeks)\
"A Singly Linked List is a type of data structure that is made up of nodes that are created using self-referential structures. Each node contains a data element and a reference (link) to the next node in the sequence. This allows for a dynamic and efficient management of data elements."

"A singly linked list is a linear data structure in which the elements are not stored in contiguous memory locations and each element is connected only to its next element using a pointer. We can traverse the entire linked list using the next pointer of each node."
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n) | Medium | (https://www.geeksforgeeks.org/singly-linked-list-tutorial/) |

### Doubly Linked List
**Code:**
```
#include <stdio.h>
#include <stdlib.h>

// Define the Node structure
struct Node {
    int data; // Data stored in the node
    struct Node* next; // Pointer to the next node
    struct Node* prev; // Pointer to the previous node
};

// Function to create a new node
struct Node* createNode(int data) {
    struct Node* newNode = 
      (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    newNode->prev = NULL;
    return newNode;
}

// Function to traverse the doubly linked list 
// in forward direction
void forwardTraversal(struct Node* head) {
  
    // Start traversal from the head of the list
    struct Node* curr = head;

    // Continue until the current node is not
    // null (end of list)
    while (curr != NULL) {
      
        // Output data of the current node
        printf("%d ", curr->data);
      
        // Move to the next node
        curr = curr->next;
    }

    // Print newline after traversal
    printf("\n");
}

// Function to traverse the doubly linked list 
// in backward direction
void backwardTraversal(struct Node* tail) {
  
    // Start traversal from the tail of the list
    struct Node* curr = tail;

    // Continue until the current node is not 
    // null (end of list)
    while (curr != NULL) {
      
        // Output data of the current node
        printf("%d ", curr->data);
      
        // Move to the previous node
        curr = curr->prev;
    }

    // Print newline after traversal
    printf("\n");
}

int main() {
  
    // Sample usage of the doubly linked list and 
    // traversal functions
    struct Node* head = createNode(1);
    struct Node* second = createNode(2);
    struct Node* third = createNode(3);

    head->next = second;
    second->prev = head;
    second->next = third;
    third->prev = second;

    printf("Forward Traversal:\n");
    forwardTraversal(head);

    printf("Backward Traversal:\n");
    backwardTraversal(third);

    // Free memory allocated for nodes
    free(head);
    free(second);
    free(third);

    return 0;
}

```
**Explanation:** (Straight from geeksforgeeks)\
"Doubly Linked List is a type of linked list in which each node contains a data element and two links pointing to the next and previous node in the sequence. This allows for more efficient operations such as traversals, insertions, and deletions because it can be done in both directions."

"Doubly Linked List (DLL) is a special type of linked list in which each node contains a pointer to the previous node as well as the next node of the linked list. In a Doubly Linked List, we can traverse in forward and backward direction using the next and previous pointer respectively."
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n) | Medium | (https://www.geeksforgeeks.org/doubly-linked-list/) |

### Merge Sort
**Code:**
```
// C program for Merge Sort
#include <stdio.h>
#include <stdlib.h>

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
void merge(int arr[], int l, int m, int r)
{
    int i, j, k;
    int n1 = m - l + 1;
    int n2 = r - m;

    // Create temp arrays
    int L[n1], R[n2];

    // Copy data to temp arrays L[] and R[]
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    // Merge the temp arrays back into arr[l..r
    i = 0;
    j = 0;
    k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[],
    // if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[],
    // if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// l is for left index and r is right index of the
// sub-array of arr to be sorted
void mergeSort(int arr[], int l, int r)
{
    if (l < r) {
        int m = l + (r - l) / 2;

        // Sort first and second halves
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}

// Function to print an array
void printArray(int A[], int size)
{
    int i;
    for (i = 0; i < size; i++)
        printf("%d ", A[i]);
    printf("\n");
}

// Driver code
int main()
{
    int arr[] = { 12, 11, 13, 5, 6, 7 };
    int arr_size = sizeof(arr) / sizeof(arr[0]);

    printf("Given array is \n");
    printArray(arr, arr_size);

    mergeSort(arr, 0, arr_size - 1);

    printf("\nSorted array is \n");
    printArray(arr, arr_size);
    return 0;
}

```
**Explanation:** (Straight from geeksforgeeks)\
"Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array.

In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted."
| Time Complexity | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n log n) | Easy | (https://www.geeksforgeeks.org/merge-sort/?ref=gcse_outind) |
