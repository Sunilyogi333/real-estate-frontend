import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
    <div className="flex gap-2">
     
      <div className="relative w-9">
        <Image
        fill
            src="/images/icons/serenity.png"
            alt=""
            className="w-full"
            sizes="full"
        />
      </div>
      <span className="font-bold text-gray-800 text-3xl">Serenity</span>
     
    </div>
    </Link>
  );
};

export default Logo;
