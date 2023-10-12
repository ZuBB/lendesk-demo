import { z } from 'zod';

const usernameSchema = z
  .string()
  .min(3, 'Username should contain at least 4 characters')
  .regex(/^[A-Z\d_]+$/i, 'Only latin letters, numbers and _ is allowed')
  .regex(/^[A-Z]/i, 'Username should start with letter');

const passwordSchema = z
  .string()
  .min(8, 'Password should contain at least 8 characters')
  .regex(/[A-Z]+/, 'Should include at least 1 uppercase letter')
  .regex(/[a-z]+/, 'Should include at least 1 lowercase letter')
  .regex(/[\d]+/, 'Should include at least 1 digit')
  .regex(/[!@#$%^&*()_+]+/, 'Should include at least 1 special symbol (eg. %&!)');

export const isUsernameValid = (username: string | undefined): boolean | string => {
  const result = usernameSchema.safeParse(username);
  return result.success || result.error.format()._errors[0];
};

export const isPasswordValid = (password: string | undefined): boolean | string => {
  const result = passwordSchema.safeParse(password);
  return result.success || result.error.format()._errors[0];
};
