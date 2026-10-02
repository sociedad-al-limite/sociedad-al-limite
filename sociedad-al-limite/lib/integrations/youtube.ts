import "server-only";
import { SITE } from "@/lib/config";
import { hoursAgo } from "@/lib/format";
import type { LiveStatus, Video } from "@/lib/types";
import { DEMO_VIDEOS } from "@/lib/data/demo";

/* =============================================================
   YouTube Data API v3
   Credenciales (solo servidor): YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID
   Cuotas: playlistItems = 1 unidad, videos = 1, search = 100.
   Por eso la consulta "en vivo" se cachea 2 minutos y la lista de
   videos 10 minutos (≈ 750 unidades/día de 10.000 disponibles).
   ============================================================= */

const KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL = process.env.YOUTUBE_CHANNEL_ID;
const API = "https://www.googleapis.com/youtube/v3";

export const youtubeConfigured = () => Boolean(KEY && CHANNEL);

/** PT1H2M3S → "1:02:03" */
function isoDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const [h, mi, s] = [m[1], m[2], m[3]].map((x) => Number(x || 0));
  const pad = (n: number) => String(n).padStart(2, "0");
  return h ? `${h}:${pad(mi)}:${pad(s)}` : `${pad(mi)}:${pad(s)}`;
}

function demoVideos(): Video[] {
  return DEMO_VIDEOS.map((v) => ({
    id: `demo-${v.id}`, title: v.title, thumbnail: null, publishedAt: hoursAgo(v.h),
    duration: v.dur, views: v.views, url: SITE.social.youtube, isDemo: true
  }));
}

export async function getLatestVideos(limit = 6): Promise<Video[]> {
  if (!youtubeConfigured()) return demoVideos().slice(0, limit);
  try {
    // La lista de "subidas" de un canal es su ID con "UU" en lugar de "UC".
    const uploads = CHANNEL!.replace(/^UC/, "UU");
    const pl = await fetch(`${API}/playlistItems?part=contentDetails&maxResults=${limit}&playlistId=${uploads}&key=${KEY}`, { next: { revalidate: 600 } });
    if (!pl.ok) throw new Error(`YouTube playlistItems ${pl.status}`);
    const ids: string[] = (await pl.json()).items.map((i: { contentDetails: { videoId: string } }) => i.contentDetails.videoId);
    if (!ids.length) return [];
    const vr = await fetch(`${API}/videos?part=snippet,contentDetails,statistics&id=${ids.join(",")}&key=${KEY}`, { next: { revalidate: 600 } });
    if (!vr.ok) throw new Error(`YouTube videos ${vr.status}`);
    const data = await vr.json();
    return data.items.map((v: any) => ({
      id: v.id,
      title: v.snippet.title,
      thumbnail: v.snippet.thumbnails?.maxres?.url ?? v.snippet.thumbnails?.high?.url ?? null,
      publishedAt: v.snippet.publishedAt,
      duration: v.contentDetails?.duration ? isoDuration(v.contentDetails.duration) : null,
      views: v.statistics?.viewCount ? Number(v.statistics.viewCount) : null, // puede estar oculto
      url: `https://www.youtube.com/watch?v=${v.id}`,
      isDemo: false
    }));
  } catch (e) {
    console.error("[youtube] usando demo:", e);
    return demoVideos().slice(0, limit);
  }
}

export async function getLiveStatus(): Promise<LiveStatus> {
  const off: LiveStatus = { isLive: false, videoId: null, title: null, startedAt: null, viewers: null, url: SITE.social.youtube };
  if (!youtubeConfigured()) return off;
  try {
    const r = await fetch(`${API}/search?part=snippet&channelId=${CHANNEL}&eventType=live&type=video&maxResults=1&key=${KEY}`, { next: { revalidate: 120 } });
    if (!r.ok) throw new Error(`YouTube search ${r.status}`);
    const item = (await r.json()).items?.[0];
    if (!item) return off;
    const id = item.id.videoId as string;
    const d = await fetch(`${API}/videos?part=liveStreamingDetails&id=${id}&key=${KEY}`, { next: { revalidate: 120 } }).then((x) => x.json());
    const live = d.items?.[0]?.liveStreamingDetails;
    return {
      isLive: true, videoId: id, title: item.snippet.title, startedAt: live?.actualStartTime ?? null,
      viewers: live?.concurrentViewers ? Number(live.concurrentViewers) : null,
      url: `https://www.youtube.com/watch?v=${id}`
    };
  } catch (e) {
    console.error("[youtube live]", e);
    return off;
  }
}
