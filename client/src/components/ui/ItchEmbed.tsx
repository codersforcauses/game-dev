type ItchEmbedProps = {
  embedID: string;
  name: string;
};

export function ItchEmbed({ embedID, name }: ItchEmbedProps) {
  return (
    <div className="mb-6 w-full max-w-[552px] px-4 shadow-[0_12px_40px_-16px_hsl(var(--secondary)_/_0.45)] sm:aspect-[552/167] sm:px-0">
      <iframe
        className="h-full w-full border-0"
        src={`https://itch.io/embed/${embedID}?dark=1`}
        title={name}
        allowFullScreen
      />
    </div>
  );
}
