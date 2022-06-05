export const docOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Notes API",
        version: "0.1.0",
        description:
          "API for a test application made for Welbex",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Sergey Yukhanov",
          url: "https://yukhanovsergey.netlify.app/",
          email: "bonafide112358@gmail.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/",
        },
      ],
    },
    apis: ["./src/routers/*.ts", "*/routers/*.js"],
  };