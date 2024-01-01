# filebay-duplicate-finder

Easily find duplicate files in any directory.

#### Installation

npm install filebay-duplicate-finder

#### Usage

const findDuplicateFiles = require('filebay-duplicate-finder');

// Replace '/path/to/directory' with the path to the directory you want to scan

findDuplicateFiles('/path/to/directory').then(duplicates => {
    console.log("Duplicate files found:", duplicates);
}).catch(error => {
    console.error("Error finding duplicate files:", error);
});


#### Notes:

1. **Asynchronous**: `findDuplicateFiles` is an asynchronous function that returns a promise. The usage example in this README reflects this by using `.then()` and `.catch()` for promise resolution and error handling.