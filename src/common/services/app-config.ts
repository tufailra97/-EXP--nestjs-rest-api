export class AppConfig {
  private static port: number;

  static initialise() {
    if (!process.env.PORT || isNaN(Number(process.env.PORT))) {
      throw new Error('PORT is not defined');
    }

    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    AppConfig.port = Number(process.env.PORT);
  }

  static getConfigs() {
    return {
      port: AppConfig.port
    };
  }
}
