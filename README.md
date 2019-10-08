# Sort-Visulization

Sort Vizualizations created using Javascript and p5.js.

## Current Algorithms Supported:

### Bubble Sort

This sort is relatively simple. It will walk all the array from the beginning and swap the two indexes next to each other depending on which has a larger value. This will cause the largest value to 'bubble' up to the stop, hence the name.

### Quick Sort (Lomuto)

This sort works by choosing an element from the array, typically the last one. The algorithm will then search the entirity of that specific partition to figure out where in line that element should go. Then, as this is a recursive function, will call the algorithm on the other sides of the array until everything is sorted.

### Quick Sort (Hoare) - WIP

Currently a work in progress. This algorithm works by having two indexes (the start and end of an array, in this case) and will walk towards the center until they hit an element that is less than or greater than the pivot. Then, depending on if those two elements are greater than the pivot, they get swapped. (description in progress...)

#### More Description to follow in future updates.
