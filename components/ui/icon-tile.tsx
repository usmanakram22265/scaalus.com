import { Icon, type IconName } from "./icons";

/** 48px card icon tile: 12px radius, Light Blue -> Brand Blue, white 24px icon. */
export function IconTile({ name }: { name: IconName }) {
  return (
    <span className="icon-tile grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white">
      <Icon name={name} size={24} />
    </span>
  );
}
