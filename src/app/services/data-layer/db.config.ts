import { LocalDbConfig } from "./geldi-be-mock.module";

export const dbConfig: LocalDbConfig[] = [
  {
    table: "User",
    columns: ['id', 'name', 'lastName', 'adress', 'email', 'password', 'phoneNumber']
  },
  {
    table: "Tablee",
    columns: ['id','Name', 'Punojesi', 'Emaili', 'NumriTelefonit', 'NumriPersonal', 'PozicjoniPunes', 'DataFillimit', 'DataMbarimit']
  },
  {
    table: "Kategoryy",
    columns: ['id', 'Name']
  },
];
