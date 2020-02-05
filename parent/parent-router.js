const express = require('express');
const router = express.Router();
const DB = require('../knex-queries/model.js');

// Register a child to be linked to logged in parent's account

router.post('/child', async (req, res) => {
  const newChild = req.body;

  try {
    const addedChild = await DB.addChild(newChild);
    res.status(201).json(addedChild);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets all children associated with Parent by ParentId

router.get('/children/:parentId', async (req, res) => {
  const parent = req.params.parentId;

  try {
    const children = await DB.getChildren(parent);
    res.status(200).json(children);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add food entry by child Id

router.post('/food/:childId', async (req, res) => {
  const newEntry = req.body;
  const { childId } = req.params;
  console.log(newEntry, 'NEW ENTRY HERE', childId);
  try {
    const addedEntry = await DB.addEntry(childId, newEntry);
    console.log(addedEntry);
    res.status(201).json(addedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update food entry by entry Id

router.put('/food/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const updatedEntry = await DB.editEntry(id, body);
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete food entry by entry Id

router.delete('/food/:id', async (req, res) => {
  const entry = req.params.id;

  try {
    const removedEntry = await DB.removeEntry(entry);
    res.status(204).json(removedEntry);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all food entries from all children belonging to a parent by Parent Id

router.get('/food/parent/:parentId', async (req, res) => {
  const parentId = req.params.parentId;
  console.log(parentId, 'parentID');
  try {
    const children = await DB.getChildren(parentId);

    const childrenIds = children.map((child) => {
      return child.id;
    });
    const entries = await DB.getEntries(childrenIds);
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get food entries from child (childId) over last timespan (day, week, or month)
//  with option query to specify a date that isn't today ?date='2020-09-24'

router.get('/entries/:child/:timespan', async (req, res) => {
  let useDate;

  const { child } = req.params;
  const { timespan } = req.params;
  if (req.query.date) {
    useDate = req.query.date;
  } else {
    useDate = new Date().toISOString().slice(0, 10);
  }
  try {
    let entries;
    switch (timespan) {
      case 'week': {
        const weekDate = await getDate(useDate, 7);
        entries = await DB.getEntryWeek(weekDate, useDate, child);
        break;
      }
      case 'month': {
        const monthDate = await getDate(useDate, 30);
        entries = await DB.getEntryMonth(monthDate, useDate, child);
        break;
      }
      case 'day':
      default: {
        entries = await DB.getEntryDay(useDate, child);
      }
    }
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json(err);
  }
});

const getDate = function(startDate, days) {
  const rangeDate = new Date(startDate);
  rangeDate.setUTCDate(rangeDate.getUTCDate() - days);
  return rangeDate.toISOString().slice(0, 10);
};

module.exports = router;
