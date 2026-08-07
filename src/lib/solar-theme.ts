import { getTimes } from "suncalc";

export type Coordinates = {
  lat: number;
  lng: number;
};

/** Returns true when the sun is above the horizon at the given location. */
export function isDaytime({ lat, lng }: Coordinates, date = new Date()): boolean {
  const { sunrise, sunset } = getTimes(date, lat, lng);

  if (!sunrise || !sunset) {
    const hour = date.getHours();
    return hour >= 6 && hour < 18;
  }

  const now = date.getTime();
  return now >= sunrise.getTime() && now < sunset.getTime();
}

/** Milliseconds until the next sunrise/sunset transition. */
export function msUntilNextTransition({ lat, lng }: Coordinates, date = new Date()): number {
  const daytime = isDaytime({ lat, lng }, date);
  const { sunrise, sunset } = getTimes(date, lat, lng);
  const transitions = [sunrise, sunset]
    .filter((t): t is Date => t instanceof Date && t.getTime() > date.getTime())
    .sort((a, b) => a.getTime() - b.getTime());

  if (transitions.length > 0) {
    return transitions[0].getTime() - date.getTime();
  }

  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = getTimes(tomorrow, lat, lng);
  const next = daytime ? tomorrowTimes.sunrise : tomorrowTimes.sunset;

  if (next instanceof Date) {
    return next.getTime() - date.getTime();
  }

  return 60_000;
}

export function resolveSolarTheme(coords: Coordinates, date = new Date()): "light" | "dark" {
  return isDaytime(coords, date) ? "light" : "dark";
}
