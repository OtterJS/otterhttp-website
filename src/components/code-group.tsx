"use client"

import * as React from "react"

import "@/styles/code-group.css"

import { Card, CardContent } from "@/components/ui/card";
import { useUserChoices, type UserChoicesContextProps } from "@/hooks/use-user-choices";
import { userChoicesOptionsLists } from "@/components/user-choices-provider";

type CodeGroupKey = "packageManager" | "runtime"
type CodeGroupProps<T extends CodeGroupKey> = {
  groupKey: T
  children: React.ReactNode
}

type CodeGroupContextProps = {
  groupKey: CodeGroupKey
}

const CodeGroupContext = React.createContext<CodeGroupContextProps | null>(null)

function useCodeGroup() {
  const context = React.useContext(CodeGroupContext)

  if (!context) {
    throw new Error("useCodeGroup must be used within a <CodeGroup />")
  }

  return context
}

export function CodeGroup<T extends CodeGroupKey>({ groupKey, children, ...props }: CodeGroupProps<T> & Omit<React.HTMLAttributes<HTMLDivElement>, "children">) {
  const codeGroupId = React.useId()
  type OptionKey = UserChoicesContextProps[T][0]
  const userChoices = useUserChoices()
  const [optionKey, setOptionKey] = userChoices[groupKey] as [OptionKey, (value: OptionKey) => void]
  const optionEntries = userChoicesOptionsLists[groupKey] as readonly OptionKey[]

  function renderOptionTab(tabOptionKey: OptionKey, index: number) {
    return (
      <React.Fragment key={index}>
        <input
          id={`code-group-${codeGroupId}-tab-${tabOptionKey}`} 
          type="radio" 
          name={`code-group-${codeGroupId}-${groupKey}`}
          className="fixed opacity-0 pointer-events-none"
          checked={tabOptionKey === optionKey}
          onChange={() => {
            setOptionKey(tabOptionKey)
          }}
        />
        <label 
          className="relative"
          htmlFor={`code-group-${codeGroupId}-tab-${tabOptionKey}`}
        >
          {tabOptionKey}
        </label>
      </React.Fragment>
    )
  }

  return (
    <Card className="rounded-lg code-group">
      <CodeGroupContext.Provider 
        value={{
          groupKey,
        }}
      >
        <div className="tabs mb-4">
          {optionEntries.map(renderOptionTab)}
        </div>
        <CardContent {...props}>
          {children}
        </CardContent>
      </CodeGroupContext.Provider>
    </Card>
  )
}

type CodeGroupOptionProps<T extends CodeGroupKey> = {
  optionKey: UserChoicesContextProps[T][0]
  children?: React.ReactNode
}

export function CodeGroupOption<T extends CodeGroupKey>({ optionKey, children }: CodeGroupOptionProps<T>) {
  const { groupKey } = useCodeGroup()
  const userChoices = useUserChoices()
  const [userChoice] = userChoices[groupKey]
  
  if (userChoice !== optionKey) return <></>
  return children
}
