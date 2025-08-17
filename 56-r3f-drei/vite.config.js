import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'
import restart from 'vite-plugin-restart'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default {
    root: 'src/',
    publicDir: '../public/',
    plugins:
    [
        // Restart server on static/public file change
        restart({ restart: [ '../public/**', ] }),

    // Basic self-signed HTTPS certificates for local dev (needed for WebXR on some devices)
    basicSsl(),

        // React support
        react(),

        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id)
            {
                if (!id.match(/src\/.*\.js$/))
                    return null

                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
    ],
    server:
    {
        host: true, // Open to local network and display URL
        https: true, // Enable HTTPS for XR / secure contexts
        port: 3000, // Default dev server port
        strictPort: true, // Fail instead of switching if 3000 is taken
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        emptyOutDir: true, // Empty the folder first
        sourcemap: true // Add sourcemap
    },
}