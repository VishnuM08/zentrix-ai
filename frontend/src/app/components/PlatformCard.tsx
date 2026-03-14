import { Card } from "./ui/card";

interface PlatformCardProps {
  name: string;
  category: string;
  logo: string;
  color: string;
  description: string;
}

export function PlatformCard({ name, category, logo, color, description }: PlatformCardProps) {
  return (
    <Card className="p-6 hover:shadow-strong transition-all duration-300 frosted hover:glass-strong group hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className={`${color} size-12 rounded-lg flex items-center justify-center text-2xl reflective shadow-soft group-hover:scale-110 transition-transform duration-300`}>
          {logo}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{category}</p>
          <p className="text-sm text-muted-foreground/80">{description}</p>
        </div>
      </div>
    </Card>
  );
}