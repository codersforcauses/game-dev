/*
relevant game model values:
    name 
    hostURL
    itchEmbedID
*/

type ItchEmbedProps = {
  embedID: string;
  hostURL: string;
  name: string;
  width?: number;
  height?: number;
};

export function ItchEmbed({
  embedID,
  hostURL,
  name,
  width = 552,
  height = 167,
}: ItchEmbedProps) {
  return (
    <iframe
      width={width}
      height={height}
      className="border-0"
      src={`https://itch.io/embed/${embedID}`}
    >
      <a href={hostURL}>{name}</a>
    </iframe>
  );
}
