# Team5 spryntax Algorithm List

| Algorithm Name | Difficulty | Data Structure | Approach/Technique |
| -------------  | ---------- | ---------------| ------------------ |
| Bubble Sort | Easy | Array | Bruteforce |
| Insertion Sort | Easy | Array | Bruteforce |
| Queue | Easy | Array | - |
| Stack | Easy | Array | - |
| Singly Linked List | Medium | Linked List | - |
| Doubly Linked List | Medium | Linked List | - |
| Merge Sort | Easy | Array | Divide and conquer |

## Python: (all code from geeksforgeeks)
### Bubble Sort
**Code:**
```
def bubble_sort(arr):
  
    # Outer loop to iterate through the list n times
    for n in range(len(arr) - 1, 0, -1):
        
        # Initialize swapped to track if any swaps occur
        swapped = False  

        # Inner loop to compare adjacent elements
        for i in range(n):
            if arr[i] > arr[i + 1]:
              
                # Swap elements if they are in the wrong order
                arr[i], arr[i + 1] = arr[i + 1], arr[i]
                
                # Mark that a swap has occurred
                swapped = True
        
        # If no swaps occurred, the list is already sorted
        if not swapped:
            break


# Sample list to be sorted
arr = [39, 12, 18, 85, 72, 10, 2, 18]
print("Unsorted list is:")
print(arr)

bubble_sort(arr)

print("Sorted list is:")
print(arr)
```
**Explanation:** (Straight from geeksforgeeks)\
"Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order."

