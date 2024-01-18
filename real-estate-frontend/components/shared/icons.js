import Image from "next/image";

const Icons = ({ type }) => {
  let url;

  if (type === "bed") {
    url = "/Images/Icons/bedrooms.png";
  } else if (type === "bath") {
    url = "/Images/Icons/bathrooms.png";
  } else if (type === "area") {
    url = "/Images/Icons/area.png";
  } else if (type === "repair") {
    url = "/Images/Icons/repair.png";
  } else if (type === "active") {
    url = "/Images/Icons/active.png";
  }

  return (
    <div className="relative h-6 w-6">
      <Image src={url} alt={type} height={24} width={24} />
    </div>
  );
};

export default Icons;
