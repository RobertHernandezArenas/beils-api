-- CreateTable
CREATE TABLE `User` (
    `user_id` CHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(25) NOT NULL DEFAULT 'ADMIN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clients` (
    `client_id` CHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `surname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `birth_date` DATE NOT NULL,
    `gender` VARCHAR(25) NOT NULL,
    `mobile` VARCHAR(25) NOT NULL,
    `address` VARCHAR(100) NULL,
    `zip_code` VARCHAR(25) NULL,
    `phone` VARCHAR(25) NULL,
    `city` VARCHAR(100) NULL,
    `country` VARCHAR(100) NULL,
    `document_type` ENUM('PASSPORT', 'NIE', 'DNI', 'CIF') NOT NULL,
    `document_number` VARCHAR(25) NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `clients_email_key`(`email`),
    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brands` (
    `brand_id` CHAR(100) NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `brands_name_key`(`name`),
    PRIMARY KEY (`brand_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `category_id` CHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `description` VARCHAR(255) NULL,
    `type` VARCHAR(25) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategories` (
    `subcategory_id` CHAR(100) NOT NULL,
    `category_id` CHAR(100) NULL,
    `name` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `subcategories_category_id_name_key`(`category_id`, `name`),
    PRIMARY KEY (`subcategory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `product_id` CHAR(100) NOT NULL,
    `brand_id` CHAR(100) NULL,
    `subcategory_id` CHAR(100) NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `sku` VARCHAR(100) NULL,
    `price` DECIMAL(10, 2) NULL,
    `cost` DECIMAL(10, 2) NULL,
    `stock_quantity` INTEGER NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `products_sku_key`(`sku`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `service_id` CHAR(100) NOT NULL,
    `subcategory_id` CHAR(100) NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `duration_minutes` INTEGER NULL,
    `price` DECIMAL(10, 2) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packs` (
    `pack_id` CHAR(100) NOT NULL,
    `name` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `price` DECIMAL(10, 2) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`pack_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pack_items_products` (
    `pack_item_product_id` CHAR(100) NOT NULL,
    `pack_id` CHAR(100) NULL,
    `product_id` CHAR(100) NULL,
    `quantity` INTEGER NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`pack_item_product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pack_items_services` (
    `pack_item_service_id` CHAR(100) NOT NULL,
    `pack_id` CHAR(100) NULL,
    `service_id` CHAR(100) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`pack_item_service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consents` (
    `consentId` CHAR(100) NOT NULL,
    `client_id` CHAR(100) NULL,
    `consent_type` ENUM('LGPD', 'INDIBA', 'LASER') NULL,
    `accepted` BOOLEAN NULL DEFAULT true,
    `accepted_at` DATETIME NULL,
    `document_url` VARCHAR(255) NULL,
    `notes` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `consents_client_id_consent_type_key`(`client_id`, `consent_type`),
    PRIMARY KEY (`consentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questionnaires` (
    `questionnary_id` CHAR(100) NOT NULL,
    `client_id` CHAR(100) NULL,
    `title` VARCHAR(255) NULL,
    `answers` JSON NULL,
    `filled_at` DATETIME NULL,
    `version` INTEGER NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`questionnary_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revokes` (
    `revokeId` CHAR(100) NOT NULL,
    `client_id` CHAR(100) NULL,
    `entity_type` VARCHAR(50) NULL,
    `entity_id` CHAR(100) NULL,
    `reason` VARCHAR(255) NULL,
    `revoked_at` DATETIME NULL,

    PRIMARY KEY (`revokeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `status_id` CHAR(100) NOT NULL,
    `name` VARCHAR(50) NULL,
    `description` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `status_name_key`(`name`),
    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coupons` (
    `coupon_id` CHAR(100) NOT NULL,
    `code` VARCHAR(50) NULL,
    `description` VARCHAR(255) NULL,
    `discount_type` VARCHAR(50) NULL,
    `discount_value` DECIMAL(10, 2) NULL,
    `min_purchase` DECIMAL(10, 2) NULL,
    `max_uses` INTEGER NULL,
    `used_count` INTEGER NULL,
    `valid_from` DATETIME NULL,
    `valid_until` DATETIME NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `coupons_code_key`(`code`),
    PRIMARY KEY (`coupon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bonus` (
    `bonus_id` CHAR(100) NOT NULL,
    `client_id` CHAR(100) NULL,
    `name` VARCHAR(255) NULL,
    `service_id` CHAR(100) NULL,
    `total_sessions` INTEGER NULL,
    `used_sessions` INTEGER NULL,
    `expires_at` DATE NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`bonus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `giftcards` (
    `giftcard_id` CHAR(100) NOT NULL,
    `code` VARCHAR(50) NULL,
    `client_id` CHAR(100) NULL,
    `initial_amount` DECIMAL(10, 2) NULL,
    `current_balance` DECIMAL(10, 2) NULL,
    `expires_at` DATE NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `giftcards_code_key`(`code`),
    PRIMARY KEY (`giftcard_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `debts` (
    `debt_id` CHAR(100) NOT NULL,
    `client_id` CHAR(100) NULL,
    `amount` DECIMAL(10, 2) NULL,
    `remaining_amount` DECIMAL(10, 2) NULL,
    `status_id` CHAR(100) NULL,
    `due_date` DATE NULL,
    `paid_at` DATETIME NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`debt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `cart_id` CHAR(100) NOT NULL,
    `client_id` CHAR(100) NULL,
    `staffId` CHAR(100) NULL,
    `status_id` CHAR(100) NULL,
    `completed_at` DATETIME NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items_products` (
    `cart_item_product_id` CHAR(100) NOT NULL,
    `cart_id` CHAR(100) NULL,
    `product_id` CHAR(100) NULL,
    `quantity` INTEGER NULL,
    `unit_price` DECIMAL(10, 2) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`cart_item_product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items_services` (
    `cart_item_service_id` CHAR(100) NOT NULL,
    `cart_id` CHAR(100) NULL,
    `service_id` CHAR(100) NULL,
    `unit_price` DECIMAL(10, 2) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`cart_item_service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items_packs` (
    `cart_item_pack_id` CHAR(100) NOT NULL,
    `cart_id` CHAR(100) NULL,
    `pack_id` CHAR(100) NULL,
    `unit_price` DECIMAL(10, 2) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`cart_item_pack_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items_coupons` (
    `cart_item_coupon_id` CHAR(100) NOT NULL,
    `cart_id` CHAR(100) NULL,
    `coupon_id` CHAR(100) NULL,
    `applied` BOOLEAN NULL DEFAULT true,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`cart_item_coupon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items_bonus` (
    `cart_item_bonus_id` CHAR(100) NOT NULL,
    `cart_id` CHAR(100) NULL,
    `bonus_id` CHAR(100) NULL,
    `sessions_used` INTEGER NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`cart_item_bonus_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items_giftcard` (
    `cart_item_giftcard_id` CHAR(100) NOT NULL,
    `cart_id` CHAR(100) NULL,
    `giftcard_id` CHAR(100) NULL,
    `amount_used` DECIMAL(10, 2) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`cart_item_giftcard_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `booking_id` CHAR(100) NOT NULL,
    `client_id` CHAR(100) NULL,
    `service_id` CHAR(100) NULL,
    `pack_id` CHAR(100) NULL,
    `staff_id` CHAR(100) NULL,
    `cart_id` CHAR(100) NULL,
    `status_id` CHAR(100) NULL,
    `scheduled_at` DATETIME NULL,
    `duration_minutes` INTEGER NULL,
    `notes` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`booking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `tag_id` CHAR(100) NOT NULL,
    `name` VARCHAR(50) NULL,
    `color` VARCHAR(7) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    PRIMARY KEY (`tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_tags` (
    `product_id` CHAR(100) NOT NULL,
    `tag_id` CHAR(100) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`product_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subcategories` ADD CONSTRAINT `subcategories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `brands`(`brand_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_subcategory_id_fkey` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories`(`subcategory_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_subcategory_id_fkey` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories`(`subcategory_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pack_items_products` ADD CONSTRAINT `pack_items_products_pack_id_fkey` FOREIGN KEY (`pack_id`) REFERENCES `packs`(`pack_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pack_items_products` ADD CONSTRAINT `pack_items_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pack_items_services` ADD CONSTRAINT `pack_items_services_pack_id_fkey` FOREIGN KEY (`pack_id`) REFERENCES `packs`(`pack_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pack_items_services` ADD CONSTRAINT `pack_items_services_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consents` ADD CONSTRAINT `consents_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `questionnaires` ADD CONSTRAINT `questionnaires_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `revokes` ADD CONSTRAINT `revokes_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bonus` ADD CONSTRAINT `bonus_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bonus` ADD CONSTRAINT `bonus_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `giftcards` ADD CONSTRAINT `giftcards_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debts` ADD CONSTRAINT `debts_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `debts` ADD CONSTRAINT `debts_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status`(`status_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status`(`status_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_products` ADD CONSTRAINT `cart_items_products_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_products` ADD CONSTRAINT `cart_items_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_services` ADD CONSTRAINT `cart_items_services_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_services` ADD CONSTRAINT `cart_items_services_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_packs` ADD CONSTRAINT `cart_items_packs_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_packs` ADD CONSTRAINT `cart_items_packs_pack_id_fkey` FOREIGN KEY (`pack_id`) REFERENCES `packs`(`pack_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_coupons` ADD CONSTRAINT `cart_items_coupons_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_coupons` ADD CONSTRAINT `cart_items_coupons_coupon_id_fkey` FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`coupon_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_bonus` ADD CONSTRAINT `cart_items_bonus_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_bonus` ADD CONSTRAINT `cart_items_bonus_bonus_id_fkey` FOREIGN KEY (`bonus_id`) REFERENCES `bonus`(`bonus_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_giftcard` ADD CONSTRAINT `cart_items_giftcard_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items_giftcard` ADD CONSTRAINT `cart_items_giftcard_giftcard_id_fkey` FOREIGN KEY (`giftcard_id`) REFERENCES `giftcards`(`giftcard_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_pack_id_fkey` FOREIGN KEY (`pack_id`) REFERENCES `packs`(`pack_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`cart_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status`(`status_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tags` ADD CONSTRAINT `product_tags_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_tags` ADD CONSTRAINT `product_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`tag_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
