import { StoryViewer, type Story } from "@/components/ui/story-viewer";

const storyTimestamp = "2026-04-29T20:30:00-04:00";

const storyUsers: Array<{
  username: string;
  avatar: string;
  timestamp: string;
  stories: Story[];
}> = [
  {
    username: "Wifey",
    avatar: "/gallery/wifey-nyc-subway.jpeg",
    timestamp: storyTimestamp,
    stories: [
      {
        id: "wifey-1",
        type: "image",
        src: "/gallery/wifey-nyc-subway.jpeg",
      },
      {
        id: "wifey-2",
        type: "image",
        src: "/gallery/wifey-nyc-upside-down.jpeg",
      },
      {
        id: "wifey-3",
        type: "image",
        src: "/gallery/portrait-stage.jpeg",
      },
      {
        id: "wifey-4",
        type: "image",
        src: "/gallery/wifey-close-1.jpeg",
      },
      {
        id: "wifey-5",
        type: "image",
        src: "/gallery/wifey-close-2.jpeg",
      },
      {
        id: "wifey-6",
        type: "image",
        src: "/gallery/wifey-close-3.jpeg",
      },
      {
        id: "wifey-7",
        type: "image",
        src: "/gallery/wifey-close-4.jpeg",
      },
    ],
  },
  {
    username: "NYC",
    avatar: "/gallery/nyc-skyline.jpeg",
    timestamp: "2026-04-29T19:30:00-04:00",
    stories: [
      {
        id: "nyc-1",
        type: "image",
        src: "/gallery/wifey-nyc-theater.jpeg",
      },
      {
        id: "nyc-2",
        type: "image",
        src: "/gallery/nyc-snowflake.jpeg",
      },
      {
        id: "nyc-3",
        type: "image",
        src: "/gallery/nyc-grand-central.jpeg",
      },
      {
        id: "nyc-4",
        type: "image",
        src: "/gallery/nyc-skyline.jpeg",
      },
      {
        id: "nyc-5",
        type: "image",
        src: "/gallery/nyc-museum.jpeg",
      },
    ],
  },
  {
    username: "Portraits",
    avatar: "/jerry-robayo-portrait-1821.jpeg",
    timestamp: "2026-04-29T18:15:00-04:00",
    stories: [
      {
        id: "portrait-1",
        type: "image",
        src: "/jerry-robayo-portrait-1821.jpeg",
      },
    ],
  },
  {
    username: "My Cats",
    avatar: "/gallery/my-cats.jpeg",
    timestamp: "2026-04-29T14:00:00-04:00",
    stories: [
      {
        id: "cats-1",
        type: "image",
        src: "/gallery/my-cats.jpeg",
      },
    ],
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-14 sm:py-16 lg:py-20">
      <div className="mb-10 flex items-center gap-4">
        <p className="font-display text-sm uppercase tracking-[0.28em] text-accent">
          05 / Visual Log
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
            A visual shelf for portraits, my wife, New York, my cats, and more!.
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
        </div>
      </div>
    </section>
  );
}
