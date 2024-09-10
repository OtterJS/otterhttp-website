import React from "react";

const styles: Record<string, React.CSSProperties> = {
  error: {
    flex: 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    lineHeight: '48px',
  },
  h1: {
    display: 'inline-block',
    margin: '0 20px 0 0',
    paddingRight: 23,
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: 'top',
    borderRight: "1px solid hsl(var(--foreground) / 0.5)"
  },
  h2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '28px',
  },
  wrap: {
    display: 'inline-block',
  },
}

export type HttpErrorProps = {
  statusCode?: string,
  message: string,
}

export function ServerError(props: HttpErrorProps) {
  return (
    <main style={styles.error}>
      <div style={styles.desc}>
        {props.statusCode ? (
          <h1 style={styles.h1}>
            {props.statusCode}
          </h1>
        ) : null}
        <div style={styles.wrap}>
          <h2 style={styles.h2}>
            {props.message}.
          </h2>
        </div>
      </div>
    </main>
  )
}
