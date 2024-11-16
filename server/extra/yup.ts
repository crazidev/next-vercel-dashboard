import { loginActionScheme } from "@/scheme/login_scheme";
import * as yup from "yup";

// Export the yup instance
export default yup;

/**
 * This function validates the given data against the provided Yup schema.
 *
 * Usage:
 * ```typescript
 * const schema = yup.object({
 *   name: yup.string().required(),
 *   age: yup.number().required().positive().integer(),
 * });
 *
 * const data = { name: "John Doe", age: 30 };
 * const result = yupValidator(schema, data);
 *
 * if (result.isSuccess) {
 *   console.log("Validation succeeded:", result.data);
 * } else {
 *   console.log("Validation failed:", result.errors);
 * }
 * ```
 *
 * @param schema The Yup schema to validate against
 * @param data The data to validate
 * @param props Optional options to pass to the Yup validator
 * @returns An object with the status of the validation, the validated data, and the errors if any
 */
export function yupValidator<T extends yup.ObjectSchema<any>>(
  schema: T, // Yup schema to infer the return type
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
