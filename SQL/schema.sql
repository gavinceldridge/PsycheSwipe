CREATE TABLE users (
    email TEXT PRIMARY KEY UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    is_therapist BOOLEAN NOT NULL DEFAULT FALSE,
    insurance_description TEXT,
    experience TEXT,
    goals TEXT,
    availability_times TEXT,
    bio TEXT,
    last_location TEXT
);

-- CREATE TABLE therapist_user (
--     email TEXT PRIMARY KEY UNIQUE CHECK (position('@' IN email) > 1),
--     password TEXT NOT NULL,
--     first_name TEXT NOT NULL,
--     last_name TEXT NOT NULL,
--     is_admin BOOLEAN NOT NULL DEFAULT FALSE,
--     insurance_description TEXT,
--     experience TEXT,
--     availability TEXT,
--     bio TEXT
-- );

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    liker TEXT NOT NULL REFERENCES users,
    likee TEXT NOT NULL REFERENCES users,
    sent_at TIMESTAMP without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    to_email TEXT NOT NULL REFERENCES users,
    from_email TEXT NOT NULL REFERENCES users,
    sent_at TIMESTAMP without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP
);

