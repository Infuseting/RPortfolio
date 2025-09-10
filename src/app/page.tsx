import Image from "next/image";
import links from "./element/links";
import email from "./element/email";
import Home from "./element/home";
export default function main() {
  return (
    <div className="">
      {links()}
      {email()}
      <Home />
      
    </div>
  );
}
