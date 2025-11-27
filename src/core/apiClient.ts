async function request<T>(url: string, options: RequestInit) {
    try {
      const res = await fetch(url, options);
  
      const text = await res.text();
      let json = null;
  
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = text;
      }
  
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: json?.message || json || "Request failed",
        };
      }
  
      return {
        success: true,
        data: json,
      };
    } catch (e) {
      return {
        success: false,
        status: 0,
        error: "Something went wrong",
      };
    }
  }
  
  export const api = {
    post: <T>(url: string, body: any) =>
      request<T>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
  
    get: <T>(url: string) =>
      request<T>(url, {
        method: "GET",
      }),
  };
  