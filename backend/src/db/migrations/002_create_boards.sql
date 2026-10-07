CREATE TABLE boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name Varchar(255) NOT NULL,
    user_id UUID REFERENCES users(id)
)