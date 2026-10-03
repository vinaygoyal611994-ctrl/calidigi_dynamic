/**
 * Calidigi Database Seeder
 * Run once after schema.sql:
 *   node database/seed.mjs
 *
 * Default credentials:
 *   Username : admin
 *   Password : Calidigi@123   ← change from Settings after first login
 */
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Config (match your .env.local) ──
const DB_HOST     = process.env.DB_HOST     || 'localhost'
const DB_PORT     = Number(process.env.DB_PORT || 3306)
const DB_USER     = process.env.DB_USER     || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_NAME     = process.env.DB_NAME     || 'calidigi_db'

async function seed() {
  const conn = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASSWORD, multipleStatements: true })

  console.log('✔  Connected to MySQL')

  // Run schema
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8')
  await conn.query(schema)
  console.log('✔  Schema applied')

  await conn.query('USE ??', [DB_NAME])

  // Hash default password
  const hash = await bcrypt.hash('Calidigi@123', 12)

  // Insert admin user (skip if already exists)
  const [existing] = await conn.query('SELECT id FROM admin_users WHERE username = ?', ['admin'])
  if (existing.length === 0) {
    await conn.query('INSERT INTO admin_users (username, password) VALUES (?, ?)', ['admin', hash])
    console.log('✔  Default admin created')
    console.log('   Username : admin')
    console.log('   Password : Calidigi@123')
  } else {
    console.log('ℹ  Admin user already exists — skipped')
  }

  await conn.end()
  console.log('\n✅  Database ready! Start the app: npm run dev')
}

seed().catch(err => { console.error('❌  Seed failed:', err.message); process.exit(1) })
