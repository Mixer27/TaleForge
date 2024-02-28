import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const { HOST, PORT , SSL_KEY, SSL_CERT } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: `${HOST}`,
    port: parseInt(PORT),
    https: {
      key: fs.readFileSync(path.resolve(__dirname, `${SSL_KEY}`)),
      cert: fs.readFileSync(path.resolve(__dirname, `${SSL_CERT}`))
    }

  },
  preview: {
    host: `${HOST}`,
    port: parseInt(PORT),
    https: {
      key: fs.readFileSync(path.resolve(__dirname, `${SSL_KEY}`)),
      cert: fs.readFileSync(path.resolve(__dirname, `${SSL_CERT}`))
    }
  }
})
