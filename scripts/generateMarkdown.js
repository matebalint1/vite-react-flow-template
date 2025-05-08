import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const topicsDir = path.join(__dirname, '../src/topics');

// Parse command line arguments for --overwrite flag
const args = process.argv.slice(2);
const overwrite = args.includes('--overwrite');

async function generateMarkdown() {
  try {
    const topicEntries = await fs.readdir(topicsDir, { withFileTypes: true });
    const topicDirs = topicEntries.filter(entry => entry.isDirectory());

    for (const topicDir of topicDirs) {
      const topicId = topicDir.name;
      const nodesJsonPath = path.join(topicsDir, topicId, 'nodes', 'nodes.json');
      const contentDir = path.join(topicsDir, topicId, 'nodes', 'content');

      try {
        const nodesRaw = await fs.readFile(nodesJsonPath, 'utf-8');
        const nodes = JSON.parse(nodesRaw);

        await fs.mkdir(contentDir, { recursive: true });

        for (const node of nodes) {
          const fileName = `${node.id}.md`;
          const filePath = path.join(contentDir, fileName);

          let fileExists = false;
          try {
            await fs.access(filePath);
            fileExists = true;
          } catch {
            // File does not exist
            fileExists = false;
          }

          if (fileExists && !overwrite) {
            console.log(`[${topicId}] Markdown file already exists and overwrite flag not set: ${fileName}`);
            continue;
          }

          const label = node.data?.label ?? 'N/A';
          const content = `# Learning Path Topic: ${topicId}

## Learning Nugget Label: ${label}

**Topic ID:** ${topicId}  
**Node ID:** ${node.id}  
**Position:** (${node.position.x}, ${node.position.y})

---

This is auto-generated markdown content for node **${node.id}** in topic **${topicId}**.
`;

          await fs.writeFile(filePath, content, 'utf-8'); // fs.writeFile overwrites by default
          console.log(`[${topicId}] ${fileExists ? 'Overwritten' : 'Created'} markdown file: ${fileName}`);
        }
      } catch (err) {
        console.warn(`Skipping topic "${topicId}" due to error: ${err.message}`);
      }
    }
  } catch (error) {
    console.error('Error generating markdown files:', error);
  }
}

generateMarkdown();
