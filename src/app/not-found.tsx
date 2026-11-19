import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-width section">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 max-w-[16ch] text-[clamp(2.5rem,1.2rem+5.5vw,5.5rem)] leading-[1.05]">This page does not exist.</h1>
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link href="/docs" className="btn">
          Documentation
        </Link>
        <Link href="/support" className="link inline-flex min-h-11 items-center text-[0.9375rem]">
          Support
        </Link>
      </div>
    </div>
  );
}
