export type DatabaseProps = {
  host: string;
  username: string;
  password: string;
  port: number;
  database: string;
  dropSchema?: boolean;
  logging?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DatabaseConnection<T = any> {
  connect(params: DatabaseProps): Promise<T>;
  disconnect(): Promise<void>;
}
