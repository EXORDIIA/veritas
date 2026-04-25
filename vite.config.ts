import { defineConfig, type Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Rewrites absolute public-folder paths in JS output to relative ones,
// so dist/index.html works when opened directly as a file:// URL.
function relativePublicPaths(): Plugin {
  return {
    name: 'relative-public-paths',
    generateBundle(_opts, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'chunk') {
          file.code = file.code
            .replace(/(['"`])\/images\//g,  '$1./images/')
            .replace(/(['"`])\/RUTH\//g,    '$1./RUTH/')
            .replace(/(['"`])\/Zones\//g,   '$1./Zones/')
            .replace(/(['"`])\/audio\//g,   '$1./audio/')
        }
      }
    }
  }
}

export default defineConfig({
  base: './',
  plugins: [relativePublicPaths(), viteSingleFile()],
  server: { open: true },
  preview: { open: true }
})
