import { contactsCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsCollection.findById(contactId);
  return contact;
};

export const addContact = async (payload) => {
  const addedContact = await contactsCollection.create(payload);
  return addedContact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await contactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const deletedContact = await contactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return deletedContact;
};
