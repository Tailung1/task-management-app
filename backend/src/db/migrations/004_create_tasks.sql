CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    column_id UUID NOT NULL REFERENCES columns(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    position INTEGER
);