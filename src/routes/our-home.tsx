import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ImageGallery, type GalleryItem } from "@/components/site/ImageGallery";
import { LocationSection } from "@/components/site/LocationSection";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import exteriorImg from "@/assets/home-exterior.jpg";
import livingImg from "@/assets/home-living.jpg";
import bedroomImg from "@/assets/home-bedroom.jpg";
import diningImg from "@/assets/home-dining.jpg";
import outdoorImg from "@/assets/home-outdoor.jpg";

const title = "Our Home | Residential Assisted Living Home in Laveen, AZ";
const description =
  "See the warm residential environment at Agape Home Assisted Living in Laveen, Arizona — common areas, living spaces, dining and shaded outdoor areas.";

export const Route = createFileRoute("/our-home")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/our-home" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/our-home" }],
  }),
  component: OurHomePage,
});

/**
 * Representative imagery. Replace each `src` with photographs of the actual
 * property when they are available; remove `src` to show a "photo coming soon"
 * placeholder frame instead.
 */
const gallery: GalleryItem[] = [
  {
    category: "Exterior",
    caption: "A quiet single-story home in a Laveen neighborhood",
    src: exteriorImg,
    alt: "Single-story southwestern home with desert landscaping and a welcoming lit entryway",
  },
  {
    category: "Common Areas",
    caption: "Shared spaces for conversation and quiet afternoons",
    src: livingImg,
    alt: "Warm living room with cream sofas, wooden table and daylight through shutters",
  },
  {
    category: "Living Spaces",
    caption: "Comfortable, personal rooms",
    src: bedroomImg,
    alt: "Private bedroom with soft linens, a reading chair and family photographs",
  },
  {
    category: "Dining",
    caption: "Meals shared around one table",
    src: diningImg,
    alt: "Wooden dining table set for a shared meal with fresh flowers",
  },
  {
    category: "Outdoor Areas",
    caption: "Shaded patio for fresh air and sunshine",
    src: outdoorImg,
    alt: "Shaded backyard patio with comfortable seating and desert plants",
  },
  {
    category: "Our Home",
    caption: "More photographs of the home will be added here",
    alt: "Placeholder for an upcoming photograph of the home",
  },
];

function OurHomePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Home"
        title="A Warm Place to Call Home"
        intro="Agape Home Assisted Living is designed to provide a comfortable, supportive residential environment where residents can feel at ease and families can feel confident in their loved one's care."
        image={exteriorImg}
        imageAlt="Exterior of a single-story Arizona home with desert landscaping at dusk"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Inside Agape Home"
            intro="Representative images of the residential setting. Photographs of our home will be added here as they become available."
          />
          <div className="mt-14">
            <ImageGallery items={gallery} />
          </div>
        </div>
      </section>

      <LocationSection />
      <ScheduleVisitSection />
    </>
  );
}
