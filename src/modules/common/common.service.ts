export function createError(message: string, code?: number) {
  return Response.json({ message }, { status: code || 500 });
}
