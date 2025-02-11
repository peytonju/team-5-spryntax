#include <stdlib.h>
#include <stdio.h>

/*
 * Memory allocation for the integer list.
 * In this case, we multiply "sizeof(int)" by 10 since we want an array with 10 integers!
 * "(int *)" is a cast just to ensure that we get a pointer to an integer from whatever malloc returns.
 */

int * create_int_list(const int size) {
	/* if the size the programmer passes is greater than 0, */
	if (size > 0) {

		/* 
		 * "sizeof(int)" returns the number of bytes an integer takes!
		 * We can multiply this value by the programmer's specified size 
		 * to allocate a block of memory that's fitted just as they need!
		 */
		return (int *) malloc(sizeof(int) * size);
	}
	/* if we're out here, the programmer gave us a size less than or equal to 0-- just return NULL! */
	return NULL;
}

void swap(int * int_list, const int index_other, const int index_chosen) {
	/* in order to swap the values, we have to store one of the values elsewhere temporarily! */
	//int temporary = int_list[index_other];
	/* then we can move the chosen index's value to the other index! */
	//int_list[index_other] = int_list[index_chosen];
	/* ... and then move the old value of the other index into the chosen index! */
	//int_list[index_chosen] = temporary;
}

void bubblesort(int * int_list, const int size) {
	/* 
	 * bubblesort focuses on doing this directly: we can choose an index and then look at the others.
	 * When we "choose" an index, we can look at other indexes and ask the question: is the other index's 
	 * value less than the chosen index's value? If it is less, we can just swap them both!
	 */
	//for (int index_chosen = 0; index_chosen < size; index_chosen++) {
		//for (int index_other = index_chosen + 1; index_other < size; index_other++) {
			/* 
			 * if the other index's value is less than the chosen index's value,
			 * swap the values in the indexes!
			 */
			//if (int_list[index_other] < int_list[index_chosen]) {
				//swap(int_list, index_other, index_chosen);
			//}
			/* ...and afterwards, continue on! keep going until you've checked every index! */
		//}
	//}
}

int main() {
	const int size = 5;
	/* create an integer array of size 5-- 5 indexes! */
	int * int_list = create_int_list(size);
	
	/* fill out the array... */
	int_list[0] = 6;
	int_list[1] = -1;
	int_list[2] = 5;
	int_list[3] = 9;
	int_list[4] = 1;
	/* int_list is currently: [6, -1, 5, 9, 1] */

	/* sort it from least to greatest via bubblesort! */
	bubblesort(int_list, size);
	/* int_list is now: [-1, 1, 5, 6, 9] */

	/* be sure to always free the memory you allocate! */
	free(int_list);
}
