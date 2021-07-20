// For detecting a URL
export const url =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

// For detecing hashtags
export const hashtag = /\B(#[a-zA-Z]+\b)(?!;)/;

// For detecting user mentions
export const mention = /^(?!.*\bRT\b)(?:.+\s)?@\w+/;

// For detecting an email
export const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
