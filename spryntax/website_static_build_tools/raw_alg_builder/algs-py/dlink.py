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