import { notFound } from "next/navigation";

// Any unknown URL lands here, so the 404 page renders inside the right language's layout
export default function CatchAll() {
  notFound();
}
