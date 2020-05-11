import { IUnik } from "@/interfaces";
import { DIDTypes, DIDType, DIDHelpers } from "@uns/ts-sdk";

export function isUnikId(username: string): boolean {
  return /^[a-f0-9]+$/.test(username) && username.length === 64;
}

export function getPropertyValueFromUnik(unik: IUnik, propertyName: string): string {
  if (unik.properties.length) {
    const explicitValuesProperty = unik.properties.find((property) => property.key === propertyName);
    if (explicitValuesProperty) {
      return explicitValuesProperty.value;
    }
  }
  return undefined;
}

function getDIDTypeByDIDTypes(type: DIDType): DIDTypes {
  let parsedType = parseInt(type);

  if (Number.isNaN(parsedType)) {
    parsedType = DIDHelpers.fromLabel(type);
  }
  return parsedType;
}

export function getUnikLogoName(type: DIDType): string {
  switch (getDIDTypeByDIDTypes(type)) {
    case DIDTypes.INDIVIDUAL:
      return "user";
    case DIDTypes.ORGANIZATION:
      return "globe";
    case DIDTypes.NETWORK:
      return "network-wired";
  }
}

export function getUnikClass(type: DIDType): string {
  switch (getDIDTypeByDIDTypes(type)) {
    case DIDTypes.INDIVIDUAL:
      return "individual";
    case DIDTypes.ORGANIZATION:
      return "organization";
    case DIDTypes.NETWORK:
      return "network";
  }
}

export function getUnikTypeReadableLabelTranslationKey(type: DIDType): string {
  switch (getDIDTypeByDIDTypes(type)) {
    case DIDTypes.INDIVIDUAL:
      return "UNIK.INDIVIDUAL";
    case DIDTypes.ORGANIZATION:
      return "UNIK.ORGANIZATION";
    case DIDTypes.NETWORK:
      return "UNIK.NETWORK";
  }
}
