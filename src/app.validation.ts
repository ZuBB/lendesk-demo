import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type ValidationResult = true | string;

const zodErrorOptions = { maxIssuesInMessage: 1, prefix: null };

const usernameSchema = z
  .string()
  .min(3, 'Username: should contain at least 4 characters')
  .regex(/^[A-Z\d_]+$/i, 'Username: only latin letters, numbers and _ is allowed')
  .regex(/^[A-Z]/i, 'Username: should start with a letter');

const passwordSchema = z
  .string()
  .min(8, 'Password: should contain at least 8 characters')
  .regex(/[A-Z]+/, 'Password: should include at least 1 uppercase letter')
  .regex(/[a-z]+/, 'Password: should include at least 1 lowercase letter')
  .regex(/[\d]+/, 'Password: should include at least 1 digit')
  .regex(/[!@#$%^&*_+]+/, 'Should include at least 1 special symbol (eg. %&!');

export const isUsernameValid = (username: string | undefined): ValidationResult => {
  return testDataAgainstSchema(usernameSchema, username);
};

export const isPasswordValid = (password: string | undefined): ValidationResult => {
  return testDataAgainstSchema(passwordSchema, password);
};

const testDataAgainstSchema = (
  schema: z.ZodTypeAny,
  data: unknown
): ValidationResult => {
  const result = schema.safeParse(data);
  return result.success || fromZodError(result.error, zodErrorOptions).message;
};
