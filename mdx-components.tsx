import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-2xl font-semibold tracking-tight text-heading">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-6 mb-3 text-xl font-semibold tracking-tight text-heading">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-4 mb-2 text-lg font-medium text-heading">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-relaxed text-foreground">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="underline underline-offset-4 transition-colors hover:text-heading"
        {...(href?.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground">
        {children}
      </ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-border pl-4 text-muted italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-heading">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-lg bg-surface p-4 font-mono text-sm">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-8 border-border" />,
    ...components,
  };
}
