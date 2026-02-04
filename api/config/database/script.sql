CREATE DATABASE beils_db;
USE beils_db;

-- DROP DATABASE beils_db;

-- Desactivar verificación de llaves foráneas temporalmente para evitar errores de orden
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE users (
  users_id VARCHAR(255) NOT NULL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE clients (
  client_id VARCHAR(255) NOT NULL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  birth_date DATE,
  gender VARCHAR(20),
  document_type ENUM('PASSPORT', 'NIE', 'DNI') NOT NULL,
  document_number VARCHAR(20) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE brands (
  brand_id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  description VARCHAR(255),
  created_at DATETIME
);

CREATE TABLE categories (
  category_id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  description VARCHAR(255),
  type VARCHAR(20)
);

CREATE TABLE subcategories (
  subcategory_id VARCHAR(255) NOT NULL PRIMARY KEY,
  category_id VARCHAR(255),
  name VARCHAR(100),
  UNIQUE KEY unique_cat_name (category_id, name)
);

CREATE TABLE products (
  product_id VARCHAR(255) NOT NULL PRIMARY KEY,
  brand_id VARCHAR(255),
  subcategory_id VARCHAR(255),
  name VARCHAR(255),
  description VARCHAR(255),
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10,2),
  cost DECIMAL(10,2),
  stock_quantity INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE services (
  service_id VARCHAR(255) NOT NULL PRIMARY KEY,
  subcategory_id VARCHAR(255), -- Corregido: Era integer en PG, debe coincidir con subcategories.id
  name VARCHAR(255),
  description VARCHAR(255),
  duration_minutes INTEGER,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE packs (
  pack_id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME
);

CREATE TABLE pack_items_products (
  pack_item_product_id VARCHAR(255) NOT NULL PRIMARY KEY,
  pack_id VARCHAR(255), -- Agregado: Faltaba en la definición original
  product_id VARCHAR(255),
  quantity INTEGER
);

CREATE TABLE pack_items_services (
  pack_item_service_id VARCHAR(255) NOT NULL PRIMARY KEY,
  pack_id VARCHAR(255), -- Agregado: Faltaba en la definición original
  service_id VARCHAR(255)
);

CREATE TABLE consents (
  consent_id VARCHAR(255) NOT NULL PRIMARY KEY,
  client_id VARCHAR(255),
  consent_type ENUM('LGPD', 'INDIBA', 'LASER'), -- Definido inline para MySQL
  accepted BOOLEAN DEFAULT true,
  accepted_at DATETIME,
  document_url VARCHAR(255),
  notes VARCHAR(255),
  UNIQUE KEY unique_client_consent (client_id, consent_type)
);

CREATE TABLE questionnaires (
  questionnary_id VARCHAR(255) NOT NULL PRIMARY KEY,
  client_id VARCHAR(255),
  title VARCHAR(255),
  answers JSON, -- jsonb pasa a JSON
  filled_at DATETIME,
  version INTEGER
);

CREATE TABLE revokes (
  revoke_id VARCHAR(255) NOT NULL PRIMARY KEY,
  client_id VARCHAR(255),
  entity_type VARCHAR(50),
  entity_id VARCHAR(255),
  reason VARCHAR(255),
  revoked_at DATETIME
);

CREATE TABLE status (
  status_id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  description VARCHAR(255)
);

CREATE TABLE coupons (
  coupon_id VARCHAR(255) NOT NULL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  description VARCHAR(255),
  discount_type VARCHAR(20),
  discount_value DECIMAL(10,2),
  min_purchase DECIMAL(10,2),
  max_uses INTEGER,
  used_count INTEGER,
  valid_from DATETIME,
  valid_until DATETIME,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE bonus (
  bonus_id VARCHAR(255) NOT NULL PRIMARY KEY,
  client_id VARCHAR(255),
  name VARCHAR(255),
  service_id VARCHAR(255),
  total_sessions INTEGER,
  used_sessions INTEGER,
  expires_at DATE,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME
);

CREATE TABLE giftcards (
  giftcard_id VARCHAR(255) NOT NULL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  client_id VARCHAR(255),
  initial_amount DECIMAL(10,2),
  current_balance DECIMAL(10,2),
  expires_at DATE,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME
);

CREATE TABLE debts (
  debt_id VARCHAR(255) NOT NULL PRIMARY KEY,
  client_id VARCHAR(255),
  amount DECIMAL(10,2),
  remaining_amount DECIMAL(10,2),
  status_id VARCHAR(255),
  due_date DATE,
  created_at DATETIME,
  paid_at DATETIME
);

CREATE TABLE carts (
  cart_id VARCHAR(255) NOT NULL PRIMARY KEY,
  client_id VARCHAR(255),
  staff_id VARCHAR(255),
  status_id VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME,
  completed_at DATETIME
);

CREATE TABLE cart_items_products (
  cart_item_product_id VARCHAR(255) NOT NULL PRIMARY KEY,
  cart_id VARCHAR(255),
  product_id VARCHAR(255),
  quantity INTEGER,
  unit_price DECIMAL(10,2)
);

CREATE TABLE cart_items_services (
  cart_item_service_id VARCHAR(255) NOT NULL PRIMARY KEY,
  cart_id VARCHAR(255),
  service_id VARCHAR(255),
  unit_price DECIMAL(10,2)
);

CREATE TABLE cart_items_packs (
  cart_item_pack_id VARCHAR(255) NOT NULL PRIMARY KEY,
  cart_id VARCHAR(255),
  pack_id VARCHAR(255),
  unit_price DECIMAL(10,2)
);

CREATE TABLE cart_items_coupons (
  cart_item_coupon_id VARCHAR(255) NOT NULL PRIMARY KEY,
  cart_id VARCHAR(255),
  coupon_id VARCHAR(255),
  applied BOOLEAN DEFAULT true
);

CREATE TABLE cart_items_bonus (
  cart_item_bonus_id VARCHAR(255) NOT NULL PRIMARY KEY,
  cart_id VARCHAR(255),
  bonus_id VARCHAR(255),
  sessions_used INTEGER
);

CREATE TABLE cart_items_giftcard (
  cart_item_giftcard_id VARCHAR(255) NOT NULL PRIMARY KEY,
  cart_id VARCHAR(255),
  giftcard_id VARCHAR(255),
  amount_used DECIMAL(10,2)
);

CREATE TABLE bookings (
  booking_id VARCHAR(255) NOT NULL PRIMARY KEY,
  client_id VARCHAR(255),
  service_id VARCHAR(255),
  pack_id VARCHAR(255),
  staff_id VARCHAR(255),
  cart_id VARCHAR(255),
  status_id VARCHAR(255),
  scheduled_at DATETIME,
  duration_minutes INTEGER,
  notes VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE tags (
  tag_id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  color VARCHAR(7)
);

CREATE TABLE product_tags (
  product_id VARCHAR(255),
  tag_id VARCHAR(255)
);

-- Definición de Foreign Keys
ALTER TABLE consents ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE questionnaires ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE bonus ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE giftcards ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE debts ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE carts ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE bookings ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE revokes ADD FOREIGN KEY (client_id) REFERENCES clients (client_id);
ALTER TABLE products ADD FOREIGN KEY (brand_id) REFERENCES brands (brand_id);
ALTER TABLE products ADD FOREIGN KEY (subcategory_id) REFERENCES subcategories (subcategory_id);
ALTER TABLE services ADD FOREIGN KEY (subcategory_id) REFERENCES subcategories (subcategory_id);
ALTER TABLE subcategories ADD FOREIGN KEY (category_id) REFERENCES categories (category_id);
ALTER TABLE pack_items_products ADD FOREIGN KEY (pack_id) REFERENCES packs (pack_id);
ALTER TABLE pack_items_products ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE pack_items_services ADD FOREIGN KEY (pack_id) REFERENCES packs (pack_id);
ALTER TABLE pack_items_services ADD FOREIGN KEY (service_id) REFERENCES services (service_id);
ALTER TABLE bonus ADD FOREIGN KEY (service_id) REFERENCES services (service_id);
ALTER TABLE debts ADD FOREIGN KEY (status_id) REFERENCES status (status_id);
ALTER TABLE carts ADD FOREIGN KEY (status_id) REFERENCES status (status_id);
ALTER TABLE bookings ADD FOREIGN KEY (status_id) REFERENCES status (status_id);
ALTER TABLE cart_items_products ADD FOREIGN KEY (cart_id) REFERENCES carts (cart_id);
ALTER TABLE cart_items_products ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE cart_items_services ADD FOREIGN KEY (cart_id) REFERENCES carts (cart_id);
ALTER TABLE cart_items_services ADD FOREIGN KEY (service_id) REFERENCES services (service_id);
ALTER TABLE cart_items_packs ADD FOREIGN KEY (cart_id) REFERENCES carts (cart_id);
ALTER TABLE cart_items_packs ADD FOREIGN KEY (pack_id) REFERENCES packs (pack_id);
ALTER TABLE cart_items_coupons ADD FOREIGN KEY (cart_id) REFERENCES carts (cart_id);
ALTER TABLE cart_items_coupons ADD FOREIGN KEY (coupon_id) REFERENCES coupons (coupon_id);
ALTER TABLE cart_items_bonus ADD FOREIGN KEY (cart_id) REFERENCES carts (cart_id);
ALTER TABLE cart_items_bonus ADD FOREIGN KEY (bonus_id) REFERENCES bonus (bonus_id);
ALTER TABLE cart_items_giftcard ADD FOREIGN KEY (cart_id) REFERENCES carts (cart_id);
ALTER TABLE cart_items_giftcard ADD FOREIGN KEY (giftcard_id) REFERENCES giftcards (giftcard_id);
ALTER TABLE bookings ADD FOREIGN KEY (service_id) REFERENCES services (service_id);
ALTER TABLE bookings ADD FOREIGN KEY (pack_id) REFERENCES packs (pack_id);
ALTER TABLE bookings ADD FOREIGN KEY (cart_id) REFERENCES carts (cart_id);
ALTER TABLE product_tags ADD FOREIGN KEY (product_id) REFERENCES products (product_id);
ALTER TABLE product_tags ADD FOREIGN KEY (tag_id) REFERENCES tags (tag_id);

-- Reactivar verificación de llaves foráneas
SET FOREIGN_KEY_CHECKS = 1;