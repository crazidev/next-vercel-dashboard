// import { z } from "zod";

// // Function to validate the data and infer the type from the schema
// export function zodValidator<T extends z.ZodType<any, any>>(
//   schema: T, // Zod schema type is passed to infer the return type
//   data: any,
//   props?: {
//     stripUnknown?: boolean;
//     strict?: boolean;
//     throwException?: boolean;
//     abortEarly?: boolean;
//   }
// ): {
//   isSuccess: boolean;
//   data: z.infer<T> | null;
//   errors?: Record<string, string>;
// } {
//   try {
//     let parsedData: any;

//     // Validate data using safeParse
//     const result = schema.safeParse(data);

//     if (!result.success) {

//         logger(result.error.flatten().fieldErrors);

//       // Extract errors
//       const errorMessages = result.error.errors.reduce((acc, issue) => {
//         acc[issue.path.join(".")] = issue.message;
//         return acc;
//       }, {} as Record<string, string>);

//       return {
//         isSuccess: false,
//         data: null,
//         errors: errorMessages,
//       };
//     }

//     parsedData = result.data;

//     return {
//       isSuccess: true,
//       data: parsedData,
//       errors: {},
//     };
//   } catch (e) {
//     console.error("Unexpected error during validation", e);
//     return {
//       isSuccess: false,
//       data: null,
//       errors: { unknown: "An unknown error occurred" },
//     };
//   }
// }
