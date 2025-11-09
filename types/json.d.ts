export type JsonPrimitive = boolean | null | number | string;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };
export type Json = JsonArray | JsonObject | JsonPrimitive;
