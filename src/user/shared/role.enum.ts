import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator'
}

registerEnumType(UserRole, {
  name: 'UserRole',
});