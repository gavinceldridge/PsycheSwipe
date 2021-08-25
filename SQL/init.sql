\echo 'Delete and recreate psycheswipe db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE psycheswipe;
CREATE DATABASE psycheswipe;
\connect psycheswipe

\i schema.sql
\i seed.sql

\echo 'Delete and recreate psycheswipe_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE psycheswipe_test;
CREATE DATABASE psycheswipe_test;
\connect psycheswipe_test

\i schema.sql