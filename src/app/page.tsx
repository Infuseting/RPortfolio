import Image from "next/image";
import links from "./element/links";
import email from "./element/email";
export default function Home() {
  return (
    <div className="">
      {links()}
      {email()}
    </div>
  );
}
