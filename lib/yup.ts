import { loginActionScheme } from "server/scheme/login_scheme";
import * as yup from "yup";

// Export the yup instance
export default yup;

// Function to validate the data and infer the type from the schema
export function yupValidator<T extends yup.ObjectSchema<any>>(
  schema: T, // schema type is passed to infer the return type
  data: any,
  props?: {
    stripUnknown?: boolean;
    strict?: boolean | false;
    throwException?: boolean;
    abortEarly?: boolean;
  }
): {
  isSuccess: boolean;
  data?: yup.InferType<T>;
  errors?: {};
} {
  try {
    // Validate data synchronously
    const validatedFields = schema.validateSync(data, {
      stripUnknown: props?.stripUnknown,
      strict: props?.strict,
      abortEarly: props?.abortEarly ?? false,
      disableStackTrace: props?.throwException ?? true,
    });

    return {
      isSuccess: true,
      data: validatedFields as yup.InferType<T>,
      errors: {},
    };
  } catch (e) {
    var error = e as yup.ValidationError;

    const errorMessages = error.inner.reduce((acc, value, index) => {
      acc[value.path!] = value.errors[0].toString().split(",").at(0);
      return acc;
    }, {} as { [key: string]: any });

   

    return {
      isSuccess: false,
      data: error.value as yup.InferType<T>,
      errors: errorMessages,
    };
  }
}
