import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import Icon from "../Icon";

const SideNav = () => {
  return (
    <nav className="sticky top-[90px] left-0 flex justify-between flex-col h-[calc(100vh_-_110px)]">
      <ul>
        {navLinks.map((link) => (
          <li key={link.id}>
            <Button
              href={link.path ? `${link.path}` : "/"}
              className="justify-start text-black hover:underline hover:text-primary group"
              as={Link}
              variant="light"
              color="primary"
              fullWidth
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Button>
          </li>
        ))}
      </ul>
      <ul className="flex justify-between items-center">
        <li>
          <Button
            as={Link}
            href="https://github.com/tehseen01"
            target="_blank"
            isIconOnly
            variant="light"
            color="primary"
            className="text-black group"
          >
            <Icon name="github" strokeWidth={1.25} />
          </Button>
        </li>
        <li>
          <Button
            as={Link}
            href="https://x.com/tehseen_type"
            target="_blank"
            isIconOnly
            variant="light"
            color="primary"
            className="text-black group"
          >
            <Icon name="twitter" strokeWidth={1.25} />
          </Button>
        </li>
        <li>
          <Button
            as={Link}
            href="https://www.linkedin.com/in/tehseen01/"
            target="_blank"
            isIconOnly
            variant="light"
            color="primary"
            className="text-black group"
          >
            <Icon name="linkedin" strokeWidth={1.25} />
          </Button>
        </li>
        <li>
          <Button
            as={Link}
            href="https://www.instagram.com/tehseen.01/"
            target="_blank"
            isIconOnly
            variant="light"
            color="primary"
            className="text-black group"
          >
            <Icon name="instagram" strokeWidth={1.25} />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;

export const navLinks = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: <Icon name="home" strokeWidth={1.25} />,
  },
  {
    id: 2,
    label: "Reading List",
    icon: <Icon name="bookmark" strokeWidth={1.25} />,
  },
  {
    id: 3,
    label: "Listings",
    icon: <Icon name="scroll-text" strokeWidth={1.25} />,
  },
  {
    id: 4,
    label: "Podcasts",
    icon: <Icon name="mic" strokeWidth={1.25} />,
  },
  {
    id: 5,
    label: "Videos",
    icon: <Icon name="youtube" strokeWidth={1.25} />,
  },
  {
    id: 6,
    label: "Tags",
    path: "/tags",
    icon: <Icon name="tag" strokeWidth={1.25} />,
  },
  {
    id: 7,
    label: "FAQ",
    icon: <Icon name="lightbulb" strokeWidth={1.25} />,
  },
  {
    id: 9,
    label: "About",
    icon: <Icon name="user" strokeWidth={1.25} />,
  },
  {
    id: 10,
    label: "Contact",
    icon: <Icon name="contact" strokeWidth={1.25} />,
  },
  {
    id: 11,
    label: "Guides",
    icon: <Icon name="book-open-check" strokeWidth={1.25} />,
  },
];
