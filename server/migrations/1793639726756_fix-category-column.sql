-- Up Migration
-- 1. Fix the typo: rename 'catergory' to 'category'
ALTER TABLE transactions RENAME COLUMN catergory TO category;

-- 2. (Optional but recommended) Change type from ENUM to VARCHAR so you can use any category:
ALTER TABLE transactions ALTER COLUMN category TYPE VARCHAR(100);

-- Down Migration
ALTER TABLE transactions ALTER COLUMN category TYPE categories;
ALTER TABLE transactions RENAME COLUMN category TO catergory;
