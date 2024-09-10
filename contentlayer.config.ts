import {
  type ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer2/source-files"

import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "list",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1)
  }
}

export const doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: "docs/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields,
}))

export const snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/**/*.mdx",
  contentType: "mdx",
  computedFields,
}))

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [doc, snippet],
  mdx: {
    remarkPlugins: [
      remarkGfm,
    ],
    rehypePlugins: [
      rehypeSlug, 
      [rehypePrettyCode, { keepBackground: false }], 
      rehypeAutolinkHeadings,
    ],
  }
})
