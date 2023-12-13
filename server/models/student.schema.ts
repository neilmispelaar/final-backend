import { defineMongooseModel } from '#nuxt/mongoose'

export const StudentSchema = defineMongooseModel({
  name: 'Student',
  schema: {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    firstName: {
      type: 'string',
      required: true,
    },
  },
})