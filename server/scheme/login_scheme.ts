import yup from "@/lib/yup";
import z from "zod";


export const loginActionScheme = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  });