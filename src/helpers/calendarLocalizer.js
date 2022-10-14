import { dateFnsLocalizer } from "react-big-calendar";
import { getDay, startOfWeek, parse, format } from "date-fns/esm";
import esES from "date-fns/locale/es";

const locales = {
  //   "en-US": esES,
  es: esES,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
