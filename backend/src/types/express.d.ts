// TypeScript declaration merging.
// Its purpose is to tell TypeScript: “Express's Request object also has a user property.”

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export {}; // “Make this file a module without exporting anything.”
// TypeScript requires declare global { ... } to be used inside a module.
// Why?

// Normally, a .d.ts file without imports/exports is treated as a global script.

// But we want to do something slightly different:

// “Take the existing global Express.Request type and add user to it.”

// That's called global type augmentation.