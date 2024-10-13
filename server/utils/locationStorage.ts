import fs from 'fs'
import path from 'path'

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  time: number
}

const storageFile = path.join(process.cwd(), 'server', 'data', 'locations.json')

export function getLocations(): LocationData[] {
  if (!fs.existsSync(storageFile)) {
    return []
  }
  const data = fs.readFileSync(storageFile, 'utf-8')
  return JSON.parse(data)
}

export function saveLocation(location: LocationData): void {
  const locations = getLocations()
  locations.push(location)
  const dir = path.dirname(storageFile)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(storageFile, JSON.stringify(locations, null, 2))
}