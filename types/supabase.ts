// Database row types matching our Supabase tables

export interface AnnualReport {
  id: string
  year: string
  file_url: string
  created_at: string
}

export interface Newsletter {
  id: string
  title: string
  content: string // Markdown content
  date: string // YYYY-MM-DD
  image_url: string | null
  created_at: string
}

export interface Sermon {
  id: string
  title: string
  scripture: string | null
  speaker: string | null
  youtube_url: string | null
  audio_url: string | null
  cover_image_url: string | null
  start_datetime: string | null // ISO string or timestamptz
  is_current: boolean
  created_at: string
}
