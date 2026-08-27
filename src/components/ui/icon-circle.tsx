import Image from "next/image";
import { cn } from "@/lib/cn";

type IconCircleProps = {
  src: string;
  /** Figma renders this glyph mirrored on the vertical axis. */
  flipY?: boolean;
};

export function IconCircle({ src, flipY = false }: IconCircleProps) {
  return (
    <span className="grid size-[70px] shrink-0 place-items-center rounded-full border-2 border-white">
      <Image
        src={src}
        alt=""
        width={42}
        height={42}
        className={cn("size-[42px]", flipY && "-scale-y-100")}
      />
    </span>
  );
}
