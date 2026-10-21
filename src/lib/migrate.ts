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
        page_name        VARCHAR(500),
        title            VARCHAR(500) NOT NULL,
        slug             VARCHAR(500) NOT NULL UNIQUE,
        content          LONGTEXT,
        meta_title       VARCHAR(300),
        meta_description VARCHAR(500),
        meta_keyword     VARCHAR(500),
        status           ENUM('draft','published') DEFAULT 'draft',
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `)

    // Add new columns to existing cms_pages table (safe — ignore if already exist)
    for (const col of [
      'ALTER TABLE cms_pages ADD COLUMN page_name VARCHAR(500)',
      'ALTER TABLE cms_pages ADD COLUMN meta_title VARCHAR(300)',
      'ALTER TABLE cms_pages ADD COLUMN meta_keyword VARCHAR(500)',
    ]) {
      try { await connection.execute(col) } catch {}
    }

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS email_logs (
        id        INT AUTO_INCREMENT PRIMARY KEY,
        type      VARCHAR(100) NOT NULL,
        to_email  VARCHAR(300) NOT NULL,
        to_name   VARCHAR(300),
        subject   VARCHAR(500),
        status    ENUM('sent','failed') DEFAULT 'sent',
        error_msg TEXT,
        sent_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS newsletters (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(200),
        email      VARCHAR(200) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS businesses (
        id            BIGINT AUTO_INCREMENT PRIMARY KEY,
        title         VARCHAR(255) NOT NULL,
        link          VARCHAR(500) DEFAULT NULL,
        logo          VARCHAR(255) DEFAULT NULL,
        email         VARCHAR(255) DEFAULT NULL,
        web           VARCHAR(255) DEFAULT NULL,
        phone         VARCHAR(30)  DEFAULT NULL,
        address       VARCHAR(255) DEFAULT NULL,
        lat           DECIMAL(10,7) DEFAULT NULL,
        lon           DECIMAL(10,7) DEFAULT NULL,
        about         TEXT DEFAULT NULL,
        zip_code      VARCHAR(10)  DEFAULT NULL,
        state         VARCHAR(3)   DEFAULT NULL,
        rating        DECIMAL(2,1) NOT NULL DEFAULT 0.0,
        yelp_url      VARCHAR(255) DEFAULT NULL,
        review        BIGINT       DEFAULT 0,
        claimed       INT          DEFAULT NULL,
        hours_of_operation VARCHAR(255) DEFAULT NULL,
        hours_of_ops       VARCHAR(255) DEFAULT NULL,
        founding_date INT          DEFAULT NULL,
        noe           INT          NOT NULL DEFAULT 0,
        company_name  TEXT         DEFAULT NULL,
        skor          INT          DEFAULT 0,
        sent          INT          DEFAULT 0,
        filename      VARCHAR(255) DEFAULT NULL,
        city          VARCHAR(50)  DEFAULT NULL,
        country       VARCHAR(50)  DEFAULT NULL,
        county        VARCHAR(50)  DEFAULT NULL,
        address_new   VARCHAR(255) DEFAULT NULL,
        zips_id       INT          DEFAULT NULL,
        updates       TINYINT      NOT NULL DEFAULT 0,
        web_scan      TINYINT      NOT NULL DEFAULT 0,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS business_imports (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        original_name VARCHAR(255) NOT NULL,
        inserted      INT DEFAULT 0,
        skipped       INT DEFAULT 0,
        total         INT DEFAULT 0,
        file_data     LONGTEXT,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
