export type ParsedError = { [key: string]: string };

const parsedError: ParsedError = {};

export const errorParser = (errorData: any) => {
  const errorArray = errorData as unknown as string[];

  errorArray.forEach((errorMessage) => {
    const [field] = errorMessage.split(' ');
    if (field !== undefined) {
      parsedError[field] = errorMessage;
    }
  });

  return parsedError;
};
