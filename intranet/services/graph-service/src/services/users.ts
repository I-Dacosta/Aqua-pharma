export async function inviteGuest(email: string) {
  return { email, status: "queued" };
}
