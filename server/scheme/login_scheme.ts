import yup from "@/server/extra/yup";

export const loginActionScheme = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
