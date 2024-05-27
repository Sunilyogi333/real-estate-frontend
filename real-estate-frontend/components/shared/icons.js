import Image from "next/image";

const Icons = ({ type }) => {
  let url;
  let ht;
  let wt;

  if (type === "bed") {
    url = "/images/icons/bedrooms.png";
    ht = 24;
    wt = 24;
  } else if (type === "bath") {
    url = "/images/icons/bathrooms.png";
    ht = 24;
    wt = 24;
  } else if (type === "area") {
    url = "/images/icons/area.png";
    ht = 24;
    wt = 24;
  } else if (type === "repair") {
    url = "/images/icons/repair.png";
    ht = 24;
    wt = 24;
  } else if (type === "active") {
    url = "/images/icons/active.png";
    ht = 24;
    wt = 24;
  } else if (type == "down"){
    url = "/images/icons/down.png";
    ht = 15;
    wt = 15;
  } else if ( type == "notification"){
    url = "/images/icons/notification.png";
    ht = 24;
    wt = 24;
  } else if ( type == "line"){
    url = "/images/icons/line.png";
    ht = 1;
    wt = 2;
  } else if (type == "gmail"){
    url = "/images/icons/gmail.png";
    ht = 24;
    wt = 24;
  } else if (type == "phone"){
    url = "/images/icons/phone.png"
    ht = 24;
    wt = 24;
  } else if (type == "property"){
    url = "/images/icons/property.png";
    ht = 30;
    wt = 24;
  } else if (type == "verified"){
    url = "/images/icons/verified.png";
    ht = 20;
    wt = 20;
  } else if (type == "eye_closed"){
    url = "/images/icons/eye_closed.png";
    ht = 24;
    wt = 24;
  } else if (type == "eye_open"){
    url = "/images/icons/eye_open.png";
    ht = 24;
    wt = 24;
  }

  return (
    <div className="relative h-6 w-6 flex items-center justify-center">
      <Image src={url} alt={type} height={ht} width={wt} />
    </div>
  );
};

export default Icons;
