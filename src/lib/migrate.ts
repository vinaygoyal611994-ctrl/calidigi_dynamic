import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

export async function runMigrations() {
  let connection: mysql.Connection | null = null
  try {
    connection = await mysql.createConnection(
      process.env.MYSQL_URL ||
      `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`
    )

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        username   VARCHAR(100) NOT NULL UNIQUE,
        password   VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id           INT AUTO_INCREMENT PRIMARY KEY,
        fname        VARCHAR(200) NOT NULL,
        email        VARCHAR(200) NOT NULL,
        phone        VARCHAR(50),
        company      VARCHAR(200),
        project_type VARCHAR(100),
        budget       VARCHAR(100),
        timeline     VARCHAR(100),
        message      TEXT,
        nda          BOOLEAN DEFAULT FALSE,
        status       ENUM('new','read','replied','archived') DEFAULT 'new',
        created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        title      VARCHAR(500) NOT NULL,
        slug       VARCHAR(500) NOT NULL UNIQUE,
        excerpt    TEXT,
        category   VARCHAR(100),
        cat_slug   VARCHAR(100),
        tags       JSON,
        date       VARCHAR(50),
        read_time  VARCHAR(50),
        bg         VARCHAR(50),
        icon       VARCHAR(50),
        author     VARCHAR(200),
        status     ENUM('draft','published') DEFAULT 'draft',
        content    JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS cms_pages (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        title            VARCHAR(500) NOT NULL,
        slug             VARCHAR(500) NOT NULL UNIQUE,
        content          LONGTEXT,
        meta_description VARCHAR(500),
        status           ENUM('draft','published') DEFAULT 'draft',
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS password_resets (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        user_id    INT NOT NULL,
        token      VARCHAR(64) NOT NULL UNIQUE,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
      )
    `)

    const [rows] = await connection.execute(
      'SELECT id FROM admin_users WHERE username = ?',
      ['admin']
    ) as any[]

    if ((rows as any[]).length === 0) {
      const hash = await bcrypt.hash('Admin@1234', 12)
      await connection.execute(
        'INSERT INTO admin_users (username, password) VALUES (?, ?)',
        ['admin', hash]
      )
      console.log('✓ Default admin user created')
    }

    console.log('✓ Database migrations complete')
  } catch (err) {
    console.error('Migration error:', err)
  } finally {
    if (connection) await connection.end()
  }
}
