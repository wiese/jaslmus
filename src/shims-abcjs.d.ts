// will hopefully be in v6 of abcjs
// see https://github.com/paulrosen/abcjs/pull/536
declare module "abcjs" {
  export enum ResponsiveMode {
    RESIZE = "resize",
    SOMETHING = "something"
  }

  export interface Options {
    staffwidth?: number;
    wrap?: {
      minSpacing: number;
    };
    responsive?: ResponsiveMode;
    gfont?: string;
    add_classes?: boolean;
  }

  export function renderAbc(
    target: string | HTMLElement,
    code: string,
    params: Options
  ): unknown[];
}
