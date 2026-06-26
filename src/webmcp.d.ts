import 'react'

// WebMCP — Declarative API (W3C Web Machine Learning CG; co-developed by Google
// & Microsoft, shipping ~Chrome 146). Annotating a <form> with these attributes
// lets the browser expose it to AI agents as a callable "tool" with an
// auto-generated JSON schema. Unknown to older browsers (safely ignored), so it
// adds AI-search/agent discoverability at zero cost to other users.
// Ref: https://developer.chrome.com/docs/ai/webmcp
declare module 'react' {
  interface FormHTMLAttributes<T> {
    toolname?: string
    tooldescription?: string
    toolautosubmit?: boolean
  }
  interface HTMLAttributes<T> {
    toolparamdescription?: string
  }
}
