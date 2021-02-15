import { User } from "src/AuthContext";
import { RoleEnum } from "src/graphql";

export const isAdmin = (user?: User) =>
  (user?.roles ?? []).includes(RoleEnum.ADMIN);

export const canEdit = (user?: User) =>
  (user?.roles ?? []).includes(RoleEnum.EDIT) || isAdmin(user);
