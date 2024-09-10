import * as React from "react"
import { allSnippets } from "@contentlayer/generated";

import { Mdx } from "@/components/mdx";

type SnippetProps = {
  slug: string,
}

export function Snippet({ slug }: SnippetProps) {
  const snippet = allSnippets.find(snippet => snippet.slug === slug)
  
  if (!snippet) throw new Error("Snippet not found")
  
  return <Mdx code={snippet.body.code} />
}
