import yup from "@/lib/yup";
import z from "zod";

export const RegisterScheme = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  gender: yup.mixed<"male" | "female">().default("male"),
  password: yup.string().required(),
});
