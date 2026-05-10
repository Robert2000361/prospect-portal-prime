import { TypeAnimation } from "react-type-animation";

export default function Typewriter({ titles }: { titles: string[] }) {
  if (!titles?.length) return null;
  const sequence: (string | number)[] = [];
  titles.forEach((t) => {
    sequence.push(t);
    sequence.push(2000);
  });
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      cursor
      className="text-primary"
    />
  );
}
