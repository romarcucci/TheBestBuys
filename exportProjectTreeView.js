const fs = require('fs');
const path = require('path');

function exportProjectTreeView(directory, level = 0) {
  const files = fs.readdirSync(directory);
  let result = '';

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.lstatSync(filePath);

    // Exclude node_modules or other directories
    const excludeFolders = ['node_modules', '.git']; // Add other folders to exclude if needed
    if (excludeFolders.includes(file)) {
      return; // Skip this folder
    }

    // Indent based on level
    result +=
      ' '.repeat(level * 2) +
      (stat.isDirectory() ? '📁 ' : '📄 ') +
      file +
      '\n';

    if (stat.isDirectory()) {
      // Recursively generate the tree for subdirectories
      result += exportProjectTreeView(filePath, level + 1);
    }
  });

  return result;
}

const rootDir = '.'; // Change this to your project directory
const treeStructure = exportProjectTreeView(rootDir);

fs.writeFileSync('project_structure.txt', treeStructure);
console.log('Project structure exported to project_structure.txt');
