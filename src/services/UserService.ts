export const UserService = {
  getDetails: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("UserService.getDetails resolved");
        resolve({ name: "Filip" });
      }, 300);
    }) as Promise<{ name: string }>;
  },
  getFavoriteColor: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("UserService.getFavoriteColor resolved");
        resolve({ color: "blue" });
      }, 1500);
    }) as Promise<{ color: string }>;
  },
};
