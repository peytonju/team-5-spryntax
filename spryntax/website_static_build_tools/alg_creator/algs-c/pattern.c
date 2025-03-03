#include <stdio.h>

void printPattern(int n) 
{
    int i, j;
    
    // Loop for each row
    for (i = 1; i <= n; i++) {
        // Print leading spaces
        for (j = 1; j <= n - i; j++) 
        {
            printf(" ");
        }
        
        // Print stars
        for (j = 1; j <= (2 * i - 1); j++) 
        {
            printf("*");
        }
        
        // Move to the next line
        printf("\n");
    }
}

int main() 
{
    int rows = 5;
    
    // Print the star pattern
    printPattern(rows);
    
    return 0;
}
