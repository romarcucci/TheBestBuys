const fs = require('fs');
const path = require('path');

// Utility function to check if a file extension is in a list of excluded extensions
const isExcludedExtension = (fileName) => {
  const excludedExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.ico',
    '.md',
    '.json',
    '.env',
    '.gitignore',
    '.config',
  ];
  return excludedExtensions.includes(path.extname(fileName).toLowerCase());
};

// Utility function to check if a file name is in a list of excluded files
const isExcludedFile = (fileName) => {
  const excludedFiles = [
    'exportProject.js',
    'exportProjectTreeView.js',
    'tailwind.config.js',
    'postcss.config.js',
  ];
  return excludedFiles.includes(fileName);
};

// Utility function to check if a directory name is in a list of excluded directories
const isExcludedDirectory = (dirName) => {
  const excludedDirectories = ['node_modules', '.git', '.idea'];
  return excludedDirectories.includes(dirName);
};

// Function to recursively read all files in a directory, skipping excluded files and directories
const readDirRecursive = (dirPath) => {
  const files = [];

  fs.readdirSync(dirPath).forEach((item) => {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      // Skip excluded directories
      if (!isExcludedDirectory(item)) {
        files.push(...readDirRecursive(itemPath)); // Recursively read content
      }
    } else if (
      stat.isFile() &&
      !isExcludedExtension(item) &&
      !isExcludedFile(item)
    ) {
      // Only add non-excluded files
      files.push(itemPath);
    }
  });

  return files;
};

// Function to export all file content to a single text file
const exportProject = (projectPath, outputFilePath) => {
  const allFiles = readDirRecursive(projectPath);

  const outputStream = fs.createWriteStream(outputFilePath);

  allFiles.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    outputStream.write(`\n\n// ${filePath}\n\n`); // Separate each file content with its path
    outputStream.write(fileContent);
  });

  outputStream.end();
};

// Provide the path to your project directory
const projectPath = __dirname; // Change this to your project's root directory
const outputPath = path.join(__dirname, 'project_export.txt'); // Output file path

exportProject(projectPath, outputPath);

console.log(`Project exported to ${outputPath}`);
