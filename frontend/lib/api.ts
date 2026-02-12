function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()!.split(';').shift() ?? null;
  }
  return null;
}

const API_BASE = ""; // ✅ usa o mesmo domínio do frontend (localhost:3000)

export async function ensureCsrfCookie() {
  // ✅ agora chama /api/csrf/ no próprio localhost:3000 (o proxy leva pro Django)
  await fetch(`${API_BASE}/api/csrf/`, {
    method: "GET",
    credentials: "include",
  });
}

export async function apiPost(path: string, body: any) {
  const csrftoken = getCookie("csrftoken");

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(csrftoken ? { "X-CSRFToken": csrftoken } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `Erro HTTP ${res.status}`);
  return data;
}

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) return { ok: false, status: res.status, data };
  return data;
}
