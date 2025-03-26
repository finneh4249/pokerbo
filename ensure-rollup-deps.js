// ensure-rollup-deps.js
const os = require('os');
const child_process = require('child_process');

const platform = os.platform();
const arch = os.arch();

// Map OS and architecture to potential Rollup optional dependency packages
const optionalDeps = {
  'darwin': { // macOS
    'x64': '@rollup/rollup-darwin-x64',
    'arm64': '@rollup/rollup-darwin-arm64'
  },
  'linux': { // Linux
    'x64': '@rollup/rollup-linux-x64-gnu', // Common case, adjust if using musl libc
    'arm64': '@rollup/rollup-linux-arm64-gnu' // Common case
  },
  'win32': { // Windows
    'x64': '@rollup/rollup-win32-x64-msvc',
    'ia32': '@rollup/rollup-win32-ia32-msvc',
    'arm64': '@rollup/rollup-win32-arm64-msvc'
  }
};

const dep = optionalDeps[platform]?.[arch];

if (dep) {
  console.log(`[Rollup Check] Ensuring optional dependency ${dep} for ${platform}-${arch} is installed...`);
  try {
    // Use require.resolve to check if the package is installed and accessible
    require.resolve(dep);
    console.log(`[Rollup Check] ${dep} is already installed.`);
  } catch (e) {
    // If require.resolve fails, the package is likely not installed
    console.log(`[Rollup Check] ${dep} not found. Attempting installation via npm...`);
    try {
      // Execute npm install for the specific package
      // Using --no-save to avoid adding it to package.json dependencies
      child_process.execSync(`npm install --no-save ${dep}`, { stdio: 'inherit' });
      console.log(`[Rollup Check] Successfully installed ${dep}.`);
    } catch (installError) {
      // Log an error if installation fails
      console.error(`[Rollup Check] Failed to install ${dep}. Build errors related to Rollup might occur. Consider installing it manually (\`npm install --no-save ${dep}\`).`, installError.message);
    }
  }
} else {
  // Log if no specific optional dependency is needed for the current platform/arch combination
  console.log(`[Rollup Check] No specific Rollup optional dependency needed for platform ${platform} and architecture ${arch}.`);
}
