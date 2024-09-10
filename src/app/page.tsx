import * as React from "react"

import { Snippet } from "@/components/snippet";

export default function HomePage() {
  return (
    <main className="max-w-lg mx-auto relative px-[24px] mb-[96px] mt-[32px] md:px-0 md:mb-[64px]">
      <div className="pt-0 md:pt-[48px]">
        <div className="px-0 md:px-7 flex justify-center lg:justify-between z-0">
          <div className="flex flex-col justify-between w-[300px] xl:w-[440px] space-y-10 max-md:hidden">
            <div className="h-full">
              <Snippet slug="/snippets/installation-commands" />
            </div>
          </div>
        </div>
        <Snippet slug="/snippets/index-readme" />
      </div>
    </main>
  )
}
