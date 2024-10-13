export namespace GetUserDetailsQuery {
  export interface Contract {
    execute(input: GetUserDetailsQuery.Input): GetUserDetailsQuery.Output;
  }
  export type Input = {
    userId: string;
  };
  export type Output = Promise<Response>;
  export type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    consents: Consent[];
  };
  type Consent = {
    id: string;
    enabled: boolean;
  };
}
