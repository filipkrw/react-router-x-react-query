export const UserService = {
  getDetails: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: "Filip" });
      }, 3000);
    });
  },
  getFavoriteColor: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ color: "blue" });
      }, 2000);
    });
  },
};
