export interface IModalConfig {
  type: string | null;
  data: IDataType | null;
}

export interface IDataType {
  id: string;
  full_name: string;
  birthday: string | null;
  phone: string;
  email: string;
  judge: [];
  gender: string | null;
  other_phone: string | null;
  other_email: string | null;
  status: string;
  assign_to: string;
  company_name: string;
  career: string | null;
  department: string | null;
  total_employee: number | null;
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
