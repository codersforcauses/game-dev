export type EventDateParts = {
  weekday: string;
  day: string;
  month: string;
  time: string;
};

/** Parses a date string and returns parts for separate styling. Returns null on invalid input. */
export function getEventDateParts(dateString: string): EventDateParts | null {
  try {
    const date = new Date(dateString);
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
      date,
    );
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date,
    );
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(date)
      .replace("AM", "am")
      .replace("PM", "pm");
    return { weekday, day, month, time };
  } catch {
    return null;
  }
}

type EventDateDisplayProps = { date: string };

/** Renders event date as: weekday・ day month・ time.  */
export function EventDateDisplay({ date }: EventDateDisplayProps) {
  const parts = getEventDateParts(date);
  if (!parts) return null;
  return (
    <div className="flex flex-wrap items-baseline gap-x-1">
      <span className="whitespace-nowrap text-primary">
        {parts.weekday}
        {"・"}
      </span>
      <span className="whitespace-nowrap text-primary">
        {parts.day} {parts.month}
        {"・"}
      </span>
      <span className="text-secondary">{parts.time}</span>
    </div>
  );
}
