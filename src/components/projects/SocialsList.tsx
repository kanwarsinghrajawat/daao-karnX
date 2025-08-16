import Image from 'next/image';
import Link from 'next/link';

const Twitter = ({ url }: { url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <Image src="/twitter.svg" alt="Twitter" width={24} height={24} className="inline-block" />
  </Link>
);

const Website = ({ url }: { url: string }) => (
  <Link href={url} target="_blank" rel="noopener noreferrer">
    <Image src="/globe.svg" alt="website" width={24} height={24} className="inline-block" />
  </Link>
);

const Instagram = ({ url }: { url: string }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <span className="text-blue-500 hover:underline">📸 Instagram</span>
  </a>
);

export const SocialsList = ({ socials }: { socials: { [platform: string]: string }[] }) => {
  return (
    <div className="flex space-x-4">
      {socials.map((social) => {
        const [platform, url] = Object.entries(social)[0];
        switch (platform) {
          case 'twitter':
            return <Twitter key={platform} url={url} />;
          case 'website':
            return <Website key={platform} url={url} />;
          case 'instagram':
            return <Instagram key={platform} url={url} />;
          default:
            return null;
        }
      })}
    </div>
  );
};