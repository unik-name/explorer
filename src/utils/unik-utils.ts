import { IUnik } from "@/interfaces";

export function isUnikId(username: string): boolean {
  return /^[a-f0-9]+$/.test(username) && username.length === 64;
}

export function getPropertyValueFromUnik(unik: IUnik, propertyName: string): string {
  if (unik.properties.length) {
    const explicitValuesProperty = unik.properties.find(property => property.key === propertyName);
    if (explicitValuesProperty) {
      return explicitValuesProperty.value;
    }
  }
  return undefined;
}
