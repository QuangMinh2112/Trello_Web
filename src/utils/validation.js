import * as Yup from 'yup'
import { CHARACTERS_REGEX, EMAIL_REGEX } from '~/constants/regex'
const title = Yup.string()
  .trim()
  .required('Title is required.')
  .min(2, 'Title must be at least 2 characters')
  .max(30, 'Title must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'Title must not contain special characters')

const description = Yup.string()
  .required('Description is required.')
  .max(100, 'Description cannot be more than 100 characters')

const firstName = Yup.string()
  .trim()
  .required('First Name is required')
  .min(2, 'First Name must be at least 2 characters')
  .max(30, 'First Name must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'First Name must not contain special characters')

const lastName = Yup.string()
  .trim()
  .required('Last Name is required')
  .min(2, 'Last Name must be at least 2 characters')
  .max(30, 'Last Name must be less than 30 characters')
  .matches(CHARACTERS_REGEX, 'Last Name must not contain special characters')

const email = Yup.string()
  .trim()
  .required('Email is required.')
  .max(50, 'Email cannot be more than 50 characters')
  .matches(EMAIL_REGEX, 'Please enter a valid email address.')

const password = Yup.string().trim().required('Password is required.').min(6, 'Password must be at least 6 characters')
const currentPassword = Yup.string().trim().required('Current password is required.')
const newPassword = Yup.string()
  .trim()
  .required('New password is required.')
  .min(6, 'Password must be at least 6 characters')
const confirmPassword = Yup.string().trim().required('Password is required.')
export { title, description, email, password, firstName, lastName, currentPassword, newPassword, confirmPassword }

export const BoardSchema = Yup.object().shape({
  title,
  description
})
