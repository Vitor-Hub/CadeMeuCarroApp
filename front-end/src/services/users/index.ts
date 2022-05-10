export const getUserById = async (id: number) => {
  await fetch("http://187.46.84.12:8000/user/4")
    .then((response) => response.json())
    .then((json) => console.log(json));
};
