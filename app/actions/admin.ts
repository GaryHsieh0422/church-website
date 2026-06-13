'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

/**
 * Uploads an image file to Supabase Storage (bucket: "images").
 * Returns the public URL.
 * 
 * Make sure you have created a public bucket named "images" in Supabase Storage.
 */
export async function uploadImage(file: File): Promise<string> {
  const supabase = createAdminClient();

  const fileExt = file.name.split('.').pop() || 'jpg';
  const fileName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from('images').getPublicUrl(fileName);
  return data.publicUrl;
}

export async function addAnnualReport(year: string, fileUrl: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('annual_reports').insert({
    year: year.trim(),
    file_url: fileUrl.trim(),
  });
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/resources/annual-report');
}

export async function deleteAnnualReport(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('annual_reports').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/resources/annual-report');
}

export async function addNewsletter(title: string, content: string, date: string, imageUrl?: string | null) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('newsletters').insert({
    title: title.trim(),
    content,
    date,
    image_url: imageUrl?.trim() || null,
  });
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/resources/newsletter');
}

export async function deleteNewsletter(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('newsletters').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/resources/newsletter');
}

export async function addSermon(data: {
  title: string;
  scripture?: string | null;
  speaker?: string | null;
  youtube_url?: string | null;
  audio_url?: string | null;
  cover_image_url?: string | null;
  start_datetime?: string | null;
  is_current: boolean;
}) {
  const supabase = createAdminClient();

  if (data.is_current) {
    await supabase.from('sermons').update({ is_current: false }).eq('is_current', true);
  }

  const { error } = await supabase.from('sermons').insert({
    title: data.title.trim(),
    scripture: data.scripture?.trim() || null,
    speaker: data.speaker?.trim() || null,
    youtube_url: data.youtube_url?.trim() || null,
    audio_url: data.audio_url?.trim() || null,
    cover_image_url: data.cover_image_url?.trim() || null,
    start_datetime: data.start_datetime || null,
    is_current: data.is_current,
  });

  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/sermons');
  revalidatePath('/this-week-sermon');
}

export async function deleteSermon(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('sermons').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/sermons');
  revalidatePath('/this-week-sermon');
}

export async function toggleSermonCurrent(id: string, makeCurrent: boolean) {
  const supabase = createAdminClient();

  if (makeCurrent) {
    await supabase.from('sermons').update({ is_current: false }).eq('is_current', true);
  }

  const { error } = await supabase.from('sermons').update({ is_current: makeCurrent }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/sermons');
  revalidatePath('/this-week-sermon');
}

export async function updateAnnualReport(id: string, year: string, fileUrl: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('annual_reports').update({
    year: year.trim(),
    file_url: fileUrl.trim(),
  }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/resources/annual-report');
}

export async function updateNewsletter(id: string, title: string, content: string, date: string, imageUrl?: string | null) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('newsletters').update({
    title: title.trim(),
    content,
    date,
    image_url: imageUrl?.trim() || null,
  }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/resources/newsletter');
}

export async function updateSermon(id: string, data: {
  title: string;
  scripture?: string | null;
  speaker?: string | null;
  youtube_url?: string | null;
  audio_url?: string | null;
  cover_image_url?: string | null;
  start_datetime?: string | null;
  is_current: boolean;
}) {
  const supabase = createAdminClient();

  if (data.is_current) {
    await supabase.from('sermons').update({ is_current: false }).eq('is_current', true).neq('id', id);
  }

  const { error } = await supabase.from('sermons').update({
    title: data.title.trim(),
    scripture: data.scripture?.trim() || null,
    speaker: data.speaker?.trim() || null,
    youtube_url: data.youtube_url?.trim() || null,
    audio_url: data.audio_url?.trim() || null,
    cover_image_url: data.cover_image_url?.trim() || null,
    start_datetime: data.start_datetime || null,
    is_current: data.is_current,
  }).eq('id', id);

  if (error) throw new Error(error.message);
  revalidatePath('/admin');
  revalidatePath('/sermons');
  revalidatePath('/this-week-sermon');
}

export async function logoutAction() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  cookieStore.set('admin_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
}
