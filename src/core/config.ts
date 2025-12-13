export class Config {
  // application
  static APP_ENV: string = process.env.APP_ENV || "development";
  static APP_PORT: number = (process.env.APP_PORT as any) || 5000;

  // database
  static DB_HOST: string = process.env.DB_HOST || "localhost";
  static DB_PORT: number = (process.env.DB_PORT as any) || 5432;
  static DB_USER: string = process.env.DB_USER || "root";
  static DB_PASSWORD: string = process.env.DB_PASSWORD || "";
  static DB_NAME: string = process.env.DB_NAME || "";

  // jwt
  static JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "";

  // ai
  static AI_BASE_URL: string = process.env.AI_BASE_URL || "";
  static AI_API_KEY: string = process.env.AI_API_KEY || "";
  static AI_MODEL: string = process.env.AI_MODEL || "";

  // client
  static CLIENT_URL: string = process.env.CLIENT_URL || "*";

  static get isDevelopment(): boolean {
    return this.APP_ENV == "development";
  }
}
