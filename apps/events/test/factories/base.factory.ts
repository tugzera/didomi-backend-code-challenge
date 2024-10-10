export interface RegisterFactory<T = any> {
  generateEntity(props: Partial<T>): T;
  generateRegisters(params: {
    props?: Partial<T>;
    count?: number;
  }): Promise<T[]>;
  deleteRegisters(): Promise<void>;
}
