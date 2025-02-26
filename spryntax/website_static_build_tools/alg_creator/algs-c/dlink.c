#include <stdio.h>
#include <stdlib.h>

// Define the Node structure
struct Node {
	// Data stored in the node
	int data;
	// Pointer to the next node
	struct Node* next;
	// Pointer to the previous node
	struct Node* prev;
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