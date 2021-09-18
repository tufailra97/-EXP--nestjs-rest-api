export class AppConfig {
  private static port: number;
  private static jwtSecret: string;

  static initialise() {
    if (!process.env.PORT || isNaN(Number(process.env.PORT))) {
      throw new Error('PORT is not defined');
    }

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }

    AppConfig.port = Number(process.env.PORT);
    AppConfig.jwtSecret = process.env.JWT_SECRET_KEY;
  }

  static getConfigs() {
    return {
      port: AppConfig.port,
      jwtSecret: AppConfig.jwtSecret
    };
  }
}
