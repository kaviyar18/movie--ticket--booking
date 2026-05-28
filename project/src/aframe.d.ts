// This is a new file. Place it in your 'src' directory.
// It tells TypeScript about A-Frame's custom HTML elements.

import "aframe";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "a-scene": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [key: string]: any; // Allow any A-Frame component properties
        },
        HTMLElement
      >;
      "a-sky": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          rotation?: string;
          [key: string]: any;
        },
        HTMLElement
      >;
      "a-text": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: string;
          position?: string;
          color?: string;
          width?: string;
          align?: string;
          [key: string]: any;
        },
        HTMLElement
      >;
      "a-entity": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          light?: string;
          [key: string]: any;
        },
        HTMLElement
      >;
    }
  }
}

// Export something to make it a module
export {};
