const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const getFileHash = (filePath) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const stream = fs.createReadStream(filePath);
        stream.on('error', err => reject(err));
        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
    });
};

const findFilesRecursively = async (dir) => {
    let files = [];
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
            files = files.concat(await findFilesRecursively(fullPath));
        } else {
            files.push(fullPath);
        }
    }

    return files;
};

const findDuplicateFiles = async (directory) => {
    const fileHashes = new Map();
    const duplicates = [];
    const files = await findFilesRecursively(directory);

    for (const filePath of files) {
        try {
            const fileHash = await getFileHash(filePath);
            if (fileHashes.has(fileHash)) {
                duplicates.push({ original: fileHashes.get(fileHash), duplicate: filePath });
            } else {
                fileHashes.set(fileHash, filePath);
            }
        } catch (error) {
            console.error(`Error processing file ${filePath}: ${error}`);
        }
    }

    return duplicates;
};

module.exports = findDuplicateFiles;
