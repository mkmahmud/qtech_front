import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight, LocateIcon, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CategoryCard from "@/components/cards/categoryCard"
import Link from "next/link"
import JobCard from "@/components/cards/jobCard"
import LatestJobCard from "@/components/cards/latestJobCard"

export default function PublicHomePage() {
  return (
    <section>
      {/* Hero Section */}
      <section className="relative bg-brand-light-gray overflow-hidden -mt-20">

        {/* RIGHT SIDE BG PATTERN */}
        <div className="absolute inset-y-0 right-0 w-1/2">
          <Image
            src="/bg-pattern.svg"
            alt="pattern"
            fill
            className="object-cover  "
          />
        </div>

        {/* CONTAINER */}
        <div className="relative mx-auto   px-4 sm:px-6 py-20 md:py-40 flex">

          {/* LEFT CONTENT */}
          <div className="w-full md:w-1/2 z-10">
            <h1 className="font-heading text-[48px]  md:text-[72px]       font-bold text-brand-neutrals-100  leading-[1.1] mt-10">
              Discover <br />
              more than
              <p className="block text-brand-blue relative mt-2">
                5000+ Jobs
                <Image
                  src="/underline.svg"
                  alt="underline"
                  width={350}
                  height={18}
                  className="absolute left-0 top-full mt-2"
                />
              </p>
            </h1>

            <p className="mt-10 text-xl text-brand-neutrals-80 max-w-xl">
              Great platform for the job seeker that searching for new career heights and passionate about startups.
            </p>

            <div className="mt-10 relative md:w-[900px] md:max-w-none">
              <form className="flex flex-col md:flex-row items-stretch md:items-center justify-between bg-white p-3 gap-3 z-10">
                <div className="flex items-center w-full gap-2">

                  <Search className="text-brand-neutrals-40" />

                  <Input
                    placeholder="Job title or keyword"
                    className="h-12 border-b border-brand-neutrals-20 focus-visible:ring-0 flex-1"
                  />
                </div>

                <div className="flex items-center w-full gap-2">

                  <LocateIcon className="text-brand-neutrals-40" />

                  <div className="border-b border-brand-neutrals-20 w-full">
                    <Select>
                      <SelectTrigger className="h-12 border-none outline-none text-sm text-gray-600 w-full">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="florence">Florence, Italy</SelectItem>
                        <SelectItem value="london">London, UK</SelectItem>
                        <SelectItem value="newyork">New York, USA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="h-12 px-6 whitespace-nowrap w-full md:w-auto">
                  Search my job
                </Button>
              </form>
            </div>

            <p className="mt-3 text-base text-brand-neutrals-40">
              Popular: <span className="font-semibold">UI Designer, UX Researcher, Android, Admin</span>
            </p>
          </div>

          <div className="hidden md:block w-1/2 relative" />
        </div>

        <div className="hidden md:block absolute bottom-0 right-30  ">
          <Image
            src="/peron.png"
            alt="person"
            width={420}
            height={520}
            className="object-contain"
          />
        </div>

        <div className="hidden md:block absolute bottom-0 right-0 w-[30%] h-[180px] bg-white z-0 
  [clip-path:polygon(0_100%,100%_0,100%_100%)]">
        </div>
      </section>

      {/*  top companies*/}
      <section className=" px-4 py-4 sm:px-6 my-10">
        <h3 className="text-lg text-black/50">Companies we helped grow</h3>
        <div className="grid grid-cols-2 md:flex md:items-center md:justify-between mt-6 gap-6">
          <Image
            src="/logos/vodafone-2017-logo.png"
            alt="companies"
            width={150}
            height={40}
            className="object-contain"
          />
          <Image
            src="/logos/tesla-9 1.png"
            alt="companies"
            width={150}
            height={40}

          />
          <Image
            src="/logos/talkit 1.png"
            alt="companies"
            width={150}
            height={40}

          />
          <Image
            src="/logos/intel-3.png"
            alt="companies"
            width={150}
            height={40}
            className="object-fit"

          />
          <Image
            src="/logos/amd-logo-1.png"
            alt="companies"
            width={150}
            height={40}

          />
        </div>
      </section>


      {/* Categories */}
      <section className=" px-4 py-4 sm:px-6 my-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-[48px] font-bold font-heading">Explore by <span className="text-brand-blue">category</span></h1>
          <Button variant="ghost" className="hidden md:block  ">
            <Link href="/jobs/1" className="flex items-center gap-2">
              <span> Show all jobs</span> <ArrowRight />
            </Link>
          </Button>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
        <Button variant="ghost" className="md:hidden mt-4  ">
          <Link href="/jobs/1" className="flex items-center gap-2">
            <span> Show all jobs</span> <ArrowRight />
          </Link>
        </Button>
      </section>


      {/* Start Posting Jobs  */}
      <section className="px-4 py-4 sm:px-6 my-10 relative">
        <div className="   absolute top-0 left-0 w-[15%] h-[100px] bg-white z-10 
  [clip-path:polygon(0_0,100%_0,0_100%)]">
        </div>
        <div
          className="bg-primary flex justify-between items-center flex-col md:flex-row overflow-hidden relative"

        >
          {/* Left Content */}
          <div className="md:max-w-sm z-10 text-center md:text-left gap-10 px-8 py-16 md:py-0 md:pl-20 ">
            <h1 className="text-5xl font-heading text-white font-bold leading-tight">
              Start posting jobs today
            </h1>
            <p className="text-white py-8 text-lg">
              Start posting jobs for only $10.
            </p>
            <Button variant="secondary" className="font-bold px-8 py-6 text-primary bg-white hover:bg-gray-100">
              Sign Up For Free
            </Button>
          </div>

          {/* Right Image - Positioned to look like the mockup */}
          <div className="relative mt-10 md:mt-20 self-end pb-20 md:pb-0">
            <Image
              src="/dash.png"
              alt="Dashboard"
              width={600}
              height={500}
              className="object-contain   mr-20 "
              priority
            />
          </div>
        </div>
        <div className="  absolute bottom-0 right-0 w-[30%] h-[140px] md:h-[180px] bg-white z-0 
  [clip-path:polygon(0_100%,100%_0,100%_100%)]">
        </div>
      </section>

      {/* Featured jobs */}
      <section className=" px-4 py-4 sm:px-6 my-10">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl md:text-[48px] font-bold font-heading">Featured<span className="text-brand-blue">jobs</span></h1>
          <Button variant="ghost" className="hidden md:block  ">
            <Link href="/jobs/1" className="flex items-center gap-2">
              <span> Show all jobs</span> <ArrowRight />
            </Link>
          </Button>
        </div>
        {/* Cards */}
        <div className=" flex gap-6 mt-10 overflow-x-auto py-4 md:grid md:grid-cols-3 lg:grid-cols-4">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
        <Button variant="ghost" className="md:hidden mt-4  ">
          <Link href="/jobs/1" className="flex items-center gap-2">
            <span> Show all jobs</span> <ArrowRight />
          </Link>
        </Button>
      </section>


      {/* Latest Jobs */}
      <section className="relative overflow-hidden mt-20 px-4 py-4 sm:px-6">
        {/* BG pattern under content */}
        <div className="absolute inset-y-0 right-0 w-1/2 -z-10">
          <Image
            src="/bg-pattern.svg"
            alt="pattern"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-[48px] font-bold font-heading">Featured<span className="text-brand-blue">jobs</span></h1>
            <Button variant="ghost" className="hidden md:block">
              <Link href="/jobs/1" className="flex items-center gap-2">
                <span> Show all jobs</span> <ArrowRight />
              </Link>
            </Button>
          </div>
          {/* Cards */}
          <div className="gap-6 mt-10 py-4 grid grid-cols-1 md:grid-cols-2">
            <LatestJobCard />
            <LatestJobCard />
            <LatestJobCard />
            <LatestJobCard />
            <LatestJobCard />
            <LatestJobCard />
            <LatestJobCard />
            <LatestJobCard />
          </div>
        </div>
      </section>


    </section>
  )
}