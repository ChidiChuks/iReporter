const express = require('express');
const joi = require('joi');
const Incident = require('../model/incident');

const router = express.Router();
router.get('/API/v1/red-flags', (req, res, next) => {
    if (!Incident) {
        next();
    }
    const status = res.statusCode;
    Incident.status = status;
    res.send(Incident);
});

router.post('/API/v1/red-flags', (req, res, next) => {
    const order = {
        createdBy: joi.number(),
        type: joi.string(),
        createdOn: joi.string().required(),
        title: joi.string(),
        comment: joi.string().required(),
        location: joi.string().required()
    };

    const orderReturn = joi.validate(req.body, order);
    if (orderReturn.error) {
        next();
        return;
    }

    const id = Incident.incidents.length;
    const redFlag = {
        id,
        createdBy: req.body.createdBy,
        createdOn: req.body.createdOn,
        type: req.body.type,
        title: req.body.title,
        comment: req.body.comment,
        location: req.body.location
    };

    Incident.incidents.push(redFlag);
    res.json({
        status: res.statusCode,
        incidents: [{
            id,
            message: 'red-flag incident was created successfully',
        }, ],
    });
});

router.get('/API/v1/red-flags/:id', (req, res, next) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
        next();
    }
    res.json({
        status: res.statusCode,
        incidents: [
            incident,
        ],
    });
});

router.patch('/api/v1/red-flags/:id/location', (req, res, next) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
        next();
    }
    incident.location = req.body.location;
    res.json({
        status: res.statusCode,
        incidents: [{
            id: incident.id,
            message: 'location has been successfully updated',
        }, ],
    });
});

router.patch('/API/v1/red-flags/:id/comment', (req, res, next) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
        next();
    }
    incident.comment = req.body.comment;
    res.json({
        status: res.statusCode,
        incidents: [{
            id: incident.id,
            message: 'comment has been successfully updated',
        }, ],
    });
});

router.delete('/API/v1/red-flags/:id', (req, res, next) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
        next();
    }
    const incidentIndex = Incident.incidents.indexOf(incident);
    Incident.incidents.splice(incidentIndex, 1);

    res.json({
        status: res.statusCode,
        incidents: [{
            id: incident.id,
            message: 'record has been successfully deleted',
        }, ],
    });
});

router.patch('/API/v1/red-flags/:id', (req, res, next) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
        next();
    }
    incident.location = req.body.location;
    incident.comment = req.body.comment;
    incident.title = req.body.title;
    incident.type = req.body.type;

    res.json({
        status: res.statusCode,
        incidents: [{
            id: incident.id,
            message: 'record has been successfully updated',
        }, ],
    });
});

module.exports = router;