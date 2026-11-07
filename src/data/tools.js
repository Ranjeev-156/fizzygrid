// FizzyGrid tool catalogue.
// Each tool is an independent website. Add its deployed URL to `url` when it is live.
// Keep `url` empty until the destination is deployed and tested.

export const categories = [
  { id: "all", label: "All tools" },
  { id: "developer", label: "Developer" },
  { id: "image", label: "Image & design" },
  { id: "documents", label: "Documents" },
  { id: "productivity", label: "Productivity" },
  { id: "web", label: "Web utilities" },
  { id: "ai", label: "AI & learning" }
];

export const tools = [
  {
    id: "json-studio",
    name: "JSON Studio",
    description: "Format, validate and minify JSON without leaving your browser.",
    category: "developer",
    icon: "braces",
    tags: ["JSON", "formatter", "developer", "validator"],
    status: "In development",
    featured: true,
    updated: "Coming soon",
    url: ""
  },
  {
    id: "markdown-editor",
    name: "Markdown Editor",
    description: "Write clean Markdown and preview the result side by side.",
    category: "developer",
    icon: "file-code",
    tags: ["markdown", "writing", "preview", "developer"],
    status: "In development",
    featured: true,
    updated: "Coming soon",
    url: ""
  },
  {
    id: "regex-playground",
    name: "Regex Playground",
    description: "Test regular expressions against sample text with clear matches.",
    category: "developer",
    icon: "regex",
    tags: ["regex", "regular expression", "testing", "developer"],
    status: "Planned",
    featured: false,
    updated: "Planned",
    url: ""
  },
  {
    id: "base64-tool",
    name: "Base64 Converter",
    description: "Encode and decode Base64 text locally in your browser.",
    category: "developer",
    icon: "binary",
    tags: ["base64", "encode", "decode", "developer"],
    status: "Planned",
    featured: false,
    updated: "Planned",
    url: ""
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Reduce image file sizes while keeping control over quality.",
    category: "image",
    icon: "image",
    tags: ["image", "compress", "jpg", "png", "webp"],
    status: "In development",
    featured: true,
    updated: "Coming soon",
    url: ""
  },
  {
    id: "image-converter",
    name: "Image Converter",
    description: "Convert common image formats with local browser processing.",
    category: "image",
    icon: "images",
    tags: ["image", "convert", "format", "webp", "png"],
    status: "Planned",
    featured: false,
    updated: "Planned",
    url: ""
  },
  {
    id: "pdf-toolkit",
    name: "PDF Toolkit",
    description: "A practical workspace for everyday PDF tasks.",
    category: "documents",
    icon: "file-text",
    tags: ["pdf", "documents", "merge", "split"],
    status: "In development",
    featured: true,
    updated: "Coming soon",
    url: ""
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences and reading time.",
    category: "productivity",
    icon: "whole-word",
    tags: ["word count", "characters", "writing", "productivity"],
    status: "Planned",
    featured: false,
    updated: "Planned",
    url: ""
  },
  {
    id: "qr-maker",
    name: "QR Maker",
    description: "Create clean QR codes for links and useful text.",
    category: "web",
    icon: "qr-code",
    tags: ["qr", "qr code", "generator", "web"],
    status: "In development",
    featured: true,
    updated: "Coming soon",
    url: ""
  },
  {
    id: "color-lab",
    name: "Color Lab",
    description: "Explore color values, palettes and accessible combinations.",
    category: "image",
    icon: "palette",
    tags: ["color", "palette", "hex", "design"],
    status: "Planned",
    featured: false,
    updated: "Planned",
    url: ""
  },
  {
    id: "text-diff",
    name: "Text Diff",
    description: "Compare two pieces of text and spot what changed.",
    category: "productivity",
    icon: "git-compare-arrows",
    tags: ["compare", "diff", "text", "changes"],
    status: "Planned",
    featured: false,
    updated: "Planned",
    url: ""
  },
  {
    id: "meta-preview",
    name: "Meta Preview",
    description: "Preview how a page title and description may appear in search.",
    category: "web",
    icon: "search-check",
    tags: ["seo", "meta", "title", "description", "web"],
    status: "Planned",
    featured: false,
    updated: "Planned",
    url: ""
  }
];
