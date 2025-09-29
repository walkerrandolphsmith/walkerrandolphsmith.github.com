import parametersJSON from "./parameters/index.json";

type Keys = keyof typeof parametersJSON.parameters;

type Parameters = {
  [K in Keys]: string;
};

const parameters = Object.entries(parametersJSON.parameters).reduce(
  (params, [key, value]) => ({
    ...params,
    [key]: value.value,
  }),
  {} as Partial<Parameters>
) as Parameters;

export default parameters;
