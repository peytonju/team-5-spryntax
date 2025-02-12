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