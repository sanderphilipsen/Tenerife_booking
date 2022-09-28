import { Roles } from "../enums/roles";

export class AuthenticatedUser {

  constructor(name?: string, role? : Roles, uid? : string) {
    this.Name = name;
    this.Role = role ? role : Roles.NoAcces;
    this.Uid = uid;

  }
  Name?: string | null = null;
  Role? : Roles;
  key?: string | null;
  Uid?: string | null;


}
