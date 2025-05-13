import Image from "next/image";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home-text">
        <h2>Project for the course "IT Technology" at the University of Klaipeda</h2>
        <h3>Project theme: Game catalog</h3>
        <h3>Developer: Oleksandr Korhsakov</h3>
      </div>
      <Image src="/DatabaseScreen.png" alt="DB screen" width={800} height={500} />
    </div>
  );
}
