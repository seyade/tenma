import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ExploreCardProps = {
  projectTitle: string;
  client: string;
  date?: string;
  link?: string | undefined;
};

const ExploreCard = ({
  projectTitle,
  client,
  date,
  link,
}: ExploreCardProps) => {
  return (
    <div className="flex flex-col justify-between h-72 p-5 bg-stone-200 rounded-lg">
      <div className="self-start">
        <span className="block mb-2 text-2xl">{projectTitle}</span>
        <span className="inline-block py-1 px-3 text-sm text-white bg-stone-900 rounded-full">
          at {client}
        </span>
        <p className="mt-1 text-sm text-stone-500">{date}</p>
      </div>
      <div className="text-right">
        {link && (
          <Link
            className="inline-block self-start flex-1 p-2 bg-white rounded-full"
            href={link}
          >
            <ArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ExploreCard;
