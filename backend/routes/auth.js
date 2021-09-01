"use strict";

const jsonschema = require("jsonschema");

const User = require("../model/user");

const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const authSchema = require("../schemas/userAuth.json");
const userRegistrationSchema = require("../schema/userRegistration.json");
const { BadRequestError } = require("../expressError");


router.post("/token", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, authSchema);
        if (!validator.valid) {
            const e = validator.errors.map(e => e.stack);
            throw new BadRequestError(e);
        }

        const { email, password } = req.body;
        const user = await User.authenticate(email, password);
        const token = createToken(user);
        return res.json({ token });

    } catch (e) {
        return next(e);
    }
});

router.post("/register", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, userRegistrationSchema);
        if (!validator.valid) {
            const e = validator.errors.map(e => e.stack);
            throw new BadRequestError(e);
        }

        const newUser = await User.register({ ...req.body, isAdmin: false });
        const token = createToken(newUser);
        return res.status(201).json({ token });

    } catch (e) {
        return next(e);
    }
});







