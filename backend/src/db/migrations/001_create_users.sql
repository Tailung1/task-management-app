CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name Varchar(255) NOT NULL,
    email Varchar(255) UNIQUE NOT NULL,
    password Varchar(255) NOT NULL
)