import { Reveal } from "./Reveal";

export type GalleryItem = {
  category: string;
  caption: string;
  src?: string;
  alt: string;
};

/**
 * Replace `src` values with real photographs of the home when available.
 * Items without a `src` render a clearly marked placeholder frame.
 */
export function ImageGallery({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal as="li" key={item.caption} delay={index * 70} className="group">
          <figure>
            <div className="overflow-hidden border border-border bg-white">
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  width={1400}
                  height={1050}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-mist px-6 text-center">
                  <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    Photo coming soon
                  </span>
                </div>
              )}
            </div>
            <figcaption className="mt-4">
              <span className="eyebrow">{item.category}</span>
              <p className="mt-2 text-[0.9375rem] text-ink">{item.caption}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
