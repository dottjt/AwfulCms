defmodule Awful.Application do
  use Application

  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Awful.Repo, []),
      supervisor(Awful.ACRepo, []),
      supervisor(Awful.AFRepo, []),
      supervisor(Awful.APRepo, []),
      supervisor(Awful.ACHRepo, []),
      supervisor(Awful.APORepo, []),
      supervisor(Awful.AHPRepo, []),
      supervisor(Awful.A9Repo, []),
      supervisor(Awful.AWRepo, []),
      # Start the endpoint when the application starts
      supervisor(AwfulWeb.Endpoint, []),
      # Start your own worker by calling: Awful.Worker.start_link(arg1, arg2, arg3)
      # worker(Awful.Worker, [arg1, arg2, arg3]),
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Awful.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    AwfulWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
