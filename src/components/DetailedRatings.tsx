import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Rating = "green" | "yellow" | "red";

interface DetailedRatingsProps {
  peopleRating: Rating;
  processRating: Rating;
  technologyRating: Rating;
}

const ratingConfig = {
  green: {
    label: "On Track",
    icon: CheckCircle2,
    color: "bg-[#3CC5C0] text-white",
    tooltip: "On Track — no issues identified",
  },
  yellow: {
    label: "At Risk",
    icon: AlertTriangle,
    color: "bg-[#FFC107] text-black",
    tooltip: "Some issues may affect progress",
  },
  red: {
    label: "Critical",
    icon: XCircle,
    color: "bg-[#D32F2F] text-white",
    tooltip: "Critical issues requiring attention",
  },
};

export function DetailedRatings({
  peopleRating,
  processRating,
  technologyRating,
}: DetailedRatingsProps) {
  const ratings = [
    { label: "Team Performance", value: peopleRating },
    { label: "Project Management", value: processRating },
    { label: "Technical Readiness", value: technologyRating },
  ];

  const RatingChip = ({ label, value }: { label: string; value: Rating }) => {
    const config = ratingConfig[value];
    const Icon = config.icon;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Badge
                className={`${config.color} flex items-center gap-1 px-2.5 py-1 text-xs font-medium`}
                aria-label={`${label}: ${config.label}`}
              >
                <Icon className="h-3 w-3" />
                {config.label}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{config.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Detailed Ratings
      </h3>
      <div className="flex flex-wrap gap-4 sm:gap-6">
        {ratings.map((rating) => (
          <RatingChip
            key={rating.label}
            label={rating.label}
            value={rating.value}
          />
        ))}
      </div>
    </div>
  );
}
