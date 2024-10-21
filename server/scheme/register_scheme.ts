import yup from "@/lib/yup";
import z from "zod";

export const RegisterScheme = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  dob: yup.date().required(),
  gender: yup.mixed<"male" | "female">().default("male"),
  password: yup.string().required(),
});
