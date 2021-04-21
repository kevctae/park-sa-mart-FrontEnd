export interface Account {
  fname: string;
  lname: string;
  email: string;
  wallet?: number;
  primary_card_no?: string;
  main_payment_method?: string;
}