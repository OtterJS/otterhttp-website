import { allDocs, type Doc } from "@contentlayer/generated"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import * as React from "react"

import { siteConfig } from "@/config/site"
import { arrayShallowEquals } from "@/lib/array-shallow-equals";
import { absoluteUrl } from "@/lib/utils";
import {Mdx} from "@/components/mdx";

type DocPageProps = {
  params: {
    slug: string[],
  },
}

function getDocFromParams({ params }: DocPageProps): Doc | null {
  const doc = allDocs.find((doc) => arrayShallowEquals(doc.slugAsParams, params.slug))

  return doc ?? null
}

export function generateMetadata({ params }: DocPageProps): Metadata {
  const doc = getDocFromParams({ params })
  if (!doc) return {}
  
  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        { url: siteConfig.opengraphImage },
      ]
    }
  }
}

export function generateStaticParams(): DocPageProps["params"][] {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams,
  }))
}

export default function DocPage({ params }: DocPageProps): React.ReactNode {
  const doc = getDocFromParams({ params })
  if (!doc) return notFound()
  
  return (
    <>
      <Mdx code={doc.body.code} />
    </>
  )
}