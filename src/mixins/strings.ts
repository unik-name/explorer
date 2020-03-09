import store from "@/store";
import emoji from "node-emoji";
import { truncate } from "../utils/strings";

const locale = store.getters["ui/locale"];

export default {
  methods: {
    truncate,
    capitalize(value: string): string {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    percentageString(value: number, decimals: number = 2): string {
      if (typeof value !== "undefined") {
        return (value / 100).toLocaleString(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          style: "percent",
        });
      }

      return "-";
    },

    emojify(text: string): string {
      return emoji.emojify(text);
    },
  },
};
