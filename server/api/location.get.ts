import { defineEventHandler } from 'h3'
import { getLocations } from '../utils/locationStorage'

export default defineEventHandler(() => {
  return getLocations()
})