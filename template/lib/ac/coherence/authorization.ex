defmodule Ac.Coherence.Authorization do
    import Phoenix.Controller
    import Plug.Conn
    import AcWeb.Router.Helpers
  
    def admin?(conn) do
      case Coherence.current_user(conn) do
        nil -> false
        user -> user.admin
      end
    end
  
    # authorize plug
    def authorize(conn, opts \\ []) do
      if admin? conn do
        conn
      else
        conn 
        |> redirect(to: page_path(conn, :homepage))
    end
    end
end