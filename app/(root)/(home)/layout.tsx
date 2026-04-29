import { ChildProps } from "@/types";
import Navbar from "@/components/shared/navbar";

export default function AuthLayout({ children }: ChildProps) {
  return (
    <div className={"relative"}>
      <Navbar />
      {children}
    </div>
  );
}
