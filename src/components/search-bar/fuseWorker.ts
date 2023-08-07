import Fuse from "fuse.js";
import { DESTINATIONS } from "src/utils/destinations";

const MAX_LIST_ELEMENTS = 8;
const fuse = new Fuse(DESTINATIONS, {
  keys: ["term"],
  minMatchCharLength: 4,
});

export function searchFuse(searchTerm: string) {
  return fuse
    .search(searchTerm, { limit: MAX_LIST_ELEMENTS })
    .map((result) => result.item)
    .sort((a, b) => a.type.toLowerCase().localeCompare(b.type.toLowerCase()));
}
