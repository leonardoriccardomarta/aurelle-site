"use client";

import { useEffect, useRef, useState } from "react";

// Copies the support address to the clipboard. Works with no mail app installed, which a mailto: link cannot promise.
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers and non-secure contexts: fall back to a temporary selection.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2400);
  }

  return (
    <>
      <button type="button" onClick={copy} className="btn min-w-[13rem] cursor-pointer">
        {copied ? "Copied" : "Copy email"}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Email address copied to the clipboard" : ""}
      </span>
    </>
  );
}
