export class Tenant {

  constructor(name?: string, firstName?: string, email?: string, phoneNumber?: string, adress?: string, additionalInfo? : string) {
   this.Name = name;
   this.Email = email;
   this.PhoneNumber = phoneNumber;
   this.Adress = adress;
   this.AdditionallInfo = additionalInfo;
   this.FirstName = firstName;

  }
  Email?: string | null = null;
  Adress?: string | null= null;
  AdditionallInfo? : string | null = null;
  PhoneNumber?: string | null = null;
  Name?: string | null = null;
  FirstName?: string | null  = null;
  key?: string | null = null;
}
