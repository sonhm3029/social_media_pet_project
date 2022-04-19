CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE pins (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    about TEXT,
    destination TEXT NOT NULL,
    category VARCHAR(50),
    image TEXT NOT NULL,
    postedBy TEXT REFERENCES users(id) ON DELETE CASCADE

);


CREATE TABLE comments (
    pin_id SERIAL NOT NULL,
    content TEXT NOT NULL,
    postedBy TEXT REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pin_id) REFERENCES pins(id) ON DELETE CASCADE
);
CREATE TABLE saves (
    savedBy TEXT REFERENCES users(id) ON DELETE CASCADE,
    pin_id SERIAL REFERENCES pins(id) ON DELETE CASCADE
);