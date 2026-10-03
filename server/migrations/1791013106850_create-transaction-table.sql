-- Up Migration
CREATE TYPE categories AS ENUM ('Housing', 'Food', 'Utilities', 'Transport', 'Entertainment', 'Health');

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    catergory categories NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)
-- Down Migration
DROP TABLE IF EXISTS transactions;
