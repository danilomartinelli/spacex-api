export interface ILaunch {
  id: string;
  name: string;
  date_utc: string;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
  };
  rocket: string;
}
