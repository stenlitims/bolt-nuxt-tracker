import { defineEventHandler, readBody } from "h3";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  time: number;
}

const data = [] as LocationData[];

export default defineEventHandler(async (event) => {
  if (event._method === "POST") {
    const body = await readBody(event);
    data.push(body as LocationData);
    return { success: true };
  }

  if (event._method === "GET") {
    return { data };
  }
});
