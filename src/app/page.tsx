import WidgetsShowcase from "@/components/WidgetsShowcase";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/flow-tester');
  return <WidgetsShowcase isServerSide />;
}
