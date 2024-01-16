import Link from "next/link";

export const Button = ({value,link=""})=>{
    return(
        <Link href={link}>
            <button className="bg-blue-500 text-white p-2 rounded-md">
                {value}
            </button>
  </Link>
  );
}