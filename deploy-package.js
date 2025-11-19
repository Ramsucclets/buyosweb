import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting deployment package creation...\n');

// Step 1: Build the Vue.js frontend
console.log('📦 Step 1: Building Vue.js frontend...');
try {
  execSync('npm run build:production', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ Frontend build completed\n');
} catch (error) {
  console.error('❌ Frontend build failed:', error.message);
  process.exit(1);
}

// Step 2: Verify the build output
const publicDir = path.join(__dirname, 'server', 'public');
if (!fs.existsSync(publicDir)) {
  console.error('❌ Build output directory not found:', publicDir);
  process.exit(1);
}

const indexHtml = path.join(publicDir, 'index.html');
if (!fs.existsSync(indexHtml)) {
  console.error('❌ index.html not found in build output');
  process.exit(1);
}
console.log('✅ Build verification passed\n');

// Step 3: Create deployment ZIP
console.log('📦 Step 2: Creating deployment ZIP package...');
const outputZip = path.join(__dirname, 'buyosweb-deploy.zip');

// Remove old ZIP if it exists
if (fs.existsSync(outputZip)) {
  fs.unlinkSync(outputZip);
}

// Create a file stream for the output
const output = fs.createWriteStream(outputZip);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

// Listen for archive events
output.on('close', () => {
  const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`✅ Deployment package created: ${outputZip}`);
  console.log(`📊 Package size: ${sizeInMB} MB`);
  console.log('\n🎉 Deployment package is ready!');
  console.log('\n📝 Next steps:');
  console.log('1. Log in to AWS Console');
  console.log('2. Navigate to Elastic Beanstalk');
  console.log('3. Create a new application or use existing one');
  console.log('4. Create a new environment (Node.js platform)');
  console.log('5. Upload buyosweb-deploy.zip');
  console.log('\nSee DEPLOYMENT.md for detailed instructions.');
});

archive.on('error', (err) => {
  console.error('❌ Error creating ZIP:', err);
  process.exit(1);
});

// Pipe archive data to the file
archive.pipe(output);

// Add the server directory to the archive
// Note: We need to add files individually to control what gets included
const serverDir = path.join(__dirname, 'server');

// Add server files
archive.file(path.join(serverDir, 'index.js'), { name: 'index.js' });
archive.file(path.join(serverDir, 'package.json'), { name: 'package.json' });
archive.file(path.join(serverDir, 'package-lock.json'), { name: 'package-lock.json' });
archive.file(path.join(serverDir, '.env'), { name: '.env' });

// Add the public directory with all built files
archive.directory(publicDir, 'public');

// Add .ebextensions if it exists
const ebextensionsDir = path.join(__dirname, '.ebextensions');
if (fs.existsSync(ebextensionsDir)) {
  archive.directory(ebextensionsDir, '.ebextensions');
}

// Finalize the archive
archive.finalize();
