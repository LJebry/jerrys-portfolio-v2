const menuItems = [
  { label: "JR", href: "/" },
  { label: "About Me", href: "/about-me" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "mailto:jerryrobayo1130@gmail.com" },
  { label: "Fun", href: "#fun" },
];

export default function NavMenu() {
  return (
    <nav className="min-w-0">
      <ul className="grid grid-cols-2 items-center gap-x-3 gap-y-2 sm:flex sm:justify-between sm:gap-3 lg:gap-5">
        {menuItems.map((item) => (
          <li key={item.label} className="shrink-0 list-none">
            <a href={item.href} className="group relative inline-block">
              <span className="relative z-10 block whitespace-nowrap px-2 py-2 font-display text-sm font-semibold uppercase text-foreground transition-colors duration-300 group-hover:text-background sm:px-2 sm:text-base lg:px-3 lg:text-lg">
                {item.label === "JR" ? (
                  <>
                    J<span className="text-accent group-hover:text-background">R</span>
                  </>
                ) : (
                  item.label
                )}
              </span>
              <span className="absolute inset-0 origin-center scale-y-[2] border-y-2 border-foreground opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100" />
              <span className="absolute left-0 top-[2px] h-full w-full origin-top scale-0 bg-foreground opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
