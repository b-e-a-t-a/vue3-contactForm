export const validateName = (name) => {
  return /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]{4,50}$/i.test(name);
};