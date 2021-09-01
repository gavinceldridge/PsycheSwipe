"use strict";

const { validate } = require("jsonschema");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/&[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (e) {
        return next(e);
    }
}

const ensureLoggedIn = (req, res, next) => {

    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (e) {
        return next(e);
    }

}

const validateIsAdmin = (req, res, next) => {

    try {
        if (res.locals.user && res.locals.user.isAdmin) {
            return next();
        } else {
            throw new UnauthorizedError(`Unauthorized: ${res.locals.user.username} is not an admin!`);
        }
    } catch (e) {
        return next(e);
    }

}

const validateIsAdminOrUser = (req, res, next) => {
    try {
        if (req.params.username === res.locals.user.username || res.locals.user.isAdmin) {
            return next();
        } else {
            throw new UnauthorizedError(`Unauthorized: ${res.locals.user.username} is not an admin nor the user attempting to be accessed.`);
        }
    } catch (e) {
        return next(e);
    }
}


module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    validateIsAdmin,
    validateIsAdminOrUser
}