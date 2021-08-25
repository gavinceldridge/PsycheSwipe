

INSERT INTO users (
    email,
    password,
    first_name,
    last_name,
    is_admin,
    is_therapist,
    insurance_description,
    experience,
    goals,
    availability_times,
    bio
)
VALUES
    ('gchacka@gmail.com', 'password', 'Gavin', 'Eldridge', TRUE, FALSE, ' ', ' ', ' ', ' ', ' '),
    ('test@email.com', 'password', 'Test', 'User', FALSE, FALSE, ' ', ' ', ' ', ' ', ' '),
    ('therapist@email.com', 'password', 'Test', 'Therapist', FALSE, TRUE, ' ', ' ', ' ', ' ', ' ');


INSERT INTO likes (
    liker,
    likee
)
VALUES
    ('gchacka@gmail.com', 'therapist@email.com');

INSERT INTO user_messages (
    content,
    to_email,
    from_email
)
VALUES
    ('Test message!', 'gchacka@gmail.com', 'therapist@email.com');