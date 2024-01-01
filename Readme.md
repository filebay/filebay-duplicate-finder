# filebay-duplicate-finder

Easily find duplicate files in any directory. This Node.js package helps you identify duplicate files based on their content, regardless of the file name, making it easier to manage large directories and clean up repeated files.

#### Installation

npm install filebay-duplicate-finder

#### Usage

#####javascript
const findDuplicateFiles = require('filebay-duplicate-finder');

// You can specify the directory to scan for duplicate files.
// Example: findDuplicateFiles('/path/to/directory')
// If no path is provided, the package will scan the current working directory.
// Example: findDuplicateFiles()

findDuplicateFiles('/path/to/directory').then(duplicates => {
    if (duplicates.length > 0) {
        console.log("Duplicate files found:", duplicates);
    } else {
        console.log("No duplicate files found.");
    }
}).catch(error => {
    console.error("Error finding duplicate files:", error);
});


#### Notes:

1. **Asynchronous**: `findDuplicateFiles` is an asynchronous function that returns a promise. The usage example in this README reflects this by using `.then()` and `.catch()` for promise resolution and error handling.
