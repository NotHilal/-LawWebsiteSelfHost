import { Link } from "react-router-dom";
import { brand, contact, collaboration } from "../data/siteContent";
import { media } from "../data/media";
import GoldDivider from "./GoldDivider";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-summit-graphite bg-summit-black">
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <img src={media.emblem} alt="" role="presentation" className="h-10 w-auto" />
            <p className="mt-5 font-serif text-2xl text-summit-ivory">{brand.name}</p>
            <GoldDivider width={48} className="my-4" />
            <p className="max-w-xs text-sm leading-relaxed text-summit-mute">{brand.tagline}</p>
            <p className="mt-3 hidden text-sm text-summit-ivory/80 lg:block">{contact.city}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-summit-mute">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-summit-ivory/80">
              {contact.email && <li>{contact.email}</li>}
              {contact.phones.map((phone) => (
                <li key={phone}>{phone}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-summit-mute">
              Professional collaboration
            </p>
            <a
              href={collaboration.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-summit-gold transition-colors hover:text-summit-gold-soft"
            >
              Maniar Law PLLC ↗
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-summit-graphite pt-8 text-xs text-summit-mute-dark sm:flex-row sm:items-center">
          <Link to="/admin" className="transition-colors hover:text-summit-mute">
            © {year} {brand.name}. All rights reserved.
          </Link>
          <p>Doha, Qatar</p>
        </div>
      </div>
    </footer>
  );
}
