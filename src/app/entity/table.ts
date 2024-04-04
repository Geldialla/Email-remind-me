import { Category } from "./category";

export interface Table {
    id: number;
    Name: string;
    Punojesi: string;
    Email: string;
    NumriTelefonit: number;
    NumriPersonal: string;
    PozicjoniPunes: string;
    DataFillimit: number;
    DataMbarimit: number;
    Kontrata: string;
    categoryId: number; // Assuming this property exists
    category?: Category; // Make it optional
  }
  
  