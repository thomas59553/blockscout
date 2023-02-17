import Config

~w(config config_helper.exs)
|> Path.join()
|> Code.eval_file()

hackney_opts = ConfigHelper.hackney_options()

config :indexer,
  block_interval: :timer.seconds(2),
  json_rpc_named_arguments: [
    transport:
      if(System.get_env("ETHEREUM_JSONRPC_TRANSPORT", "http") == "http",
        do: EthereumJSONRPC.HTTP,
        else: EthereumJSONRPC.IPC
      ),
    else: EthereumJSONRPC.IPC,
    transport_options: [
      http: EthereumJSONRPC.HTTP.HTTPoison,
      url: System.get_env("ETHEREUM_JSONRPC_HTTP_URL") || "http://localhost:8545",
      method_to_url: [
        eth_getBalance: System.get_env("ETHEREUM_JSONRPC_TRACE_URL") || "http://localhost:8545",
        trace_block: System.get_env("ETHEREUM_JSONRPC_TRACE_URL") || "http://localhost:8545",
        trace_replayBlockTransactions: System.get_env("ETHEREUM_JSONRPC_TRACE_URL") || "http://localhost:8545"
      ],
      http_options: [recv_timeout: :timer.minutes(10), timeout: :timer.minutes(10), hackney: hackney_opts]
    ],
    variant: EthereumJSONRPC.Nethermind
  ],
  # Example configuration to override json_rpc_named_arguments for just the realtime block fetcher
  # realtime_overrides: [
  #   json_rpc_named_arguments: [
  #     transport: EthereumJSONRPC.HTTP,
  #     transport_options: [
  #       http: EthereumJSONRPC.HTTP.HTTPoison,
  #       url: System.get_env("ETHEREUM_JSONRPC_REALTIME_HTTP_URL") || "http://localhost:8545",
  #       method_to_url: [
  #         eth_getBalance: System.get_env("ETHEREUM_JSONRPC_REALTIME_TRACE_URL") || "http://localhost:8545",
  #         trace_block: System.get_env("ETHEREUM_JSONRPC_REALTIME_TRACE_URL") || "http://localhost:8545",
  #         trace_replayTransaction: System.get_env("ETHEREUM_JSONRPC_REALTIME_TRACE_URL") || "http://localhost:8545"
  #       ],
  #       http_options: [recv_timeout: :timer.minutes(1), timeout: :timer.minutes(1), hackney: hackney_opts]
  #     ],
  #     variant: EthereumJSONRPC.Nethermind
  #   ]
  # ],
  subscribe_named_arguments: [
    transport:
      System.get_env("ETHEREUM_JSONRPC_WS_URL") && System.get_env("ETHEREUM_JSONRPC_WS_URL") !== "" &&
        EthereumJSONRPC.WebSocket,
    transport_options: [
      web_socket: EthereumJSONRPC.WebSocket.WebSocketClient,
      url: System.get_env("ETHEREUM_JSONRPC_WS_URL")
    ]
  ]
