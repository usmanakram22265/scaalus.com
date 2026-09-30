import { trial } from "@/lib/content";
import { TrialForm } from "./trial-form";
import { Icon } from "./ui/icons";
import { Logo } from "./ui/logo";

export function Trial() {
  return (
    <section id="trial" aria-labelledby="trial-title" className="py-section">
      <div className="container-page">
        <div
          data-reveal=""
          className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand via-royal to-deep px-5 py-space-xl sm:px-space-xl lg:grid lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-space-xl lg:p-space-2xl"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_0%_0%,rgb(110_147_240/0.45),transparent_70%),radial-gradient(50%_45%_at_100%_100%,rgb(110_147_240/0.2),transparent_70%)]"
          />
          <div className="text-white">
            <Logo
              variant="mark"
              tone="white"
              height={40}
              className="h-10 w-auto"
            />
            <p className="mt-space-md text-eyebrow uppercase text-white/85">
              {trial.eyebrow}
            </p>
            <h2 id="trial-title" className="mt-3 text-display-lg text-white">
              {trial.title}
            </h2>
            <p className="mt-space-sm max-w-prose text-lead text-white/90">
              {trial.body}
            </p>
            <ul className="mt-space-md flex flex-wrap gap-x-space-md gap-y-space-xs text-small font-medium text-white">
              {trial.points.map((point) => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={16} strokeWidth={2.5} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-space-lg lg:mt-0">
            <TrialForm />
          </div>
        </div>
      </div>
    </section>
  );
}
