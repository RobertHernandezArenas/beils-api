CREATE DATABASE Beils_DB;
USE Beils_DB;
SELECT * FROM users;
-- DROP DATABASE beils_db;

-- Desactivar verificación de llaves foráneas temporalmente para evitar errores de orden
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE clients (
  client_id CHAR(36) NOT NULL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  birth_date DATE,
  gender VARCHAR(20),
  address VARCHAR(255) ,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  created_at DATETIME,
  updated_at DATETIME,
  is_active BOOLEAN DEFAULT true 
);

CREATE TABLE brands (
  brand_id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  description VARCHAR(255),
  created_at DATETIME
);

CREATE TABLE categories (
  category_id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  description VARCHAR(255),
  type VARCHAR(20)
);

CREATE TABLE subcategories (
  subcategory_id CHAR(36) NOT NULL PRIMARY KEY,
  category_id CHAR(36),
  name VARCHAR(100),
  UNIQUE KEY unique_cat_name (category_id, name)
);

CREATE TABLE products (
  product_id CHAR(36) NOT NULL PRIMARY KEY,
  brand_id CHAR(36),
  subcategory_id CHAR(36),
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
  service_id CHAR(36) NOT NULL PRIMARY KEY,
  subcategory_id CHAR(36), -- Corregido: Era integer en PG, debe coincidir con subcategories.id
  name VARCHAR(255),
  description VARCHAR(255),
  duration_minutes INTEGER,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE packs (
  pack_id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME
);

CREATE TABLE pack_items_products (
  pack_item_product_id CHAR(36) NOT NULL PRIMARY KEY,
  pack_id CHAR(36), -- Agregado: Faltaba en la definición original
  product_id CHAR(36),
  quantity INTEGER
);

CREATE TABLE pack_items_services (
  pack_item_service_id CHAR(36) NOT NULL PRIMARY KEY,
  pack_id CHAR(36), -- Agregado: Faltaba en la definición original
  service_id CHAR(36)
);

CREATE TABLE consents (
  consent_id CHAR(36) NOT NULL PRIMARY KEY,
  client_id CHAR(36),
  consent_type ENUM('lgpd', 'indiba', 'laser'), -- Definido inline para MySQL
  accepted BOOLEAN DEFAULT true,
  accepted_at DATETIME,
  document_url VARCHAR(255),
  notes VARCHAR(255),
  UNIQUE KEY unique_client_consent (client_id, consent_type)
);

CREATE TABLE questionnaires (
  questionnary_id CHAR(36) NOT NULL PRIMARY KEY,
  client_id CHAR(36),
  title VARCHAR(255),
  answers JSON, -- jsonb pasa a JSON
  filled_at DATETIME,
  version INTEGER
);

CREATE TABLE revokes (
  revoke_id CHAR(36) NOT NULL PRIMARY KEY,
  client_id CHAR(36),
  entity_type VARCHAR(50),
  entity_id CHAR(36),
  reason VARCHAR(255),
  revoked_at DATETIME
);

CREATE TABLE status (
  status_id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(50) UNIQUE COMMENT 'Ej: confirmado, pagado, cancelado',
  conVARCHAR(255) VARCHAR(50),
  description VARCHAR(255)
);

CREATE TABLE coupons (
  coupon_id CHAR(36) NOT NULL PRIMARY KEY,
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
  bonus_id CHAR(36) NOT NULL PRIMARY KEY,
  client_id CHAR(36),
  name VARCHAR(255),
  service_id CHAR(36),
  total_sessions INTEGER,
  used_sessions INTEGER,
  expires_at DATE,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME
);

CREATE TABLE giftcards (
  giftcard_id CHAR(36) NOT NULL PRIMARY KEY,
  code VARCHAR(50) UNIQUE,
  client_id CHAR(36),
  initial_amount DECIMAL(10,2),
  current_balance DECIMAL(10,2),
  expires_at DATE,
  is_active BOOLEAN DEFAULT true,
  created_at DATETIME
);

CREATE TABLE debts (
  debt_id CHAR(36) NOT NULL PRIMARY KEY,
  client_id CHAR(36),
  amount DECIMAL(10,2),
  remaining_amount DECIMAL(10,2),
  status_id CHAR(36),
  due_date DATE,
  created_at DATETIME,
  paid_at DATETIME
);

CREATE TABLE carts (
  cart_id CHAR(36) NOT NULL PRIMARY KEY,
  client_id CHAR(36),
  staff_id CHAR(36),
  status_id CHAR(36),
  created_at DATETIME,
  updated_at DATETIME,
  completed_at DATETIME
);

CREATE TABLE cart_items_products (
  cart_item_product_id CHAR(36) NOT NULL PRIMARY KEY,
  cart_id CHAR(36),
  product_id CHAR(36),
  quantity INTEGER,
  unit_price DECIMAL(10,2)
);

CREATE TABLE cart_items_services (
  cart_item_service_id CHAR(36) NOT NULL PRIMARY KEY,
  cart_id CHAR(36),
  service_id CHAR(36),
  unit_price DECIMAL(10,2)
);

CREATE TABLE cart_items_packs (
  cart_item_pack_id CHAR(36) NOT NULL PRIMARY KEY,
  cart_id CHAR(36),
  pack_id CHAR(36),
  unit_price DECIMAL(10,2)
);

CREATE TABLE cart_items_coupons (
  cart_item_coupon_id CHAR(36) NOT NULL PRIMARY KEY,
  cart_id CHAR(36),
  coupon_id CHAR(36),
  applied BOOLEAN DEFAULT true
);

CREATE TABLE cart_items_bonus (
  cart_item_bonus_id CHAR(36) NOT NULL PRIMARY KEY,
  cart_id CHAR(36),
  bonus_id CHAR(36),
  sessions_used INTEGER
);

CREATE TABLE cart_items_giftcard (
  cart_item_giftcard_id CHAR(36) NOT NULL PRIMARY KEY,
  cart_id CHAR(36),
  giftcard_id CHAR(36),
  amount_used DECIMAL(10,2)
);

CREATE TABLE bookings (
  booking_id CHAR(36) NOT NULL PRIMARY KEY,
  client_id CHAR(36),
  service_id CHAR(36),
  pack_id CHAR(36),
  staff_id CHAR(36),
  cart_id CHAR(36),
  status_id CHAR(36),
  scheduled_at DATETIME,
  duration_minutes INTEGER,
  notes VARCHAR(255),
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE tags (
  tag_id CHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(50) UNIQUE,
  color VARCHAR(7)
);

CREATE TABLE product_tags (
  product_id CHAR(36),
  tag_id CHAR(36)
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