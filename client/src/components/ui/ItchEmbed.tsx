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
    <div>
      <iframe
        width={width}
        height={height}
        className="border-0"
        src={`https://itch.io/embed/${embedID}`}
        title={name}
      />
      <a
        href={hostURL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block text-[#7ecfff] underline"
      >
        {name}
      </a>
    </div>
  );
}
