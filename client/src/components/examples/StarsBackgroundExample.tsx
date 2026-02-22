import StarsBackground from "../StarsBackground";

export default function StarsBackgroundExample() {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
      <StarsBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl font-bold">خلفية النجوم المتحركة</span>
      </div>
    </div>
  );
}
