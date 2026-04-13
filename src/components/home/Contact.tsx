import CurveDividerRight from "./CurveDividerRight";
import linkedInImg from "@/assets/images/logos/InBug-White.png";
import githubImg from "@/assets/icons/GitHub_Invertocat_White.svg";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";

const CONTACT_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/david-gilchrist-61b158301/",
    icon: <img src={linkedInImg} alt="LinkedIn" className="w-5 h-5" />,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/daveygg",
    icon: <img src={githubImg} alt="GitHub" className="w-5 h-5" />,
    external: true,
  },
  {
    label: "Email Me",
    href: "mailto:david.gilchrist@outlook.com",
    icon: <SendHorizonal className="w-5 h-5" />,
    external: false,
  },
];

export default function Contact() {
  return (
    <>
      <CurveDividerRight bgColor="#9DD5D8" fillColor="white" title="contact" />
      <div className="flex flex-col w-full items-center p-16 gap-6">
        <h1 className="text-4xl font-bold">I'd love to hear from you!</h1>

        <div className="flex gap-4">
          {CONTACT_LINKS.map((link) => (
            <Button
              key={link.label}
              asChild
              className="px-8 py-4 rounded-full"
            >
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="flex items-center gap-2"
              >
                {link.label}
                {link.icon}
              </a>
            </Button>
          ))}
        </div>

        <p className="text-lg max-w-2xl text-center opacity-80">
          <strong>Quick disclaimer:</strong> This project has been released early
          to meet the requirements of a job offer that I really like the look
          of. There's still bugs and a lot to be done. But if you like what you
          see please get in touch!
        </p>
      </div>
    </>
  );
}