export function truncate(value: string, length = 13, truncateWhere = "middle"): string {
  switch (truncateWhere) {
    case "left":
      return value.length > length ? `...${value.slice(value.length - length + 3)}` : value;

    case "middle":
      const odd = length % 2;
      const truncationLength = Math.floor((length - 1) / 2);
      return value.length > length
        ? `${value.slice(0, truncationLength - odd)}...${value.slice(value.length - truncationLength + 1)}`
        : value;

    case "right":
      return value.length > length ? `${value.slice(0, length - 3)}...` : value;

    default:
      return value;
  }
}
