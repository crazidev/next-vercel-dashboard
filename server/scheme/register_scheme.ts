import yup from "@/server/extra/yup";

export const RegisterScheme = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.mixed<"male" | "female">().default("male"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[\W_]/,
      "Password must contain at least one special character (e.g., !@#$%^&*)"
    )
    .required("Password is required"),
});
