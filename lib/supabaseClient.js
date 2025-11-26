import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ioiqnfaxwczadttzdhxi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaXFuZmF4d2N6YWR0dHpkaHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDU2NzMsImV4cCI6MjA3OTcyMTY3M30.5rhSlYaBpwwvlCckgkXajX2J-0bL_HpInuJr52gvMzE";

export const supabase = createClient(supabaseUrl, supabaseKey);
