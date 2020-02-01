const db = require('../db/dbConfig.js');

module.exports = {
  find,
  findByUnique,
  findCol,
  addUser,
  login,
  addChild,
  getChildren,
  getEntries,
  addEntry,
  editEntry,
  removeEntry,
  getEntryDay,
  getEntryWeek,
  getEntryMonth
};

function find(table) {
  return db(table).select('*');
}

async function getChildren(parentId) {
  const children = await db('children')
    .returning('*')
    .where('parent_id', parentId);

  return children;
}

async function getEntries(children) {
  const entries = await db('food_entries')
    .returning('*')
    .whereIn('child_id', children);

  return entries;
}

// Accepts array of 2 strings [table, column]
function findCol(tcArray) {
  return db(tcArray[0]).select(tcArray[1]);
}

function login(filter) {
  return db('parents').where(filter);
}

async function addUser(parent) {
  const [addedParent] = await db('parents')
    .returning(['id', 'username'])
    .insert(parent);

  return addedParent;
}

function findByUnique(uniqueIdent) {
  return db(uniqueIdent[0])
    .select(uniqueIdent[1])
    .where(uniqueIdent[2])
    .first();
}

async function addEntry(id, entry) {
  const newEntry = { ...entry, child_id: id };
  const [addedEntry] = await db('food_entries')
    .returning(['child_id', 'id', 'date'])
    .insert(newEntry);

  return addedEntry;
}

async function removeEntry(entrynum) {
  console.log(entrynum, 'ENTRY ENTRY');
  const removedEntry = await db('food_entries')
    .returning(['id', 'date'])
    .where('id', entrynum)
    .delete();

  return removedEntry;
}

async function editEntry(id, body) {
  const editedEntry = await db('food_entries')
    .where('id', id)
    .update(body, ['*']);

  return editedEntry[0];
}

async function addChild(child) {
  const [addedChild] = await db('children')
    .returning(['id', 'name', 'parent_id'])
    .insert(child);

  return addedChild;
}

async function getEntryDay(day, child) {
  const daysEntry = await db('food_entries')
    .returning('*')
    .where('child_id', child)
    .where('date', day);
  return daysEntry;
}

async function getEntryWeek(begin, end, child) {
  const weeksEntry = await db('food_entries')
    .returning('*')
    .where('child_id', child)
    .whereBetween('date', [begin, end]);
  return weeksEntry;
}

async function getEntryMonth(begin, end, child) {
    const monthsEntry = await db('food_entries')
    .returning('*')
    .where('child_id', child)
    .whereBetween('date', [begin, end]);
    return monthsEntry;
}
