import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ImageGallery, type GalleryItem } from "@/components/site/ImageGallery";
import { LocationSection } from "@/components/site/LocationSection";
import { ScheduleVisitSection } from "@/components/site/ScheduleVisitSection";
import greatRoomImg from "@/assets/home-great-room.jpg";
import sharedRoomImg from "@/assets/home-shared-room.jpg";
import privateRoomImg from "@/assets/home-private-room.jpg";
import diningImg from "@/assets/home-dining-table.jpg";
import bathroomImg from "@/assets/home-bathroom.jpg";
import hallwayImg from "@/assets/home-hallway.jpg";

const title = "Our Home | Residential Assisted Living Home in Laveen, AZ";
const description =
  "See the warm residential environment at Agape Home Assisted Living in Laveen, Arizona — common areas, living spaces, dining and shaded outdoor areas.";

export const Route = createFileRoute("/our-home")({
  head: () => pageMeta({ title, description, path: "/our-home" }),
  component: OurHomePage,
});

/**
 * Photographs of the actual home. Items without a `src` render a "photo coming
 * soon" frame — used for the two areas not yet photographed. Drop the file in
 * src/assets, import it, and add `src` to fill one in.
 */
const gallery: GalleryItem[] = [
  {
    category: "Common Areas",
    caption: "Shared living and dining, open to one another",
    src: greatRoomImg,
    alt: "Open living and dining area with sofas, a dining table, television and wide sliding doors",
  },
  {
    category: "Living Spaces",
    caption: "Shared rooms with space to sit and rest",
    src: sharedRoomImg,
    alt: "Shared resident room with two made beds, bedside table and a recliner beside the window",
  },
  {
    category: "Private Rooms",
    caption: "Personal rooms with room for familiar things",
    src: privateRoomImg,
    alt: "Private resident room with a bed, reclining sofa, wooden dresser and wall-mounted television",
  },
  {
    category: "Dining",
    caption: "Meals shared around one table",
    src: diningImg,
    alt: "Wooden dining table with seating for six, beside the living room sofas",
  },
  {
    category: "Bathrooms",
    caption: "Accessible bathing with support where it is needed",
    src: bathroomImg,
    alt: "Accessible bathroom with a walk-in shower, grab rail, shower chair and a wide double vanity",
  },
  {
    category: "Hallways",
    caption: "Wide, level walkways throughout the home",
    src: hallwayImg,
    alt: "Bright hallway with wood-look flooring, a low shelf with plants and framed licences on the wall",
  },
  {
    category: "Exterior",
    caption: "A photograph of the outside of the home will be added here",
    alt: "Placeholder for an upcoming photograph of the home's exterior",
  },
  {
    category: "Outdoor Areas",
    caption: "A photograph of the outdoor space will be added here",
    alt: "Placeholder for an upcoming photograph of the outdoor area",
  },
];

function OurHomePage() {
  return (
    <>
      <PageHero
        eyebrow="Our Home"
        title="A Warm Place to Call Home"
        intro="Agape Home Assisted Living is designed to provide a comfortable, supportive residential environment where residents can feel at ease and families can feel confident in their loved one's care."
        image={hallwayImg}
        imageAlt="Bright hallway inside Agape Home, with wood-look flooring leading toward the living area"
      />

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Gallery"
            title="Inside Agape Home"
            intro="Photographs of our home in Laveen — the shared living and dining areas, resident rooms, and accessible bathrooms. A few more are on the way."
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
