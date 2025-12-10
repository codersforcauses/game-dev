import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

import api from "@/lib/api";
import { Art } from "@/types/art";

interface ArtworkPageProps {
  artwork: Art;
}

const DISCORD_ICON = (
  <div data-svg-wrapper data-layer="Vector" className="Vector">
    <svg
      width="30"
      height="22"
      viewBox="0 0 30 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.8424 2.43969C23.2464 0.367142 19.1398 0.01582 18.964 0.003182C18.6914 -0.0195653 18.4316 0.132085 18.3195 0.382307C18.3093 0.397472 18.2201 0.6022 18.1208 0.920664C19.8378 1.2088 21.9472 1.7876 23.8553 2.96288C24.161 3.14992 24.2553 3.54926 24.0667 3.85256C23.9419 4.05223 23.7305 4.16092 23.5114 4.16092C23.3942 4.16092 23.2745 4.12806 23.1675 4.06234C19.8862 2.04287 15.7897 1.94177 15 1.94177C14.2103 1.94177 10.1112 2.04287 6.83254 4.06234C6.52683 4.25191 6.12432 4.15839 5.9358 3.85509C5.74474 3.54926 5.83899 3.15245 6.1447 2.96288C8.05282 1.79012 10.1622 1.2088 11.8792 0.923192C11.7799 0.6022 11.6907 0.4 11.6831 0.382307C11.5684 0.132085 11.3111 -0.02462 11.036 0.003182C10.8602 0.01582 6.75357 0.367142 4.12194 2.46749C2.74881 3.72871 0 11.0989 0 17.4707C0 17.5845 0.0305706 17.6931 0.0866172 17.7917C1.982 21.0977 7.15608 21.9621 8.3356 22C8.34069 22 8.34834 22 8.35598 22C8.56488 22 8.76104 21.9014 8.88332 21.7346L10.0756 20.1069C6.85802 19.2829 5.21484 17.8827 5.12058 17.7993C4.85054 17.5642 4.82507 17.1548 5.06454 16.8869C5.30146 16.619 5.71416 16.5937 5.98421 16.8287C6.02242 16.8641 9.04891 19.4118 15 19.4118C20.9613 19.4118 23.9878 16.854 24.0183 16.8287C24.2884 16.5962 24.6985 16.619 24.938 16.8894C25.1749 17.1573 25.1495 17.5642 24.8794 17.7993C24.7852 17.8827 23.142 19.2829 19.9244 20.1069L21.1167 21.7346C21.239 21.9014 21.4351 22 21.644 22C21.6517 22 21.6593 22 21.6644 22C22.8439 21.9621 28.018 21.0977 29.9134 17.7917C29.9694 17.6931 30 17.5845 30 17.4707C30 11.0989 27.2512 3.72872 25.8424 2.43969ZM10.7609 14.8826C9.49983 14.8826 8.47826 13.725 8.47826 12.2944C8.47826 10.8638 9.49983 9.70625 10.7609 9.70625C12.0219 9.70625 13.0435 10.8638 13.0435 12.2944C13.0435 13.725 12.0219 14.8826 10.7609 14.8826ZM19.2391 14.8826C17.9781 14.8826 16.9565 13.725 16.9565 12.2944C16.9565 10.8638 17.9781 9.70625 19.2391 9.70625C20.5002 9.70625 21.5217 10.8638 21.5217 12.2944C21.5217 13.725 20.5002 14.8826 19.2391 14.8826Z"
        fill="#9CA4FD"
      />
    </svg>
  </div>
);
const INSTAGRAM_ICON = (
  <div data-svg-wrapper data-layer="Icon" className="Icon">
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9469 6.62114H17.9574M6.92188 1.67114H17.4219C20.3214 1.67114 22.6719 4.13358 22.6719 7.17114V18.1711C22.6719 21.2087 20.3214 23.6711 17.4219 23.6711H6.92188C4.02238 23.6711 1.67188 21.2087 1.67188 18.1711V7.17114C1.67188 4.13358 4.02238 1.67114 6.92188 1.67114ZM16.3719 11.9781C16.5015 12.8936 16.3522 13.8286 15.9453 14.6501C15.5384 15.4715 14.8947 16.1377 14.1056 16.5538C13.3165 16.9699 12.4222 17.1147 11.5501 16.9677C10.6779 16.8206 9.87212 16.3892 9.24746 15.7348C8.62279 15.0804 8.21099 14.2363 8.07065 13.3226C7.9303 12.4089 8.06854 11.472 8.46572 10.6454C8.86289 9.81868 9.49877 9.14426 10.2829 8.71801C11.067 8.29176 11.9595 8.13539 12.8334 8.27114C13.7247 8.40962 14.55 8.84475 15.1872 9.51228C15.8243 10.1798 16.2397 11.0443 16.3719 11.9781Z"
        stroke="#9CA4FD"
        stroke-width="3.34229"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
);

function iconWithUrl(icon: JSX.Element, url: string) {
  return <a href={url}>{icon}</a>;
}

