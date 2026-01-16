/*
relevant game model values:
    name 
    hostURL
    itchEmbedID
*/

type ItchEmbedProps = {
  embedID: string;
  // hostURL: string;
  name: string;
};

export function ItchEmbed({ embedID, name }: ItchEmbedProps) {
  return (
    <div className="mb-6 aspect-[552/167] w-full max-w-[552px] shadow-[0_12px_40px_-16px_hsl(var(--secondary)_/_0.45)]">
      <iframe
        className="h-full w-full border-0"
        src={`https://itch.io/embed/${embedID}?dark=1`}
        title={name}
        allowFullScreen
        style={{ maxHeight: 167 }}
      />
    </div>
  );
}
