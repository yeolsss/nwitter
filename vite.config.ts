import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default (mode) =>
  defineConfig({
    plugins: [react(), tsConfigPaths()],
    define: {
      'process.env': loadEnv(mode, process.cwd(), ''),
    },
  });
