import * as Yup from 'yup'
import { confirmPassword, currentPassword, email, firstName, lastName, newPassword, password } from '~/utils/validation'
export const authLoginSchema = Yup.object().shape({
  email,
  password
})

export const authRegisterSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  password
})

export const authResetPasswordSchema = Yup.object().shape({
  currentPassword,
  newPassword,
  confirmPassword
})
