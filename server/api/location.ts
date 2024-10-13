import { defineEventHandler, readBody } from "h3";
import { createClient } from "@supabase/supabase-js";

// Створіть клієнта Supabase
const supabaseUrl = "https://rjntnyqdvziwjauxenem.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqbnRueXFkdnppd2phdXhlbmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MDg0MTAsImV4cCI6MjA0NDM4NDQxMH0.eYZvy6ZwK5sMzdSF_FXRQWr2UoyXzrWQkzCP9-QNbmY";
// vsVc7d4aXv8ipcnb
const supabase = createClient(supabaseUrl, supabaseKey);

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  time: number;
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method === "POST") {
    const body = await readBody<LocationData>(event);

    // Зберігаємо дані в таблицю "locations" в Supabase
    const { error } = await supabase.from("locations").insert([
      {
        latitude: body.latitude,
        longitude: body.longitude,
        accuracy: body.accuracy,
        time: body.time,
      },
    ]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  }

  if (event.node.req.method === "GET") {
    // Отримуємо дані з таблиці "locations"
    const { data, error } = await supabase.from("locations").select("*");

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  }
});
