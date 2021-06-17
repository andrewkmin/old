// For detecting a URL
export const URL = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

// For detecing hashtags
export const Hashtag = new RegExp(/\B(#[a-zA-Z]+\b)(?!;)/);

// For detecting user mentions
export const Mention = new RegExp(/^(?!.*\bRT\b)(?:.+\s)?@\w+/i);