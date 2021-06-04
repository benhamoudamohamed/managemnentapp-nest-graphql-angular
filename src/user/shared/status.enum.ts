import { registerEnumType } from "@nestjs/graphql";

export enum Status {
  Pending = 'Pending',
  Active = 'Active'
}

registerEnumType(Status, {
  name: 'Status',
});