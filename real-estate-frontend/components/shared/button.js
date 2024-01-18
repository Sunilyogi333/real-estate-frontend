import Link from "next/link";
//Pass link property for it to behave like a link, don't pass link if you want to handle events
export const Button = ({ value, link = "", onClick,className="bg-blue-500 text-white p-2 rounded-md" }) => {


  return (
    <>
      {link !== "" ? (
        <Link href={link}>
          
            <button className={className}>
              {value}
            </button>
          
        </Link>
      ) : (
        <div onClick={onClick} role="button" tabIndex={0} className="bg-blue-500 text-white p-2 rounded-md">
          {value}
        </div>
      )}
    </>
  );
};