"The provided Python code implements the Bubble Sort algorithm, which sorts an array by repeatedly comparing adjacent elements and swapping them if they are in the wrong order. The algorithm iterates through the array multiple times, with each pass pushing the largest unsorted element to its correct position at the end. The code includes an optimization: if no swaps are made during a pass, the array is already sorted, and the sorting process stops."
| Time Complexity: | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n^2) | Easy | (https://www.geeksforgeeks.org/python-program-for-bubble-sort/) |

### Insertion Sort
**Code:**
```
def insertionSort(arr):
    n = len(arr)  # Get the length of the array
      
    if n <= 1:
        return  # If the array has 0 or 1 element, it is already sorted, so return
 
    for i in range(1, n):  # Iterate over the array starting from the second element
        key = arr[i]  # Store the current element as the key to be inserted in the right position
        j = i-1
        while j >= 0 and key < arr[j]:  # Move elements greater than key one position ahead
            arr[j+1] = arr[j]  # Shift elements to the right
            j -= 1
        arr[j+1] = key  # Insert the key in the correct position
  
# Sorting the array [12, 11, 13, 5, 6] using insertionSort
arr = [12, 11, 13, 5, 6]
insertionSort(arr)
print(arr)
```
**Explanation:** (Straight from geeksforgeeks)\
"Insertion sort is a simple sorting algorithm that works the way we sort playing cards in our hands."
"The insertionSort function takes an array arr as input. It first calculates the length of the array (n). If the length is 0 or 1, the function returns immediately as an array with 0 or 1 element is considered already sorted."

"For arrays with more than one element, the function proceeds to iterate over the array starting from the second element. It takes the current element (referred to as the “key”) and compares it with the elements in the sorted portion of the array that precede it. If the key is smaller than an element in the sorted portion, the function shifts that element to the right, creating space for the key. This process continues until the correct position for the key is found, and it is then inserted in that position."
| Time Complexity: | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n^2) | Easy | (https://www.geeksforgeeks.org/python-program-for-insertion-sort/) |

### Singly Linked List
**Code:**
```
# Python Program for traversal of Singly Linked list
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def insert_at_beginning(head, data):
    new_node = Node(data)
    new_node.next = head
    return new_node
        
def traverse(head):
    current = head
    while current:
        # Print the current node's data followed by an arrow and space
        print(str(current.data) + " -> ", end=" ")
        current = current.next
    # At the end of the list, print None to indicate no further nodes
    print("None")

# Singly linked list created and its head stored in a variable named "head"
head = None
head = insert_at_beginning(head, 4)
head = insert_at_beginning(head, 3)
head = insert_at_beginning(head, 2)
head = insert_at_beginning(head, 1)

# To traverse and print the nodes:
traverse(head)
```
**Explanation:** (Straight from geeksforgeeks)\
"A Singly Linked List is a type of data structure that is made up of nodes that are created using self-referential structures. Each node contains a data element and a reference (link) to the next node in the sequence. This allows for a dynamic and efficient management of data elements."

"A singly linked list is a linear data structure in which the elements are not stored in contiguous memory locations and each element is connected only to its next element using a pointer. We can traverse the entire linked list using the next pointer of each node."
| Time Complexity: | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n) | Medium | (https://www.geeksforgeeks.org/singly-linked-list-in-python/) |

### Doubly Linked List
**Code:**
```
# Python Program for traversal of a doubly linked list
class Node:
    def __init__(self, data):
        # Initialize a new node with data, previous, and next pointers
        self.data = data
        self.next = None
        self.prev = None


def traverse(head):
    # Traverse the doubly linked list and print its elements
    current = head
    while current:
      # Print current node's data
        print(current.data, end=" <-> ")
        # Move to the next node
        current = current.next
    print("None")


def insert_at_beginning(head, data):
    # Insert a new node at the beginning of the doubly linked list
    new_node = Node(data)
    new_node.next = head
    if head:
        head.prev = new_node
    return new_node


# Driver Code
head = None
head = insert_at_beginning(head, 4)
head = insert_at_beginning(head, 3)
head = insert_at_beginning(head, 2)
head = insert_at_beginning(head, 1)

# To traverse and print the nodes:
traverse(head)
```
**Explanation:** (Straight from geeksforgeeks)\
"Doubly Linked List is a type of linked list in which each node contains a data element and two links pointing to the next and previous node in the sequence. This allows for more efficient operations such as traversals, insertions, and deletions because it can be done in both directions."

"Doubly Linked List (DLL) is a special type of linked list in which each node contains a pointer to the previous node as well as the next node of the linked list. In a Doubly Linked List, we can traverse in forward and backward direction using the next and previous pointer respectively."
| Time Complexity: | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n) | Medium | (https://www.geeksforgeeks.org/doubly-linked-list-in-python/) |

### Merge Sort
**Code:**
```
def merge(arr, left, mid, right):
    n1 = mid - left + 1
    n2 = right - mid

    # Create temp arrays
    L = [0] * n1
    R = [0] * n2

    # Copy data to temp arrays L[] and R[]
    for i in range(n1):
        L[i] = arr[left + i]
    for j in range(n2):
        R[j] = arr[mid + 1 + j]

    i = 0  # Initial index of first subarray
    j = 0  # Initial index of second subarray
    k = left  # Initial index of merged subarray

    # Merge the temp arrays back
    # into arr[left..right]
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1

    # Copy the remaining elements of L[],
    # if there are any
    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1

    # Copy the remaining elements of R[], 
    # if there are any
    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1

def merge_sort(arr, left, right):
    if left < right:
        mid = (left + right) // 2

        merge_sort(arr, left, mid)
        merge_sort(arr, mid + 1, right)
        merge(arr, left, mid, right)

def print_list(arr):
    for i in arr:
        print(i, end=" ")
    print()

# Driver code
if __name__ == "__main__":
    arr = [12, 11, 13, 5, 6, 7]
    print("Given array is")
    print_list(arr)

    merge_sort(arr, 0, len(arr) - 1)

    print("\nSorted array is")
    print_list(arr)
```
**Explanation:** (Straight from geeksforgeeks)\
"Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays then merging them back together to obtain the sorted array.

In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted."
| Time Complexity: | Difficulty | Source |
| -------------  | ---------- | ---------------|
| O(n log n) | Easy | (https://www.geeksforgeeks.org/merge-sort/) |
