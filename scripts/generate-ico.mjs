import pngToIco from 'png-to-ico';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const png32 = join(__dirname, '../public/favicon-32x32.png');
const outputIco = join(__dirname, '../public/favicon.ico');

async function generateIco() {
  try {
    const buf = await pngToIco([png32]);
    writeFileSync(outputIco, buf);
    console.log('Created: favicon.ico (real ICO format)');
  } catch (err) {
    console.error('Error:', err);
  }
}

generateIco();
