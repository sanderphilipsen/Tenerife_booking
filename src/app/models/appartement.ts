export class Appartment {

  constructor(name?: string, pricePerDay?: number, pricePerMonth? : number, cleaningCost?: number, description?: string) {
    this.Name = name;
    this.PricePerDay = pricePerDay;
    this.PricePerMonth = pricePerMonth;
    this.CleaningCost = cleaningCost;
    this.Description = description;
  }
  Name?: string | null = null;
  Description?: string | null= null;
  PricePerDay?: number | null= null;
  PricePerMonth?:number | null= null;
  CleaningCost?: number | null= null;
  key?: string | null = null;

}
