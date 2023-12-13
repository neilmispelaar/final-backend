import { defineMongooseModel } from '#nuxt/mongoose'

export const BonusSchema = defineMongooseModel({
  name: 'Bonus',
  schema: {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
})