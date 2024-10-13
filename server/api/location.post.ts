import { defineEventHandler, readBody } from 'h3'
import { saveLocation } from '../utils/locationStorage'

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  time: number
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  saveLocation(body as LocationData)
  return { success: true }
})