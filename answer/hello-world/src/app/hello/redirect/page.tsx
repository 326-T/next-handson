import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="space-x-10">
      <Link href="/hello">Go to Hello</Link>
      <Link href="/hello/child">Go to Child</Link>
    </nav>
  );
}
