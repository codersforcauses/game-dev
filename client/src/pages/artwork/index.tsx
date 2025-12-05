import { GetServerSideProps } from "next";
import Link from "next/link";

type Artwork = {
  id: string;
  name: string;
  description: string;
  sourceGame: string;
  pathToMedia: string;
  active: boolean;
  createdAt: string;
};

interface ArtworksPageProps {
  artworks: Artwork[];
}

const PLACEHOLDER_ICON = (
  <div data-svg-wrapper data-layer="Vector" className="Vector">
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96 85.3333V10.6667C96 4.8 91.2 0 85.3333 0H10.6667C4.8 0 0 4.8 0 10.6667V85.3333C0 91.2 4.8 96 10.6667 96H85.3333C91.2 96 96 91.2 96 85.3333ZM29.3333 56L42.6667 72.0533L61.3333 48L85.3333 80H10.6667L29.3333 56Z"
        fill="var(--neutral-1, #1B1F4C)"
      />
    </svg>
  </div>
);

function renderArtworkCard(artwork: Artwork) {
  return (
    <Link
      href={`/artwork/${artwork.id}`}
      data-layer="Frame 1120"
      className="Frame1120"
    >
      <div
        data-layer="Placeholder image"
        className="PlaceholderImage bg-light-2 flex h-[20rem] w-[25rem] flex-1 items-center justify-center self-stretch rounded-[10px]"
      >
        {PLACEHOLDER_ICON}
      </div>
    </Link>
  );
}

export default function ArtworksPage({ artworks }: ArtworksPageProps) {
  return (
    <div data-layer="Art Page General" className="ArtPageGeneral">
      <div
        data-layer="Navbar"
        className="Navbar self-stretch rounded-[5px] border-b-[5px] bg-slate-950 px-20 py-7"
      >
        TODO add Header
      </div>
      <div
        data-layer="Frame 1158"
        className="Frame1158 bg-light-2 relative flex flex-col items-center gap-2 py-40"
      >
        <div
          data-layer="ALL CATEGORIES"
          className="AllCategories text-light-3 justify-start text-center font-['Jersey_10'] text-6xl font-normal leading-[76px] tracking-wide"
        >
          FEATURED:
          <br />
          SOME GAME
        </div>
        <div
          data-layer="Placeholder image"
          className="PlaceholderImage inline-flex items-center justify-center gap-2.5 p-2.5"
        >
          {PLACEHOLDER_ICON}
        </div>
        <div
          data-layer="Auto Layout Horizontal"
          className="AutoLayoutHorizontal items-start justify-start gap-6"
        >
          <div
            data-layer="Button/Style2"
            className="ButtonStyle2 size- bg-neutral-1 outline-neutral-1 flex items-center justify-center gap-2.5 overflow-hidden rounded-[10px] px-5 py-3 outline outline-1 outline-offset-[-1px]"
          >
            <div
              data-layer="Filled Button"
              className="FilledButton text-light-1 justify-start font-['Jersey_10'] text-xl font-normal leading-6 tracking-wide"
            >
              More about us →
            </div>
          </div>
        </div>
      </div>

      <div data-layer="Frame 1159" className="Frame1159 relative self-stretch">
        <div className="Frame1098 aligne flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-20 bg-slate-950 py-14 pl-28 pr-24">
          {artworks.map((artwork) => renderArtworkCard(artwork))}
        </div>
      </div>
      <div
        data-layer="footer"
        className="Footer relative h-72 self-stretch overflow-hidden bg-indigo-950"
      >
        TODO add footer
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ArtworksPageProps
> = async () => {
  // const res = await fetch(`https://your-backend.com/api/artwork/${id}`);
  const artworks: Artwork[] = [];
  for (let i = 0; i < 12; i++) {
    const artwork: Artwork = {
      id: i + "",
      name: "title of art" + i,
      description: "description of art",
      sourceGame: "",
      pathToMedia: "",
      active: false,
      createdAt: new Date().toISOString(),
    };
    artworks.push(artwork);
  }

  return { props: { artworks } };
};
