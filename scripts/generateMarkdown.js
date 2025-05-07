// scripts/generateMarkdown.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodesPath = path.join(__dirname, '../src/nodes/nodes.json');
const contentDir = path.join(__dirname, '../src/nodes/content');

async function generateMarkdown() {
  try {
    // Ensure content directory exists
    await fs.mkdir(contentDir, { recursive: true });

    // Read and parse nodes.json
    const nodesRaw = await fs.readFile(nodesPath, 'utf-8');
    const nodes = JSON.parse(nodesRaw);

    for (const node of nodes) {
      const fileName = `${node.id}.md`;
      const filePath = path.join(contentDir, fileName);

      try {
        await fs.access(filePath);
        console.log(`Markdown file already exists: ${fileName}`);
      } catch {
        // File does not exist, create it
        const content = `# Node ${node.id}\n\nThis is auto-generated markdown content for node **${node.id}**.\n\n- Label: ${node.data?.label ?? 'N/A'}\n- Position: (${node.position.x}, ${node.position.y})\n`;
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Created markdown file: ${fileName}`);
      }
    }
  } catch (error) {
    console.error('Error generating markdown files:', error);
  }
}

generateMarkdown();
