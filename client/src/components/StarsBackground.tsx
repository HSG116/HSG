import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: "small" | "medium" | "large";
  delay: number;
  duration: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
}

export default function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const numberOfStars = isMobile ? 80 : 150;

    const generatedStars: Star[] = [];
    for (let i = 0; i < numberOfStars; i++) {
      const sizeRandom = Math.random();
      let size: "small" | "medium" | "large" = "small";
      if (sizeRandom > 0.6 && sizeRandom <= 0.9) size = "medium";
      if (sizeRandom > 0.9) size = "large";

      generatedStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        delay: Math.random() * 8,
        duration: Math.random() * 4 + 2,
      });
    }
    setStars(generatedStars);

    const numberOfShootingStars = isMobile ? 2 : 4;
    const generatedShootingStars: ShootingStar[] = [];
    for (let i = 0; i < numberOfShootingStars; i++) {
      generatedShootingStars.push({
        id: i,
        startX: Math.random() * 100,
        startY: Math.random() * 40,
        delay: Math.random() * 15 + i * 5,
        duration: Math.random() * 2 + 2,
      });
    }
    setShootingStars(generatedShootingStars);
  }, []);

  const getSizeClasses = (size: "small" | "medium" | "large") => {
    switch (size) {
      case "small":
        return "w-[1px] h-[1px] shadow-[0_0_3px_#4e6bff,0_0_5px_#4e6bff]";
      case "medium":
        return "w-[2px] h-[2px] shadow-[0_0_5px_#4e6bff,0_0_8px_#4e6bff]";
      case "large":
        return "w-[3px] h-[3px] shadow-[0_0_8px_#4e6bff,0_0_12px_#4e6bff]";
    }
  };

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        backgroundColor: "#020617",
      }}
      data-testid="stars-background"
    >
      {/* طبقة غامقة فخمة مأخوذة من قسم About Me موضوعة بالخلف لكي لا تغطي على النجوم */}
      {/* تم تغيير اللون إلى bg-black/60 ليصبح المكان أغمق (أظلم) ويعطي مساحة أكبر لبروز النجوم */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* إضاءات خافتة زرقاء مأخوذة من About Me تعطي فخامة للتصميم */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full bg-white ${getSizeClasses(star.size)}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            zIndex: 1, // تأكيد ظهور النجوم بالأمام
          }}
        />
      ))}

      {shootingStars.map((star) => (
        <div
          key={`shooting-${star.id}`}
          className="absolute w-[100px] h-[1px] opacity-0"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(78,107,255,0) 100%)",
            animation: `shooting ${star.duration}s ease-out infinite`,
            animationDelay: `${star.delay}s`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
            zIndex: 1, // تأكيد ظهور الشهب بالأمام
          }}
        />
      ))}
    </div>
  );
}
