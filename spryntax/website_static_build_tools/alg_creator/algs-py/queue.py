class Queue:
	def __init__(self, q_size):
		self.arr = [0] * q_size
		self.size = 0
		self.capacity = q_size
		self.front = 0
	
	# Function to add an element
	# to queue.
	def enqueue(self, x):
		
		# If queue is full
		if self.size == self.capacity:
			return
		
		self.arr[self.size] = x
		
		# Increment queue size.
		self.size += 1
	
	# Function to pop front 
	# element from queue.
	def dequeue(self):
		
		# If queue is empty 
		if self.size == 0:
			return
		
		# Shift all the elements 
		# to the left.
		for i in range(1, self.size):
			self.arr[i-1] = self.arr[i]
		
		# decrement queue size 
		self.size -= 1
	
	# Function which returns 
	# the front element.
	def getFront(self):
		
		# If queue is empty
		if self.size == 0:
			return -1
		
		return self.arr[self.front]
	
	# Function which prints
	# the elements of array.
	def display(self):
		
		for i in range(self.front, self.size):
			print(self.arr[i], end=" ")
		print()

if __name__ == "__main__":
	q = Queue(4)
	
	q.enqueue(1)
	q.enqueue(2)
	q.enqueue(3)
	print(q.getFront())
	q.dequeue()
	q.enqueue(4)
	q.display()