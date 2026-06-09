import { resolve } from "node:path";

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        blueHorizonVillas: resolve(__dirname, "properties/blue-horizon-villas/index.html"),
        metroHeights: resolve(__dirname, "properties/metro-heights/index.html"),
        gardenCourtResidences: resolve(__dirname, "properties/garden-court-residences/index.html"),
      },
    },
  },
};
