"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  pricePerHour: string;
  status: "Paid" | "Not Paid";
  categories: string[];
  description: string;
  location: string;
  timeAgo: string;
  logoColor: string;
  logoIcon: string;
}

interface ProjectCardsProps {
  projects: Project[];
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
  hover: {
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const expandedContentVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const pillVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  hover: {
    scale: 1.05,
    y: -1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const logoVariants: Variants = {
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const chevronVariants: Variants = {
  hover: {
    scale: 1.1,
    backgroundColor: "var(--foreground)",
    color: "var(--background)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.95,
  },
};

function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="cursor-pointer border-b border-secondary/25 py-5"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-1 items-start gap-4">
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className={`flex h-12 w-12 shrink-0 items-center justify-center border border-secondary/25 ${project.logoColor} font-display text-lg font-semibold text-foreground shadow-sm`}
          >
            {project.logoIcon}
          </motion.div>

          <div className="min-w-0 flex-1">
            <motion.div
              className="mb-2 flex flex-wrap items-center gap-3"
              variants={childVariants}
            >
              <h3 className="font-display text-xl font-semibold uppercase text-foreground">
                {project.title}
              </h3>
              <div className="h-3 w-px bg-secondary/45" />
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-2 py-1 font-display text-xs uppercase tracking-[0.14em] ${
                  project.status === "Paid"
                    ? "bg-accent text-foreground"
                    : "bg-secondary/20 text-secondary"
                }`}
              >
                {project.status === "Paid" ? "Active" : "Past"}
              </motion.span>
            </motion.div>

            <motion.p
              className="mb-4 text-sm font-medium text-secondary"
              variants={childVariants}
            >
              {project.pricePerHour}
            </motion.p>

            <AnimatePresence>
              {isExpanded ? (
                <motion.div
                  variants={expandedContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden"
                >
                  <motion.div
                    className="mb-4 flex flex-wrap gap-2"
                    variants={childVariants}
                  >
                    {project.categories.map((category) => (
                      <motion.span
                        key={category}
                        variants={pillVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="select-none border border-secondary/25 px-4 py-2 font-display text-xs uppercase tracking-[0.14em] text-foreground"
                      >
                        {category}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.p
                    className="mb-4 text-sm leading-7 text-secondary"
                    variants={childVariants}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    className="flex items-center gap-2 text-sm text-secondary"
                    variants={childVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <MapPin className="h-4 w-4" />
                    </motion.div>
                    <span className="font-display text-xs uppercase tracking-[0.14em]">
                      {project.location}
                    </span>
                    <div className="mx-1 h-3 w-px bg-secondary/25" />
                    <span className="text-xs">{project.timeAgo}</span>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <motion.button
          variants={chevronVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={(event) => {
            event.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/25 bg-surface text-foreground shadow-sm"
          aria-label={isExpanded ? "Collapse experience" : "Expand experience"}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: index * 0.1 + 0.3,
              mass: 0.8,
            }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
