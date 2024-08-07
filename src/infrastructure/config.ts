interface IConfig {
  baseURL: string;
}

export const config: IConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
};
