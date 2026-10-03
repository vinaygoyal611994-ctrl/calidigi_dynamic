-- ═══════════════════════════════════════════════
--  CALIDIGI — MySQL Database Schema
--  Run this file first, then run: node database/seed.mjs
-- ═══════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS calidigi_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE calidigi_db;

-- ── Admin Users ──
CREATE TABLE IF NOT EXISTS admin_users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ── Contact Submissions ──
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
);

-- ── CMS Pages ──
CREATE TABLE IF NOT EXISTS cms_pages (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  title            VARCHAR(500) NOT NULL,
  slug             VARCHAR(500) NOT NULL UNIQUE,
  content          LONGTEXT,
  meta_description VARCHAR(500),
  status           ENUM('draft','published') DEFAULT 'draft',
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── Password Resets ──
CREATE TABLE IF NOT EXISTS password_resets (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL,
  token      VARCHAR(64) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
);

-- ── Blog Posts ──
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
);
