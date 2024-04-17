import * as Yup from 'yup'
import { email, firstName, lastName, password } from '~/utils/validation'
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
