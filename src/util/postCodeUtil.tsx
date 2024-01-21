const baseUrl = "https://api.postcodes.io/postcodes/";

//ideally creating a hook or using axios is preferred but due to less time
//I have created a function which returns a promise

const getData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (data.status !== 200) {
    throw new Error("There is an issue");
    // Ideally more error types to be shown for perfect UX but I have just errored out
    // everything except success for now
  } else return data;
};

const validatePostCodes = async (postCode: string) => {
  const url = baseUrl + postCode + "/validate";
  return getData(url);
};

const autoFillPostCodes = async (postCode: string) => {
  const url = baseUrl + postCode + "/autocomplete";
  return getData(url);
};

const getApis = {
  autoFillPostCodes,
  validatePostCodes,
};

export default getApis;
