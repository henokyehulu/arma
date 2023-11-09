"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import type { IconType } from "react-icons/lib";
import {
  PiSquaresFour as BrowseIcon,
  PiFlagBannerDuotone as FlagIcon,
  PiUploadSimple as UploadIcon,
} from "react-icons/pi";
import {
  RiGithubFill as GithubIcon,
  RiTwitterXLine as XIcon,
} from "react-icons/ri";
import HeaderMenu from "../header.menu";
import ModeToggle from "../mode.toggle";
import { Badge } from "../ui/badge";
import { buttonVariants } from "../ui/button";
import SearchDialog from "./search.dialog";
import type { Category } from "@prisma/client";

export interface LinkProps {
  icon: IconType;
  label: string;
  path: string;
  isExternalLink?: boolean;
}

const links: LinkProps[] = [
  {
    icon: BrowseIcon,
    label: "Browse",
    path: "/",
  },
  {
    icon: UploadIcon,
    label: "Upload",
    path: "/contribute",
  },
];
const socials: LinkProps[] = [
  {
    icon: GithubIcon,
    label: "Github",
    path: "https://github.com/henokyehulu/arma",
    isExternalLink: true,
  },
  {
    icon: XIcon,
    label: "Twitter",
    path: "https://x.com/henokyehulu",
    isExternalLink: true,
  },
];

interface HeaderProps {
  categories: ({
    _count: {
      companies: number;
    };
  } & Category)[];
  // companies: Company[];
}
const Header: React.FC<HeaderProps> = ({ categories }) => {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpenSearchDialog((openSearchDialog) => !openSearchDialog);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <header className="sticky top-0 z-20 flex h-14 flex-shrink-0 items-center justify-between gap-4 border-b bg-background/75 px-4 backdrop-blur-lg">
      <div>
        <Link
          href={"/"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "p-0 font-semibold hover:bg-transparent",
          )}
        >
          <FlagIcon className="mr-1 h-5 w-5 text-primary" />
          Arma
          <Badge
            variant={"secondary"}
            className="ml-1 rounded text-xs font-medium"
          >
            Alpha
          </Badge>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SearchDialog
          open={openSearchDialog}
          setOpen={setOpenSearchDialog}
          links={links}
          socials={socials}
          categories={categories}
        />
      </div>
      <ModeToggle />
      <div className="hidden items-center gap-2 md:flex">
        <HeaderMenu links={links} socials={socials} />
      </div>
    </header>
  );
};

export default Header;
