export const now = () => {
  return Date.now ? Date.now() : new Date().getTime();
}