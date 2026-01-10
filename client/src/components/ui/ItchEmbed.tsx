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
    <div className="aspect-[7/2] w-full" style={{ maxHeight: 167 }}>
      <iframe
        className="h-full w-full border-0"
        src={`https://itch.io/embed/${embedID}`}
        title={name}
        allowFullScreen
        style={{ maxHeight: 167 }}
      />
    </div>
  );
}
