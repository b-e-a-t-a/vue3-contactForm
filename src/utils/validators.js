export const validateName = (name) => {
  return /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]{4,50}$/i.test(name);
};

export const validateEmail = (email) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i.test(email); // assumption: TLD max 63 length
};