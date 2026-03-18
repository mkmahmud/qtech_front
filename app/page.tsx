import CategoryCard from "@/components/cards/categoryCard";
import JobCard from "@/components/cards/jobCard";
import LatestJobCard from "@/components/cards/latestJobCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Home() {
  return (
    <div className=" ">
      <Button variant={"ghost"} >
        Login
      </Button>
      <Button  >
        Sign Up
      </Button>
      <Button variant={"link"} >
        Sign Up
      </Button>
      <Button variant={"outline"} >
        Sign Up
      </Button>
      <div className="p-10 bg-primary">
        <Button variant={"secondary"} >
          Sign Up
        </Button>
      </div>

      <div className="p-10">
        <Badge>Marketing</Badge>
        <Badge variant="green">Green Badge</Badge>
        <Badge variant="yellow">Yellow Badge</Badge>
        <Badge variant="red">Red Badge</Badge>
      </div>

      <div className="bg-primary p-10">
        <Input placeholder="Enter your email" />
      </div>
      <div className="p-10">
        <CategoryCard>

        </CategoryCard>
      </div>
      <div className="p-10">
        <JobCard>

        </JobCard>
      </div>
      <div className="p-10">
        <LatestJobCard>

        </LatestJobCard>
      </div>
    </div>
  );
}
