export interface IModalConfig {
  type: string | null;
  data: ICustomer | null;
}

export interface IDataType {
  key: number;
  full_name: string;
  birthday: string;
  phone: string;
  email: string;
  judge: [];
  gender: string;
  other_phone: string;
  other_email: string;
  status: string;
  assign_to: string;
  company_name: string;
  career: string;
  department: string;
  total_employee: number;
  country: string;
  city: string;
  district: string;
  address: string;
}

export interface ICustomer {
  full_name: string;
  birthday: string;
  phone: string;
  email: string;
  judge: string;
}
