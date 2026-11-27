/**
 * The support contact form: field limits and validation, shared by the form (instant feedback in the browser) and by
 * the API route (which never trusts the browser and validates again).
 */

export const TOPICS = [
  "Question about a feature",
  "Something is not working",
  "Help with setup",
  "Other",
] as const;

export type Topic = (typeof TOPICS)[number];

export const LIMITS = {
  name: 100,
  email: 200,
  store: 200,
  messageMin: 10,
  message: 5000,
} as const;

export type ContactFields = {
  name: string;
  email: string;
  store: string;
  topic: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

/** Returns an error message per invalid field; an empty object means the message can be sent. */
export function validateContact(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  const name = fields.name.trim();
  const email = fields.email.trim();
  const store = fields.store.trim();
  const message = fields.message.trim();

  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Use ${LIMITS.name} characters or fewer.`;

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(email) || email.length > LIMITS.email) errors.email = "Enter a valid email address, like name@example.com.";

  if (store.length > LIMITS.store || /[\r\n]/.test(store)) errors.store = "Enter your store address on one line, like your-store.myshopify.com.";

  if (!(TOPICS as readonly string[]).includes(fields.topic)) errors.topic = "Choose a topic.";

  if (message.length < LIMITS.messageMin) errors.message = `Write at least ${LIMITS.messageMin} characters so we can help.`;
  else if (message.length > LIMITS.message) errors.message = `Use ${LIMITS.message} characters or fewer.`;

  return errors;
}