function displayContributors(artwork: Art) {
  return (
    <div>
      <div
        data-layer="Right Panel"
        className="RightPanel flex flex-col justify-start gap-2.5 py-5"
      >
        <div data-layer="Frame 1163" className="Frame1163 relative">
          <div
            data-layer="Contributors"
            className="Contributors text-light-3 justify-start font-['Jersey_10'] text-4xl font-normal tracking-wide"
          >
            Contributors
          </div>
        </div>
        <div
          data-layer="Frame 1164"
          className="Frame1164 relative flex flex-col gap-3 p-3"
        >
          {artwork.contributors?.map((contributor) => (
            <div className="flex flex-row justify-between" key={contributor.id}>
              <div className="text-light-1 justify-center font-['DM_Sans'] text-xl font-normal leading-8 tracking-wide [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                {contributor.member_name}
              </div>
              <div>
                {contributor.discord_url &&
                  iconWithUrl(DISCORD_ICON, contributor.discord_url)}
                {contributor.instagram_url &&
                  iconWithUrl(INSTAGRAM_ICON, contributor.instagram_url)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ArtworkPage({ artwork }: ArtworkPageProps) {
  return (
    <div
      data-layer="Individual Game Page alt 9"
      className="IndividualGamePageAlt9"
    >
      <div
        data-layer="Navbar"
        className="Navbar self-stretch rounded-[5px] border-b-[5px] bg-slate-950 px-20 py-7"
      >
        TODO add Header
      </div>
      <div
        data-layer="Frame 1100"
        className="Frame1100 inline-flex flex-col items-start justify-center gap-10 bg-slate-950 py-3 sm:pl-3 md:pl-12"
      >
        <div
          data-layer="< Gallery"
          className="Gallery text-light-1 h-10 justify-start font-['DM_Sans'] text-3xl font-bold leading-10 tracking-tight"
        >
          <Link href="/artwork">&lt; Gallery</Link>
        </div>
      </div>
      <div
        data-layer="Frame 1099"
        className="Frame1099 bg-neutral-1 justify-start md:flex"
      >
        <div className="relative flex content-center justify-center">
          <Image
            src={artwork.path_to_media}
            alt="Artwork image"
            width={500}
            height={500}
            className="relative block sm:h-auto sm:max-w-full md:max-h-full md:w-auto"
          />
        </div>
        <div
          data-layer="Frame 1162"
          className="Frame1162 relative hidden flex-auto p-10 md:flex"
        >
          <div className="flex flex-1 flex-col gap-10">
            <div
              data-layer="Art Name"
              className="ArtName text-light-3 justify-start font-['Jersey_10'] text-8xl font-normal leading-[76px] tracking-wide"
            >
              {artwork.name}
            </div>
            <div
              data-layer="Frame 1153"
              className="Frame1153 flex-col items-start justify-start gap-7"
            >
              <div
                data-layer="Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta 33 error molestias et repellat consequatur eum iste expedita est dolorem libero et quas provident! Eos placeat sunt nam expedita ratione sed quia voluptatem. Et laborum vitae est inventore obcaecati qui velit assumenda ab placeat voluptatem? Qui quisquam nihil non porro velit hic magni voluptatem nam porro voluptatem."
                className="justify-start self-stretch"
              >
                <span className="text-light-1 font-['DM_Sans'] text-xl font-normal leading-8 tracking-wide">
                  {artwork.description}
                </span>
              </div>
            </div>
            {displayContributors(artwork)}
          </div>
        </div>
      </div>
      <div className="p-10 md:hidden">
        <div
          data-layer="Art Name"
          className="ArtName text-light-3 flex justify-center font-['Jersey_10'] text-8xl font-normal leading-[76px] tracking-wide"
        >
          {artwork.name}
        </div>
        <div
          data-layer="Frame 1153"
          className="Frame1153 flex-col items-start justify-start pt-7"
        >
          <div className="justify-start self-stretch">
            <span className="text-light-1 font-['DM_Sans'] text-xl font-normal leading-8 tracking-wide">
              {artwork.description}
            </span>
          </div>
        </div>
        {displayContributors(artwork)}
      </div>

      <div data-layer="Frame 1101" className="Frame1101 bg-slate-950 py-10">
        <div
          data-layer="Game Page"
          className="GamePage bg-dark-2 flex items-center justify-center"
        >
          <Image
            alt="Game Image"
            data-layer="image 15"
            src="/placeholder1293x405.svg"
            width="1293"
            height="405"
            className="relative block p-5 sm:h-auto sm:max-w-full md:max-h-full md:w-auto"
          />
        </div>
      </div>
      <div
        data-layer="footer"
        className="Footer h-72 overflow-hidden bg-indigo-950"
      >
        TODO add footer
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ArtworkPageProps> = async (
  context,
) => {
  const { id } = context.params as { id: string };
  const artResponse = await api.get<Art>(`game-dev/arts/${id}`);
  const artwork = artResponse.data;
  return { props: { artwork } };
};
