import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { StoryViewer, type Story } from "@/components/ui/story-viewer";

const storyTimestamp = "2026-04-29T20:30:00-04:00";

const storyUsers: Array<{
  username: string;
  avatar: string;
  timestamp: string;
  stories: Story[];
}> = [
  {
    username: "Portraits",
    avatar: "/jerry-robayo-portrait-1821.jpeg",
    timestamp: storyTimestamp,
    stories: [
      {
        id: "portrait-1",
        type: "image",
        src: "/jerry-robayo-portrait-1821.jpeg",
      },
      {
        id: "portrait-2",
        type: "image",
        src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&h=1400&fit=crop",
      },
    ],
  },
  {
    username: "Workspace",
    avatar:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=300&h=300&fit=crop",
    timestamp: "2026-04-29T18:15:00-04:00",
    stories: [
      {
        id: "workspace-1",
        type: "image",
        src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&h=1400&fit=crop",
      },
      {
        id: "workspace-2",
        type: "image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=1400&fit=crop",
      },
    ],
  },
  {
    username: "City",
    avatar:
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=300&h=300&fit=crop",
    timestamp: "2026-04-29T14:00:00-04:00",
    stories: [
      {
        id: "city-1",
        type: "image",
        src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=900&h=1400&fit=crop",
      },
      {
        id: "city-2",
        type: "image",
        src: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=900&h=1400&fit=crop",
      },
    ],
  },
  {
    username: "Builds",
    avatar:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=300&fit=crop",
    timestamp: "2026-04-28T21:00:00-04:00",
    stories: [
      {
        id: "builds-1",
        type: "image",
        src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=1400&fit=crop",
      },
      {
        id: "builds-2",
        type: "image",
        src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=1400&fit=crop",
      },
    ],
  },
];

const mediaItems = [
  {
    id: 1,
    type: "image" as const,
    title: "Portrait Session",
    desc: "A quiet frame from the portfolio shoot.",
    url: "/jerry-robayo-portrait-1821.jpeg",
    span: "",
  },
  {
    id: 2,
    type: "image" as const,
    title: "Desk Mode",
    desc: "Where interface work gets shaped.",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop",
    span: "",
  },
  {
    id: 3,
    type: "image" as const,
    title: "New York",
    desc: "City rhythm, late trains, sharp deadlines.",
    url: "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=900&h=1200&fit=crop",
    span: "",
  },
  {
    id: 4,
    type: "image" as const,
    title: "Code Review",
    desc: "Small decisions that keep products maintainable.",
    url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=900&fit=crop",
    span: "",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-14 sm:py-16 lg:py-20">
      <div className="mb-10 flex items-center gap-4">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
          Visual Log
        </p>
        <div className="h-px w-24 bg-secondary/25" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-14">
        <div>
          <h1 className="font-display text-6xl font-semibold uppercase leading-none text-foreground sm:text-7xl lg:text-8xl">
            Gallery
            <span className="block text-accent">Shots.</span>
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-9 text-secondary sm:text-2xl sm:leading-10">
            A visual shelf for portraits, workspaces, city notes, and the small
            details around the portfolio.
          </p>
        </div>

        <div className="min-w-0">
          <div className="border border-secondary/25 bg-surface/55 p-5">
            <h2 className="font-display text-sm uppercase tracking-[0.24em] text-foreground">
              Recent Stories
            </h2>
            <div className="mt-5 flex gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-secondary/30 [&::-webkit-scrollbar-track]:bg-transparent">
              {storyUsers.map((user) => (
                <StoryViewer
                  key={user.username}
                  stories={user.stories}
                  username={user.username}
                  avatar={user.avatar}
                  timestamp={user.timestamp}
                />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <InteractiveBentoGallery
              mediaItems={mediaItems}
              title="Bento Gallery"
              description="Open a shot and use the dock to jump between frames."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
