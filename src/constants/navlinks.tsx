import { Briefcase, FileText, Mail, MessageSquare, Zap } from "lucide-react";

export const navlinks = [
  {
    href: "/",
    label: "Home",
    icon: Zap,
  },
  {
    href: "/about",
    label: "About",
    icon: MessageSquare,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: Briefcase,
  },
  {
    href: "/blog",
    label: "Articles",
    icon: FileText,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: Mail,
  },
];
