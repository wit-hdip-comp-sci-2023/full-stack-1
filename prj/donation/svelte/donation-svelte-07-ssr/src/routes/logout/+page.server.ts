export const load = async ({ cookies }) => {
  cookies.delete("donation-user", { path: "/" });
};
