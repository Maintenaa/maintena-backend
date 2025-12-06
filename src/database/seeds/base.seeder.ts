export interface BaseSeeder {
  name: string;
  run(): Promise<void>;
}
