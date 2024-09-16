import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import svgr from 'vite-plugin-svgr';

const { HOST, PORT, SSL_KEY, SSL_CERT } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // root: "src",
  server: {
    host: `${HOST}`,
    port: parseInt(PORT),
    https: {
      key: fs.readFileSync(path.resolve(__dirname, `${SSL_KEY}`)),
      cert: fs.readFileSync(path.resolve(__dirname, `${SSL_CERT}`))
    },
  },
  preview: {
    host: `${HOST}`,
    port: parseInt(PORT),
    https: {
      key: fs.readFileSync(path.resolve(__dirname, `${SSL_KEY}`)),
      cert: fs.readFileSync(path.resolve(__dirname, `${SSL_CERT}`))
    }
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       index: path.resolve(__dirname, "index.html"),
  //       home: path.resolve(__dirname, "home.html"),
  //       about: path.resolve(__dirname, "about.html"),
  //       // about: path.resolve(__dirname, 'src/about/index.html'),
  //     },
  //   }
  // }

})