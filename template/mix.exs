defmodule Ac.Mixfile do
  use Mix.Project

  def project do
    [
      app: :ac,
      version: "0.1.1",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Ac.Application, []},
      extra_applications: [:logger, :runtime_tools, :coherence]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.2"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:cowboy, "~> 1.0"},

      {:logger_file_backend, "~> 0.0.10"},

      # dev related 
      {:credo, "~>0.8", only: [:dev, :test], runtime: false},

      # image upload
      {:arc, "~> 0.8.0"},
      {:arc_ecto, "~> 0.7.0"},

      # If using Amazon S3:
      {:ex_aws, "~> 1.1"},
      {:hackney, "~> 1.6"},
      {:poison, "~> 3.1"},
      {:sweet_xml, "~> 0.6"},
      
      # ELM testing
      {:cors_plug, "~> 1.2"},
      
      # general purpose
      {:httpoison, "~> 0.13", override: true},
      {:timex, "~> 3.1"},

      # API authentication
      {:oauth2, "~> 0.9"},
      {:oauther, "~> 1.1"}, # will need for tumblr
      {:extwitter, "~> 0.8"},
      {:facebook, "~> 0.17.0"},
      
      # user authentication
      {:coherence, "~> 0.5"},

      # deployment
      {:distillery, "~> 1.5", runtime: false}, 
      {:edeliver, "~> 1.4.4"},

      # pagination
      {:scrivener, "~> 2.0"},
      {:scrivener_ecto, "~> 1.0"},

      # security 
      {:recaptcha, "~> 2.0"},
      
      # SEO
      {:sitemap, "~> 1.0"},

      # scheduler
      {:quantum, ">= 2.2.0"},

      # shell cmd
      {:porcelain, "~> 2.0"}
   
      # {:amazon_product_advertising_client, "~> 0.2.1"}
      
      # {:rummage_phoenix, "~> 1.2.0", override: true},
      # {:rummage_phoenix, ">= 0.0.0", override: true},      
      
      # {:guardian, "~> 1.0-beta"},
      # {:ueberauth, "~> 0.4"},
      # {:ueberauth_google, "~> 0.5"},
      # {:ueberauth_facebook, "~> 0.7"},
      # {:ja_serializer, "~> 0.12.0"},
      
      # {:comeonin, "~> 4.0"},
      # {:argon2_elixir, "~> 1.2"},

      # {:mailgun, "~> 0.1.2", override: true},
      # {:mailgun, ">= 0.0.0", override: true},
      # {:ex_aws, "~> 1.1"},
      # {:hackney, "~> 1.6"},
      # {:poison, "~> 3.1"},
      # {:sweet_xml, "~> 0.6"}
    ]
  end


  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      "ecto.seed": ["run priv/repo/seeds.exs"],
      "test": ["ecto.create --quiet", "ecto.migrate", "test"],
      "sitemap_generate": ["run task/sitemap_task.exs"]
    ]
  end
end
