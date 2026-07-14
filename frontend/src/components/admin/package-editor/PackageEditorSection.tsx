import * as React from "react";
import { cn } from "@/lib/utils";

type PackageEditorSectionProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export const PackageEditorSection: React.FC<PackageEditorSectionProps> = ({
  title,
  description,
  icon,
  className,
  children,
}) => {
  return (
    <section className={cn("rounded-3xl border bg-card p-5 shadow-sm", className)}>
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
};
