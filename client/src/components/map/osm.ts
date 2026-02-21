export function parseOpenStreetMapUrl(
  osmUrl: string,
): { lat: number; lon: number } | null {
  try {
    const url = new URL(osmUrl);

    // Pattern 1: ?mlat=..&mlon=..
    const mlat = url.searchParams.get("mlat");
    const mlon = url.searchParams.get("mlon");
    if (mlat && mlon) {
      const lat = Number(mlat);
      const lon = Number(mlon);
      if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
    }

    // Pattern 2: #map=zoom/lat/lon
    const match = url.hash.match(/#map=\d+\/(-?\d+(\.\d+)?)\/(-?\d+(\.\d+)?)/);
    if (match) {
      const lat = Number(match[1]);
      const lon = Number(match[3]);
      if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
    }

    return null;
  } catch {
    return null;
  }
}
