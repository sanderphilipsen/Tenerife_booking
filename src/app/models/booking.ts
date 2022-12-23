import { PayStatusEnum } from "../enums/payStatusEnum";

export class Booking {

  constructor(tenantKey?: string,appartmentKey?: string,startDate?: string, endDate?: string, cleaningCost?: number, hireCost?: number, prePayedAmount?: number,totalCost?: number, discount?:number,  name?: string, paystatus?: PayStatusEnum, additionalInfo? : string, privateNote?: string) {
   this.TenantKey = tenantKey;
   this.AppartmentKey = appartmentKey;
   this.StartDate = startDate;
   this.EndDate = endDate;
   this.CleaningCost = cleaningCost;
   this.HireCost = hireCost;
   this.TotalCost = totalCost;
   this.Discount = discount;
   this.Name = name;
   this.PrePayedAmount = prePayedAmount;
   this.AdditionalInfo = additionalInfo;
   this.PrivateNote = privateNote;
  }

  TenantKey?: string;
  AppartmentKey?: string | null|undefined;
  StartDate?: string | Date;
  EndDate?:string | Date;
  CleaningCost?: number | null;
  HireCost?: number   | null;
  TotalCost?: number | null;
  Discount?: number | null;
  key?: string | null;
  Name? : string |null;
  PrePayedAmount?: number | null;
  AdditionalInfo?: string| null;
  PrivateNote?: string | null;



}
