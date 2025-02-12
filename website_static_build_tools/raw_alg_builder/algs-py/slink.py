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