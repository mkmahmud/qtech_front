import Image from "next/image"
import Link from "next/link"
import {
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const aboutLinks = ["Companies", "Pricing", "Terms", "Advice", "Privacy Policy"]
const resourceLinks = ["Help Docs", "Guide", "Updates", "Contact Us"]

const socialLinks = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "Dribbble", icon: Dribbble },
  { name: "LinkedIn", icon: Linkedin },
  { name: "Twitter", icon: Twitter },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-neutrals text-white">
      <div className="h-[2px] w-full bg-primary" />

      <div className="mx-auto w-full   px-4 py-10 sm:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-10 xl:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="QuickHire logo"
                width={28}
                height={28}
                className="size-7"
              />
              <span className="font-red-hat-display text-2xl font-bold leading-none">
                QuickHire
              </span>
            </Link>

            <p className="max-w-[400px] text-base leading-8 text-brand-neutrals-20">
              Great platform for the job seeker that passionate about startups. Find
              your dream job easier.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <h3 className="font-ui text-lg font-semibold">About</h3>
              <ul className="space-y-3">
                {aboutLinks.map((item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-base text-brand-neutrals-20 transition-colors hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-ui text-lg font-semibold">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-base text-brand-neutrals-20 transition-colors hover:text-white"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4 md:col-span-2 xl:col-span-1">
            <h3 className="font-ui text-lg font-semibold">Get job notifications</h3>
            <p className="max-w-[320px] text-base leading-8 text-brand-neutrals-20">
              The latest job news, articles, sent to your inbox weekly.
            </p>

            <form className="flex flex-col gap-3 sm:flex-row sm:items-center" action="#">
              <Input
                type="email"
                placeholder="Email Address"
                className="h-12 w-full rounded-none border border-brand-neutrals-20 px-4 text-brand-neutrals-80 placeholder:text-brand-neutrals-40 sm:max-w-[240px]"
                aria-label="Email address"
              />
              <div className="md:w-full ">
                <Button
                  type="submit"
                  className="h-12   rounded-none px-7 font-ui text-base font-semibold  "
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-neutrals-80/40 pt-8 md:mt-12 md:flex md:items-center md:justify-between">
          <p className="text-base text-brand-neutrals-40 text-center md:text-left">
            {year} © QuickHire. All rights reserved.
          </p>

          <div className="mt-5 flex items-center justify-center gap-3 md:mt-0">
            {socialLinks.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                href="/"
                aria-label={name}
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-white"
              >
                <Icon className="size-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
