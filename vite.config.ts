import path from 'path';
import svgr from "vite-plugin-svgr";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), svgr({ include: "**/*.svg?react" })],
  resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@features': path.resolve(__dirname, './src/features'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@env': path.resolve(__dirname, './src/shared/lib/env'),
		},
	},
})
