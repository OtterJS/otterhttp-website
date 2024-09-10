import * as React from "react"
import { allSnippets } from "@contentlayer/generated";

import { Mdx } from "@/components/mdx";

const snippet = allSnippets.find(snippet => snippet.slug === "/snippets/index-readme")

export function InstallCodeGroup() {
  return <Mdx code={snippet!.body.code} />
}
