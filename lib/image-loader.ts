// Custom image loader to optimize image loading
export function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f1b04c20" offset="20%" />
          <stop stop-color="#f1b04c30" offset="50%" />
          <stop stop-color="#f1b04c20" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f1b04c10" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
}

export function toBase64(str: string) {
  return typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)
}

export const getBlurDataURL = (w = 100, h = 100) => {
  return `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`
}
