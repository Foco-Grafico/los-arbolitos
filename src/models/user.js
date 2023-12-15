import { z } from 'zod'

export const TypeModel = z.object({
  id: z.number({
    coerce: true,
    required_error: 'Type ID is required'
  }),
  name: z.string()
})

export const UserModel = z.object({
  id: z.string(),
  name: z.string(),
  lastname: z.string(),
  phone: z.string(),
  username: z.string()
})
  .extend({
    type: TypeModel,
    status: TypeModel
  })
