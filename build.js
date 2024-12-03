const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'],  // Adjust this to your entry point
  bundle: true,
  outfile: 'dist/bundle.js',  // Output location, adjust if necessary
  sourcemap: true,            // Optional, for debugging
}).catch(() => process.exit(1));
