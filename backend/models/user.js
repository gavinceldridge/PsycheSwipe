"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");


class User {

    static async authenticate(email, password) {
        const result = await db.query(
            `SELECT username,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                is_admin AS "isAdmin",
                is_therapist AS "isTherapist",
                insurance_description AS "insuranceDescription",
                experience,
                goals,
                availability_times AS "availabiltyTimes",
                bio,
                last_location AS "lastLocation"
            FROM users
            WHERE email=$1`,
            [email]
        );

        const user = result.rows[0];

        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username-password combination");
    }

    static async register({
        email,
        password,
        firstName,
        lastName,
        isAdmin = false,
        isTherapist = false,
        insuranceDescription = " ",
        experience = " ",
        goals = " ",
        availableTimes = " ",
        bio = " ",
        lastLocation = " "
    }) {


        const dupeCheck = await db.query(`
            SELECT email
            FROM users
            WHERE email=$1
        `, [email]);


        if (dupeCheck.rows[0]) {
            throw new BadRequestError(`Duplicate email: ${email}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(`
            INSERT INTO users
            (
                email,
                password,
                first_name,
                last_name,
                is_admin,
                is_therapist,
                insurance_description,
                experience,
                goals,
                available_times,
                bio,
                last_location
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING email, first_name AS "firstName", last_name AS "lastName", is_admin AS "isAdmin", is_therapist AS "isTherapist", insurance_description AS "insuranceDescription", goals, experience, available_times AS "availableTimes", bio, last_location AS "lastLocation`,
            [email, password, firstName, lastName, isAdmin, isTherapist, insuranceDescription, experience, goals, availableTimes, bio, lastLocation]
        );

        const user = result.rows[0];

        return user;
    }
}

