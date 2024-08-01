CREATE TABLE IF NOT EXISTS todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    finished boolean DEFAULT false
);