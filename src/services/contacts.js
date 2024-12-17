import { contactsCollection } from '../db/models/Contact.js';

export const getAllContacts = () => contactsCollection.find();

export const getContactById = (id) => contactsCollection.findById(id);

export const addContact = (payload) => contactsCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await contactsCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (filter) =>
  contactsCollection.findOneAndDelete(filter);
