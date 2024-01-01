//FileBay Inc. - Sherif M - MIT

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const getFileHash = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const stream = fs.createReadStream(filePath);
        stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
    });
};

const findDuplicateFiles = async (directory = '.') => {
    const files = await fs.promises.readdir(directory, { withFileTypes: true });
    const fileHashes = {};
    const duplicates = {};

    for (const dirent of files) {
        if (dirent.isFile()) {
            const filePath = path.join(directory, dirent.name);
            const fileHash = await getFileHash(filePath);

            if (fileHashes[fileHash]) {
                if (!duplicates[fileHash]) {
                    duplicates[fileHash] = [fileHashes[fileHash]];
                }
                duplicates[fileHash].push(filePath);
            } else {
                fileHashes[fileHash] = filePath;
            }
        }
    }

    return Object.values(duplicates).filter(dupGroup => dupGroup.length > 1);
};

// Execute with a specific directory or default to current directory
const directory = process.argv[2] || '.';
findDuplicateFiles(directory)
    .then(duplicates => {
        if (duplicates.length > 0) {
            console.log("Duplicate files found:", duplicates);
        } else {
            console.log("No duplicate files found.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
